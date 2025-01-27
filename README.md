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
