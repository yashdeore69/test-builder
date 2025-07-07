# mockMeDaddy 🧪

A fun, open-source CLI tool to help you generate and test code with style! Now featuring:

- 🎨 ASCII art splash screen and fun random quotes
- 🧑‍💻 `parse <file>` command: Extracts exported functions (name, params, JSDoc) from JavaScript files
- 🤖 `gen <file>` command: Generates Jest tests using GPT API (with mock response for development)
- 🧪 Unit tests with Jest for all core functionality
- 🛡️ User-friendly error handling and colored output
- 🏗️ Modular codebase for easy extension

## Installation

Clone the repo and install dependencies:
```sh
git clone <your-repo-url>
cd mockMeDaddy
npm install
```

## Usage

### Show the splash screen
```sh
node src/cli.js
```

### Parse a JavaScript file for exported functions
```sh
node src/cli.js parse path/to/yourfile.js
```

**Example output:**
```
{
  "functions": [
    {
      "name": "add",
      "params": ["a", "b"],
      "jsDoc": "/** Adds two numbers together. ... */"
    },
    ...
  ]
}
✅ Found 2 exported function(s).
```

### Generate Jest tests
```sh
node src/cli.js gen path/to/yourfile.js
```

### Debug the generated prompt
```sh
node src/cli.js gen path/to/yourfile.js --prompt-debug
```

**Note:** You'll need to set up your Cursor AI API key in a `.env` file:
```sh
CURSOR_API_KEY=your_api_key_here
```

**Example prompt output:**
```
🤖 Generated Jest Test Prompt for: src/example.js

Function: add
Parameters: a, b
JSDoc: /** Adds two numbers together */

Write a comprehensive Jest test for the following function:

```javascript
/**
 * Adds two numbers together
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  return a + b;
}
```

Please include:
- Happy path tests
- Edge cases
- Error handling
- Clear test descriptions
- Proper Jest syntax
```

## Error Handling

If no exported functions are found:
```
⚠️  No exported functions found in this file.
```

If there is an error:
```
❌ Error parsing file: <error message>
```

## Testing

Run the test suite:
```sh
npm test
```

## Project Status
- ✅ **Day 1**: ASCII art, quotes, CLI structure
- ✅ **Day 2**: Function parser with `recast`
- ✅ **Day 3**: Prompt builder and Jest integration
- ✅ **Day 4 Task 1**: Cursor AI Integration - API client setup
- 🚧 **Day 4 Task 2**: Error handling & retries (coming next)

## Project Structure
```
src/
├── cli.js          # Main CLI interface
├── parser.js       # Function parsing logic
├── promptBuilder.js # Jest prompt generation
├── gptClient.js    # GPT API integration
├── asciiArt.js     # ASCII art banner
└── quotes.js       # Fun random quotes
```

---

For more details, see `.cursor/rules/myrules.mdc`. 