require('dotenv').config();
const key = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

fetch(url)
.then(res => res.json())
.then(data => {
    const models = data.models.map(m => m.name);
    console.log(models);
})
.catch(err => console.error(err));
