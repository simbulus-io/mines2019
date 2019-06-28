
import * as _         from 'lodash';
import { log , puts } from './logger';
import hash           from 'object-hash';
import qs             from 'query-string';
import { faThList } from '@fortawesome/free-solid-svg-icons';

interface ServerCache {
  url: string,
}

export class BlobCache {

  private readonly server:ServerCache | undefined;
  private no_cache: boolean = false;

  constructor(server?:ServerCache) {
    if(server) this.server = server;
    const { no_cache } = qs.parse(location.search);
    this.no_cache = no_cache ? true : false;
    log.info(`blob_cache -- no_cache is ${this.no_cache}`);
  }

  public async set(key:string | object, value:object) {
    if(this.no_cache) return null;
    log.info('blob_cache -- set');
    const hash_key = _.isString(key)  ? key as string : hash(key)
    const value_json = JSON.stringify(value);
    try {
      if(this.server) {
        let url = new URL(this.server.url);
        let params = new URLSearchParams(url.search);
        params.append('key', hash_key);
        url.search = params.toString();
        puts(url.href);
        const res = await fetch(url.href,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(value),
          }
        );
        log.info(`blob_cache -- set - ${hash_key} to ${value_json} in mongo`);
      }
    } catch(e) {
      log.error(`blob_cache -- set - Unexpected Error attempting server cache ${e}`);
    }
  }

  public async get(key:string | object) {
    if(this.no_cache) return null;
    log.info('blob_cache -- get');
    const hash_key = _.isString(key)  ? key as string : hash(key);
    let blob = null;

    try {
      if(this.server) {
        log.info('blob_cache -- get - attempting to fetch blob from mongo');
        let url = new URL(this.server.url);
        let params = new URLSearchParams(url.search);
        params.append('key', hash_key);
        url.search = params.toString();
        log.info(`blob_cache -- get - fetching URL ${url.href}`);
        const res = await fetch(url.href)
        if(res.ok) {
          blob = await res.json();
          if(blob) {
            log.info('blob_cache -- get - cache hit');
            log.info(key, blob);
          } else {
            log.info('blob_cache -- get - cache miss');
            log.info(key, blob);
          }
        } else {
          log.error(`blob_cache -- get - bad status ${res.statusText}`);
        }
      }
    } catch(e) {
      log.error(`blob_cache -- get - Unexpected Error ${e}`);
    }
    return blob;
  }

}