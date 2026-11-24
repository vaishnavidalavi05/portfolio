# Vaishnavi M Dalavi — Developer Portfolio Website

A fast, accessible, responsive personal developer portfolio website for **Vaishnavi M Dalavi**, 1st year MCA student at **Poornaprajna Institute of Management (PIM)**, Udupi, Karnataka.

Built strictly using standard **HTML5, CSS3, and vanilla JavaScript** with zero external runtime dependencies.

---

## 🚀 Key Features

- **Modern Developer Aesthetic:** Built with the **Orange & Charcoal** color scheme (`#EA580C` / `#F97316` and dark charcoal neutrals).
- **Default Appearance Mode:** Light Theme with dynamic **Dark / Light theme switcher** that persists in `localStorage`.
- **Text-Focused Hero Showcase:** Prominently highlights the headline *"1st year MCA student Aspiring software Developer"*, location badge, institution badge, and primary calls-to-action.
- **Accurate & Verified Expertise Badges:** Strictly adheres to verified skill self-evaluations across:
  - **Core Programming:** Python (Basic), Java (Basic)
  - **Web Fundamentals:** HTML5 (Basic), CSS3 (Beginner), JavaScript (Beginner)
  - **Backend:** Flask (Beginner)
  - **Databases:** SQLite (Beginner), MySQL (Beginner)
  - **Tools:** GitHub (Basic), VS Code (Beginner), NumPy (Basic)
  - **Core CS:** OOP (Basic), Data Structures & Algorithms (Beginner)
- **Real Project Showcase:** Detailed feature showcase for the **Catering Management System**, covering the problem solved, tech stack, and key engineering contributions (interactive menu & cart, admin dashboard, SQLite integration, automated billing with GST and discounts).
- **Interactive Project & Resume Modals:**
  - In-depth architectural modal for the project.
  - Recruiter-ready printable resume modal with a one-click **Print / Save as PDF** feature (`@media print` optimized).
- **Contact & Social Network:** Working direct email mailto links, one-click copy buttons for email and phone with toast feedback, and direct verified links to GitHub and LinkedIn.
- **Fully Responsive & Accessible:** WCAG 2.1 AA compliant, semantic markup, visible focus outlines, screen-reader friendly attributes, and responsive mobile navigation drawer.

---

## 📂 Project Structure

```text
c:\Users\vdala\resume\
├── index.html          # Main HTML5 document with complete semantic hierarchy
├── css\
│   └── style.css       # Custom properties, Orange & Charcoal theme, responsive layout, print styles
├── js\
│   └── main.js         # Theme toggle, drawer navigation, scroll spy, filtering, clipboard, modals
├── assets\             # Directory for assets and icons
└── README.md           # Documentation and preview instructions
```

---

## 💻 How to View & Preview Locally

You can open `index.html` directly in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox) or run a local lightweight Python web server:

```bash
# In this directory (c:\Users\vdala\resume):
python -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080) in your web browser.

---

## 🌐 Free Deployment Options

- **GitHub Pages:** Push this folder to a GitHub repository named `vaishnavidalavi.github.io` (or enable GitHub Pages under repository Settings > Pages).
- **Vercel / Netlify:** Drag-and-drop the project folder to deploy in seconds.
