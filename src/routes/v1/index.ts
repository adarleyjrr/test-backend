import express from "express";
import usersRoutes from "./users";
import testsRoutes from "./tests";

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => res.send({ version: "1.0.0" }));
router.use("/users", usersRoutes);
router.use("/tests", testsRoutes);

export default router;
