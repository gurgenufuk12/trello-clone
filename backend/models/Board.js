class Board {
    constructor(
      id,
      title,
      description,
      boardAdmin,
      boardUsers = [],
      boardTasks = [],
      createdAt,
      updatedAt
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.boardAdmin = boardAdmin;
      this.boardUsers = boardUsers;
      this.boardTasks = boardTasks;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  