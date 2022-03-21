import multer from "multer";
import { resolve } from "path";

import { v4 as uuid } from "uuid";

export const directory = resolve(__dirname, "..", "..", "tmp");

export default {
  directory,

  storage: multer.diskStorage({
    destination: directory,
    filename(req: any, file: any, cb: any) {
      const [, ext] = file.mimetype.split("/");

      const uniqueFilename = `${uuid()}.${ext}`;

      return cb(null, uniqueFilename);
    },
  }),
};
