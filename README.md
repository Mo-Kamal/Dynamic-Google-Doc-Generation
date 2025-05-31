# Dynamic Google Doc Generation

A Next.js full-stack project that demonstrates how to dynamically generate personalized Google Docs from a template, replace placeholders with user input or scraped data, and export the result as a PDF stored locally.

This project uses a cover letter as an example use case.

---

## ✨ Features

- 🌐 Scrapes job information (company, position, hiring manager) from job links (e.g., LinkedIn)
- 📝 Uses Google Docs template with placeholders (`{{position}}`, `{{company}}`, `{{hiringManager}}`, `{{date}}`)
- 🧠 Replaces placeholders dynamically with user input or scraped data
- 📄 Exports the Google Doc as a PDF
- 💾 Saves the PDF locally in a structured folder (e.g., `Documents/CV/jan31/Google`)
- 🔐 Uses Google APIs securely via a service account

---

## 🧠 How It Works

1. **User fills the form** with job link, position, company, and hiring manager
2. **If a job link is provided**, the server scrapes the page for company, title, and manager name
3. **Server copies a Google Docs template**, replaces placeholders with values, and saves it as a PDF
4. **PDF is written locally** and the temporary Google Doc is deleted

---

## 📦 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [Google Drive & Docs API](https://developers.google.com/docs/api)
- [ScrapingBee API](https://www.scrapingbee.com/)
- [Cheerio](https://cheerio.js.org/) for HTML parsing
- [TailwindCSS](https://tailwindcss.com/) + Custom Components
- [React Hot Toast](https://react-hot-toast.com/)

---

## 📁 Folder Structure

```
app/
├── components/
│   ├── button.tsx
│   └── input.tsx
├── utils/
│   ├── copy-and-write-template.ts
│   ├── get-current-date.ts
│   ├── get-info-from-scrapped-page.ts
│   ├── start-page-scrapping.ts
│   └── stream-to-buffer.ts
├── api/
│   └── generate-doc/route.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Google Service Account with access to Docs and Drive APIs
- [ScrapingBee](https://www.scrapingbee.com/) API Key (optional but required for scraping job info.)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/Mo-Kamal/dynamic-google-doc-generation.git
cd dynamic-google-doc-generation
```

2. **Install dependencies**

```bash
yarn install
```

3. **Create `.env.local`**

```bash
GOOGLE_CREDENTIALS_PATH=/absolute/path/to/your-service-account.json
GOOGLE_TEMPLATES_ID=your_google_doc_template_id
SCRAPINGBEE_API_KEY=your_scrapingbee_api_key
```

4. **Run the dev server**

```bash
yarn dev
```

---

## 🧪 Example Google Docs Template

Your template should contain the following placeholders:

```text
{{position}}, {{company}}, {{hiringManager}}, {{date}}
```

---

## 📄 Example Output

```bash
~/Documents/CV/jan31/Google/CoverLetter-Front-End Developer.pdf
```

---

## 🔐 Environment Variables

| Name                      | Required | Description                                 |
| ------------------------- | -------- | ------------------------------------------- |
| `GOOGLE_CREDENTIALS_PATH` | ✅       | Path to your service account credentials    |
| `GOOGLE_TEMPLATES_ID`     | ✅       | Google Docs template document ID            |
| `SCRAPINGBEE_API_KEY`     | ⬜       | API key for ScrapingBee (used for scraping) |

---

## 📄 Related Links

For more details on how to enable Read & Write access to Google Docs using the Google APIs, check out the resources below:

- 🎥 [Tutorial Video – Google Docs API Authorization (by Coding with Ado)](https://www.youtube.com/watch?v=AxsuxUjzKdY&t=464s&ab_channel=CodingwithAdo)  
  A step-by-step video guide on setting up and authorizing access to Google Docs.

- 📚 [Official Google Sheets API Documentation](https://developers.google.com/workspace/sheets/api/reference/rest)  
  Comprehensive reference for interacting with the Google Sheets and Docs API.

---

## 🛡 License

[MIT](LICENSE)

---

## 👨‍💻 Contact

Email: mo.kamalghariby@gmail.com
