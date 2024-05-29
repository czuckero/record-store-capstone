const db = require("./client");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const createUser = async (userData) => {
  if (
    !userData ||
    !userData.username ||
    !userData.email ||
    !userData.password
  ) {
    throw new Error(
      "Missing required fields: username, email, and password are required"
    );
  }

  const { username, email, password, isAdmin = false } = userData;

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
  getUsers,
};
