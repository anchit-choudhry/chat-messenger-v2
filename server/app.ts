import express from 'express';
import nano from 'nano';

import config from './config.json';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connString = `http://${config.couchdb.username}:${config.couchdb.password}@${config.couchdb.server}:${config.couchdb.port}`;
const couchServer = nano(connString);
const couchDB = couchServer.db.use(`${config.couchdb.database}`);
couchDB.list().then((body) => {
    body.rows.forEach((doc) => {
      console.log(doc);
    });
  });

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

const port = config.express.port || 3000;
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`Server is listening on ${port}`);
});

export = couchDB;
