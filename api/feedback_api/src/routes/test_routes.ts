import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';
import { request } from 'https';
import bodyParser from "body-parser";
import { LoggerHelper } from '../helpers/logger_helper';
import { MongoHelper } from '../helpers/mongo_helper';

export class TestRoutes extends RoutesBase {

  constructor(router: Router) {
    super();
    // HW - make me a post worthy of MORDOR

    // define the endpoint here here (express/node POST)
    // the use one of the below to talk to it
    // wget, curl or postman or web form connected to typescript... to actually post data

    router.get(`${RoutesBase.API_BASE_URL}/hello`, (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      res.json({status: true, message: 'Welcome Field Session 2019 - This is a route'});
    });

    // routes added by me

    router.get(`${RoutesBase.API_BASE_URL}/al`, (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      //let myMessage = req.body;
      let myMessage = 'pls work';
      res.json({status: true, message: myMessage});
    });

    router.post(`${RoutesBase.API_BASE_URL}/post_test`, (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      let myMessage = req.body;
      //myMessage = myMessage + " added on the thing";
      //let myMessage = 'pls work';
      res.json({status: true, message: myMessage});
    });

    router.get(`${RoutesBase.API_BASE_URL}/post_test`, (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      let myMessage = "This is the get display";
      //myMessage = myMessage + " added on the thing";
      //let myMessage = 'pls work';
      res.json({status: true, message: myMessage});
    });

    // router.post(`${RoutesBase.API_BASE_URL}/add_name`, async (req: Request, res: Response, next: NextFunction) => {
    //   const mongo = req.app.get('mongodb');
    //   router.use(bodyParser.json()); // added by me for parsing JSON files
    //   var name = {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name
    //   };
    //   await mongo.collection("name").save(name, (err: Error, result: any) => {
    //     if(err) {
    //       console.log(err);
    //     }

    //     res.send('name added successfully');
    //   });
    // });

    // router.get('/add_name', async (req, res) => {
    //   const mongo = req.app.get('mongodb');
    //   await mongo.collection('name').find().toArray( (err: Error, results: any) => {
    //     //res.send(results)
    //     res.json({status: true, message: results});
    //   });
    // });

    // end routes added by me

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
      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('feedback').collection('inventory').find().toArray();
        logger.info(JSON.stringify(docs, null, 2));
        res.json({status: true, message: 'Mongo Test Okay'});
      } catch (e) {
        logger.error('Error in test/mongo', e);
      }
    });
  }

}
