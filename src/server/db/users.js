// handles user-related stuff

const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async ({ username, email, password, isAdmin = false }) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await db.query(
      `--sql
      INSERT INTO users (username, email, password, admin)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [username, email, hashedPassword, isAdmin]
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
    } = await db.query(
      `--sql 
      SELECT * 
      FROM user 
      WHERE email=$1
      `,
      [email]
    );

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
    const { rows: users } = await db.query(
      `--sql
      SELECT * FROM users;
      `
    );
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
