# 🎓 ClickSmart – Next.js + TypeScript

[Vercel Deploy](https://clicksmart-web.vercel.app/pt)

Welcome to the **ClickSmart** project, an interactive application developed in **Next.js** and **TypeScript** to promote digital education and the prevention of cyberbullying among young people, through games and realistic simulations.

Access the online application: **[https://clicksmart-web.vercel.app/pt](https://clicksmart-web.vercel.app/pt)**

---

## 🏗️ System Architecture

The system is designed to be modular, scalable, and easily internationalizable:

- **Frontend:**  
  - Framework: [Next.js](https://nextjs.org/)
  - Language: TypeScript
  - Styling: Tailwind CSS
  - Animations: Framer Motion
  - Internationalization: next-intl (Portuguese and English)
- **Game Structure:**  
  - Autonomous components for each game or activity (e.g.: ChatGame, FakenewsCreator)
  - Scoring and feedback system for each scenario
- **Translation files:**  
  - Folders `/messages/pt.json` and `/messages/en.json` for multilingual content
- **Hosting:**  
  - Automatic deploy via [Vercel](https://vercel.com/), ensuring high availability and easy scalability

```
├── components/
│   ├── game/
│   │   ├── ChatGame.tsx         # Chat simulation game
│   │   └── FakenewsCreator.tsx  # Fake news game
│   └── ... (other components)
├── messages/
│   ├── en.json                  # English translations
│   └── pt.json                  # Portuguese translations
├── pages/
│   ├── index.tsx                # Home page
│   ├── games/                   # Game pages
│   └── ... (other pages)
└── ...
```

---

## 🚀 Usage

Access the application directly at:  
👉 **[https://clicksmart-web.vercel.app/pt](https://clicksmart-web.vercel.app/pt)**

---

## 👤 User Guide

### 1. Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sebastianascimento/clicksmart-web.git
   cd clicksmart-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or, use the Makefile:
   make run
   ```

4. **Open in the browser:**  
   [http://localhost:3000](http://localhost:3000)

---

### 2. User Guide (How to Use the Application)

- **Navigate through the main menu** to access the games and educational activities.
- **Chat Game:**  
  - Simulates group conversations where cyberbullying situations occur.
  - The user chooses how to respond to offensive messages, receiving points and feedback according to their choices.
  - Available in Portuguese and English (change the language in the menu).
- **Fake News Creator Game:**  
  - Create and analyze fake news to understand the impact of misinformation.
  - Educational feedback at the end of each scenario.
- **Scoring System:**  
  - Your choices in each scenario offer immediate feedback and a final score.

---

## 📦 Deployment

The application is hosted and available via [Vercel](https://vercel.com/):

- Continuous deploy via push to the main branch
- Production link: **[https://clicksmart-web.vercel.app/pt](https://clicksmart-web.vercel.app/pt)**

---

## 📚 More Information

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🤝 Contributions

Contributions are welcome! Follow the steps below:

```bash
# 1. Fork the project
# 2. Create a branch for your feature or fix
git checkout -b feature/NewFeature

# 3. Commit your changes
git commit -m "Add NewFeature"

# 4. Push to your fork
git push origin feature/NewFeature

# 5. Open a Pull Request 🎉
```

---

Made with ❤️ to promote safety and respect online.  
Access: **[https://clicksmart-web.vercel.app/pt](https://clicksmart-web.vercel.app/pt)**