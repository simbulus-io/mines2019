import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';
import { request } from 'https';
import bodyParser from "body-parser";
import { LoggerHelper } from '../helpers/logger_helper';
import { MongoHelper } from '../helpers/mongo_helper';

export class FeedbackRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    // ADD NOTE, FOR TEACHERS TO USE TO COMMENT ON THE STUDENTS' WORK
    router.post(`${RoutesBase.API_BASE_URL}/add_note`, async (req: Request, res: Response, next: NextFunction) => {

      try {
        // using await
        router.use(bodyParser.json()); // added by me for parsing JSON files
        var name = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          comment: req.body.comment,
          timestamp: req.body.timestamp,
        };
        const mongo = req.app.get('mongo');
        await mongo.db('feedback').collection('notes').save(name, (err: Error, result: any) => {
          if(err) {
            console.log(err);
          }
          res.send('note added successfully');
        });
      } catch (e) {
        logger.error('ERROR: note not added', e);
      }
      
    });

    ////////////////////// VIEW_NOTES, DESIGNED FOR TEACHERS TO SEE NOTES POSTED
    router.get(`${RoutesBase.API_BASE_URL}/view_notes`, async (req, res) => {

      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('feedback').collection('notes').find().toArray();
        //logger.info('Getting name collection...')
        //logger.info(JSON.stringify(docs, null, 2));
        res.setHeader('Content-Type', 'application/json');
        res.json({status: true, message: docs});
      } catch (e) {
        logger.error('ERROR: cannot view notes', e);
      }

      
    });
    ////////////////////////////////////////////////////////////////////////////
    // end routes added by me

    }   
}
