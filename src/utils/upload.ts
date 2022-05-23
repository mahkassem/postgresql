import { Request } from "express"
import { UploadedFile } from "express-fileupload";
import config from "../config";

export const uploadAvatarAsync = async (req: Request): Promise<string | undefined> => {
    try {
        const { avatarFile } = req.files as unknown as { avatarFile: UploadedFile };
        if (avatarFile) {
            const timestamp = Date.now();
            const uploadPath = `${config.app.storage_url}/avatars/${timestamp}-${avatarFile.name}`;
            avatarFile.mv(uploadPath, () => {
                console.log('File uploaded');
            })
            return `avatars/${timestamp}-${avatarFile.name}`;
        }
        return undefined;
    } catch (error) {
        throw error;
    }
}