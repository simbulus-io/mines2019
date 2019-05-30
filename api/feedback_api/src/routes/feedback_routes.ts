import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';
import { request } from 'https';
import bodyParser from "body-parser";
import { LoggerHelper } from '../helpers/logger_helper';
import { MongoHelper } from '../helpers/mongo_helper';
import {Guid} from 'guid-typescript'

export class FeedbackRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    ////////////////////// view sticky notes, DESIGNED FOR TEACHERS TO SEE NOTES POSTED
    router.get(`${RoutesBase.API_BASE_URL}/snotes`, async (req, res) => {

      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('feedback').collection('snotes').find().toArray();
        //logger.info('Getting name collection...')
        //logger.info(JSON.stringify(docs, null, 2));
        res.setHeader('Content-Type', 'application/json');
        res.json({status: true, message: docs});
      } catch (e) {
        logger.error('ERROR: cannot view snotes', e);
      }

      
    });
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////// create a sticky note
    router.post(`${RoutesBase.API_BASE_URL}/create_snote`, async (req, res) => {

      try {
        // using await
        router.use(bodyParser.json()); // added by me for parsing JSON files
        var new_note = {
          idx: Guid.raw(),
          author: req.body.author,
          content: req.body.content,
          type: req.body.type,
          timestamp: Date.now(),
          x: req.body.x,
          y: req.body.y,
        };
        const mongo = req.app.get('mongo');
        await mongo.db('feedback').collection('snotes').save(new_note, (err: Error, result: any) => {
          if(err) {
            console.log(err);
          }
          res.send('note added successfully');
        });
      } catch (e) {
        logger.error('ERROR: note not added', e);
      }
      
    });
    ////////////////////////////////////////////////////////////////////////////

    }   
}
