

// This is for local development via npm run serve
//
// You need to dynamically import hxclasses_es6 and set util.WMGQL.URL for
// OWMSchema to work.  ts_node needs to be running locally on 5101
import { log }         from '@/logger';
import { load_app }    from './load_app';
import { hxClasses }   from './hxclasses_es6';

log.info('Starting wmadmin_dashboard -- serve.ts entrypoint');
log.info('Loading hxclasses_es6');
(window as any).$hxClasses = hxClasses;
(window as any).$hxClasses['util.WMGQL'].URL = 'http://localhost:5101/ts_node/v1.0/graphql';

load_app();



