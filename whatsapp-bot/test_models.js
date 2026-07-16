require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("Fetching available models...");
    try {
        // We will do a raw fetch because the SDK might not expose listModels easily in older versions
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        
        if (data.models) {
            console.log("--- AVAILABLE MODELS ---");
            data.models.forEach(m => {
                console.log(`Model: ${m.name}`);
                console.log(`  Supported Methods: ${m.supportedGenerationMethods.join(', ')}`);
            });
        } else {
            console.log("Error or no models:", data);
        }
    } catch (e) {
        console.error("Error fetching models:", e);
    }
}

run();
