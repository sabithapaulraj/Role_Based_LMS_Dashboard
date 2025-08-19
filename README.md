# LMS Dashboard Project


## Overview
Learning Management System (LMS) dashboard built with React. Features:
- Role-based dashboards for Admin and Student
- Interactive charts (Recharts)
- Tabular data views
- Chatbot with personalized Q&A
- Modular, well-commented codebase
- Responsive, professional UI


## Features
- **Role-based Access:** Separate dashboards for Admin and Student, with authentication and RBAC.
- **Charts & Data Grids:** Recharts for bar, pie, and line charts. Tabular views for courses and quiz completion.
- **Chatbot:** Context-aware chatbot answers, personalized for each user.
- **Mock Data:** Structured, explainable mock data for users, students, courses, quizzes, assignments.
- **Modular Components:** Each widget and dashboard is a reusable React component.
- **Accessibility:** Keyboard navigation, focus management, and ARIA labels.
- **Responsive Design:** Works well on desktop and mobile.


## File Structure
```
src/
  components/
    Dashboard/
      AdminDashboard.js
      StudentDashboard.js
      Widgets/
        StudentTable.js
        QuizCompletionTable.js
        PieChartWidget.js
        LineChartWidget.js
        BarChartWidget.js
        AdminTable.js
    Auth/
      LoginForm.js
      RoleSelect.js
    Chatbot/
      ChatbotModal.js
      ChatBubble.js
    NotFound.js
  context/
    AuthContext.js
    RBACConfig.js
  mockData/
    users.json
    students.json
    courses.json
    quizzes.json
    assignments.json
    chatbotQA.json
  styles/
    main.css
    dashboard.css
    chatbot.css
    studenttable.css
    loginform.css
    roleselect.css
App.js
index.js
```


## Setup & Usage
1. **Install dependencies:**
  ```bash
  npm install
  ```
2. **Start the app:**
  ```bash
  npm start
  ```
3. **Login:**
  - Use provided usernames/passwords in `users.json` for Admin or Student roles.
  - Explore dashboards and chatbot features.


## Data Model
- **users.json:** User credentials and roles
- **students.json:** Student profiles, enrollments, grades, progress
- **courses.json:** Course details
- **quizzes.json:** Quiz scores and completion status
- **assignments.json:** Assignment deadlines
- **chatbotQA.json:** Personalized Q&A for chatbot


