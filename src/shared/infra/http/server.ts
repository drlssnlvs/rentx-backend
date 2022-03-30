import "./env";
import "reflect-metadata";

import { Application } from "express";
import signale from "signale";
import App from "./app";

new App()
  .setup()
  .then((app: Application) => {
    const PORT = process.env.PORT || 3333;

    app.listen(PORT, () => signale.star(`app on port ${PORT}`));
  })
  .catch((err: Error) =>
    signale.warn(`error to start app ${JSON.stringify(err)}`)
  );
