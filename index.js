const http = require('http')
const https = require('https');
function handler(req,res){

    res.end('Hello World')

}

http.createServer(handler).listen(80)

const PROD = false;
const lex = require('greenlock-express').create({
  server: PROD ? 'https://acme-v01.api.letsencrypt.org/directory' : 'staging',
 
  approveDomains: (opts, certs, cb) => {
    if (certs) {
      // change domain list here
      opts.domains = ['rahulmr.win']
    } else { 
      // change default email to accept agreement
      opts.email = 'rahulmr@gmail.com'; 
      opts.agreeTos = true;
    }
    cb(null, { options: opts, certs: certs });
  }
});
const middlewareWrapper = lex.middleware;

https.createServer(
  lex.httpsOptions, 
  middlewareWrapper(handler)
).listen(433);