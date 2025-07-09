// error.js - Error message with ASCII border for mockMeDaddy CLI
// Beginners: This module prints an error message with a fun ASCII border

import chalk from 'chalk';

/**
 * Prints an error message with an ASCII border
 * @param {string} message - The message to display
 */
export function showError(message) {
  const border = chalk.red('+' + '-'.repeat(message.length + 2) + '+');
  console.log(border);
  console.log(chalk.red(`| ${message} |`));
  console.log(border);
} 