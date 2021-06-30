const app = require('./index.js');

const PORT = 80;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});