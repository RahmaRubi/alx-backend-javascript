const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to count and display students
const countStudents = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== ''); // Remove empty lines
    const students = {};
    let totalStudents = 0;

    // Iterate through each line (student)
    lines.forEach((line, index) => {
      const [firstName, field] = line.split(',');
      if (index !== 0 && firstName && field) { // Skip header and empty lines
        totalStudents++;
        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstName);
      }
    });

    // Build the result string
    let result = `Number of students: ${totalStudents}\n`;
    for (const field in students) {
      result += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
    }

    return result;
  } catch (error) {
    return 'Cannot load the database';
  }
};

// Create the HTTP server
const app = http.createServer((req, res) => {
  const { url, method } = req;

  // Set response header for plain text
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (url === '/') {
    res.end('Hello Holberton School!\n');
  } else if (url === '/students') {
    const filePath = process.argv[2]; // Get the database file from command line argument
    const studentsData = countStudents(filePath);
    res.end(`This is the list of our students\n${studentsData}`);
  } else {
    res.writeHead(404);
    res.end('Not Found\n');
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the app for testing purposes
module.exports = app;
