class UserPost {
  constructor(userId, postId, metadata) {
    this.user_id = userId;
    this.postId = postId;
    this.metadata = Object.assign({}, metadata);
  }
}

module.exports = UserPost;
