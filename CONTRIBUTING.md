# Contributing to AI Learning Platform

Thank you for your interest in contributing to the AI Learning Platform! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Follow the setup instructions in [README.md](./README.md)
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Code Standards

### Backend (NestJS)
- Follow NestJS best practices
- Use TypeScript strict mode
- Write unit tests for services
- Use DTOs for validation
- Keep controllers thin, services fat
- Use dependency injection

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety
- Keep components small and focused
- Use Chakra UI components

### General
- Write clean, readable code
- Add comments for complex logic
- Follow existing code style
- Run linter before committing: `npm run lint`
- Format code: `npm run format`

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/config changes

Example: `feat: add lesson export to PDF`

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass: `npm run test`
4. Update README.md if needed
5. Create a pull request with clear description

## Testing

```bash
# Backend tests
cd backend && npm run test

# Frontend tests
cd frontend && npm run test
```

## Questions?

Open an issue for questions or discussions.

Thank you for contributing! 🎉
