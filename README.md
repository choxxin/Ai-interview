# AI Interview Platform

**AI Interview** is a Next.js-based platform that simulates DSA (Data Structures and Algorithms) interviews. It utilizes **Puppeteer** with the **AWS Chromium browser** for web scraping to bypass Cloudflare security headers and fetch questions directly from LeetCode. The platform allows users to solve random questions in a simulated interview environment and automatically syncs their progress to their LeetCode account.

---

## Features

### 🔍 LeetCode Integration

- Uses **Puppeteer** and **AWS Chromium browser** to scrape LeetCode questions while bypassing Cloudflare’s security checks.
- Fetches three random questions for each interview session.

### 🧩 Simulated Interview Experience

- Realistic DSA interviews with timed coding challenges.
- Allows users to select question difficulty levels (easy, medium, hard).
- Automatically updates your progress on your LeetCode account.

### 🔐 Secure Authentication

- Authenticate with your **LeetCode x-csrf-token** and **cookie** to sync your activity.
- Ensures a personalized experience by directly interacting with your LeetCode account.

### 🚀 Local Usage for Smooth Performance

- While the application supports a serverless architecture, it is recommended to run the platform locally for optimal performance due to Puppeteer’s resource-heavy nature.

---

## Getting Started

### Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org)
- npm, yarn, pnpm, or bun (any package manager).

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

## For more information

Visit the github page https://github.com/vercel/next.js/discussions/30034
This includes the error in configuring the puppeter in Next.js
So i used the package **sparticuz/chromium-min** which helped me to run the puppeter in serverless artitecture like vercel without the build error.

## Screenshots

Here are some screenshots of the AI Interview Platform in action:

1. **Home Page**  
   ![Home Page](./public/assets/Sample.png)

2. **Difficulty Selector**  
   ![Interview Session](./public/assets/ab.png)

3. **Loading Scrap**  
   ![Question Selection](./public/assets/bb.png)

4. **Code Editor**  
   ![Progress Sync](./public/assets/cc.png)
