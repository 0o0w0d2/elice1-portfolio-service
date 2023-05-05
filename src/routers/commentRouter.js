import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { commentService } from '../services/commentService';
import asyncHandler from '../utils/asyncHandler';
import { validateValue } from '../utils/validate';

const commentRouter = Router();

commentRouter.get(
  '/comment/:postId',
  login_required,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const commentList = await commentService.getComment({ postId });
    if (commentList.errorMessage) {
      throw new Error(commentList.errorMessage);
    }
    res.status(200).send(commentList);
  })
);

commentRouter.post(
  '/comment/:postId',
  login_required,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.currentUserId;
    const { content, name } = req.body;
    const comment = { postId, userId, content, name };

    validateValue(comment);

    const addNewComment = await commentService.addComment({ comment });
    res.status(201).send(addNewComment);
  })
);

commentRouter.put(
  '/comment/:postId/:_id',
  login_required,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const { postId } = req.params;
    const { _id } = req.params;
    const { content, name } = req.body;
    const comment = { _id, content, name };

    validateValue(comment);

    const editComment = await commentService.editComment({
      userId,
      postId,
      comment,
      name
    });
    if (editComment.errorMessage) {
      throw new Error(editComment.errorMessage);
    }
    res.status(200).send(editComment);
  })
);

commentRouter.delete(
  '/comment/:postId/:_id',
  login_required,
  asyncHandler(async (req, res, next) => {
    const userId = req.currentUserId;
    const { _id } = req.params;
    const deleteComment = await commentService.removeComment({
      userId,
      _id,
    });
    if (deleteComment.errorMessage) {
      throw new Error(deleteComment.errorMessage);
    }
    res.status(200).send(deleteComment);
  })
);

export { commentRouter };
