import { CommentModel } from '../schemas/comment';

class Comment {
  static async findByPostId({ postId }) {

    const commentList = await CommentModel.find({ postId });
    return commentList;
  }

  static async findByDataId({ _id }) {

    const comment = await CommentModel.findById({ _id });
    return comment;
  }
  
  static async add({ comment }) {

    const newComment = await CommentModel.create(comment);
    return newComment;
  }

  static async edit({ comment }) {

    const { _id, content, name } = comment;
    const editComment = await CommentModel.findOneAndUpdate(
      { _id },          // 댓글 번호
      { content },      // 댓글 내용
      { new: true }
    );
    return editComment;
  }

  static async remove({ _id }) {

    const removeComment = await CommentModel.findOneAndDelete({ _id });
    return removeComment;
  }
}

export { Comment };
