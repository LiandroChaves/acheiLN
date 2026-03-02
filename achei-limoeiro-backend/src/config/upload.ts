import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

const tmpFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: (request, file, callback) => {
            const { id } = request.params;
            const folder = path.resolve(tmpFolder, id as string);

            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }

            callback(null, folder);
        },
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};