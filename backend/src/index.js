import mongo from "./mongo.js";
import httpServer from "./server.js";

import "dotenv-defaults/config.js";

mongo.connect();
const port = process.env.PORT | 4000;

httpServer.on('request', (request, response) => {
  // If the request is for the root path '/', send the build file as the response
  if (request.url === '/') {
    const indexHtml = fs.readFileSync('./path/to/build/index.html', 'utf-8');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(indexHtml);
  }
});

httpServer.listen({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
