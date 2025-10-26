# Community Engagement

## Overview

Strategy for building, nurturing, and sustaining a vibrant community around the OpenSeadragon website project. This document covers contribution guidelines, community channels, recognition systems, and long-term community health.

## Community Vision

### Mission Statement
Build an inclusive, welcoming, and collaborative community where developers, designers, translators, and users can contribute to making OpenSeadragon documentation and resources accessible and excellent for everyone.

### Core Values
1. **Inclusivity**: Welcome contributors of all skill levels and backgrounds
2. **Transparency**: Open communication and decision-making
3. **Recognition**: Acknowledge and celebrate contributions
4. **Collaboration**: Work together, share knowledge
5. **Sustainability**: Build for long-term community health

## Community Channels

### Primary Communication Channels

#### 1. GitHub Discussions
**Purpose:** General discussion, questions, and community conversation

**Categories:**
```yaml
discussions:
  general:
    - General conversation
    - Show and tell
    - Ideas and brainstorming
    
  help:
    - Q&A
    - Troubleshooting
    - How-to guides
    
  development:
    - Feature requests
    - Technical discussions
    - Architecture decisions
    
  translations:
    - Translation coordination
    - Language-specific discussions
    
  announcements:
    - Release notes
    - Important updates
    - Community news
```

**Moderation:**
- Response time goal: < 24 hours
- Community moderators from different time zones
- Clear code of conduct enforcement

#### 2. GitHub Issues
**Purpose:** Bug reports, feature requests, and task tracking

**Issue Templates:**
```markdown
<!-- .github/ISSUE_TEMPLATE/bug_report.md -->
---
name: Bug Report
about: Report a problem with the website
labels: bug
---

## Describe the Bug
A clear description of what the bug is.

## To Reproduce
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Screenshots
If applicable, add screenshots.

## Environment
- Browser: [e.g. Chrome 118]
- OS: [e.g. Windows 11]
- Device: [e.g. Desktop, iPhone 12]

## Additional Context
Any other relevant information.
```

```markdown
<!-- .github/ISSUE_TEMPLATE/feature_request.md -->
---
name: Feature Request
about: Suggest an enhancement
labels: enhancement
---

## Feature Description
Clear description of the feature you'd like to see.

## Problem It Solves
What problem would this feature solve?

## Proposed Solution
How do you envision this working?

## Alternatives Considered
Have you considered any alternative solutions?

## Additional Context
Mockups, examples, or other context.
```

```markdown
<!-- .github/ISSUE_TEMPLATE/translation.md -->
---
name: Translation Contribution
about: Contribute or update translations
labels: translation
---

## Language
Which language are you translating to/updating?

## Content
Which pages/sections are you working on?

## Checklist
- [ ] I've read the translation guidelines
- [ ] I'm a native/fluent speaker
- [ ] I've checked for consistency
- [ ] All markdown formatting is preserved

## Additional Notes
Any context or questions.
```

#### 3. Discord Server (Optional)
**Purpose:** Real-time chat and community building

**Channels:**
```yaml
discord:
  welcome:
    - rules
    - introductions
    - resources
    
  general:
    - general-chat
    - random
    - showcase
    
  support:
    - help
    - troubleshooting
    
  development:
    - dev-chat
    - code-review
    - testing
    
  translations:
    - translation-general
    - [language]-specific channels
    
  voice:
    - office-hours
    - community-calls
```

#### 4. Social Media
**Platforms:**
- **Twitter/X**: @openseadragon - Updates and announcements
- **Mastodon**: @openseadragon@fosstodon.org - Federated updates
- **LinkedIn**: OpenSeadragon - Professional updates

**Content Strategy:**
```yaml
content_types:
  announcements:
    - New releases
    - Major features
    - Events
    
  educational:
    - Tips and tricks
    - Tutorial highlights
    - Feature spotlights
    
  community:
    - Contributor highlights
    - Community projects
    - User stories
    
  engagement:
    - Polls
    - Questions
    - Challenges
```

## Contribution Guidelines

### CONTRIBUTING.md

