import PouchDB from 'pouchdb';

export class DataProvider {

  db: any;
  remote: string = 'http://127.0.0.1:5984/couchblog';

  constructor() {
    this.db = new PouchDB('couchblog');

    const options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);
  }

}
