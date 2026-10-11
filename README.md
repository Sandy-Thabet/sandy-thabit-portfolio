# Sandy Thabit — Portfolio (Security Focus)

Source export of the portfolio hosted at https://nkqrnl.hatchable.site/.

## Files

- `public/index.html` — portfolio frontend (HTML, CSS, and client-side JavaScript).
- `api/ask.js` — the Ask Sandy endpoint. It uses Hatchable's `ai.generateText()` runtime.
- `hatchable.toml` — Hatchable AI configuration.
- `.gitignore` — common local/build exclusions.

## One asset still needs to be added

The original `public/avatar.png` is stored as a binary Hatchable asset, but this export interface did not expose its bytes. Before pushing, retrieve the original image from the Hatchable project and add it at exactly:

```
public/avatar.png
```

The HTML references that path, so the avatar will not render in the exported copy until the file is restored.

## Push to GitHub

Unzip this archive, open a terminal in the extracted folder, then run:

```bash
git init
git add .
git commit -m "Add portfolio source"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/sandy-thabit-portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If you already created an empty GitHub repository, use its actual URL in the `git remote add origin` command.

## Important runtime note

This is a source backup, not a ready-to-deploy GitHub Pages package. The frontend is static, but `api/ask.js` relies on Hatchable's server runtime and AI integration. GitHub can store/version the code; pushing the repository alone will not run that API endpoint. Keep the app on Hatchable or migrate the endpoint to another backend and update the frontend API URL before hosting elsewhere.

No API keys or environment secrets are included in this archive.
