#!/usr/bin/env node

// Import required libraries (ESM style for Chalk v5+)
import chalk from 'chalk'; // For colored text
import { Command } from 'commander'; // For CLI parsing
// Import the ASCII art banner and quotes from separate modules
import { banner } from './asciiArt.js'; // ASCII art
import { quotes } from './quotes.js'; // Funny quotes
import { parseFile } from './parser.js'; // Import the parser
import { buildPrompt } from './promptBuilder.js'; // Import the prompt builder
import { generateTest } from './gptClient.js'; // Import the GPT client
import fs from 'fs'; // For file operations
import path from 'path'; // For handling file paths
import { spawn } from 'child_process'; // For running jest

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

// Add the 'parse' subcommand to expose the parser via CLI
program
  .command('parse <file>')
  .description('Parse a JS file and print exported function metadata as JSON')
  .action((file) => {
    try {
      // Call the parser and print the result as formatted JSON
      const result = parseFile(file);
      console.log(JSON.stringify(result, null, 2));
      // Print a summary message for user-friendliness
      if (result.functions.length === 0) {
        // Beginners: Use chalk.yellow for warnings
        console.log(chalk.yellow('⚠️  No exported functions found in this file.'));
      } else {
        // Beginners: Use chalk.green for success messages
        console.log(chalk.green(`✅ Found ${result.functions.length} exported function(s).`));
      }
    } catch (err) {
      // Print a user-friendly error message in red
      console.error(chalk.red('Error parsing file:'), err.message);
      process.exit(1);
    }
  });

// Add the 'gen' command for generating tests
program
  .command('gen <file>')
  .description('Generate Jest tests for exported functions in a JS file')
  .option('--prompt-debug', 'Print the generated prompt and exit (for debugging)')
  .option('--overwrite', 'Overwrite the test file if it already exists')
  .option('--dry-run', 'Show the file path and contents without writing to disk')
  .option('--run', 'Run jest --coverage after writing the test file')
  .action(async (file, options) => {
    try {
      // Parse the file to get function metadata
      const result = parseFile(file);
      
      if (result.functions.length === 0) {
        console.error(chalk.red('No exported functions found in this file.'));
        process.exit(1);
      }
      
      // For now, use the first function found
      const funcMeta = result.functions[0];
      console.log(chalk.blue(`📝 Building prompt for function: ${funcMeta.name}`));
      
      // Build the prompt using the prompt builder
      const prompt = buildPrompt(funcMeta, options);
      
      if (options.promptDebug) {
        // Beginners: --prompt-debug flag shows the prompt without calling GPT
        console.log(chalk.cyan('\n🔍 Generated Prompt:'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(prompt);
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.green('✅ Prompt debug complete. Exiting.'));
        return;
      }
      
      // Call GPT to generate tests
      console.log(chalk.blue('🚀 Calling GPT to generate tests...'));
      const testCode = await generateTest(prompt);
      
      // Beginners: Write the generated test code to a file in __tests__
      const baseName = path.basename(file, path.extname(file));
      const testDir = path.join(process.cwd(), '__tests__');
      const testFilePath = path.join(testDir, `${baseName}.test.js`);
      // Ensure __tests__ directory exists
      if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir);
      }
      let testFileWritten = false;
      // Dry-run: show file path and contents, but do not write
      if (options.dryRun) {
        console.log(chalk.yellow(`\n[DRY RUN] Test file would be saved to: ${testFilePath}`));
        console.log(chalk.yellow('[DRY RUN] File contents:'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.cyan(testCode));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.green('✅ Dry run complete. No files were written.'));
      } else if (fs.existsSync(testFilePath) && !options.overwrite) {
        // Idempotent write: check if file exists and handle overwrite
        // Beginners: Warn the user and skip writing
        console.log(chalk.yellow(`⚠️  Test file already exists: ${testFilePath}`));
        console.log(chalk.yellow('Use --overwrite to overwrite the existing test file. Skipping write.'));
      } else {
        // Write the test code to the file (overwrite if exists or --overwrite is set)
        fs.writeFileSync(testFilePath, testCode, 'utf-8');
        testFileWritten = true;
        // Display the generated test code and file path
        console.log(chalk.green('\n📝 Generated Test Code:'));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.cyan(testCode));
        console.log(chalk.gray('─'.repeat(50)));
        console.log(chalk.green(`✅ Test generation complete! Test file saved to: ${testFilePath}`));
      }
      console.log(chalk.blue('💡 Use --prompt-debug to see the prompt that was sent to GPT'));

      // If --run is set and a test file was written, run jest --coverage
      if (options.run && testFileWritten) {
        console.log(chalk.blue('\n▶️ Running jest --coverage...'));
        // Beginners: Use spawn to run jest as a child process
        const jest = spawn('npx', ['jest', '--coverage'], { stdio: 'inherit' });
        jest.on('close', (code) => {
          if (code === 0) {
            console.log(chalk.green('✅ Jest coverage run complete!'));
          } else {
            console.log(chalk.red('❌ Jest coverage run failed.'));
          }
        });
      }
      
    } catch (err) {
      console.error(chalk.red('Error generating tests:'), err.message);
      process.exit(1);
    }
  });

// Parse the CLI arguments
program.parse(process.argv);

// Export the program for testing or extension
export default program; 