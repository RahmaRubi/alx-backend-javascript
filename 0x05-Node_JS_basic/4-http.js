const http = require('http');

// Create an HTTP server
const app = http.createServer((req, res) => {
  // Set the content type to plain text
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send the response
  res.end('Hello Holberton School!\n');
});

// Make the app listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the app variable
module.exports = app;
