import path from 'path'
import express from 'express'
import cors from 'cors'
import api from './api/index'
import staticAssets from './static-assets'

const app = express();
app.use(cors());
app.use('/api', api);
app.use(staticAssets);
app.get('*', serveApp);

app.listen(process.env.PORT, () =>
  console.log('Listening on ' + process.env.PORT)
);

function serveApp (request, response) {
  const file = path.join(path.join(__dirname, '../client/build/index.html'));
  response.status(200).sendFile(file)
}
