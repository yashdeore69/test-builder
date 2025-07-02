#!/usr/bin/env node

// Import required libraries (ESM style for Chalk v5+)
import chalk from 'chalk'; // For colored text
import { Command } from 'commander'; // For CLI parsing

// Create a new Command instance
const program = new Command();

// ASCII Art Banner (placeholder)
const banner = `
████████╗███████╗███████╗████████╗     ████████╗███████╗███████╗███╗   ██╗
╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝     ╚══██╔══╝██╔════╝██╔════╝████╗  ██║
   ██║   █████╗  ███████╗   ██║           ██║   █████╗  █████╗  ██╔██╗ ██║
   ██║   ██╔══╝  ╚════██║   ██║           ██║   ██╔══╝  ██╔══╝  ██║╚██╗██║
   ██║   ███████╗███████║   ██║           ██║   ███████╗███████╗██║ ╚████║
   ╚═╝   ╚══════╝╚══════╝   ╚═╝           ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═══╝
`;

// Print banner if no command is provided
if (!process.argv.slice(2).length) {
  console.log(chalk.cyan(banner));
}

// Define the 'testgen' command
program
  .command('testgen')
  .description('Prints Hello, TestGen!')
  .action(() => {
    // Print the banner and a hello message
    console.log(chalk.cyan(banner));
    console.log(chalk.green('Hello, TestGen!'));
  });

// Parse the CLI arguments
program.parse(process.argv);

// Export the program for testing or extension
export default program; 