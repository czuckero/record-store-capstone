// handles user-related stuff

const db = require("./client");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createUser = async ({ username, email, password, isAdmin = false }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const {
      rows: [user],
    } = await db.query(
      `INSERT INTO users (id, username, email, password, admin)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [uuid.v4(), username, email, hashedPassword, isAdmin]
    );
    return user;
  } catch (err) {
    throw err;
  }
};

const findUserByToken = async (token) => {
  let id;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = `--sql
    SELECT id, username FROM users WHERE id=$1;
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
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
  getUsers,
  findUserByToken,
};
