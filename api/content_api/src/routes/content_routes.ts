import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';
import { file }                                   from '@babel/types';
import bodyParser                                 from 'body-parser';


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
        logger.error('Unexpected Exception in db_file_upload', e);
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
        logger.error('Unexpected Exception in static_file_upload', e);
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
        const rval =  JSON.parse( await mongo.db('content').collection('content_lessons')
          .updateOne({ idx: req.query.idx}, { $set: { keywords: (req.query.keywords ? req.query.keywords : []) } }) );
        if (rval.n === 1) {
          res.send({status: true});
        } else { // TODO: fix updateOne error
          logger.error(new Error(`Unexpected Result in updating lesson keywords: from mongo updateOne ${rval}`));
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/update_lesson/status`, async (req, res) => {
      try {
        router.use( bodyParser.urlencoded( {extended: false} ) );
        const mongo = req.app.get('mongo');
        const rval =  JSON.parse( await mongo.db('content').collection('content_lessons')
          .updateOne({ idx: req.query.idx}, { $set: { status: req.query.status } }) );
        // status true if success
        if (rval.n === 1) {
          res.send({status: true});
        } else { // TODO: fix updateOne error
          logger.error(new Error(`Unexpected Result in updating lesson status: from mongo updateOne ${rval}`));
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/update_lesson/update_note`, async (req, res) => {
      try {
        router.use( bodyParser.urlencoded( {extended: false} ) );
        const mongo = req.app.get('mongo');
        const docs: any[] = await mongo.db('content')
          .collection('content_lessons').find( {idx: req.query.idx} ).toArray();
        if (docs) {
          const lesson_notes = docs[0].notes;
          const note_index = lesson_notes.findIndex((note: any) => note.idx === req.query.note_idx );
          lesson_notes[note_index] = {
            idx: req.query.note_idx,
            text: req.query.text,
          };
          const rval =  JSON.parse( await mongo.db('content').collection('content_lessons')
            .updateOne({ idx: req.query.idx}, { $set: { notes: lesson_notes } }) );
          // status true if success
          if (rval.n === 1) {
            res.send({status: true});
          } else { // TODO: fix updateOne error
            logger.error(new Error(`Unexpected Result in updating lesson notes: from mongo updateOne ${rval}`));
            res.send({status: false});
          }
        } else {
          logger.error(new Error(`Unexpected Result in updating lesson notes: null find on lesson_idx`));
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/update_lesson/delete_note`, async (req, res) => {
      try {
        router.use( bodyParser.urlencoded( {extended: false} ) );
        const mongo = req.app.get('mongo');
        const docs: any[] = await mongo.db('content')
          .collection('content_lessons').find( {idx: req.query.idx} ).toArray();
        if (docs) {
          const lesson_notes = docs[0].notes;
          const note_index = lesson_notes.findIndex((note: any) => note.idx === req.query.note_idx );
          lesson_notes.splice(note_index, 1);
          const rval =  JSON.parse( await mongo.db('content').collection('content_lessons')
            .updateOne({ idx: req.query.idx}, { $set: { notes: lesson_notes } }) );
          // status true if success
          if (rval.n === 1) {
            res.send({status: true});
          } else { // TODO: fix updateOne error
            logger.error(new Error(`Unexpected Result in deleting a lesson note: from mongo updateOne ${rval}`));
            res.send({status: false});
          }
        } else {
          logger.error(new Error(`Unexpected Result in deleting a lesson note: null find on lesson_idx`));
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }
    });

    router.get(`${RoutesBase.API_BASE_URL}/update_lesson/add_note`, async (req, res) => {
      try {
        router.use( bodyParser.urlencoded( {extended: false} ) );
        const mongo = req.app.get('mongo');
        const docs: any[] = await mongo.db('content')
          .collection('content_lessons').find( {idx: req.query.idx} ).toArray();
        if (docs) {
          const lesson_notes = docs[0].notes;
          const new_note = {
            idx: req.query.note_idx,
            text: req.query.text,
          };
          lesson_notes.push(new_note);
          const rval = JSON.parse( await mongo.db('content').collection('content_lessons')
            .updateOne({ idx: req.query.idx}, { $set: { notes: lesson_notes } }) );
          // status true if success
          if (rval.n === 1) {
            res.send({status: true});
          } else { // TODO: fix updateOne error
            logger.error(new Error(`Unexpected Result in adding a lesson note: from mongo updateOne ${rval}`));
            res.send({status: false});
          }
        } else {
          logger.error(new Error(`Unexpected Result in adding a lesson note: null find on lesson_idx`));
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }
    });

  }
}
