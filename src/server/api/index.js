const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const volleyball = require("volleyball");
const { getUserById } = require("../db/users");

apiRouter.use(volleyball);

apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith("Bearer ")) {
    const token = auth.slice(7);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
      }
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: "Authorization token must start with 'Bearer'",
    });
  }
});

const adminRouter = require("./admin");
const recordsRouter = require("./records");
const cartRouter = require("./carts");
const usersRouter = require("./users");

apiRouter.use("/admin", adminRouter);
apiRouter.use("/records", recordsRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
