# E2E

## Overview

This project uses [Playwright](https://playwright.dev/) to automate browser interactions for testing or scraping purposes. Playwright allows for running tests or scripts on modern browsers like Chromium, Firefox, and WebKit.

## Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: v18+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Setup

1. Navigate to the e2e directory:

   ```bash
   cd e2e
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run test

   ```bash
   npm run test
   ```

   Note: e2e github workflow is already setup :) but fails because of regulatory reasons(cloudfront). Accessing https://api.binance.com/api/v3/ticker/price is blocked from GitHub CI and we get `451 Unavailable For Legal Reasons` error
