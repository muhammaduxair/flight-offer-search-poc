/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import router from './router';

const app = express();
const PORT = 1338;

app.use(
  cors({
    origin: '*',
  })
);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/api`);
});
server.on('error', console.error);
