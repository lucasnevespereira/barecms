## 🤝 Contributing to BareCMS

We welcome and appreciate contributions to BareCMS! Whether it's a bug fix, a new feature, documentation improvements, or simply reporting an issue, your help makes BareCMS better for everyone.

Please take a moment to review this guide before making your first contribution.

### How to Contribute

The general workflow for contributing involves forking the repository, making your changes, and submitting a Pull Request.

**1. Fork the Repository**

First, you'll need to create your own copy of the BareCMS repository:

- Go to the [BareCMS GitHub repository](https://github.com/snowztech/barecms).

- Click the "Fork" button in the top right corner. This will create a copy of the repository under your GitHub account.

**2. Clone Your Fork**

Now, clone your forked repository to your local machine:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/barecms.git
cd barecms
```

**3. Set Up the Upstream Remote**

To keep your local repository synchronized with the original BareCMS repository (the "upstream"), you need to add it as a remote:

```bash
git remote add upstream https://github.com/snowztech/barecms.git
git remote -v
# You should see 'origin' pointing to your fork and 'upstream' pointing to the main BareCMS repo.
```

**4. Create a New Branch**

It's crucial to work on a new branch for each feature or bug fix. This keeps your changes isolated and makes merging easier. Choose a descriptive name for your branch (e.g., `feature/add-auth-middleware`, `fix/login-bug`).

```
git checkout main
git pull upstream main # Ensure your local main is up-to-date
git checkout -b feature/your-feature-name
```

**5. Make Your Changes**

Implement your feature or fix the bug. Remember to:

- Follow existing code style.
- Update documentation if your changes affect how the project is used or configured.

**Rebase with Upstream (Keeping Your Branch Up-to-Date)**

Before committing and pushing, it's a good practice to rebase your branch with the latest changes from the upstream/main branch. This keeps your commit history clean and avoids unnecessary merge commits.

```bash
git fetch upstream
git rebase upstream/main
```

- **Resolve Conflicts:** If there are any conflicts during the rebase, Git will pause and ask you to resolve them. After resolving, use `git add --all` and then `git rebase --continue`.

- **Force Push (if you've already pushed):** If you've already pushed your branch to your fork before rebasing, you'll need to force push after rebasing: `git push --force-with-lease origin feature/your-feature-name`. Be cautious with `git push --force` as it can overwrite history. `git push --force-with-lease` is safer.

**7. Commit Your Changes**

Once your changes are complete and rebased, commit them with a clear and concise commit message.

```bash
git add --all
git commit -m "feat: Add a concise description of your feature or fix"
```

- **Commit Message Guidelines:** Aim for clear, descriptive, and atomic commits. A good commit message explains what was changed and why. Consider using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (e.g., `feat:`, `fix:`, `docs:`, `chore:`) for consistency.

**8. Push to your Fork**

Push your new branch with your committed changes to your forked repository on GitHub:

```bash
git push origin feature/your-feature-name
```

**9. Open a Pull Request (PR)**

Finally, go to the original BareCMS GitHub repository. GitHub will usually detect your new branch and prompt you to open a Pull Request.

**Title:** Provide a clear and descriptive title for your PR.

**Description:** Explain the purpose of your changes, what problem they solve, and any relevant details. Reference any related issues (e.g., `Closes #123`).

**Review:** Be prepared for feedback and discussions during the review process. Address comments and make further commits to your branch as needed.

---

Thank you for contributing to BareCMS!
