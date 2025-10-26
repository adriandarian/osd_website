# GitHub Project Workflow & Collaboration Strategy

## Overview

This document outlines the complete workflow for developing the OpenSeadragon website modernization using a fork-based development approach with project tracking, issue management, and upstream collaboration.

## Repository Structure

### Current Setup
- **Upstream Repository**: `openseadragon/openseadragon.github.io`
  - Official OpenSeadragon organization repository
  - Final destination for all changes
  - Owned and maintained by the OpenSeadragon organization
  
- **Development Fork**: `adriandarian/osd_website`
  - Personal fork for active development
  - Full write access for experimentation and iteration
  - Source for all pull requests to upstream

### Access & Permissions

#### What You Have
- ✅ **Fork Access**: Full control over your fork
- ✅ **PR Permissions**: Can open pull requests to upstream
- ✅ **Collaboration Agreement**: Permission from org to rewrite the website
- ✅ **Plan Documents**: Comprehensive planning already complete

#### What You Don't Have
- ❌ **Org Write Access**: Cannot create issues/projects on upstream repo
- ❌ **Direct Push**: Cannot push directly to org repository
- ❌ **Issue Creation**: Cannot create issues in upstream repository
- ❌ **Milestone Management**: Cannot create milestones in upstream

### Why This Matters

Since you don't have write access to the upstream organization repository:
1. **Issues on your fork** stay isolated and don't appear in the org repo
2. **Projects on your fork** can only track your fork's issues
3. **Milestones on your fork** won't be visible to org maintainers
4. **All collaboration** must happen through pull requests

## Recommended Workflow Strategy

### Option 1: Personal Project + Fork Issues (Recommended)

This approach gives you maximum flexibility while maintaining visibility.

#### Step 1: Create Personal GitHub Project

**Location**: `https://github.com/users/adriandarian/projects/new`

**Settings**:
- **Name**: "OpenSeadragon Website Modernization"
- **Visibility**: Public (so maintainers can view progress)
- **Template**: "Feature planning" or "Board"
- **Link to**: Your fork repository

**Project Views**:

**Board View** (Primary):
```
Columns:
├── 📋 Not Started     - Tasks not yet begun
├── 🏗️ In Progress     - Currently working on
├── 👀 In Review       - PRs open to upstream
├── ✅ Merged          - Accepted into upstream
└── 🎯 Future          - Planned for later phases
```

**Table View** (Detailed):
```
Fields:
├── Status          - Current state
├── Priority        - Critical, High, Medium, Low
├── Phase           - 1-5 based on plan structure
├── Plan Document   - Link to relevant plan doc
├── Assignee        - You (or collaborators)
├── Fork Issue      - Link to fork issue
└── Upstream PR     - Link to upstream PR when created
```

**Roadmap View** (Timeline):
```
Timeline showing:
├── Phase 1: Foundation (Weeks 1-2)
├── Phase 2: Core Implementation (Weeks 3-5)
├── Phase 3: Development Process (Weeks 6-7)
├── Phase 4: User Experience (Week 8)
└── Phase 5: Advanced Features (Week 9+)
```

#### Step 2: Create Issues on Your Fork

Create detailed issues on your fork that correspond to each plan document:

**Issue Template**:
```markdown
---
Title: [Phase X] Task Name
Labels: phase-X, priority-[level], type-[feature/enhancement/docs]
---

## 📋 Plan Documents
Links to relevant plan documents that define this work:
- [XX-document-name.md](link to plan doc)
- [XX-related-doc.md](link if applicable)

## 🎯 Objective
Clear, concise description of what this task accomplishes.

## ✅ Tasks
- [ ] Specific actionable task 1
- [ ] Specific actionable task 2
- [ ] Specific actionable task 3

## 📝 Acceptance Criteria
- [ ] Criterion 1 - How we know it's done
- [ ] Criterion 2 - Quality standard met
- [ ] Criterion 3 - Tests pass

## 🔗 Related Work
- Blocks: #X (if applicable)
- Depends on: #Y (if applicable)
- Related: #Z (if applicable)

## 🚀 Upstream Integration
When ready to merge to `openseadragon/openseadragon.github.io`:
- Will be submitted as PR with reference to this issue
- Will include comprehensive context from plan documents
- Will be tracked in personal project board
```

