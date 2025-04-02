# Playwright Automation for SimplyBook.me

## Dependencies Required

- **Node.js** (Ensure you have Node.js installed)
- **Playwright** (Installed via `npm install playwright`)
- **Assert Module** (Comes with Node.js)

## Challenges Faced and Solutions

### 1. **Handling Dynamic Elements**
   - Some elements load dynamically, which caused failures.
   - **Solution:** Implemented `waitForSelector` and `waitForLoadState` to ensure elements are available before interacting.

### 2. **Handling CAPTCHA Verification**
   - CAPTCHA requires manual intervention.
   - **Solution:** Paused execution with `console.log` messages and `waitForTimeout(10000)` to allow manual resolution.

### 3. **Flaky Selectors**
   - Some buttons and fields were inconsistent.
   - **Solution:** Used precise selectors and fallback strategies with `hasText`.

### 4. **Email Verification**
   - Needed to extract OTP from email.
   - **Solution:** Automated Gmail login and retrieval using Playwright’s multi-page context.

### 5. **Subscription & Cancellation Assertion**
   - The UI takes time to update after subscribing/canceling.
   - **Solution:** Used `waitForSelector('text=Cancelled')` to confirm action success.
