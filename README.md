# Related best seller products - QA Automation Suite

This automation testing framework built with Playwright to validate related product logic for a custom demo e-commerce page. Includes product search, filtering, best seller rules, UI behavior, and edge cases.

## 📁 Project Structure

```
📦 QA-assignment/
├── demo-site/
│   └── ebay-wallet-demo-site.html         # Main HTML file with all testable scenarios
├── tests/
│   ├── tc01-...tc24-*.spec.ts             # Individual test files (TC01–TC24)
├── test-results/                          # Auto-generated Playwright test results
├── playwright.config.ts                   # Playwright test runner configuration
└── README.md                              # Project documentation (this file)
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) 
- npm (comes with Node.js)
- Git (optional)

### 2. Installation

```bash
npm install
npx playwright install
```

### 3. Running All Tests

```bash
npx playwright test
```

### 4. Running a Specific Test Case

```bash
npx playwright test tests/tc14-price-boundary.spec.ts
```

### 5. Viewing HTML Demo

You can open the HTML directly in a browser:

```bash
open demo-site/ebay-wallet-demo-site.html     # macOS
start demo-site/ebay-wallet-demo-site.html    # Windows
```

---

## 🧪 Supported Test Cases

| ID   | Title                                                                                     |
|------|-------------------------------------------------------------------------------------------|
| TC01 | Verify that the main product can be accessed from the searched functionality.             |
| TC02 | Verify that the successful display of related product section.                            |
| TC03 | Validate that the max limit of 6 product display for the best seller related products.    |
| TC04 | Verify the category match validation.                                                     |
| TC05 | Verify the price range filtering logic.                                                   |
| TC06 | Verify the best seller tag visibility of the page.                                        |
| TC07 | Verify the click navigation for the related products.                                     |
| TC08 | Verify that the relevance ordering according to the best seller logic.                    |
| TC09 | Verify the behaviour when no related items exist.                                         |
| TC10 | Verify that the out of stock product are not displayed as best seller products.           |
| TC11 | Verify the product outside price threshold.                                               |
| TC12 | Verify that the out of category products are excluded from the related product list.      |
| TC13 | Verify the behaviour when product with missing image or name.                             |
| TC14 | Verify the behaviour when the product at exact price boundary.                            |
| TC15 | Verify the behaviour when there is only 1 related product.                                |
| TC16 | Verify the behaviour when there is API failure or network issue.                          |
| TC17 | Verify the behvaiour when the feature flag is disabled.                                   |
| TC18 | Verify that when there is long title and description, full detail is correctly displayed. |
| TC19 | Verify the behaviour when all related products are in the same price.                     |
| TC20 | Verify the broken redirect from the best seller related items.                            |
| TC21 | Verify behaviour when duplicate related products are shown.                               |
| TC22 | Verify the responsive behaviour of the related product section.                           |
| TC23 | Verify the navigate back to main product after clicking related item.                     |


## 📸 HTML Feature Flags & Hashes

Some test cases use hash flags or special search terms:

| Condition              | Usage                                    |
|------------------------|------------------------------------------|
| No related products    | `#norelated`                              |
| Same price sorting     | `#sameprice`                              |
| Fallback test          | `#fallback`                               |
| Broken redirect        | search query: `broken link product`      |

---

## 🙋‍♀️ Maintainer

**Uthpala Abewickrama** – Related best seller product feature.