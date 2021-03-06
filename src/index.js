const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// para produção
// app.use(cors({
//     origin: 'http://url do front'
// }));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen( process.env.PORT || 3333, () => {
  console.log('Server run...')
});