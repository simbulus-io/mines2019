import { NextFunction, Request, Response, Router } from "express";
import {RoutesBase} from "./routes_base";

export class IndexRoutes extends RoutesBase {

  constructor(router:Router) {
    super();

    router.get(`${RoutesBase.API_BASE_URL}`, (req: Request, res: Response, next: NextFunction) => {
      let logger = req.app.get('logger');
      let msg = 'Hello from Typescript';
      res.send(`<h3>${msg}</h3>`);
      logger.info(msg);
    });

    router.get(`${RoutesBase.API_BASE_URL}/alive`, (req: any, res: Response, next: NextFunction) => {
      let rval = {
        "status": "alive",
        "version" : "Hi"
      }
      res.json(rval);
    });

  }
}
