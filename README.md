# mockMeDaddy

A fun, open-source CLI tool to help you generate and test code with style! Now featuring:

- 🎨 ASCII art splash screen and fun random quotes
- 🧑‍💻 `parse <file>` command: Extracts exported functions (name, params, JSDoc) from JavaScript files
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

If no exported functions are found:
```
⚠️  No exported functions found in this file.
```

If there is an error:
```
Error parsing file: <error message>
```

## Project Status
- **Day 1 & Day 2 tasks complete!**
- Ready to move to Day 3: Prompt Builder

---

For more details, see `.cursor/rules/myrules.mdc`. 