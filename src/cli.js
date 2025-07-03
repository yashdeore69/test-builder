#!/usr/bin/env node

// Import required libraries (ESM style for Chalk v5+)
import chalk from 'chalk'; // For colored text
import { Command } from 'commander'; // For CLI parsing
// Import the ASCII art banner and quotes from separate modules
import { banner } from './asciiArt.js'; // ASCII art
import { quotes } from './quotes.js'; // Funny quotes

// Create a new Command instance
const program = new Command();

// Function to get a random quote from the imported quotes array
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Print banner if no command is provided
if (!process.argv.slice(2).length) {
  // Print the banner in pink color using chalk's hex method
  // Beginners: chalk.hex('#ff69b4') sets the text color to a pink shade
  console.log(chalk.hex('#ff69b4')(banner));
  // Fun splash message for mockMeDaddy
  console.log(chalk.magentaBright('💥 mockMeDaddy is generating fake tests...'));
  // Print a random funny quote
  console.log(getRandomQuote());
}

// Define the 'testgen' command
program
  .command('testgen')
  .description('Prints Hello, TestGen!')
  .action(() => {
    // Print the banner and a hello message, both in pink and green respectively
    console.log(chalk.hex('#ff69b4')(banner));
    // Fun splash message for mockMeDaddy
    console.log(chalk.magentaBright('💥 mockMeDaddy is generating fake tests...'));
    // Print a random funny quote
    console.log(getRandomQuote());
    // Main greeting
    console.log(chalk.green('Welcome to mockMeDaddy!'));
  });

// Parse the CLI arguments
program.parse(process.argv);

// Export the program for testing or extension
export default program; 