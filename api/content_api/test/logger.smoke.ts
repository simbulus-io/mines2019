import * as _                       from 'lodash';
import * as fs        from 'fs';
import { LoggerHelper }             from '../src/helpers/logger_helper';


// If you would like to update the 'captured data' from the queries under test
// set this flag to true and run the test(s) - don't forget to turn it back off
// or your tests will pass by default.

describe('LoggerHelper smoke tests', () => {

  test('TestLoggerHelper', () => {
    const logfile = `${__dirname}/test.log`;
    // tslint:disable-next-line: no-unused-expression
    const logger = new LoggerHelper(logfile).logger;
    logger.info('LoggerHelper setup complete');
    logger.info('This is an info string');
    logger.error('This is an error string');
    // stack traces break this test (need a more sophisticated test for Error object)
    // logger.error(new Error('This is an Error object'));

    const execSync = require('child_process').execSync;
    // Required for making a request for wm_auth / wma cookie auth validation
    const expected = `${__dirname}/expected/test.log`;
    try {
      execSync(`diff -q ${logfile} ${expected}`);
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });

});
