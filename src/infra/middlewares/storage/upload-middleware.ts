import multer from "multer"

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({ storage: storage });
