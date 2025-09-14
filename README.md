# 🧠 Kahoot Style Trivia Game

This application is a full-featured, real-time multiplayer quiz platform built with **React.js** on the frontend and a provided RESTful backend. Designed as a fully single-page application (SPA), BigBrain enables **admins** to create, manage, and host live game sessions, and allows **players** to join and participate in trivia challenges via a session link.

The app features dynamic screen transitions, secure user authentication, responsive design, and both **admin and player** experiences. Players can view real-time questions, select answers, and see results, while admins can manage games, launch sessions, and view performance analytics.

---

## 🚀 Live Demo

https://bigbrain-deployment-conenose.vercel.app/

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Material UI (MUI)
- Bootstrap
- CSS Modules / SCSS
- Axios
- Vitest (Component Testing)
- Cypress or Playwright (UI Testing)

### Backend *(Provided)*
- RESTful API
- JSON-based game blob storage
- Node.js (presumed)

---

## ✨ Key Features

### 👨‍💼 Admin Functionality
- **Authentication**
  - Register/login with email, password, and name
  - Password confirmation with validation
  - Logout button accessible from all screens

- **Game Management**
  - Dashboard to list all created games
  - Create a new game instantly via modal or popup
  - Edit game metadata and manage questions
  - Delete games

- **Question Editor**
  - Support for single-choice, multi-choice, and judgment type questions
  - Add, edit, or delete questions
  - Time limit, points, and option to include image/video

### 🎮 Game Hosting
- **Start Sessions**
  - Start button for live game sessions
  - Session ID popup with copy-to-clipboard functionality
  - Dynamic UI reflecting session state

- **Advance / Stop Sessions**
  - Navigate through game questions
  - Stop session and redirect players to results
  - Prompt admin to view results upon stopping

- **Session Results**
  - Results screen with:
    - Top 5 players and their scores
    - Charts showing:
      - % of users who got each question correct
      - Average response time per question

### 🙋 Player Functionality
- **Join Game**
  - Enter session via session ID or direct URL
  - Enter name to join game
  - Cannot join after game starts

- **Play Game**
  - Real-time questions with countdown
  - Media support (image or YouTube link)
  - Interactive answers for all question types
  - Submit/modify answers before time ends
  - View correct answer after each question

- **End of Game**
  - View personal results including:
    - Score per question
    - Time taken per question

---

## 🧪 Testing

### ✅ Component Testing (Vitest)
### ✅ UI Testing (Cypress or Playwright)
- Full "happy path" test flow:
  - (e.g. Register → Create game → Start session → Stop session → View results → Logout → Login)

---

## 🎓 Academic Note

This project was developed as part of a university assignment and is intended for educational purposes only. It may not follow all best practices for production-grade applications.
