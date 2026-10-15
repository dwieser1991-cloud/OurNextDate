💕 Our Next Date

A small, romantic, single-page website that lets my partner pick - in a playful way - when and where our next date will take place.

🔗 Live page: https://dwieser1991-cloud.github.io/OurNextDate

✨ Features
💌 Sweet intro with a "shy" No button that runs away
📅 Pick one or more possible days (tomorrow until 15 Nov 2026)
🕰️ Choose a time of day
📍 Choose the kind of date (dinner, picnic, movie night, ...)
🌹 Add little extras (and a special "or..... me?" option)
📝 Optional name and personal note
💖 Floating hearts, confetti, light & dark mode, mobile-friendly
✉️ Send the confirmation via Email, WhatsApp, the share menu, or copy it
🛠️ Tech

Plain HTML, CSS and JavaScript in a single file (date-planner.html). No framework, no build step, no database, no backend.

Because there is no backend, the confirmation is not sent automatically. Instead, the page prepares a ready-to-send message (mailto: link, WhatsApp link, share sheet or clipboard).

⚙️ Configuration

Open date-planner.html and edit the constants in the <script> section:

js
const HIS_EMAIL = "DEINE@EMAIL.DE";   // email address that receives the confirmation
const END = new Date(2026, 10, 15);   // last selectable day (month is 0-based: 10 = November)

Date ideas, times and extras can be changed in the PLACES, TIMES and EXTRAS arrays.

🚀 Run locally

Just open date-planner.html in your browser. To host it for free, you can use GitHub Pages (Settings → Pages → deploy from the main branch).

❤️ Made with love
