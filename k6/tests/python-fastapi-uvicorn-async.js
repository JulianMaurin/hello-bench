import http from 'k6/http';
import { check, sleep } from 'k6';
import { options as sharedOptions } from './lib/options.js';

export const options = sharedOptions;


export default function () {
  const res = http.get('http://python-fastapi-uvicorn:8000/hello-world-async', {
    tags: { language: 'python', framework: 'fastapi', async: true, response: 'pydantic', server: 'uvicorn'},
  });

  check(res, {
    [`status 200`]: (r) => r.status === 200,
  });

  sleep(1); // simulate user think-time
}
