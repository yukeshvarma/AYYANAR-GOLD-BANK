# Ayyanar Gold Bank

Static bilingual Tamil/English website files for GitHub Pages and Netlify.

## Keep this layout together

- `index.html`
- `styles.css`
- `app.js`
- `assets/ayyanar-gold-bank-logo.png`
- `assets/yukesh-varma-md.jpg`
- `netlify.toml`

The logo and MD photo use relative paths under `assets/`. Keep the `assets` folder beside `index.html` in the published root.

## Netlify

The included `netlify.toml` sets the publish directory to the repository root. For a manual deploy, extract this ZIP first and upload the folder containing `index.html` and `assets/`—do not upload only the HTML file.

## GitHub Pages

Upload all files and the `assets/` folder to the root of your GitHub repository, then configure Pages to serve the repository root.

The live ticker fetches indicative gold and silver spot prices from Gold API. It derives a 916 reference from the 24K spot price; the branch appraisal remains the final pledge quote. The chatbot uses the page's built-in Ayyanar Gold Bank facts and does not use Vapi. Browser speech depends on device/browser support.
