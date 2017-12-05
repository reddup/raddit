class User {
  constructor(userId, recentPostId = null) {
    this.user_id = userId;
    this.recent_post_id = recentPostId;
  }
}

module.exports = User;
