const express = require("express");
const router = express.Router();
const {
  generateInvite,
  getInvite,
  acceptInvite,
} = require("../controllers/inviteController");

router.post("/generate", generateInvite);
router.get("/:inviteId", getInvite);
router.post("/:inviteId/accept", acceptInvite);

module.exports = router;
