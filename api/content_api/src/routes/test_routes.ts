import * as logger                                from 'winston';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';

export class TestRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    router.get(`${RoutesBase.API_BASE_URL}/hello`, (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      res.json({status: true, message: 'Welcome Field Session 2019 - This message is from the content_api'});
    });

    router.get(`${RoutesBase.API_BASE_URL}/test/logger`, (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      const level: string = req.query.level ? req.query.level : 'warn';
      const msg: string = req.query.msg ? req.query.msg : 'Hello World';
      const message = `Logger Test LEVEL: ${level} ${msg}`;
      logger.log(level, message);
      res.json({level: level, message: message});
    });

    router.get(`${RoutesBase.API_BASE_URL}/test/mongo`, async (req: Request,
                                                               res: Response,
                                                               next: NextFunction) => {
      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('internal_tools').collection('inventory').find().toArray();
        logger.info(JSON.stringify(docs, null, 2));
        res.json({status: true, message: 'Mongo Test Okay'});
      } catch (e) {
        logger.error('Error in test/mongo', e);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/contents`, async (req: Request,
      res: Response,
      next: NextFunction) => {
      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('internal_tools').collection('test_collection').find().toArray();
        //logger.info(JSON.stringify(docs, null, 2));
        res.json({
          status: true,
          docs: docs,
        });
      } catch (e) {
        logger.error('Error in test/mongo', e);
      }
    });

    //TEST ROUTE TO PULL DATA ARRAY FROM THE DB
    router.get(`${RoutesBase.API_BASE_URL}/test_route`, async (req: Request,
      res: Response,
      next: NextFunction) => {
      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('internal_tools').collection('test_collection_2').find().toArray();
        logger.info(JSON.stringify(docs, null, 2));
        res.json({
          status: true,
          docs: docs,
        });
      } catch (e) {
        logger.error('Error in test/mongo', e);
      }
    });

    ///////serve files in the 'content_api/dist/routes/public' directory when requested by name//////
    router.get(`${RoutesBase.API_BASE_URL}/static/:static_file`, async (req: Request,
      res: Response,
      next: NextFunction) => {
      try {
        res.sendFile('/public/' + req.params.static_file, { root: __dirname });
      } catch (e) {
        logger.error('Error serving image', e);
      }
    });

  }

}
