// promptBuilder.js
// This module builds prompts for GPT to generate Jest unit tests for JavaScript functions.

/**
 * Builds a prompt for GPT to generate Jest unit tests for a JavaScript function.
 * @param {Object} funcMeta - Function metadata from parser
 * @param {string} funcMeta.name - Function name
 * @param {string[]} funcMeta.params - Function parameters
 * @param {string|null} funcMeta.jsDoc - JSDoc comment if present
 * @param {Object} options - Additional options for prompt customization
 * @returns {string} The formatted prompt for GPT
 */
export function buildPrompt(funcMeta, options = {}) {
  // Beginners: Template literals allow us to inject variables into strings
  const prompt = `Generate a Jest unit test for this JavaScript function:

\`\`\`js
${funcMeta.jsDoc ? `// ${funcMeta.jsDoc}\n` : ''}function ${funcMeta.name}(${funcMeta.params.join(', ')}) {
  // Function implementation would go here
}
\`\`\`

Include tests for edge cases such as null, empty inputs, zero, and invalid types.

Requirements:
- Use Jest syntax and assertions
- Test both valid and invalid inputs
- Include edge cases and error scenarios
- Make tests descriptive and well-commented
- Ensure good test coverage for the function parameters: [${funcMeta.params.join(', ')}]`;

  return prompt;
} 