const toggleLikePost = async (post, userId) => {
  const index = post.likes.findIndex((id) => id === String(userId));

  if (index === -1) {
    post.like.push(userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(userId));
  }

  return post;
};

const toggleLikeComment = async (comment, userId) => {
  const index = comment.likes.findIndex((id) => id === String(userId));

  if (index === -1) {
    comment.likes.push(userId);
  } else {
    comment.likes = comment.likes.filter((id) => id !== String(userId));
  }

  return comment;
};

module.exports = {
  toggleLikePost,
  toggleLikeComment,
};
