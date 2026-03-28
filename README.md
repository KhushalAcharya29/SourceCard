# SourceCard

SourceCard (developer-card) is a React-based application designed to generate personalized developer profile cards. It allows users to showcase their profiles from various platforms like GitHub, LinkedIn, LeetCode, and HackerRank in a visually appealing card format.

## Features

- **Multi-Platform Support:** Generate cards for:
    - **Developer Card:** General developer profile.
    - **GitHub Card:** Highlights GitHub stats and repositories.
    - **LinkedIn Card:** Showcases professional experience.
    - **LeetCode Card:** Displays coding problem stats.
    - **HackerRank Card:** Shows competitive programming achievements.
- **Customization:** Enter details manually or fetch them from supported platforms.
- **Preview Mode:** View your card in a modal before generating the final version.
- **Export Options:**
    - **Download Image:** Save your card as a high-quality PNG.
    - **Download PDF:** Export your card as a PDF document.
- **QR Code Integration:** Automatically generates QR codes for profile links.
- **Animations:** Smooth transitions and effects powered by Framer Motion.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **State Management:** React Hooks
- **Styling:** Tailwind CSS, PostCSS
- **Animations:** Framer Motion
- **Utilities:**
    - `html2canvas` & `jspdf`: For capturing and exporting cards.
    - `qrcode.react`: For QR code generation.
    - `react-hot-toast`: For notifications.
    - `lucide-react` & `react-icons`: For icons.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd developer-card
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
