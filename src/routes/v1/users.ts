import express from "express";
import auth from "../../middlewares/auth";

const router = express.Router({ mergeParams: true });

router.get("/login", async (req, res) => {
  try {
    const data = { result: 1 };
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.get("/checklogin", auth.requireAuth, async (req, res) => {
  try {
    let result = undefined;
    res.send({ succeeded: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

export default router;
