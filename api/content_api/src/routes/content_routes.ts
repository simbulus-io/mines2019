import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';
import { file } from '@babel/types';

const fsm = require('fs-minipass');
const rp = require('fs.realpath');


export class ContentRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    ///////Get the file from the app and perpetuate in mongo//////
    router.post(`${RoutesBase.API_BASE_URL}/db_file_upload`, async (req, res) => {

      try {
        logger.info('heres the db body: ' + req.body);
        //console.log(req.body);
        const mongo = req.app.get('mongo');
        const collection = mongo.db('content').collection('file_uploads');
        const promises: Array<Promise<any>> = [];
        const data = {file: req.body};
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
        const writeStream = new fsm.WriteStream('./public');
        writeStream.write('some file header or whatever\n');
        readStream.pipe(writeStream);
        return;
      } catch (e) {
        logger.error('Unexpected Exception TestWrite', e);
      }
    });

  }

}
