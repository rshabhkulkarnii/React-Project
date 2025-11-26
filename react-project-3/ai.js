import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

const apiToken = import.meta.env.VITE_HF_API_TOKEN;

let hf;
if (apiToken) {
    hf = new HfInference(apiToken);
} else {
    console.error("HuggingFace API token is missing. Please set VITE_HF_API_TOKEN in your .env file.");
}

export async function getRecipeFromMistral(ingredientsArr) {
    if (!hf) {
        return "AI service is not configured. Please contact the site administrator.";
    }
    const ingredientsString = ingredientsArr.join(", ");
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        });
        // Defensive: check response structure
        if (
            response &&
            response.choices &&
            response.choices[0] &&
            response.choices[0].message &&
            response.choices[0].message.content
        ) {
            return response.choices[0].message.content;
        } else {
            return "Sorry, I couldn't generate a recipe. Please try again later.";
        }
    } catch (err) {
        console.error("AI error:", err);
        return "Sorry, there was a problem generating your recipe.";
    }
}
