import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";

import { v4 as uuid } from "uuid";

export const directory = resolve(__dirname, "..", "..", "tmp");

export default {
  directory,

  storage: multer.diskStorage({
    destination: directory,
    filename(req: any, file: any, cb: any) {
      const [, ext] = file.mimetype.split("/");
      const fileHash = crypto.randomBytes(16).toString("hex");

      const uniqueFilename = `${uuid()}-${fileHash}.${ext}`;

      return cb(null, uniqueFilename);
    },
  }),
};
