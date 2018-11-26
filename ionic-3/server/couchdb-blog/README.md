https://www.joshmorony.com/couchdb-pouchdb-and-ionic-2-starting-a-new-project/
https://www.joshmorony.com/couchdb-pouchdb-and-ionic-2-why-pouchdb/
https://www.joshmorony.com/couchdb-pouchdb-and-ionic-2-adding-posts-and-live-data-updates/
https://www.joshmorony.com/couchdb-pouchdb-and-ionic-2-adding-comments/



To enable CORS support, you need to set the enable_cors = true option in the [httpd] section of local.ini, and add a [cors] section containing a origins = * setting. Note that by default, no origins are accepted; you must either use a wildcard or whitelist.

[httpd]
enable_cors = true

[cors]
credentials = true
origins = http://localhost, https://localhost, http://localhost:8100
