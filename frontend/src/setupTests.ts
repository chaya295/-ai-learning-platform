import '@testing-library/jest-dom';

// Suppress console logs in tests
global.console = {
  ...console,
  log: jest.fn(),
};