```markdown
# Contributing to OpenSeadragon Website

Thank you for your interest in contributing! We welcome contributions of all kinds.

## Ways to Contribute

### 🐛 Report Bugs
Found a bug? [Open an issue](https://github.com/openseadragon/website/issues/new?template=bug_report.md)

### 💡 Suggest Features
Have an idea? [Open a feature request](https://github.com/openseadragon/website/issues/new?template=feature_request.md)

### 📝 Improve Documentation
- Fix typos or unclear explanations
- Add examples
- Translate content

### 🌍 Translate
Help make OpenSeadragon accessible globally. See our [Translation Guide](locales/TRANSLATION_GUIDE.md)

### 💻 Write Code
- Fix bugs
- Implement features
- Improve performance

## Getting Started

### 1. Fork and Clone
\```bash
git clone https://github.com/YOUR_USERNAME/website.git
cd website
\```

### 2. Install Dependencies
\```bash
bun install
\```

### 3. Start Development Server
\```bash
bun run dev
\```

### 4. Make Your Changes
- Create a new branch: `git checkout -b feature/my-feature`
- Make your changes
- Test thoroughly
- Commit: `git commit -m "feat: add my feature"`

### 5. Submit Pull Request
- Push to your fork: `git push origin feature/my-feature`
- Open a pull request
- Fill out the PR template
- Wait for review

## Coding Standards

### Code Style
- Follow existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add tests for new features

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

\```
feat: add new search feature
fix: resolve navigation bug
docs: update installation guide
style: format code with prettier
refactor: simplify search logic
test: add tests for search
chore: update dependencies
\```

### Pull Request Guidelines
- Keep PRs focused and small
- Write clear descriptions
- Link related issues
- Update documentation
- Add tests
- Ensure CI passes

## Code of Conduct

We follow the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).
Please read and follow it in all interactions.

## Questions?

- **General questions**: [GitHub Discussions](https://github.com/openseadragon/website/discussions)
- **Bug reports**: [GitHub Issues](https://github.com/openseadragon/website/issues)
- **Security issues**: security@openseadragon.org

## Recognition

All contributors are recognized in our [CONTRIBUTORS.md](CONTRIBUTORS.md) file
and on the website.

Thank you for contributing! 🎉
```

### CODE_OF_CONDUCT.md

```markdown
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity
and orientation.

## Our Standards

Examples of behavior that contributes to a positive environment:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior:

* The use of sexualized language or imagery
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information without explicit permission
* Other conduct which could reasonably be considered inappropriate

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
conduct@openseadragon.org. All complaints will be reviewed and investigated
promptly and fairly.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org),
version 2.0.
```

## Pull Request Process

### PR Template

```markdown
<!-- .github/pull_request_template.md -->
## Description
<!-- Describe your changes in detail -->

## Related Issue
<!-- Link to related issue: Fixes #123 -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Translation

## Checklist
- [ ] My code follows the code style of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
<!-- Add screenshots to help explain your changes -->

## Additional Notes
<!-- Any additional information -->
```

### Review Process

```yaml
review_process:
  automated_checks:
    - Lint (oxlint)
    - Type check (TypeScript)
    - Tests (Vitest + Playwright)
    - Build (Nuxt generate)
    - Lighthouse CI
    - Accessibility audit
    
  manual_review:
    - Code quality review
    - Design review (if UI changes)
    - Documentation review
    - Accessibility review
    
  approval_requirements:
    - At least 1 approving review
    - All automated checks passing
    - No unresolved comments
    - Branch up to date with main
    
  merge_strategy:
    - Squash and merge (default)
    - Keep history clean
    - Meaningful commit messages
```

## Contributor Recognition

### CONTRIBUTORS.md

```markdown
# Contributors

Thank you to all the amazing people who have contributed to the OpenSeadragon website!

## Core Team

### Maintainers
- [@adriandarian](https://github.com/adriandarian) - Project Lead
- [@maintainer2](https://github.com/maintainer2) - Core Developer
- [@maintainer3](https://github.com/maintainer3) - Community Manager

## Contributors

### Code Contributors
<!-- Generated automatically from git history -->
<a href="https://github.com/openseadragon/website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=openseadragon/website" />
</a>

### Translation Contributors

#### Chinese (简体中文)
- [@translator1](https://github.com/translator1)
- [@translator2](https://github.com/translator2)

#### Spanish (Español)
- [@translator3](https://github.com/translator3)
- [@translator4](https://github.com/translator4)

### Documentation Contributors
Special thanks to those who improved our documentation:
- [@doc1](https://github.com/doc1) - Getting Started guide
- [@doc2](https://github.com/doc2) - API reference improvements

### Design Contributors
- [@designer1](https://github.com/designer1) - Logo design
- [@designer2](https://github.com/designer2) - UI/UX improvements

## How to be Listed

All contributors are automatically added based on their merged pull requests.
To ensure proper attribution:
- Use your real name or preferred handle in git config
- Sign your commits with your GitHub email

Want to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md)!
```

### Contributor Badge System

