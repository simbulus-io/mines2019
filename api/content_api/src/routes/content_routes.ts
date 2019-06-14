import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';
import { file } from '@babel/types';

export class ContentRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    router.post(`${RoutesBase.API_BASE_URL}/store_file_upload`, async (req, res) => {

      try {
        const file_to_store = req.body.FormData;
        console.log('req heard');
        console.log(file_to_store);
        const mongo = req.app.get('mongo');
        await mongo.db('content').collection('file_uploads').save(file_to_store, (err: Error, result: any) => {
          if(err) {
            console.log(err);
          }
          res.send('file perpetuated');
        });
      } catch (e) {
        logger.error('ERROR: not perpetuated', e);
      }
    });

  }

}
