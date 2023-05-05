import { Comment } from '../db';
import { checkPermissionInComment } from '../utils/validate';

class commentService {
  static async getComment({ postId }) {
    const commentList = await Comment.findByPostId({ postId });
    return commentList;
  }

  static async addComment({ comment }) {
    const newComment = await Comment.add({ comment });
    return newComment;
  }

  static async editComment({ userId, comment }) {
    const { _id } = comment;

    const errorMessage = await checkPermissionInComment(_id, userId);
    if (errorMessage) return errorMessage;

    const editedComment = await Comment.edit({ comment });
    return editedComment;
  }

  static async removeComment({ _id, userId }) {

    const errorMessage = await checkPermissionInComment(_id, userId);
    if (errorMessage) return errorMessage;

    const removedComment = await Comment.remove({ _id });
    return removedComment;
  }
}

export { commentService };
