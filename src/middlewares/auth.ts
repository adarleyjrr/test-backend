import admin from "firebase-admin";

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      req.body.uid = decodedToken.uid;
      return next();
    } else {
      return res.status(401).send("Not authorized.");
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send("Not authorized");
  }
};

const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization) return verifyToken(req, res, next);
  return next();
};

const requireAuth = async (req, res, next) => {
  return verifyToken(req, res, next);
};

export default { verifyToken, optionalAuth, requireAuth };
