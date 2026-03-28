# SourceCard Architecture Overview

## 1. Project Purpose
SourceCard is a React-based application that generates professional developer profile cards by aggregating data from various platforms (GitHub, LinkedIn, LeetCode, HackerRank) or using manual input.

## 2. Key Technologies
- **Frontend Framework:** React (bootstrapped with Create React App)
- **Styling:** Tailwind CSS (utility-first CSS framework)
- **Animations:** Framer Motion (for smooth transitions and modal effects)
- **Export Tools:** `html2canvas` (converts DOM to canvas) and `jspdf` (generates PDFs)
- **Utilities:** `qrcode.react` (QR code generation), `react-hot-toast` (notifications), `lucide-react` / `react-icons` (iconography)

## 3. File Structure & Organization
- **`src/index.js`**: The entry point that mounts the React app to the DOM.
- **`src/App.js`**: The main layout component that wraps the application, providing the header and global toast notifications.
- **`src/pages/`**: Contains top-level page components.
    - `MainPage.jsx`: The core controller. It manages state for the active tab (Developer, GitHub, etc.), form data, and generation status. It conditionally renders the appropriate form or card.
    - `Home.jsx`: An alternative or previous version of the main page logic.
- **`src/components/`**: Reusable UI components.
    - **Forms**: `InputForm.jsx`, `GithubForm.jsx`, etc., handle user input and validation.
    - **Cards**: `DeveloperCard.jsx`, `GitHubCard.jsx`, etc., are the visual representations of the profiles. `DeveloperCard.jsx` includes logic for exporting to Image/PDF.
    - **Modals**: `PreviewModal.jsx` displays a JSON preview of the data before generation.
- **`src/utils/`**: Helper functions for external data fetching.
    - `githubApi.js`: Fetches user profile and repository data from the GitHub API.
    - `leetcodeApi.js`: Fetches coding stats from a third-party LeetCode API.

## 4. Data Flow
1.  **Input**: The user selects a platform (e.g., GitHub) in `MainPage`. The corresponding form (`GithubForm`) captures the username.
2.  **Processing**: The form component may call utility functions (e.g., `fetchGitHubData`) to retrieve real-time stats.
3.  **State Update**: The fetched or manually entered data is passed up to `MainPage` via a callback (e.g., `handleGenerate`).
4.  **Preview**: `MainPage` triggers `PreviewModal`, showing the data in a JSON format for verification.
5.  **Generation**: Upon confirmation, `MainPage` hides the form and renders the specific card component (e.g., `GitHubCard`) with the data.
6.  **Export**: The card component uses `html2canvas` to take a snapshot of the DOM element and `jspdf` to save it as a file.
