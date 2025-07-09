// intro.js - Animated mascot intro for mockMeDaddy CLI
// Beginners: This module shows the animated mascot using chalk-animation and fun effects

import fs from 'fs';
import path from 'path';
import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// ES module fix: get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Shows the animated mascot intro in the CLI with color
 */
export async function showIntro() {
  // Read the mascot ASCII art from mascot.txt
  const mascotPath = path.join(__dirname, 'mascot.txt');
  let mascot = '';
  try {
    mascot = fs.readFileSync(mascotPath, 'utf-8');
    mascot = mascot
      .split('\n')
      .filter(line => !line.trim().startsWith('#') && line.trim() !== '' && !/mockmedaddy/i.test(line)) // Remove text lines
      .join('\n')
      .trim();
  } catch (err) {
    mascot = '';
  }

  // Print the 'mockMeDaddy is generating fake tests...' line in pink
  console.log(chalk.hex('#ff69b4')('💥 mockMeDaddy is generating fake tests...\n'));

  // Print the mascot art in pink
  console.log(chalk.hex('#ff69b4')(mascot));

  // Print the welcome message
  console.log('\nWelcome to mockMeDaddy!\n');
} 