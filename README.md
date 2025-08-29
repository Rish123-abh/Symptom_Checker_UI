🖥️ Symptom Checker 

This is a React + TypeScript frontend for the Symptom-to-Disease Prediction application.
It allows users to type symptoms, get suggestions, and fetch predicted diseases from the backend API.

<img width="748" height="881" alt="image" src="https://github.com/user-attachments/assets/ef1f5e60-ba31-4fc3-ab17-f4bab92b824b" />

<img width="1167" height="880" alt="image" src="https://github.com/user-attachments/assets/74536029-ec7b-4437-88be-7e77a55334a8" />


🚀 Features

Autocomplete suggestions while typing symptoms

Predicts possible diseases with probabilities

Written in TypeScript + React

Responsive and mobile-friendly

🛠️ Tech Stack

React

TypeScript

Axios – HTTP requests

 TailwindCSS – Styling

🌐 Backend API Used

Base URL:

https://symptom-checker-r1zn.onrender.com


GET /predictDisease – Predict diseases

GET /symptoms/search – Get symptom suggestions

⚡ Installation
git clone <frontend-repo-url>
cd <frontend-folder>
npm install
npm run dev


Create a .env file:

VITE_API_BASE_URL=https://symptom-checker-r1zn.onrender.com

📝 Usage Snippets

1️⃣ Fetching Symptom Suggestions
```
const response = await axios.get<string[]>(
  `${API_BASE_URL}/symptoms/search`,
  { params: { q: "hea, fe" } }
);
console.log(response.data); // ["headache", "fever"]
```

2️⃣ Fetching Predicted Diseases
```
const response = await axios.get(
  `${API_BASE_URL}/predictDisease`,
  { params: { symptoms: "headache" } }
);
console.log(response.data.possibleDiseases);
```

⚠️ Notes

Ensure the .env points to the correct backend URL

Probabilities are informational and do not replace medical advice

Autocomplete suggestions help users select valid symptoms
