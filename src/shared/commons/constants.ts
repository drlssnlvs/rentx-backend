import fs from "fs";

export const errors = {
  UNAUTHORIZED: {
    code: 401,
    msg: {
      r: false,
      msg: ["UNAUTHORIZED"],
    },
  },

  FORBIDDEN: {
    code: 403,
    msg: {
      r: false,
      msg: ["FORBIDDEN"],
    },
  },
};

export const files = {
  delete: async (path: string) => {
    try {
      await fs.promises.stat(path);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(path);
  },
};

export const strings = {
  removeSpecialsCaracteres: (str: string) => {
    return str.replace(/[^\w\s]/gi, "");
  },

  removeSpaces: (str: string) => str.replace(" ", ""),
};
