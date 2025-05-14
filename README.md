# 🎥 Movie Explorer App 🚀🍿

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Coding](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&duration=3000&pause=1000&color=FA5500&center=true&vCenter=true&width=600&lines=Movie+Explorer+Website%3B;Created+By+Hirumitha+Kuladewa%3B;React+Vite+TailwindCSS%3B)

Welcome to the **Movie Explorer App**! This project is a sleek, feature-rich movie discovery platform built with **React Vite, Tailwind CSS, and Firebase**, using the powerful **TMDb API** for movie data. It offers a dynamic, user-friendly interface for exploring movies, managing favorites, and more.

---

## 🚀 Features

- ✨ **Authentication:** Secure Login and Signup with Firebase Authentication.
- 🎥 **Top Weekly Charts:** Discover the hottest movies of the week.
- 🔍 **Search and Filter:** Easily find movies by title, genre, year, and rating.
- ❤️ **Favorite Movies:** Save your favorite titles to your personalized list.
- 🎬 **Detailed Movie Info:** Access full movie details, including YouTube trailers.
- 📝 **Profile Management:** Update profile name and password.
- 📧 **Feedback:** Share your thoughts via EmailJS.
- 📱 **Responsive Design:** Optimized for mobile, tablet, and desktop.
- 🌗 **Dark/Light Mode:** Seamlessly switch between sleek themes.

---

## 🛠️ Tech Stack

🖥️ **Frontend:** React Vite, Tailwind CSS
🔥 **Backend:** Firebase (Authentication, Firestore Database, Hosting)
🎥 **Movie API:** TMDb API
📦 **Libraries:**

* Axios
* EmailJS
* Framer Motion
* React Hot Toast
* React Icons
* React Router DOM
* React Transition Group

---

## 📸 Live Demo

[![Live Demo](https://img.shields.io/badge/Live_Demo-%2300bcd4?style=for-the-badge&logo=vercel&logoColor=white)](https://movie-explorer-loons-lab.vercel.app)

---

## 🎨 Figma Design

[![Figma Design](https://img.shields.io/badge/Figma_Design-%2300e7b0?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/WoUBFaujIByFu0cxSJNCaE/Movie-Explorer-Web-UI?node-id=0-1&t=ti2kpvr3yx1ybGre-1)


---

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images)
├── components/      # Reusable components (Cards, Inputs, etc.)
├── pages/           # App pages (Home, Dashboard, Profile, etc.)
├── context/         # Context API for global state
├── sections/        # Landing page Sections
├── utils/           # Utility functions
└── App.jsx          # Main application file
```

---

## 🚀 Getting Started

1. Clone this repository:

```bash
git clone https://github.com/itz-Hiru/Movie-Explorer.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase project and add your Firebase credentials to `.env`:

```env
VITE_API_KEY=your_firebase_Api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_ID
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_ID
VITE_APP_ID=your_firebase_app_ID
VITE_MEASUREMENT_ID=your_firebase_measurement_ID
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_EMAILJS_SERVICE_ID=your_email_js_service_ID
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_ID
VITE_EMAILJS_USER_ID=your_emailjs_user_ID
```

4. Set up Firebase Rules Like Below:

```Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }

    match /subscribers/{document} {
      allow read, write: if request.auth != null;
    }
    
    match /public/{document=**} {
      allow read: if true;
    }

    match /favorites/{userId}/movies/{movieId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

5. Run the development server:

```bash
npm run dev
```

---

## 🌟 Contributing

Contributions are always welcome! If you have ideas for improving the app or fixing bugs, feel free to open an issue or submit a pull request.

---

## 📧 Contact

Connect with me:

* GitHub: [Your GitHub](https://github.com/itz-Hiru)
* LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/hirumitha)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/219bcc70-f5dc-466b-9a60-29653d8e8433" width="500">

