// handles user-related stuff

const db = require("./client");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async ({ username, email, password, is_admin = false }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const {
      rows: [user],
    } = await db.query(
      `INSERT INTO users (id, username, email, password, is_admin)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [uuid.v4(), username, email, hashedPassword, is_admin]
    );
    return user;
  } catch (err) {
    throw err;
  }
};

const createUserAndGenerateToken = async ({ username, email, password }) => {
  const user = await createUser({ username, email, password });
  const token = await jwt.sign({ id: user.id }, JWT_SECRET);
  return { token };
};

const findUserByToken = async (token) => {
  console.log(token);
  let id;
  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    console.log("Token payload:", payload);
    id = payload.id;
  } catch (ex) {
    console.error("Error verifying token:", ex.message);
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `--sql
    SELECT id, username, email, is_admin FROM users WHERE id=$1;
  `;
  const response = await db.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `--sql
      SELECT * FROM users WHERE id = $1`,
      [id]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const { rows: users } = await db.query(`SELECT * FROM users`);
    console.log(users);
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  createUserAndGenerateToken,
  getUser,
  getUserByEmail,
  getUserById,
  getUsers,
  findUserByToken,
};
