// tslint:disable: no-unused-expression
import * as _                from 'lodash';
import * as path             from 'path';
import { ConfigHelper }      from './helpers/config_helper';
import { LoggerHelper }      from './helpers/logger_helper';
import { MongoHelper }       from './helpers/mongo_helper';
import { IndexRoutes }       from './routes/index_routes';
import { TestRoutes }        from './routes/test_routes';
import express               from 'express';
import { ContentRoutes } from './routes/content_routes';

const cookieParser = require('cookie-parser');
const cors         = require('cors');
const bodyParser   = require('body-parser');
const errorHandler = require('errorhandler');

export class Server {

  public static bootstrap(): Server {
    return new Server();
  }

  public app: express.Application = express();

  constructor() {
    const setup = async () => {
      await this.config();
      this.routes();
    };
    setup();
  }

  public async config() {

    // Logger setup
    const log = new LoggerHelper().logger;
    this.app.set('logger', log);
    log.info('Winston setup done');

    try {
      const config = new ConfigHelper().config;
      this.app.set('config', config);
      log.info('Config setup done', _.filter(config, (k) => k === 'to_full_url'));
      const mongo = await MongoHelper.connect();
      this.app.set('mongo', mongo);
      log.info('Mongo setup done');
      // Enable CORS if in development (suppress Cross Origin errors)
      const development = process.env.NODE_ENV !== 'production';
      if (development) {
        log.info('CORS middleware is enabled');
        this.app.use(cors());
      }
      this.app.use(cookieParser());
      //add static paths
      this.app.use(express.static(path.join(__dirname, 'public')));
      //this.app.use(express.static('public'));
      //mount json form parser
      this.app.use(bodyParser.json());
      //mount query string parser
      this.app.use(bodyParser.urlencoded({ extended: true }));
      // catch 404 and forward to error handler
      this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
          next(err);
      });
      //error handling
      this.app.use(errorHandler());
    } catch (e) {
      log.error(e);
    }

  }

  private routes() {
    let router: express.Router;
    router = express.Router();
    // This is where you plug in routes (REST endpoints)
    new IndexRoutes(router);
    new TestRoutes(router);
    new ContentRoutes(router);
    //use router middleware
    this.app.use(router);
  }

}
