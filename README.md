# College Companion - Offline App

A completely offline academic management mobile app built with Capacitor and vanilla JavaScript.

## Features
- 📊 CGPA Calculator with grade tracking
- 📝 Assignment manager with due dates
- 📚 Exam scheduler
- 📈 Attendance tracker (Bunk-o-meter)  
- 📅 Timetable photo storage
- ⚙️ Settings with theme switching
- 💾 Data import/export functionality
- 🌙 Dark/Light theme support

## Tech Stack
- **Frontend:** Pure HTML, CSS, JavaScript
- **Storage:** localStorage (completely offline)
- **Mobile:** Capacitor for Android/iOS
- **No Backend:** Zero server dependencies

## Project Structure
```
dist/           # Offline web app files
├── index.html  # App entry point
├── index.html  # Main dashboard (home page)
├── cgpa.html   # CGPA calculator
├── assignments.html # Assignment manager
├── exams.html  # Exam scheduler
├── bunkometer.html # Attendance tracker
├── timetable.html # Timetable viewer
├── settings.html # App settings
├── style.css   # App styling
└── app.js      # Data management & utilities

android/        # Capacitor Android project
node_modules/   # Dependencies
package.json    # Node.js dependencies
capacitor.config.ts # Capacitor configuration
```

## Build & Run

### Install APK (Easiest)
1. Install the APK from `android/app/build/outputs/apk/debug/app-debug.apk`
2. App works immediately - no setup needed!

### Development Build
```bash
# Install dependencies
npm install

# Sync to Android
npx cap sync android

# Build APK
cd android
./gradlew assembleDebug
```

## Data Storage
- All data stored locally in browser localStorage
- No internet connection required
- Data persists between app launches
- Export/import functionality in Settings

## Version: 2.0 (Offline)
Built on August 11, 2025
