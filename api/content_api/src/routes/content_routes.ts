import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';
import { file }                                   from '@babel/types';
import bodyParser                                 from 'body-parser';
import {Guid} from 'guid-typescript';

const fsm = require('fs-minipass');
const rp = require('fs.realpath');


export class ContentRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    ///////Get the file from the app and perpetuate in mongo//////
    router.post(`${RoutesBase.API_BASE_URL}/db_file_upload`, async (req, res) => {

      try {
        const bdy = JSON.stringify(req.body.file);
        logger.info('heres the db body: ' + bdy);
        //console.log(req.body);
        const mongo = req.app.get('mongo');
        const collection = mongo.db('content').collection('file_uploads');
        const promises: Array<Promise<any>> = [];
        const data = {file: bdy};
        const promise = collection.insertOne(
            data,
        );
        promises.push(promise);
        const rval = await Promise.all(promises);
        logger.info('rval is: ' + rval);
        res.send('post succesful');
        return;
      } catch (e) {
        logger.error('Unexpected Exception TestWrite', e);
      }
    });

    router.post(`${RoutesBase.API_BASE_URL}/static_file_upload`, async (req, res) => {

      try {
        logger.info('heres the static body: ' + req.body);
        const readStream = req.body;
        const writeStream = new fsm.WriteStream('./public.txt');
        writeStream.write('some file header or whatever\n');
        //readStream.pipe(writeStream);
        return;
      } catch (e) {
        logger.error('Unexpected Exception TestWrite', e);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/providers`, async (req: Request,
      res: Response,
      next: NextFunction) => {
      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs: any[] = await mongo.db('content').collection('content_providers').find().toArray();
        res.json({
          status: true,
          message: docs,
        });
      } catch (e) {
        logger.error('Error in /content/providers', e);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/lessons`, async (req: Request,
      res: Response,
      next: NextFunction) => {
      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs: any[] = await mongo.db('content').collection('content_lessons').find().toArray();
        res.json({
          status: true,
          message: docs,
        });
      } catch (e) {
        logger.error('Error in /content/lessons', e);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/update_lesson/keywords`, async (req, res) => {
      try {
        router.use( bodyParser.urlencoded( {extended: false} ) );
        const mongo = req.app.get('mongo');
        const rval = await mongo.db('content').collection('content_lessons')
          .updateOne({ idx: req.query.idx}, { $set: { keywords: req.query.keywords } });
        // status true if success
        if (rval.modifiedCount === 1) {
          res.send({status: true});
        } else { // TODO: fix updateOne error
          logger.error(new Error(`Unexpected Result in move_snote: from mongo updateOne ${rval}`));
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }
    });

  }
}
