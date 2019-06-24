import { logger }    from './logger_helper';
import randomname    from 'random-name';
import { BlobCache } from '../src/blob_cache';

// polyfill fetch for node env
import fetch         from 'isomorphic-fetch';
(global as any).fetch = fetch;

let blob_cache:BlobCache;

let stable_key = {
  a: 'hello',
  b: 'world',
}

let random_obj = {
  a: randomname(),
  b: randomname(),
  c: randomname(),
}

beforeAll(async () => {
  blob_cache = new BlobCache({url: 'http://localhost/content/v1.0/job/cache'});
});

afterAll(async () => {
});

describe('BlobCache smoke tests', () => {
  test('TestSetAndGet', async () => {
    //  key is object | string
    blob_cache.set(stable_key, random_obj)
    const cached_random_obj = await blob_cache.get(stable_key)
    expect(random_obj).toEqual(cached_random_obj);
  });
});
