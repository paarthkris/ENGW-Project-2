# ATTACK_SURFACE — Project #2 site

A retro "cyber terminal" explainer website about **prompt injection**, written for a general audience.
Plain HTML/CSS/JavaScript — no frameworks, no build step. Every effect (the falling code-rain, the
glitch title, the "GO to enter" boot screen, the CRT scanlines) is original code you fully own.

## Files
```
project2-site/
├── index.html        # the whole site: boot screen + 5 tabs
├── references.html   # Works Cited page (for your instructor)
├── css/style.css     # the retro terminal theme
├── js/matrix.js      # the green falling-code background
├── js/main.js        # boot→enter transition + tab routing
├── assets/           # (optional) images — remember to caption/cite any you add
└── README.md         # this file
```

## Preview it on your own computer
You can just double-click `index.html` — but a tiny local server behaves more like the real thing:

```bash
cd "project2-site"
python3 -m http.server 8000
```
Then open **http://localhost:8000** in your browser. Press **GO** (or Enter) to go past the intro.

## Edit the content
- **All the text and both diagrams live in `index.html`**, inside the five `<section class="tab">` blocks
  (`home`, `about`, `prompt-injection`, `what-it-looks-like`, `context-memo`). Edit the words there.
- **Rename the big glitch title** ("ATTACK_SURFACE"): change it in two spots near the top of `index.html`
  — the `<h1 class="glitch" data-text="...">...</h1>` (change BOTH the `data-text` and the text between the
  tags so the glitch layers match).
- **Change colors/fonts:** edit the variables at the very top of `css/style.css` (`--green`, `--bg`, etc.).
- **Fill in your sources:** edit `references.html` and replace the placeholder list with your real Works Cited.

## Publish it FREE on GitHub Pages (shareable link)
You'll need a free GitHub account. I can't log in as you, so here are the exact steps:

1. Go to **https://github.com** and sign up (free) / log in.
2. Click the **+** (top right) → **New repository**.
   - **Repository name:** something like `prompt-injection` (this becomes part of your URL).
   - Set it to **Public**. Leave everything else default. Click **Create repository**.
3. On the new repo page, click **uploading an existing file** (or **Add file → Upload files**).
4. Drag in the **contents** of the `project2-site` folder — that means `index.html`, `references.html`,
   and the `css/` and `js/` folders — so that `index.html` sits at the top level of the repo (not inside
   a `project2-site` subfolder). Click **Commit changes**.
5. Go to the repo's **Settings** → **Pages** (left sidebar).
6. Under **Build and deployment → Source**, choose **Deploy from a branch**. Set the branch to **main**
   and the folder to **/(root)**. Click **Save**.
7. Wait ~1 minute, then refresh. GitHub shows your live link at the top of the Pages settings, in the form:

   ```
   https://YOUR-USERNAME.github.io/prompt-injection/
   ```

That's the URL you send to your professor and anyone else. Every time you upload updated files, the live
site refreshes within a minute.

> Tip: if you'd rather have the cleaner URL `https://YOUR-USERNAME.github.io/`, name the repository exactly
> `YOUR-USERNAME.github.io` in step 2 instead.

## Notes
- This is a writing course: the drafted text is a **starting point**. Read it through and make the wording
  your own — especially the Context Memo and the Reflection, which should be in your voice.
- Confirm the total word count (site copy + context memo) clears the 1,000-word floor after your edits.
- If you add any images to `assets/`, put a caption + source credit right under each one.
