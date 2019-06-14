import * as logger                                from 'winston';
import * as mongodb                               from 'mongodb';
import { NextFunction, Request, Response, Router} from 'express';
import { RoutesBase }                             from './routes_base';
import { request } from 'https';
import bodyParser from 'body-parser';
import { LoggerHelper } from '../helpers/logger_helper';
import { MongoHelper } from '../helpers/mongo_helper';

export class FeedbackRoutes extends RoutesBase {

  constructor(router: Router) {
    super();

    ////////////////////// get all sticky notes, DESIGNED FOR TEACHERS TO SEE NOTES POSTED
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

    ////////////////////// get all annotations
    router.get(`${RoutesBase.API_BASE_URL}/annotations`, async (req, res) => {

      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('feedback').collection('annotations').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.json({status: true, message: docs});
      } catch (e) {
        logger.error('ERROR: cannot view annotations', e);
      }


    });
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////// get all assignments
    router.get(`${RoutesBase.API_BASE_URL}/assignments`, async (req, res) => {

      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('feedback').collection('assignments').find().toArray();
        //logger.info('Getting name collection...')
        //logger.info(JSON.stringify(docs, null, 2));
        res.setHeader('Content-Type', 'application/json');
        res.json({status: true, message: docs});
      } catch (e) {
        logger.error('ERROR: cannot view assignments', e);
      }


    });
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////// get all students
    router.get(`${RoutesBase.API_BASE_URL}/students`, async (req, res) => {

      try {
        const mongo = req.app.get('mongo');
        // using await
        const docs = await mongo.db('feedback').collection('students').find().toArray();
        //logger.info('Getting name collection...')
        //logger.info(JSON.stringify(docs, null, 2));
        res.setHeader('Content-Type', 'application/json');
        res.json({status: true, message: docs});
      } catch (e) {
        logger.error('ERROR: cannot view assignments', e);
      }


    });
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////// create or update a drawing
    router.post(`${RoutesBase.API_BASE_URL}/annotate`, async (req, res) => {

      try {
        // using await
        router.use(bodyParser.json()); // parsing JSON files
        const new_annotation = {
          // idx: req.body.idx,
          content: req.body.content,
          // type: req.body.type,
          timestamp: req.body.timestamp,
          content_idx: req.body.content_idx,
        };
        const mongo = req.app.get('mongo');
        const rval = await mongo.db('feedback').collection('annotations')
          .updateOne({ content_idx: new_annotation.content_idx}, { $set: new_annotation }, { upsert: true } );
        // status true if success
        if (rval.modifiedCount === 1) {
          res.send({status: true});
        } else {
          logger.error(`Unexpected Result: from mongo updateOne in edit_snote ${rval}`);
          // TODO: fix error happening here?
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }

    });
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////// create a sticky note
    router.post(`${RoutesBase.API_BASE_URL}/create_snote`, async (req, res) => {

      try {
        // using await
        router.use(bodyParser.json()); // added by me for parsing JSON files
        var new_note = {
          // TODO: decide abotu idx, timestamp, and deleted to come from app OR api side (currently is app bc of object)
          idx: req.body.idx, // Guid.raw()
          author: req.body.author,
          content: req.body.content,
          type: req.body.type,
          timestamp: req.body.timestamp,//Date.now(),
          x: req.body.x,
          y: req.body.y,
          deleted: req.body.deleted, //false,
          content_idx: req.body.content_idx,
        };
        const mongo = req.app.get('mongo');
        await mongo.db('feedback').collection('snotes').save(new_note, (err: Error, result: any) => {
          if(err) {
            console.log(err.message);
            logger.error(err.message);
          }
          res.send('note added successfully');
        });
      } catch (e) {
        logger.error('ERROR: note not added', e.message);
      }

    });
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////// 'delete' an existing sticky note
    router.get(`${RoutesBase.API_BASE_URL}/delete_snote`, async (req, res) => {
      try {
        // using await
        router.use( bodyParser.urlencoded( {extended: false} ) );
        //router.use( bodyParser.json() );
        const mongo = req.app.get('mongo');
        // SK - cleaned up a bit here -you are either using await with try/catch or
        // promises with resolve reject handlers (e.g. then((success)={..}, (error)=>{...}) )
        const rval = await mongo.db('feedback').collection('snotes')
          .updateOne({ idx: req.query.idx}, { $set: { deleted: true } });
        // status true if success
        if(rval.modifiedCount === 1) {
          res.send({status: true});
        } else {
          logger.error(`Unexpected Result: from mongo updateOne ${rval}`);
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }
    });
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////// edit content of an existing sticky note
    router.get(`${RoutesBase.API_BASE_URL}/edit_snote`, async (req, res) => {

      try {
        router.use( bodyParser.urlencoded( {extended: false} ) );
        const mongo = req.app.get('mongo');
        const rval = await mongo.db('feedback').collection('snotes')
          .updateOne({ idx: req.query.idx}, { $set: { content: req.query.content, timestamp: req.query.timestamp } });
        // status true if success
        if (rval.modifiedCount === 1) {
          res.send({status: true});
        } else {
          logger.error(`Unexpected Result: from mongo updateOne in edit_snote ${rval}`);
          // TODO: fix error happening here?
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }

    });
    ////////////////////////////////////////////////////////////////////////////

    ////////////////////// edit location of an existing sticky note
    router.get(`${RoutesBase.API_BASE_URL}/move_snote`, async (req, res) => {
      try {
        router.use( bodyParser.urlencoded( {extended: false} ) );
        const mongo = req.app.get('mongo');
        const rval = await mongo.db('feedback').collection('snotes')
          .updateOne({ idx: req.query.idx}, { $set: { x: req.query.x, y: req.query.y } });
        // status true if success
        logger.info('New x: '+req.query.x+' New y: '+req.query.y+'for '+req.query.idx);
        if(rval.modifiedCount === 1) {
          res.send({status: true});
        } else { // TODO: is the error coming from here actually an error? 
          logger.error(new Error(`Unexpected Result in move_snote: from mongo updateOne ${rval}`));
          res.send({status: false});
        }
      } catch (e) {
        res.send({status: false});
        logger.error(`Unexpected Exception: ${e}`);
      }
    });
    ////////////////////////////////////////////////////////////////////////////

    }
}
