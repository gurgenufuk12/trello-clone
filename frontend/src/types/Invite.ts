export interface GenerateInviteResponse {
  inviteId: string;
  invite: {
    id: string;
    boardId: string;
    creatorId: string;
    email: string;
    expiresAt: Date;
    status: string;
    createdAt: Date;
  };
}

export interface AcceptInviteResponse {
  message: string;
  boardId: string;
}
