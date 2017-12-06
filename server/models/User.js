class User {
  constructor(userId, username, recentPostId = null) {
    this.user_id = userId.toString();
    this.username = username.toString();
    this.recent_post_id = recentPostId;
  }
}

module.exports = User;
