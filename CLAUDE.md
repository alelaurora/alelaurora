# CLAUDE.md — AI Assistant Guide for alelaurora/alelaurora

## Project Overview

This is a **static HTML portfolio website** for Alejandro Laurora, a Product Designer. The site is hosted at [alelaurora.com](https://alelaurora.com) via GitHub Pages.

- **Type**: Static website (no build step, no server-side code)
- **Domain**: Configured via `CNAME` file → `alelaurora.com`
- **Deployment**: GitHub Pages (auto-deploys from the `dev` branch)

---

## Repository Structure

```
alelaurora/
├── index.html                    # Landing page with portfolio grid + filter
├── about.html                    # Designer bio page
├── bioma.html                    # Case study: BIOMA Design System (La Segunda)
├── keep-climbing.html            # Case study: Delta project
├── litoral-gas.html              # Case study: Litoral Gas redesign
├── patient-online-services.html  # Case study: Mayo Clinic patient portal
├── CNAME                         # GitHub Pages custom domain config
├── .gitignore                    # Excludes .DS_Store and misc images
└── assets/
    ├── css/
    │   └── style.css             # All custom styles (552 lines)
    ├── js/
    │   └── main.js               # All custom JS (110 lines)
    ├── img/
    │   ├── bioma/                # BIOMA project images
    │   ├── delta/                # Delta/Keep Climbing images
    │   ├── lg/                   # Litoral Gas images
    │   ├── pos/                  # Patient Online Services images
    │   └── company-logos/        # Client logos (including dark variants)
    └── vendor/                   # Third-party libraries (committed directly)
        ├── aos/                  # Animate on Scroll
        ├── bootstrap/            # Bootstrap 5
        ├── bootstrap-icons/      # Icon font
        ├── isotope-layout/       # Portfolio filtering and masonry grid
        ├── php-email-form/       # Email form validation helper
        └── swiper/               # Carousel/slider
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 + Bootstrap 5 |
| Interactivity | Vanilla JavaScript (ES5/ES6) |
| Grid/Masonry | Isotope Layout |
| Animations | AOS (Animate on Scroll) |
| Carousel | Swiper.js |
| Icons | Bootstrap Icons |
| Font | Inter (Google Fonts CDN) |

**There is no build pipeline.** No npm, no Node.js, no webpack, no compilation step. All vendor libraries are vendored (committed directly to the repo under `assets/vendor/`).

---

## Development Workflow

### Running Locally

Since this is a pure static site, you can serve it with any local HTTP server:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node.js (if available)
npx serve .

# VS Code Live Server extension also works
```

Then open `http://localhost:8080` in a browser.

> Do NOT open HTML files directly via `file://` — some features (AOS, Isotope) may not initialize correctly without an HTTP context.

### Git Branches

- **`dev`** — main development branch; GitHub Pages deploys from here
- **`claude/*`** — feature/task branches created by AI assistants

Always develop on the `claude/add-claude-documentation-KniVS` branch (or whichever branch you are assigned). Merge into `dev` via pull request.

### No Tests

There is no test suite. Verify changes visually by loading pages in a browser and checking:
- Responsive layout at mobile (375px), tablet (768px), and desktop (1280px+)
- Portfolio filter buttons on `index.html` (All / Web / Design)
- Image loading on all case study pages
- Navigation and social links

---

## Design System & Conventions

### CSS Variables (defined in `assets/css/style.css`)

```css
--Accent:    #6aba83   /* Primary green accent */
--Neutral-1: #1a1a1a   /* Near-black text */
--Neutral-2: #e7e7e7   /* Light gray backgrounds */
```

Always use these variables for consistent theming rather than hardcoding hex values.

### Typography

- **Font family**: `Inter` (loaded from Google Fonts CDN in each HTML file)
- Weights used: 300, 400, 500, 600, 700

### Class Naming

- Bootstrap utility classes are used heavily (`d-flex`, `col-md-6`, `mb-4`, etc.)
- Custom classes follow lowercase kebab-case: `.portfolio-item`, `.filter-btn`, `.burger-menu`
- No CSS preprocessor or BEM methodology — keep naming simple and descriptive

### HTML Page Structure

Each page follows this pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags, title, favicon -->
  <!-- Google Fonts (Inter) -->
  <!-- vendor CSS: bootstrap, bootstrap-icons, aos, swiper -->
  <!-- Custom CSS: assets/css/style.css -->
</head>
<body>
  <!-- Navigation -->
  <header>...</header>

  <!-- Page content -->
  <main>...</main>

  <!-- Footer with social links -->
  <footer>...</footer>

  <!-- vendor JS: bootstrap, isotope, aos, swiper -->
  <!-- Custom JS: assets/js/main.js -->
</body>
</html>
```

Scripts are loaded at the **bottom of `<body>`** — maintain this order.

---

## Key JavaScript Patterns (`assets/js/main.js`)

The file uses three helper functions defined at the top:

```js
const select = (el, all = false) => { ... }  // querySelector wrapper
const on = (type, el, listener, all = false) => { ... }  // addEventListener wrapper
const onscroll = (el, listener) => { ... }  // scroll event wrapper
```

Use these helpers when adding new interactive behavior rather than calling `document.querySelector` directly.

**Isotope** (portfolio filtering) is initialized as:
```js
let portfolioIsotope = new Isotope('.portfolio-container', {
  itemSelector: '.portfolio-item',
  layoutMode: 'fitRows'
});
```

Filter buttons use `data-filter` attributes (e.g., `data-filter=".filter-web"`).

**AOS** is initialized globally: `AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, ... })`.

---

## Adding a New Case Study Page

1. Copy an existing case study HTML file (e.g., `bioma.html`) as a template.
2. Update all text content, image `src` attributes, and `alt` text.
3. Create a subdirectory under `assets/img/` for the new project's images.
4. Add a portfolio card in `index.html` inside `.portfolio-container`:
   ```html
   <div class="portfolio-item filter-design">
     <a href="new-project.html">
       <img src="assets/img/new-project/cover.jpg" alt="Project Name">
       <div class="portfolio-overlay">
         <h4>Project Name</h4>
         <span>Design</span>
       </div>
     </a>
   </div>
   ```
5. Assign the correct filter class (`filter-web` or `filter-design`) to match the Isotope filter buttons.

---

## Important Conventions

- **No build step** — never introduce npm scripts, webpack, or compilation without explicit discussion
- **Vendor libraries are committed** — do not add CDN links for libraries already vendored; update the vendored files if upgrading
- **Duplicate files** (`style 2.css`, `main 2.js`) are legacy backups — do not edit these; they exist for reference only
- **Images are not gitignored** except specific misc files listed in `.gitignore` — commit project images directly
- **No backend** — the site has no server, no database, no API. Keep it static
- **Contact email** is `alelaurora@gmail.com` — appears in footer across all pages; update all pages if it changes

---

## File Hygiene

- `.DS_Store` files are gitignored — never commit them
- Images in `assets/img/misc/` are gitignored — don't rely on them being present in CI or remote
- Avoid adding files with spaces in the name (legacy files `style 2.css`, `main 2.js` exist but follow the no-space naming convention going forward)
