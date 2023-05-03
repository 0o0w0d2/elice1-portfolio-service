import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { imageService } from '../services/imageService';
import asyncHandler from '../utils/asyncHandler';
import { validateValue } from '../utils/validate';
import multer from 'multer';

const imageRouter = Router();

const storage = multer.memoryStorage()
const upload = multer({storage:storage});


imageRouter.get(
    '/image/:userId',
    asyncHandler(async (req, res, next) => {
        const { userId } = req.params;
        const { dataId } = req.body;

        validateValue({userId, dataId});

        const image = await imageService.getImage({ userId, dataId })
        if (image.errorMessage) {
          throw new Error(image.errorMessage);
        }
        res.status(200).send(image);
    })
);

imageRouter.post(
    '/image',
    login_required,
    upload.single('image'),
    asyncHandler(async (req, res, next) => {
        const userId = req.currentUserId;
        const { dataId } = req.body;
        const { buffer, mimetype } = req.file;
        const imageInfo = {
            userId,
            dataId,
            image: {
                data: buffer,
                contentType: mimetype,
            },
        };

        validateValue(imageInfo);

        const addedImage = await imageService.addImage({imageInfo});
        res.status(201).send(addedImage);
    })
);

imageRouter.put(
    '/image/:dataId',
    login_required,
    asyncHandler(async (req, res, next) => {
        const userId = req.currentUserId;
        const { dataId } = req.params;
        const { buffer, mimetype } = req.file;
        const imageInfo = {
            userId,
            dataId,
            image: {
                data: buffer,
                contentType: mimetype,
            },
        };

        validateValue(imageInfo);

        const changedImage = await imageService.changeImage({imageInfo});
        if (changedImage.errorMessage) {
          throw new Error(changedImage.errorMessage);
        }
        res.status(200).send(changedImage);
        
    })
)

imageRouter.delete(
    '/image/:dataId',
    login_required,
    asyncHandler(async (req, res, next) => {
        const userId = req.currentUserId;
        const { dataId } = req.params;

        const removedImage = await imageService.removeImage({userId, dataId});
        if (removedImage.errorMessage) {
          throw new Error(removedImage.errorMessage);
        }
        res.status(200).send(removedImage);
    })
)

export { imageRouter };
