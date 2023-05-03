import { Schema, model } from "mongoose";

//https://www.youtube.com/watch?v=KRVh0d9ECoI

const ImageSchema = new Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        dataId:{    
            //어떤 곳에서 사용되는지.
            //프로필사진이라면 dataId==='profile'을 사용하고
            //다른 곳에선 그 카드의 id 사용.
            type:String,
            required:true,
        },
        image: {
            data: Buffer,
            contentType: String,
        },
    },
    {
        timestamps: true,
    }
);

const ImageModel = model('Image', ImageSchema);

export { ImageModel };