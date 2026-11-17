# Ayyanar Gold Bank

Static bilingual Tamil/English website files for GitHub Pages and Netlify.

## Keep this layout together

- `index.html`
- `styles.css`
- `app.js`
- `assets/ayyanar-gold-bank-logo.png` — original logo file
- `assets/yukesh-varma-md.jpg` — original MD photo
- `netlify.toml`

The logo and MD photo are embedded directly in `index.html`, so they still display if a host accidentally omits the `assets/` folder. The original image files are included in `assets/` as well.

## Netlify

The included `netlify.toml` sets the publish directory to the repository root. For a manual deploy, extract this ZIP first and upload the folder containing `index.html`—do not upload only the HTML file.

## GitHub Pages

Upload all files and the `assets/` folder to the root of your GitHub repository, then configure Pages to serve the repository root.

The live ticker fetches indicative gold and silver spot prices from Gold API. It derives a 916 reference from the 24K spot price; the branch appraisal remains the final pledge quote. The chatbot uses the page's built-in Ayyanar Gold Bank facts and does not use Vapi. Browser speech depends on device/browser support.
