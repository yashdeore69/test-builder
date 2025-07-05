// promptBuilder.test.js
// Unit tests for the promptBuilder module

import { buildPrompt } from '../src/promptBuilder.js';

// Beginners: describe() groups related tests together
describe('promptBuilder', () => {
  // Beginners: test() defines a single test case
  test('should build prompt with function name and parameters', () => {
    const funcMeta = {
      name: 'add',
      params: ['a', 'b'],
      jsDoc: null
    };
    
    const prompt = buildPrompt(funcMeta);
    
    // Beginners: expect() checks if the result matches what we expect
    expect(prompt).toContain('function add(a, b)');
    expect(prompt).toContain('function parameters: [a, b]');
    expect(prompt).toContain('Generate a Jest unit test');
  });
  
  test('should include JSDoc comment when present', () => {
    const funcMeta = {
      name: 'multiply',
      params: ['x', 'y'],
      jsDoc: 'Multiplies two numbers together'
    };
    
    const prompt = buildPrompt(funcMeta);
    
    expect(prompt).toContain('// Multiplies two numbers together');
    expect(prompt).toContain('function multiply(x, y)');
  });
  
  test('should handle functions with no parameters', () => {
    const funcMeta = {
      name: 'getRandomNumber',
      params: [],
      jsDoc: null
    };
    
    const prompt = buildPrompt(funcMeta);
    
    expect(prompt).toContain('function getRandomNumber()');
    expect(prompt).toContain('function parameters: []');
  });
  
  test('should handle functions with many parameters', () => {
    const funcMeta = {
      name: 'complexFunction',
      params: ['param1', 'param2', 'param3', 'param4'],
      jsDoc: 'A complex function with many parameters'
    };
    
    const prompt = buildPrompt(funcMeta);
    
    expect(prompt).toContain('function complexFunction(param1, param2, param3, param4)');
    expect(prompt).toContain('function parameters: [param1, param2, param3, param4]');
    expect(prompt).toContain('// A complex function with many parameters');
  });
  
  test('should include Jest requirements in prompt', () => {
    const funcMeta = {
      name: 'testFunction',
      params: ['input'],
      jsDoc: null
    };
    
    const prompt = buildPrompt(funcMeta);
    
    expect(prompt).toContain('Use Jest syntax and assertions');
    expect(prompt).toContain('Test both valid and invalid inputs');
    expect(prompt).toContain('Include edge cases and error scenarios');
    expect(prompt).toContain('Make tests descriptive and well-commented');
  });
}); 