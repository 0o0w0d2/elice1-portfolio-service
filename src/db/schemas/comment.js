import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
    {
        userId: {        // 댓글을 작성하고 있는 사용자의 name 값
            type: String,
            required: true,
        },
        name: {           
            type: String,
            required: true,
        },
        content: {  
            type: String,
            required: true,
        },
        postId: {       // 댓글을 작성하는 !페이지의 userId 값!
            type: String,
            required: true,
        }
    },
    {
    timestamps: true,
    }
);

const CommentModel = model('Comment', CommentSchema);

export { CommentModel };

