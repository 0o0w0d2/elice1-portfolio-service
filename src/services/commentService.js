import { Comment } from '../db';


class commentService {
  // postId를 통해 댓글 목록들을 불러옴
  static async getComment({ postId }) {
    const commentList = await Comment.findByUserId({ postId });
    return commentList;
  }

  static async addComment({ comment }) {
    const newComment = await Comment.add({ comment });
    return newComment;
  }

  static async editComment({ userId, comment }) {
    const { _id } = comment;


    const editedComment = await Comment.edit({ comment });
    return editedComment;
  }

  static async removeComment({ _id, userId }) {


    const removedComment = await Comment.remove({ _id });
    return removedComment;
  }
}

export { commentService };
