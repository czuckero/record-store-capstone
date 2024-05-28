// handles user-related stuff

const db = require("./client");
const bcrypt = require("bcrypt");

const createUser = async ({ username, email, password, isAdmin = false }) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `--sql
      INSERT INTO users (id, username, email, password, admin)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    );
    const response = await client.query(SQL, [
      uuid.v4(),
      username,
      email,
      await bcrypt.hash(password, 5),
      isAdmin,
    ]);
    return response.rows[0];
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
      FROM users
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
