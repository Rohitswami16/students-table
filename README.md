# Student Table Management App

A modern **Student Management Table** built using **React**, **Vite**, and **Tailwind CSS**.  

This application allows users to **add, edit, delete, and manage student records** with a clean and responsive UI.

---

## 🌐 Live Demo

[View Live Project](https://rohitswami16.github.io/students-table/)

---

## ⚡ Features

- Add new students
- Edit student information
- Delete students with confirmation dialog
- Form validation with error popup
- Responsive table UI
- Modal-based form
- Local storage data persistence
- Excel file download (filtered or full data)
- Clean and modern UI using Tailwind CSS

---

## 🛠 Technologies Used

- **React** - JavaScript UI library  
- **Vite** - Frontend build tool  
- **Tailwind CSS** - Utility-first CSS framework  
- **XLSX** - JavaScript spreadsheet library  
- **FileSaver.js** - Browser file download library  

---

## 📂 Project Structure

`
students-table
│
├── src
│ ├── components
│ │ ├── StudentTable.jsx
│ │ ├── StudentModal.jsx
│ │ ├── ConfirmDialog.jsx
│ │ └── ErrorPopup.jsx
│ │
│ ├── App.jsx
│ ├── main.jsx
│
├── public
├── package.json
└── README.md
`

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Rohitswami16/students-table.git

Navigate into the project directory:
cd students-table


Install dependencies:
npm install


Set up Tailwind CSS (if not already configured):
npx tailwindcss init


This generates a tailwind.config.js file.
Make sure your CSS file imports Tailwind:

@tailwind base;
@tailwind components;
@tailwind utilities;

Start the development server:
npm run dev

👤 Author
Rohit Swami
Computer Science Graduate | Software Developer
GitHub Profile: Rohitswami16
