import http from 'k6/http';
import { check, sleep } from 'k6';
import { options as sharedOptions } from './lib/options.js';

export const options = sharedOptions;


export default function () {
  const res = http.get('http://rust-actix-web:8000/hello-world', {
    tags: { language: 'rust', framework: 'actix-web', async: true, response: 'serde', server: 'actix-web'},
  });

  check(res, {
    [`status 200`]: (r) => r.status === 200,
  });

  sleep(1); // simulate user think-time
}