**Example Issue - Phase 1, Task 1**:
```markdown
---
Title: [Phase 1] Initial Project Setup & Infrastructure
Labels: phase-1, priority-critical, type-setup
---

## 📋 Plan Documents
- [01-project-overview.md](../plan/01-project-overview.md)
- [02-architecture-overview.md](../plan/02-architecture-overview.md)
- [03-technology-stack.md](../plan/03-technology-stack.md)
- [04-project-structure.md](../plan/04-project-structure.md)

## 🎯 Objective
Initialize the Nuxt 3 project with TypeScript, set up the base folder structure, and configure essential development tools as specified in the technology stack plan.

## ✅ Tasks
- [ ] Initialize Nuxt 3 project with TypeScript
- [ ] Configure Bun as package manager
- [ ] Set up folder structure (apps/site, packages/, etc.)
- [ ] Install core dependencies (@nuxt/content, @nuxt/image, etc.)
- [ ] Configure oxlint for fast linting
- [ ] Set up Tailwind CSS with shadcn-vue
- [ ] Configure simple-git-hooks for pre-commit checks
- [ ] Create basic README with setup instructions
- [ ] Test dev server and build process

## 📝 Acceptance Criteria
- [ ] `bun run dev` starts development server successfully
- [ ] `bun run build` completes without errors
- [ ] TypeScript compilation succeeds with strict mode
- [ ] Linting passes with oxlint configuration
- [ ] Folder structure matches 04-project-structure.md
- [ ] All core dependencies installed and configured
- [ ] Git hooks run on commit

## 🔗 Related Work
- Blocks: #2 (Phase 1, Task 2 - Homepage Development)
- Depends on: None (first task)

## 🚀 Upstream Integration
This will be the first PR to `openseadragon/openseadragon.github.io`, establishing the foundation for all future work.
```

#### Step 3: Labels for Your Fork

Create consistent labels to organize issues:

**Priority Labels**:
- `priority-critical` (🔴 red) - Blocking or essential for next phase
- `priority-high` (🟠 orange) - Important but not blocking
- `priority-medium` (🟡 yellow) - Should have
- `priority-low` (🟢 green) - Nice to have

**Type Labels**:
- `type-setup` (⚙️ gray) - Initial setup and configuration
- `type-feature` (💙 blue) - New feature implementation
- `type-enhancement` (🔷 light blue) - Improvement to existing feature
- `type-docs` (💜 purple) - Documentation work
- `type-refactor` (⚫ dark gray) - Code refactoring
- `type-test` (🧪 cyan) - Testing implementation

**Phase Labels**:
- `phase-1` (🔵 dark blue) - Phase 1: Foundation
- `phase-2` (🟦 blue) - Phase 2: Core Implementation
- `phase-3` (🔷 light blue) - Phase 3: Development Process
- `phase-4` (💜 purple) - Phase 4: User Experience
- `phase-5` (🌸 pink) - Phase 5: Advanced Features

**Status Labels** (optional, project board handles most of this):
- `status-blocked` (🔴 red) - Blocked by external dependency
- `status-needs-review` (🟡 yellow) - Ready for review
- `status-ready` (🟢 green) - Ready to start work

#### Step 4: Development Workflow

**Daily Workflow**:
```bash
# 1. Pick an issue from your project board
# 2. Move to "In Progress" column
# 3. Create feature branch
git checkout -b feature/phase-1-task-1

# 4. Do the work, commit referencing issue
git commit -m "feat: initialize nuxt project (#1)

- Set up Nuxt 3 with TypeScript
- Configure Bun package manager
- Create folder structure per plan
- Install core dependencies

Related to fork issue #1"

# 5. Push to fork
git push origin feature/phase-1-task-1

# 6. Open PR on your fork to merge to your main
# 7. Once merged and tested, move to "In Review" on project board
# 8. Open PR to upstream (see Step 5)
```

#### Step 5: Opening PRs to Upstream

When you're ready to submit work to the upstream repository:

**PR Template for Upstream**:
````markdown
## 📋 Overview
Brief description of what this PR implements from the modernization plan.

