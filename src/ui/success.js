// success.js - Success message with ASCII border for mockMeDaddy CLI
// Beginners: This module prints a success message with a fun ASCII border

import chalk from 'chalk';

/**
 * Prints a success message with an ASCII border
 * @param {string} message - The message to display
 */
export function showSuccess(message) {
  const border = chalk.green('+' + '-'.repeat(message.length + 2) + '+');
  console.log(border);
  console.log(chalk.green(`| ${message} |`));
  console.log(border);
} 