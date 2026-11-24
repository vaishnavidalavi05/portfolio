# Vaishnavi M Dalavi — Premium Developer Portfolio

A modern, premium, animated developer portfolio website for **Vaishnavi M Dalavi**, 1st-year MCA student at **Poornaprajna Institute of Management (PIM)**, Udupi, Karnataka.

Inspired by the visual design style, generous editorial layout, micro-interactions, and animations of **Hudson**, tailored uniquely to showcase Vaishnavi's authentic academic rigor, technical competencies, and real projects.

Live Deployment: [vaishnavi-d.vercel.app](https://vaishnavi-d.vercel.app/)  
GitHub Repository: [github.com/vaishnavidalavi05/portfolio](https://github.com/vaishnavidalavi05/portfolio)

---

## ✨ Design Architecture & Visual Style

- **Dark Obsidian & Radiant Ember Palette:** Built on deep obsidian black (`#09090C`), rich charcoal cards (`#14141B` / `#1B1B25`), crisp white typography (`#F8FAFC`), and subtle ember orange accents (`#FF6B2B` / `#F97316`).
- **Editorial Typography Scale:** Uses **Syne** for bold display headings, **Plus Jakarta Sans** for body text, and **Space Grotesk** for code and technical tags.
- **Hudson Asymmetric Editorial Layout:** Clean layout with generous spacing, prominent indices (`00`, `01`, `02`), and asymmetric project cards.
- **Subtle Theme Switcher:** Features a smooth dark/light mode toggle with preference persistence in `localStorage`.

---

## 🎬 Animations & Interactive Features

1. **Smooth Preloader Screen:** Minimalist monogram countdown (`00%` &rarr; `100%`) with progress bar and seamless reveal.
2. **Scroll Progress Indicator:** Real-time gradient progress bar at the top of the viewport.
3. **Interactive Custom Cursor:** Smooth lagging circular cursor with hover scale on interactive elements (automatically disabled on mobile/touch).
4. **Hero Dynamic Role Typewriter:** Rotates through key identities (*Aspiring Software Developer*, *1st Year MCA Student*, *Web Application Creator*, *Relational DB Enthusiast*).
5. **Scroll-Triggered Reveals:** IntersectionObserver triggers smooth fade-up transitions for sections and cards.
6. **Animated Underline Navigation:** Sticky glassmorphic navbar with dynamic sliding indicator on hover and scrollspy tracking.
7. **Interactive Skills Bento:** Animated progress meters that fill smoothly when scrolled into view, with verified evaluation standards.
8. **Asymmetric Project Showcase:** Interactive browser mockup frame simulating the live Catering Management System admin dashboard with real-time billing calculations.
9. **Interactive Modals:** Detailed project specs modal and a printable resume modal with a 1-click **Print / Save as PDF** feature.
10. **One-Click Clipboard Touchpoints:** Instant copy buttons for email (`vdalavi005@gmail.com`) and phone (`+91 7899420886`) with toast feedback.

---

## 📂 Project Structure

```text
c:\Users\vdala\resume\
├── index.html          # Semantic HTML5 document with Hudson editorial sections
├── css\
│   └── style.css       # Obsidian dark theme, design tokens, micro-interactions, print styles
├── js\
│   └── main.js         # Preloader, cursor, scroll progress, typewriter, filters, modals
├── assets\             # Directory for assets and icons
├── .gitignore          # Git ignore rules
└── README.md           # Documentation and preview instructions
```

---

## 💻 How to Preview Locally

Open `index.html` directly in any modern browser, or launch a lightweight local server:

```bash
# In the project directory:
python -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080) in your web browser.
