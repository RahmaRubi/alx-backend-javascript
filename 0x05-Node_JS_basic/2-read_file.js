const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(path, 'utf-8');
    
    // Split the file into lines and filter out empty lines
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // If there are no lines, throw an error
    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    // Parse the CSV data
    const students = lines.slice(1); // Skip the header row
    const studentCount = students.length;
    
    // Create a mapping for fields and their students
    const fields = {};

    students.forEach(student => {
      const [firstName, field] = student.split(',');
      if (fields[field]) {
        fields[field].push(firstName);
      } else {
        fields[field] = [firstName];
      }
    });

    // Output total student count
    console.log(`Number of students: ${studentCount}`);

    // Output the number of students in each field and their names
    for (const field in fields) {
      console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
    }
  } catch (err) {
    // Handle file read errors
    console.error(err.message);
  }
}

module.exports = countStudents;
