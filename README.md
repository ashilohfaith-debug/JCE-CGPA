# JCE CGPA Calculator

![JCE CGPA Calculator Logo/Screenshot](assets/images/screenshot-placeholder.png)

A fast, accurate, and mobile-friendly Semester GPA and Overall CGPA Calculator for Jerusalem College of Engineering (JCE) students under Regulation 2023.

## Live Demo
👉 **[View the Live Website Here](#)** *(Replace with GitHub Pages URL)*

## Features
- **Regulation 2023 Curriculum:** Accurately features all Semester 1 and Semester 2 subjects and their credit assignments directly extracted from the official curriculum.
- **Accurate Grade Mapping:** Incorporates exact grade mappings (S=10, A+=9, A=8, B+=7, B=6.5, C+=6, C=5, U/SA/WC=0).
- **Mobile First & Premium UI:** Designed to look exceptional on all screen sizes featuring glassmorphism, fluid animations, and micro-interactions.
- **Dark Mode Support:** Toggle seamlessly between Light and Dark mode. Preferences are saved automatically.
- **Auto Save:** Don't worry about accidental refreshes. Your selected grades are saved in local storage.
- **Visual Analytics:** View your calculated stats, completion progress, and engaging animations upon results!

## How GPA Works
The Grade Point Average (GPA) for each semester is calculated using the formula:
**GPA = Σ(Grade Point × Credit) / Σ(Credits)**

For every subject, the grade you select corresponds to a numerical Grade Point. This is multiplied by the subject's Credit value to get the Total Grade Points. Finally, the Total Grade Points across all subjects are summed and divided by the total credits for the semester.

## How CGPA Works
The Cumulative Grade Point Average (CGPA) is derived by averaging your Semester GPAs:
**CGPA = (Semester 1 GPA + Semester 2 GPA) / 2**
*(Calculated to 2 decimal places)*

## Deployment Instructions
This project uses **GitHub Actions** to automatically build and deploy to GitHub Pages on every push to the `main` branch.

1. Go to your repository settings in GitHub.
2. Navigate to **Pages** in the left sidebar.
3. Under **Source**, ensure it is set to **GitHub Actions**.
4. Push any changes to the `main` branch. The action will automatically deploy the site.

---
*Made with ❤️ for Jerusalem College of Engineering Students.*
