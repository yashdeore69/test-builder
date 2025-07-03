// parser.js
// This module parses a JavaScript file and extracts exported functions, their parameters, and JSDoc comments.

import fs from 'fs';
import recast from 'recast';

/**
 * Parses a JavaScript file and extracts exported functions (ESM and CommonJS),
 * their names, parameter lists, and attached JSDoc comments.
 * @param {string} filePath - Path to the JS file
 * @returns {{ functions: Array<{ name: string, params: string[], jsDoc: string|null }> }}
 */
export function parseFile(filePath) {
  // Read the file contents
  const code = fs.readFileSync(filePath, 'utf-8');
  // Parse the code into an AST
  const ast = recast.parse(code, { parser: require('recast/parsers/babel') });
  const functions = [];

  // Helper to extract JSDoc from node
  function getJsDoc(node) {
    if (node.comments && node.comments.length) {
      const doc = node.comments.find(c => c.leading && c.type === 'CommentBlock' && c.value.startsWith('*'));
      return doc ? `/*${doc.value}*/` : null;
    }
    return null;
  }

  // Traverse AST for export function declarations
  recast.types.visit(ast, {
    visitExportNamedDeclaration(path) {
      const { declaration } = path.node;
      if (declaration && declaration.type === 'FunctionDeclaration') {
        functions.push({
          name: declaration.id.name,
          params: declaration.params.map(p => p.name),
          jsDoc: getJsDoc(declaration)
        });
      }
      this.traverse(path);
    },
    // CommonJS: module.exports = function ...
    visitAssignmentExpression(path) {
      const { left, right } = path.node;
      if (
        left.type === 'MemberExpression' &&
        left.object.name === 'module' &&
        left.property.name === 'exports' &&
        (right.type === 'FunctionExpression' || right.type === 'ArrowFunctionExpression')
      ) {
        functions.push({
          name: 'module.exports',
          params: right.params.map(p => p.name),
          jsDoc: getJsDoc(path.node)
        });
      }
      this.traverse(path);
    }
  });

  return { functions };
} 