const fs = require('fs').promises;

const countStudents = async (filePath) => {
  try {
    // Read the file asynchronously
    const data = await fs.readFile(filePath, 'utf-8');
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

    // Log the result
    console.log(`Number of students: ${totalStudents}`);
    for (const field in students) {
      console.log(`Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}`);
    }

    // Return a promise that resolves successfully
    return Promise.resolve();
  } catch (error) {
    // Handle errors, such as file not found
    console.log('Error:', error.message);
    return Promise.reject(new Error('Cannot load the database'));
  }
};

// Export the function for external use
module.exports = countStudents;
