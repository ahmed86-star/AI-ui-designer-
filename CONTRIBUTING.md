# Contributing to AI UI Designer

We love your input! We want to make contributing to AI UI Designer as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, track issues and feature requests, and accept pull requests.

### Pull Request Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/ai-ui-designer.git
cd ai-ui-designer

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your API keys

# Start development server
npm run dev
```

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (ESLint + Prettier)
- Write meaningful commit messages using [Conventional Commits](https://conventionalcommits.org/)
- Add JSDoc comments for public APIs

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

### Areas for Contribution

#### High Priority
- [ ] Additional AI provider integrations
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Mobile responsiveness enhancements
- [ ] Documentation improvements

#### Medium Priority
- [ ] New template designs
- [ ] Export format options
- [ ] Advanced collaboration features
- [ ] Analytics and metrics
- [ ] Internationalization (i18n)

#### Feature Requests
- [ ] Visual drag-and-drop editor
- [ ] Component library marketplace
- [ ] Advanced theming system
- [ ] Plugin architecture
- [ ] Team management features

## Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/ai-ui-designer/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening)

## Feature Requests

We welcome feature requests! Please provide:

- Clear description of the feature
- Use case and motivation
- Possible implementation approach
- Any relevant examples or mockups

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README acknowledgments
- Release notes
- Contributor page (coming soon)

## Questions?

Feel free to reach out via:
- GitHub Issues for technical questions
- GitHub Discussions for general questions
- Email for sensitive topics

Thank you for contributing! 🎉