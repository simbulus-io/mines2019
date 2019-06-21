
import * as _         from 'lodash';
import { log , puts } from './logger';
import hash           from 'object-hash';

interface ServerCache {
  url: string,
}

export class BlobCache {

  private has_localstore = (window && window.localStorage) ? true : false;
  private readonly server:ServerCache | undefined;

  constructor(server?:ServerCache) {
    puts(`Initializing BlobCache has_localstore is ${this.has_localstore}`);
    if(server) this.server = server;
  }

  public async set(key:string | object, value:object) {
    const hash_key = _.isString(key)  ? key as string : hash(key)
    try {
      if(this.has_localstore) {
        // insert LocalStorage
        window.localStorage.setItem(hash_key, JSON.stringify(value));
      }
    } catch(e) {
      log.error(`Unexpected Error attempting local cache ${e}`);
    }
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
      }
    } catch(e) {
      log.error(`Unexpected Error attempting server cache ${e}`);
    }
  }

  public async get(key:string | object) {
    const hash_key = _.isString(key)  ? key as string : hash(key);
    try {
      if(this.has_localstore) {
        // insert LocalStorage
        const blob = window.localStorage.getItem(hash_key);
        if(blob) return JSON.parse(blob);
      }
    } catch(e) {
      log.error(`Unexpected Error attempting local cache ${e}`);
    }
    try {
      if(this.server) {
        let url = new URL(this.server.url);
        let params = new URLSearchParams(url.search);
        params.append('key', hash_key);
        puts(url.href);
        const res = await fetch(url.href)
        return await res.json();
      }
    } catch(e) {
      log.error(`Unexpected Error attempting server cache ${e}`);
    }
    return null;
  }

}