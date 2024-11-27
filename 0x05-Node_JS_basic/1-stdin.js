const readline = require('readline');

// Create an interface for reading input from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Display the initial prompt
rl.question('Welcome to Holberton School, what is your name?\n', (name) => {
  // Output the user's input
  console.log(`Your name is: ${name}`);

  // Close the program with the final message
  rl.on('close', () => {
    console.log('This important software is now closing');
  });

  // Close the readline interface
  rl.close();
});
