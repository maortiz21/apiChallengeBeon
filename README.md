# Cypress End-to-End Tests

This project contains automated tests built with **Cypress**.  
The tests interact with protected API endpoints using a **Bearer Token**, which is managed through **environment variables** to keep credentials secure and out of the repository.

---

## 📦 Requirements

- Node.js v18+
- npm or yarn
- Cypress v13+

---

## 🛠 Installation

Clone the repository and install dependencies:


git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install

Bearer Token Configuration

This project requires a Bearer Token to authenticate API requests.
⚠ Important:
Do not hard-code tokens in the codebase or commit them to the repository.
1. Create a cypress.env.json file (local use only)
in your file: 
{
  "bearer": "YOUR_TOKEN_HERE"
}


Running the Tests:

- Interactive mode:
    npx cypress open
- Headless mode:
    npx cypress run
