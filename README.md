# America's Governors Directory

A sleek, responsive, and modern web application that visualizes a directory of America's State Governors, complete with their biographies, official photographs, and verified social media profiles.

## 📖 Overview

This project is a complete UI/UX reimagination of the traditional governmental directory (inspired by the NGA.org social directory). It transforms a plain text table into an interactive, visually stunning "Glassmorphism"-inspired interface. 

The application was built emphasizing pure vanilla web technologies—requiring no complex framework setups or build pipelines while still offering a premium frontend experience.

## ✨ Features

- **Modern Glassmorphism UI**: High-end visual aesthetics using frosted glass card components, animated background gradient blobs, and responsive grid layouts.
- **Dynamic Real-Time Search**: Instantly filter and search through the directory by typing a Governor's name or State.
- **Rich Media Integration**: Python scripting was utilized to autonomously hydrate the text directory with genuine Profile Pictures and bios pulled securely via the Wikipedia API.
- **Verified Social Hubs**: All social icons dynamically render and expand to their respective brand colors on hover, and link directly to real-life, verified gubernatorial accounts.
- **Cross-Origin Safe**: Database information is pre-compiled into local JavaScript, completely eliminating CORS errors. You can launch the project directly from your local file system without needing a local dev server.

## 🛠️ Technologies Used

- **Frontend**: Vanilla HTML5, Vanilla JavaScript (ES6+), CSS3
- **Styling**: Custom CSS styling mapping CSS variables and animations.
- **Icons**: FontAwesome 6 (via CDN)
- **Typography**: Google Fonts (Outfit)
- **Data Gathering (Backend Toolkit)**: Python 3 (`urllib.request`, `re`, `json`) used to scrape genuine NGA href properties and Wikipedia page data.

## 🚀 How to Run

Because this project stores its compiled state locally, the setup is delightfully simple:

1. Clone or download this repository to your local machine.
2. Navigate to the project folder.
3. Double click on `index.html` to open it in any modern web browser.
4. *No `npm install` or local server is required!*

*(If you wish to re-compile or update the governor data in the future, you can execute the included `generate_data.py` and `scrape_links.py` files).*

## 👨‍💻 Developer Notes

This is designed as a frontend portfolio piece demonstrating skills in **DOM manipulation**, **Frontend Design Aesthetics**, **Responsive Layouts**, and **Data Parsing**.
