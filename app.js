const server = require('./server');

const PORT = 6080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});