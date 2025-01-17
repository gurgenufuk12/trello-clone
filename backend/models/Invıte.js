// backend/models/Invite.js
class Invite {
  constructor(id, boardId, creatorId, expiresAt, status, email) {
    this.id = id;
    this.boardId = boardId;
    this.creatorId = creatorId;
    this.expiresAt = expiresAt;
    this.status = status;
    this.email = email;
    this.createdAt = new Date();
  }
}

module.exports = Invite;
