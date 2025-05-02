import http from 'k6/http';
import { check, sleep } from 'k6';
import { options as sharedOptions } from './lib/options.js';

export const options = sharedOptions;


export default function () {
  const res = http.get('http://python-fastapi-gunicorn:8000/hello-world-async-orjson', {
    tags: { language: 'python', framework: 'fastapi', async: true, response: 'orjson', server: 'gunicorn'},
  });

  check(res, {
    [`status 200`]: (r) => r.status === 200,
  });

  sleep(1); // simulate user think-time
}
