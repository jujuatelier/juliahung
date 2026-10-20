# Codex cheat sheet

One page for everyday website updates. First-time setup, and the longer
explanations, live in [`DEVELOPING_WITH_CODEX.md`](./DEVELOPING_WITH_CODEX.md).

## The three words to know

| Word | What it means | The command |
| --- | --- | --- |
| **Pull** | Download everyone else's latest changes from GitHub. | `git pull` |
| **Commit** | Save a named snapshot of your changes, on your Mac only. | `git commit -m "message"` |
| **Push** | Upload your commits to GitHub. This publishes the website. | `git push` |

Always in that order: **pull → edit → commit → push.**

## Every session

1. **Open** the Codex app on the `juliahung` folder.
2. **Pull** first:
   > Pull the latest changes from GitHub. Do not discard any of my work.
3. **Ask for your change** in plain words:
   > On the About page, change the first paragraph to: "…". Keep the current style.
4. **Preview** it:
   > Start the local preview and tell me which address to open.

   Open the address (usually <http://localhost:8000>) and refresh after each change.
5. **Check** it:
   > Show me what changed and run the site checks. Do not commit yet.
6. **Commit and push** once you are happy:
   > Commit only the files for this change with a clear message, then push.
7. **Confirm** it is live, a few minutes later, at
   <https://www.jujuhung.com/>. If the old version still shows, press
   **Command-Shift-R**.

Pushing publishes straight to the public website; there is no separate test
site. Step 4, the preview on your own Mac, is your chance to catch mistakes.

## The commands Codex runs for you

You never need to type these, but you will see them when Codex asks
permission. This is what each one does:

```bash
git status                      # What have I changed? (safe, changes nothing)
git diff                        # Show the changes line by line (safe)
git pull                        # Download the latest from GitHub
git add about/index.html        # Put this file in the next snapshot
git commit -m "Update About bio"  # Save the snapshot on this Mac
git push                        # Upload to GitHub and publish
git log --oneline -5            # List the last five snapshots (safe)
```

## Approve or decline?

**Approve** when the request matches what you asked for: `git status`,
`git diff`, `git pull`, `git add`, `git commit`, `git push`, or starting and
stopping the preview.

**Decline and ask why** if you see any of these. They can erase work:

- `git reset --hard`
- `git push --force` (or `-f`)
- `git checkout .` or `git restore .`
- `git clean`
- `rm -rf`

## When something goes wrong

Copy the exact error message into Codex and ask:

> What does this error mean? Explain it before changing anything.

| Message | Usual cause |
| --- | --- |
| `! [rejected]` when pushing | Someone else pushed first. Ask Codex to pull, then push again. |
| `CONFLICT` | You and someone else edited the same lines. Ask Codex to show both versions so you can choose. |
| `Authentication failed` | The GitHub sign-in expired. Run `gh auth login` in Terminal. |
| `nothing to commit` | There are no unsaved changes, so nothing is wrong. |