```typescript
// Types of contributions
type ContributionType = 
  | 'code'
  | 'documentation'
  | 'translation'
  | 'design'
  | 'community'
  | 'testing'

// Contributor levels
type ContributorLevel =
  | 'first-time'
  | 'contributor'
  | 'frequent'
  | 'core'
  | 'maintainer'

// Recognition badges
interface ContributorBadge {
  name: string
  icon: string
  description: string
  criteria: string
}

const badges: ContributorBadge[] = [
  {
    name: 'First Contribution',
    icon: '🌟',
    description: 'Made your first contribution!',
    criteria: '1 merged PR',
  },
  {
    name: 'Bug Hunter',
    icon: '🐛',
    description: 'Fixed multiple bugs',
    criteria: '5+ bug fix PRs',
  },
  {
    name: 'Translator',
    icon: '🌍',
    description: 'Contributed translations',
    criteria: 'Translated 50+ strings',
  },
  {
    name: 'Documentation Hero',
    icon: '📚',
    description: 'Improved documentation',
    criteria: '10+ documentation PRs',
  },
  {
    name: 'Core Contributor',
    icon: '⭐',
    description: 'Regular contributor',
    criteria: '20+ merged PRs',
  },
]
```

### All Contributors Integration

```json
// .all-contributorsrc
{
  "projectName": "website",
  "projectOwner": "openseadragon",
  "repoType": "github",
  "repoHost": "https://github.com",
  "files": ["README.md"],
  "imageSize": 100,
  "commit": false,
  "contributorsPerLine": 7,
  "contributorsSortAlphabetically": true,
  "types": {
    "code": {
      "symbol": "💻",
      "description": "Code"
    },
    "doc": {
      "symbol": "📖",
      "description": "Documentation"
    },
    "translation": {
      "symbol": "🌍",
      "description": "Translation"
    },
    "design": {
      "symbol": "🎨",
      "description": "Design"
    },
    "ideas": {
      "symbol": "🤔",
      "description": "Ideas & Planning"
    },
    "maintenance": {
      "symbol": "🚧",
      "description": "Maintenance"
    },
    "review": {
      "symbol": "👀",
      "description": "Reviewed Pull Requests"
    },
    "test": {
      "symbol": "⚠️",
      "description": "Tests"
    }
  }
}
```

## Community Events

### Regular Events

#### 1. Office Hours
```yaml
office_hours:
  schedule: "Every other Friday, 3:00 PM UTC"
  duration: "1 hour"
  platform: "Discord voice channel"
  
  agenda:
    - Welcome and introductions (5 min)
    - Community updates (10 min)
    - Open Q&A (30 min)
    - Upcoming plans (10 min)
    - Open discussion (5 min)
  
  purpose:
    - Answer questions
    - Provide guidance
    - Discuss roadmap
    - Community building
```

#### 2. Community Calls
```yaml
community_calls:
  schedule: "Monthly, first Thursday, 2:00 PM UTC"
  duration: "45 minutes"
  platform: "Zoom (recorded)"
  
  topics:
    - Project updates
    - New features demo
    - Contributor spotlight
    - Roadmap discussion
  
  recording:
    - Posted to YouTube
    - Linked in discussions
    - Summarized in blog post
```

#### 3. Contribution Challenges
```yaml
challenges:
  hacktoberfest:
    timing: "October"
    focus: "Open source contributions"
    special: "Extra recognition for participants"
  
  translation_sprint:
    timing: "Quarterly"
    focus: "Complete translation for a language"
    goal: "Reach 80% translation coverage"
  
  documentation_week:
    timing: "Bi-annually"
    focus: "Improve and expand documentation"
    reward: "Special contributor badge"
```

### Contributor Onboarding

#### Welcome Bot

```yaml
# .github/workflows/welcome.yml
name: Welcome

on:
  issues:
    types: [opened]
  pull_request_target:
    types: [opened]

jobs:
  welcome:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/first-interaction@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          issue-message: |
            👋 Thanks for opening your first issue! 
            
            We're excited to have you as part of the community. Someone 
            will respond to your issue soon. In the meantime, you might 
            want to check out:
            
            - [Contributing Guidelines](CONTRIBUTING.md)
            - [Code of Conduct](CODE_OF_CONDUCT.md)
            - [Community Discussions](https://github.com/openseadragon/website/discussions)
          
          pr-message: |
            🎉 Thanks for opening your first pull request!
            
            We appreciate your contribution! A maintainer will review your 
            PR soon. Please make sure:
            
            - [ ] All automated checks pass
            - [ ] You've read the [Contributing Guidelines](CONTRIBUTING.md)
            - [ ] Your PR description is clear and complete
            
            While you wait, join our [Discord server](https://discord.gg/openseadragon) 
            to chat with other contributors!
```

#### Onboarding Checklist

