import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';

export class TestRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    router.get(`${RoutesBase.API_BASE_URL}/hello`, (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      res.json({status: true, message: 'Welcome Field Session 2019 - This message is from the feedback_api'});
    });

    router.get(`${RoutesBase.API_BASE_URL}/test/logger`, (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      const level: string = req.query.level ? req.query.level : 'warn';
      const msg: string = req.query.msg ? req.query.msg : 'Hello World';
      const message = `Logger Test LEVEL: ${level} ${msg}`;
      logger.log(level, message);
      res.json({level: level, message: message});
    });

    // using async and fat arrow
    router.get(`${RoutesBase.API_BASE_URL}/test/mongo`, async (req: Request,
                                                               res: Response,
                                                               next: NextFunction) => {
      const mongo = req.app.get('mongodb');
      // using await
      const docs = await mongo.collection('lti_tokens').find().toArray();
      logger.info(JSON.stringify(docs, null, 2));
      res.json({status: true, message: 'Mongo Test Okay'});
    });
  }

}
