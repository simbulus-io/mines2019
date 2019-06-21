
import { log , puts } from '@/logger';

interface ServerCache {
  set: URL,
  get: URL
}

export class BlobCache {

  private has_localstore = window && window.localStorage;
  private readonly server:ServerCache

  constructor(server:ServerCache) {
    puts(`Initializing BlobCache has_localstore is ${this.has_localstore}`)
    this.server = server;
  }

  public async set(key:string, value:any) {

    if(this.has_localstore) {
      // insert LocalStorage
      this.has_localstore.setItem(key, value);
    }
    if(this.server) {
      let url = new URL(this.server.set.href);
      let params = new URLSearchParams(url.search);
      params.append('key', key);
      puts(url.href);
      // const res = await fetch(this.server.set.href, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json'},
      //   body: JSON.stringify(value);
      // })
    }

  }

  public async get(key:string) {

  }

}