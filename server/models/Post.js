class Post {
  constructor(postId, title, link, metadata = []) {
    this.post_id = postId.toString();
    this.title = title.toString();
    this.link = link.toString();
    this.metadata = metadata;
  }
}

module.exports = Post;
