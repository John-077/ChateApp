import express from "express";

const router = express.Router();

router.get("/sende", (req, res) => {
  res.send("Send message endpoint");
});


export default router;
