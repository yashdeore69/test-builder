# Commit Log

## [Initial Commit] - 2024-06-09
- Set up GitHub repo with MIT license (LICENSE)
- Initialized project with npm init -y and installed dependencies: chalk, ora, commander, fs-extra
- Created src/cli.js with a placeholder CLI using commander and a multi-line ASCII banner
- Added a testgen command that prints the banner and "Hello, TestGen!"
- Configured .prettierrc (Prettier), .eslintrc.json (ESLint), and .vscode/extensions.json (VSCode recommendations)
- Added .gitignore to hide .cursor rules folder
- Verified CLI runs and displays banner and message with no lint errors 

## Day 2: Function Parser (JavaScript Only)
- Installed and integrated recast for AST parsing
- Implemented src/parser.js to extract exported functions, params, and JSDoc
- Exposed parseFile(filePath) and added parse <file> CLI command
- Added user-friendly error handling and colored output
- Prints summary and warnings for empty results

**Day 1 and Day 2 tasks are now complete.** 