```markdown
## New Contributor Onboarding

Welcome to the OpenSeadragon website project! Here's a checklist to get started:

### Setup
- [ ] Fork the repository
- [ ] Clone your fork locally
- [ ] Install dependencies (`bun install`)
- [ ] Run development server (`bun run dev`)
- [ ] Join [Discord server](https://discord.gg/openseadragon)

### Familiarization
- [ ] Read [CONTRIBUTING.md](CONTRIBUTING.md)
- [ ] Review [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [ ] Browse [GitHub Discussions](https://github.com/openseadragon/website/discussions)
- [ ] Look through [good first issues](https://github.com/openseadragon/website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

### First Contribution
- [ ] Pick a "good first issue" or documentation improvement
- [ ] Comment on the issue to express interest
- [ ] Create a branch for your work
- [ ] Make your changes
- [ ] Test your changes
- [ ] Submit a pull request

### Community
- [ ] Introduce yourself in Discord
- [ ] Attend office hours (optional)
- [ ] Share your experience

Need help? Ask in [Discussions](https://github.com/openseadragon/website/discussions) or Discord!
```

## Community Health Metrics

### Metrics to Track

```typescript
interface CommunityMetrics {
  // Activity
  activec Contributors: number
  newContributors: number
  issuesOpened: number
  issuesClosed: number
  pullRequests: number
  prsMerged: number
  
  // Engagement
  discussionPosts: number
  discussionComments: number
  socialMediaFollowers: number
  discordMembers: number
  
  // Response times
  avgIssueResponseTime: number // hours
  avgPRReviewTime: number // hours
  avgIssueCloseTime: number // days
  
  // Quality
  contributorRetention: number // percentage
  codeQuality: number // via linting/tests
  documentationCoverage: number // percentage
  
  // Diversity
  countriesRepresented: number
  languagesSupported: number
  timezonesCovered: number
}
```

### Health Indicators

```yaml
healthy_community:
  response_time: "< 24 hours for first response"
  pr_review_time: "< 72 hours for initial review"
  contributor_retention: "> 30% return contributors"
  active_contributors: "> 10 per month"
  issue_resolution: "> 80% closed within 30 days"

action_needed:
  response_time: "> 48 hours"
  contributor_retention: "< 20%"
  active_contributors: "< 5 per month"
  issue_resolution: "< 60% closed within 30 days"
```

## Moderation Guidelines

### Community Moderators

```yaml
moderator_responsibilities:
  - Enforce code of conduct
  - Welcome new members
  - Answer questions
  - Triage issues
  - Review pull requests
  - Organize community events
  - Resolve conflicts

moderator_selection:
  criteria:
    - Active community member (3+ months)
    - Consistently helpful and welcoming
    - Good communication skills
    - Available time commitment
  
  process:
    - Nominations from community
    - Core team review
    - Trial period (1 month)
    - Full moderator status
```

### Escalation Process

```yaml
issue_escalation:
  level_1_warning:
    - Private message
    - Explain violation
    - Provide resources
  
  level_2_temporary_ban:
    - Duration: 7-30 days
    - Clear explanation
    - Appeal process
  
  level_3_permanent_ban:
    - Serious or repeated violations
    - Documentation required
    - Appeal to core team
```

## Growth Strategy

### Short-term (3-6 months)
- Launch Discord server
- Start monthly community calls
- Implement contributor recognition
- Create onboarding documentation
- Host first contribution sprint

### Medium-term (6-12 months)
- Reach 50+ active contributors
- Support 5+ languages
- Establish regional community leaders
- Launch contributor mentorship program
- Host annual contributor summit (virtual)

### Long-term (1-2 years)
- 100+ active contributors
- 10+ languages fully supported
- Regional in-person meetups
- Contributor grant program
- Community-driven roadmap

## Resources & Templates

### Email Templates

**Welcome Email:**
```
Subject: Welcome to OpenSeadragon Community!

Hi [Name],

Thank you for your interest in contributing to OpenSeadragon!

We're excited to have you join our community. Here are some resources 
to get you started:

📚 Contributing Guide: [link]
💬 Discord Server: [link]
📝 Good First Issues: [link]
📅 Office Hours: Every other Friday, 3PM UTC

Don't hesitate to ask questions - we're here to help!

Best regards,
OpenSeadragon Team
```

**Contribution Accepted:**
```
Subject: Your PR has been merged! 🎉

Hi [Name],

Your pull request "#[number] - [title]" has been merged!

Thank you for your contribution to OpenSeadragon. You're now officially 
a contributor!

- Your contribution is live at: [link]
- You've been added to CONTRIBUTORS.md
- Share your achievement: [Twitter link]

Looking forward to more contributions from you!

Best regards,
OpenSeadragon Team
```

## Success Metrics

- **Active Contributors**: 20+ per month
- **First-time Contributors**: 10+ per month
- **Response Time**: < 24 hours average
- **PR Review Time**: < 72 hours average
- **Contributor Retention**: > 30%
- **Community Satisfaction**: > 8/10
- **Languages Supported**: 5+ with 80%+ coverage
- **Community Events**: 2+ per month

## Conclusion

Building a thriving community requires consistent effort, clear communication, 
and genuine appreciation for contributors. By following these guidelines and 
continuously iterating based on feedback, we can create a welcoming and 
productive community around the OpenSeadragon website project.
