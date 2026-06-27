# CODSOFT — Web Development Internship

This repository contains my submissions for the **CodSoft Web Development Internship — Level 1**. All three tasks are built as standalone projects using plain **HTML, CSS, and JavaScript** — no frameworks, no build tools.

> 🎓 Internship by [CodSoft](https://www.codsoft.in) · #codsoft #internship #webdevelopment

---

## 🔗 Live Demos

| Task | Project | Live Link |
|------|---------|-----------|
| 1 | Personal Portfolio | [yash-bhirud-resume-portfolio.netlify.app](https://yash-bhirud-resume-portfolio.netlify.app/) |
| 2 | Landing Page (Loopline) | [landing-page-loopline.netlify.app](https://landing-page-loopline.netlify.app/) |
| 3 | Calculator | [solar-calc-page.netlify.app](https://solar-calc-page.netlify.app/) |

---

## 📁 Repository Structure

```
CODSOFT/
├── task1-portfolio/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── about-photo.jpg
│   └── Yash_Bhirud_Resume.pdf
├── task2-landing/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── task3-calculator/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🧩 Task 1 — Personal Portfolio

A developer portfolio styled like a dark code editor / terminal — sections are framed as file tabs (`about.md`, `skills.json`, `projects.js`, `resume.pdf`, `contact.sh`) with a live-typing terminal animation in the hero.

**Highlights**
- Animated terminal intro built with vanilla JS (no libraries)
- Sections for About, Skills, Projects, Résumé download, and Contact
- Real projects featured: **FindIt** (AI-powered lost & found) and **MedEase** (hospital management system)
- Fully responsive — collapses cleanly to a single column on mobile
- One-page résumé generated from CV content, downloadable as PDF directly from the page

**Tech:** HTML5 · CSS3 (Grid/Flexbox) · Vanilla JavaScript

---

## 🧩 Task 2 — Landing Page (Loopline)

A landing page for **Loopline**, a fictional lightweight task-tracking SaaS product. Designed with a bold, neo-brutalist style — sharp borders, offset drop-shadows, and a tilted "sticky note" card stack as the hero's signature visual.

**Highlights**
- Sections: Hero, social proof strip, How It Works, Features, Pricing, Signup CTA
- Interactive signup form with client-side validation feedback
- Subtle mouse-parallax on the hero's card stack
- Fully responsive layout

**Tech:** HTML5 · CSS3 · Vanilla JavaScript

---

## 🧩 Task 3 — Calculator

A calculator styled to look and feel like a real tactile desk calculator — embossed keys, an LCD-style display with scanline texture, and a satisfying key-press animation.

**Highlights**
- All standard operations: add, subtract, multiply, divide, percent
- Operator chaining (e.g. `12 + 8 + 5 =`) and running expression display
- Keyboard support (numbers, `+ − * /`, `Enter`, `Backspace`, `Esc`)
- Handles edge cases: divide-by-zero, floating-point rounding, long-number formatting

**Tech:** HTML5 · CSS3 · Vanilla JavaScript

---

## 🚀 Running Locally

Each task is self-contained — no dependencies or build step required.

```bash
git clone https://github.com/yash-code123/CODSOFT.git
cd CODSOFT/task1-portfolio   # or task2-landing / task3-calculator
```

Then simply open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

and visit `http://localhost:8000`.

---

## 🛠️ Tech Stack (Overall)

`HTML5` · `CSS3` (Grid, Flexbox, custom properties) · `JavaScript (ES6+)` — no frameworks or build tools used anywhere in this repo.

---

## 👤 Author

**Yash Bhirud**
Computer Science (Data Science) Student · Full Stack Developer · AI Enthusiast

- 📧 yashbhirud19@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/yash-bhirud-680817358)
- 🐙 [GitHub](https://github.com/yash-code123)

---

## 📜 License

This project was built for educational purposes as part of the CodSoft internship program. Feel free to explore the code for learning — please avoid direct resubmission as your own internship work.
