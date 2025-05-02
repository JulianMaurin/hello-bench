import http from 'k6/http';
import { check, sleep } from 'k6';
import { options as sharedOptions } from './lib/options.js';

export const options = sharedOptions;


export default function () {
  const res = http.get('http://python-django:8000/hello-world', {
    tags: { language: 'python', framework: 'django', async: false, response: 'json', server: 'gunicorn'},
  });

  check(res, {
    [`status 200`]: (r) => r.status === 200,
  });

  sleep(1); // simulate user think-time
}
