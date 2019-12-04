import express from "express";
import auth from "../../middlewares/auth";

const router = express.Router({ mergeParams: true });

router.get("/topsecretdocuments", auth.requireAuth, async (req, res) => {
  try {
    res.send({
      documents: ["Top secret dog stuff", "Dogs are not horses"],
      ps: "*burn after reading"
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

export default router;
