const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.get("/protected-data", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Datos protegidos", uid: req.uid });
});

module.exports = router;
