const admin = require("firebase-admin");
const firebase = require("../db");
const { v4: uuidv4 } = require("uuid");
const invitesDb = firebase.collection("invites");
const boardsDb = firebase.collection("boards");
const usersDb = firebase.collection("users");

const generateInvite = async (req, res) => {
  try {
    const { boardId, creatorId, email } = req.body;
    const inviteId = uuidv4();

    const invite = {
      id: inviteId,
      boardId,
      creatorId,
      email,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "pending",
      createdAt: new Date(),
    };

    await invitesDb.doc(inviteId).set(invite);
    res.status(201).json({ inviteId, invite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvite = async (req, res) => {
  try {
    const { inviteId } = req.params;
    const invite = await invitesDb.doc(inviteId).get();

    if (!invite.exists) {
      return res.status(404).json({ error: "Invite not found" });
    }

    res.status(200).json(invite.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptInvite = async (req, res) => {
  try {
    const { inviteId } = req.params;
    const { userId } = req.body;

    const inviteRef = await invitesDb.doc(inviteId).get();
    if (!inviteRef.exists) {
      return res.status(404).json({ error: "Invite not found" });
    }

    const invite = inviteRef.data();

    if (invite.status !== "pending") {
      return res.status(400).json({ error: "Invite is no longer valid" });
    }

    if (new Date(invite.expiresAt) < new Date()) {
      return res.status(400).json({ error: "Invite has expired" });
    }

    const boardRef = boardsDb.doc(invite.boardId);
    const boardDoc = await boardRef.get();
    const boardData = boardDoc.data();
    const boardUsers = boardData.boardUsers || [];
    boardUsers.push(userId);
    await boardRef.update({ boardUsers });

    const userRef = usersDb.doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    const boards = userData.boards || [];
    boards.push(invite.boardId);
    await userRef.update({ boards });

    await invitesDb.doc(inviteId).update({
      status: "accepted",
      acceptedBy: userId,
      acceptedAt: new Date(),
    });

    res.status(200).json({
      message: "Invite accepted successfully",
      boardId: invite.boardId,
    });
  } catch (error) {
    console.error("Accept invite error:", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  generateInvite,
  getInvite,
  acceptInvite,
};
