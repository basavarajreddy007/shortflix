const Groq = require('groq-sdk');
const Script = require('../models/Script');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

exports.generateScript = async (req, res) => {
    const { genre, mood, characters, length, title } = req.body;
    const prompt = `Write a short film script. Title: ${title}. Genre: ${genre}. Mood: ${mood}. Characters: ${characters}. Length: ${length}. Format it professionally.`;

    try {
        console.log("Using Groq model: llama-3.3-70b-versatile");


        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a professional screenwriter." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",


        });


        const scriptText = completion.choices[0].message.content;
        const script = new Script({ title, genre, mood, characters, content: scriptText, user: req.user._id });
        await script.save();
        return res.status(200).json(script);

    } catch (error) {
        console.error('Groq Error:', error.message);
        res.status(error.status || 500).json({
            message: "AI Generation Failed",
            details: error.message,
            isQuotaExceeded: error.status === 429
        });
    }
};

exports.analyzeScript = async (req, res) => {
    const { content } = req.body;
    const prompt = `Analyze this film script and provide a JSON response with: storyQuality (1-10), dialogueStrength (1-10), characterDepth (1-10), emotionalImpact (1-10), suggestions (array of strings), predictedRating (1-10). Script: ${content}`;

    try {
        console.log("Analyzing with Groq model: llama-3.3-70b-versatile");


        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a professional script analyst. Output VALID JSON ONLY." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile",


            response_format: { type: "json_object" }
        });


        const analysis = JSON.parse(completion.choices[0].message.content);
        return res.status(200).json(analysis);

    } catch (error) {
        console.error('Groq Analysis Error:', error.message);
        res.status(error.status || 500).json({
            message: "Analysis Failed",
            details: error.message
        });
    }
};