## 📚 Plan Documents
Links to the plan documents that define this work:
- [01-project-overview.md](https://github.com/adriandarian/osd_website/blob/main/plan/01-project-overview.md)
- [03-technology-stack.md](https://github.com/adriandarian/osd_website/blob/main/plan/03-technology-stack.md)
- [04-project-structure.md](https://github.com/adriandarian/osd_website/blob/main/plan/04-project-structure.md)

## 🔗 Fork Development
- **Fork Issue**: adriandarian/osd_website#1
- **Project Board**: [View Progress](https://github.com/users/adriandarian/projects/X)
- **Branch**: `feature/phase-1-task-1`

## ✨ Changes
Detailed list of what was added/changed:
- ✅ Nuxt 3 project initialized with TypeScript
- ✅ Base folder structure created (apps/, packages/, plan/)
- ✅ Core dependencies installed (see package.json)
- ✅ Development tooling configured (oxlint, git hooks)
- ✅ Tailwind CSS + shadcn-vue set up
- ✅ Basic README with setup instructions

## 🧪 Testing
How this was tested:
- [x] `bun install` completes successfully
- [x] `bun run dev` starts development server
- [x] `bun run build` completes without errors
- [x] TypeScript compilation succeeds
- [x] Linting passes with no errors
- [x] Git hooks execute on commit

## 📸 Screenshots/Demo
If applicable, add screenshots or demo links.

## 🚀 Next Steps
What comes after this PR:
- Phase 1, Task 2: Homepage component development
- See project board for full roadmap

## 💬 Notes
Any additional context for reviewers:
- This is the first PR in the modernization plan
- Establishes foundation for all subsequent work
- All decisions documented in linked plan documents
````

#### Step 6: Tracking Progress

**On Your Project Board**:
1. Create items from fork issues
2. Organize by phase
3. Move through columns as work progresses:
   - **Not Started** → When issue created
   - **In Progress** → When you start working
   - **In Review** → When PR opened to upstream
   - **Merged** → When upstream accepts PR
   - **Future** → For later phases

**Status Updates**:
- Comment on fork issues with progress
- Update project board items
- Link upstream PRs when created
- Close fork issues when upstream PR merged

### Option 2: Request Org Project Setup

If maintainers are interested in actively tracking this work, you can request they set up project infrastructure.

**Create Discussion/Issue in Upstream**:
```markdown
Title: [Discussion] Website Modernization Project Tracking

## Overview
I've been given permission to rewrite the OpenSeadragon website and have completed comprehensive planning (see fork: adriandarian/osd_website).

## Completed Planning
✅ 22 detailed plan documents covering:
- Project overview and architecture
- Technology stack and structure  
- Implementation timeline (9 weeks)
- Testing, deployment, and CI/CD
- Accessibility and internationalization
- Advanced features and future enhancements

📋 View complete plan: [Fork Plan Directory](https://github.com/adriandarian/osd_website/tree/main/plan)

## Tracking Options

I can track this work in one of two ways:

### Option A: Personal Project Board (Recommended)
- I create a public project board on my account
- Track issues on my fork
- Submit PRs to upstream with full context
- Transfer project to org later if desired

**Pros**: 
- ✅ No setup required from maintainers
- ✅ Start immediately
- ✅ Full visibility maintained
- ✅ Can transfer later

### Option B: Org Project Setup
- Maintainers create project board in org
- Create issues/milestones in org repo
- I reference these in PRs from fork

**Pros**:
- ✅ All tracking in org
- ✅ Better long-term integration

**Cons**:
- ⏱️ Requires maintainer setup time
- 📋 More coordination needed

## My Recommendation

I suggest **Option A** to start:
1. I'll create a public project board on my account
2. Track detailed tasks on my fork
3. Submit comprehensive PRs with full context
4. You can view progress anytime
5. Transfer project to org when/if you want it

This lets me start immediately while maintaining full transparency.

## Request

Which approach would you prefer? Or would you like a hybrid approach?

I'm ready to start Phase 1 this week either way.

@maintainer-username
```

## Project Migration Strategy

### When/If Transferring Project to Org

If maintainers later want to adopt the project board:

**Transfer Process**:
1. **Navigate to Project Settings**
   ```
   Project → Settings → Danger Zone → Transfer Project
   ```

2. **Select Target Organization**
   ```
   Transfer to: openseadragon
   Confirm transfer
   ```

3. **Post-Transfer Actions**:
   - ✅ Project history preserved
   - ✅ Structure maintained
   - ⚠️ Update links in documentation
   - ⚠️ Fork issues won't transfer automatically
   - 📝 Consider creating org issues for remaining work

**Alternative: Recreate in Org**
If transfer doesn't work smoothly:
1. Export project data (manual or via API)
2. Create new project in org
3. Recreate board structure
4. Create new issues in org repo
5. Migrate open items

## Issue Templates for Fork

Save these as templates in your fork:

### `.github/ISSUE_TEMPLATE/phase-task.md`
```markdown
---
name: Phase Task
about: Track a specific task from the modernization plan
title: '[Phase X] Task Name'
labels: phase-X, priority-medium
assignees: adriandarian
---

## 📋 Plan Documents
- [XX-document-name.md](link)

## 🎯 Objective
What this task accomplishes.

## ✅ Tasks
- [ ] Task 1
- [ ] Task 2

## 📝 Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## 🔗 Related Work
- Depends on: #X
- Blocks: #Y

## 🚀 Upstream Integration
PR strategy and context.
```

### `.github/PULL_REQUEST_TEMPLATE.md` (for your fork)
```markdown
## 📋 Overview
Brief description of changes.

## 🔗 Closes
Closes #X

## ✅ Changes
- Change 1
- Change 2

## 🧪 Testing
- [x] Tests pass
- [x] Linting passes

## 📝 Notes
Additional context.
```

## Pull Request Template for Upstream

Create this file to use when opening PRs to upstream:

### `UPSTREAM_PR_TEMPLATE.md` (save locally)
````markdown
## 📋 Overview
[Brief description]

## 📚 Plan Documents
- [XX-doc.md](https://github.com/adriandarian/osd_website/blob/main/plan/XX-doc.md)

## 🔗 Fork Development
- **Fork Issue**: adriandarian/osd_website#X
- **Project Board**: [View Progress](https://github.com/users/adriandarian/projects/X)

## ✨ Changes
- ✅ Change 1
- ✅ Change 2

## 🧪 Testing
- [x] Test 1
- [x] Test 2

## 🚀 Next Steps
What comes next.

## 💬 Notes
Additional context.
````

## Benefits of This Approach

### For You (Developer)
- ✅ **Immediate Start**: No waiting for org permissions
- ✅ **Full Control**: Manage your own workflow
- ✅ **Detailed Tracking**: Track granular tasks on your fork
- ✅ **Flexibility**: Iterate and experiment freely
- ✅ **Clean PRs**: Well-documented, contextual pull requests

### For Maintainers
- ✅ **Visibility**: Public project board shows progress
- ✅ **Context**: Every PR includes full documentation
- ✅ **No Setup**: No initial time investment required
- ✅ **Quality**: Comprehensive planning and testing
- ✅ **Optional Adoption**: Can adopt project tracking later

### For Collaboration
- ✅ **Transparency**: All work visible and documented
- ✅ **Traceability**: Clear link from plan → issue → PR
- ✅ **Communication**: Regular updates via project board
- ✅ **Flexibility**: Can adjust approach as needed

## Quick Reference

### Key Links (Update with your actual URLs)
- **Upstream Repo**: `openseadragon/openseadragon.github.io`
- **Your Fork**: `adriandarian/osd_website`
- **Project Board**: `https://github.com/users/adriandarian/projects/X`
- **Plan Documents**: `https://github.com/adriandarian/osd_website/tree/main/plan`

### Common Commands
```bash
# Add upstream remote (if not already added)
git remote add upstream https://github.com/openseadragon/openseadragon.github.io.git

# Sync fork with upstream
git fetch upstream
git merge upstream/main

# Create feature branch
git checkout -b feature/phase-X-task-name

# Commit with issue reference
git commit -m "feat: description (#issue-number)"

# Push to fork
git push origin feature/phase-X-task-name

# After PR merged to upstream, sync fork
git fetch upstream
git merge upstream/main
git push origin main
```

### Project Board Workflow
```
1. Create issue on fork
2. Add to project board → "Not Started"
3. Start work → Move to "In Progress"
4. Open PR to upstream → Move to "In Review"
5. PR merged → Move to "Merged"
6. Close fork issue
```

## Timeline Integration

Based on the [05-timeline.md](./05-timeline.md) plan, issues should be created in batches:

### Week 1 Setup
- Create project board
- Create Phase 1 issues (5-10 issues)
- Set up labels and templates
- Initialize first tasks

### Ongoing
- Create next phase issues as current phase nears completion
- Update project board weekly
- Close completed issues after upstream merge
- Track blockers and dependencies

## Communication Strategy

### Weekly Updates (Optional)
Post progress updates in upstream repo discussions:
```markdown
## Week X Progress Update

### Completed This Week
- ✅ Task 1 - PR #X merged
- ✅ Task 2 - PR #Y merged

### In Progress
- 🏗️ Task 3 - PR #Z in review
- 🏗️ Task 4 - Development ongoing

### Coming Next Week
- 📋 Task 5 - Starting Monday
- 📋 Task 6 - Blocked by external dependency

### Project Board
[View detailed status](project board link)
```

## Conclusion

This workflow provides:
- **Independence**: Work without blocking on org permissions
- **Transparency**: Full visibility for maintainers
- **Quality**: Comprehensive documentation and planning
- **Flexibility**: Adapt approach as needed
- **Scalability**: Can transfer/migrate later if desired

Start with the personal project board approach, maintain excellent documentation in PRs, and adjust based on maintainer feedback.
