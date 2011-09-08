# Logger

Takes urls on the command line and screen scrapes data from those webpages into a CouchDB instance

## How do I install this ish?

1. [Install node and npm](http://joyeur.com/2010/12/10/installing-node-and-npm/)
2. `git clone git://github.com/8bitDesigner/logger.git`
3. `npm install`
4. Edit config.js to point to your couchdb instance ([IrisCouch](http://www.iriscouch.com/) is a good (free) hosting company)

## How do I run this ish?

`node index "http://url/1" "http://url/2" "http://url/3"`
