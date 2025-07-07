//This is a server entry point for an Express.js application forinitializes the server and starts listening on a specified port.
const app = require('./app');

const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME || 'localhost';

app.listen(port, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}`);
});
