document.addEventListener('DOMContentLoaded', () => {
    // General UI Elements
    const infoBtn = document.getElementById('info-btn');
    const infoModal = document.getElementById('info-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Tab-related elements
    const textTabBtn = document.getElementById('text-tab-btn');
    const imageTabBtn = document.getElementById('image-tab-btn');
    const textSection = document.getElementById('text-section');
    const imageSection = document.getElementById('image-section');
    const outputContainer = document.getElementById('output-container');
    const responseOutput = document.getElementById('response-output');
    
    // Text Analyzer Elements
    const textInput = document.getElementById('text-input');
    const textActionSelect = document.getElementById('text-action-select');
    const textAnalyzeBtn = document.getElementById('text-analyze-btn');

    // Image Generator Elements
    const imageInput = document.getElementById('image-input');
    const imageGenerateBtn = document.getElementById('image-generate-btn');
    const imageOutputContainer = document.getElementById('image-output-container');
    const generatedImage = document.getElementById('generated-image');

    // Gemini API call function for text
    async function callGeminiTextAPI(prompt) {
        // Use gemini-2.5-flash-preview-05-20 for text analysis.
        const apiKey = "AIzaSyASE4L3PWp3eCpzY9li-3gxhPMdFxikXSI";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        const payload = {
            contents: [{
                parts: [{ text: prompt }]
            }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
           throw new Error(`API call failed with status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No content returned from the API.');
        }
    }

    // Gemini API call function for image generation
    async function callGeminiImageAPI(prompt) {
        // Use imagen-3.0-generate-002 for image generation.
        const apiKey = "AAIzaSyAw8YCwAg3dxmC3lupscPGaHdFQVd2Gd7U";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

        const payload = { 
            instances: { prompt: prompt }, 
            parameters: { "sampleCount": 1} 
        };
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
            return `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
        } else {
            throw new Error('No image returned from the API.');
        }
    }


    // Tab Switching Logic
    textTabBtn.addEventListener('click', () => {
        textSection.classList.remove('hidden');
        imageSection.classList.add('hidden');
        textTabBtn.classList.add('border-indigo-500');
        imageTabBtn.classList.remove('border-indigo-500');
        outputContainer.classList.add('hidden');
        imageOutputContainer.classList.add('hidden');
    });
    imageTabBtn.addEventListener('click', () => {
        imageSection.classList.remove('hidden');
        textSection.classList.add('hidden');
        imageTabBtn.classList.add('border-indigo-500');
        textTabBtn.classList.remove('border-indigo-500');
        outputContainer.classList.add('hidden');
        imageOutputContainer.classList.add('hidden');
    });

    // Handle Info Modal
    infoBtn.addEventListener('click', () => {
        infoModal.classList.remove('hidden');
    });
    closeModalBtn.addEventListener('click', () => {
        infoModal.classList.add('hidden');
    });

    // Text Analysis Logic
    textAnalyzeBtn.addEventListener('click', async () => {
        const inputText = textInput.value.trim();
        const selectedAction = textActionSelect.value;
        
        if (!inputText) {
            alert('Please enter some text or a word.');
            return;
        }

        let prompt = "";
        // Check if the input is a single word or a paragraph
        const isSingleWord = !inputText.includes(' ') && inputText.length > 1 && inputText.length < 20;

        if (isSingleWord) {
            // Handle single word actions
            switch (selectedAction) {
                case "pronounce":
                    prompt = `How do you pronounce the word "${inputText}"? Provide a phonetic transcription and a simple guide.`;
                    break;
                case "synonyms":
                    prompt = `List 5 synonyms for the word "${inputText}".`;
                    break;
                case "paragraph":
                    prompt = `Write a short paragraph (3-4 sentences) using the word "${inputText}".`;
                    break;
                case "meaning":
                    prompt = `Provide a clear, concise definition for the word "${inputText}".`;
                    break;
                default:
                    alert('Please select a valid action for a single word.');
                    return;
            }
        } else {
            // Handle paragraph/text actions
            switch (selectedAction) {
                case "summarize":
                    prompt = `Summarize the following text in a concise paragraph:\n\n${inputText}`;
                    break;
                case "grammar":
                    prompt = `Correct any grammar and spelling errors in the following text. Provide only the corrected text:\n\n${inputText}`;
                    break;
                case "keywords":
                    prompt = `Extract the main keywords and key phrases from the following text as a comma-separated list:\n\n${inputText}`;
                    break;
                case "vocabulary":
                    prompt = `Identify and define 5 advanced vocabulary words from the following text. Use a list format:\n\n${inputText}`;
                    break;
                default:
                    alert('Please select a valid action for a paragraph.');
                    return;
            }
        }

        loadingSpinner.classList.remove('hidden');
        outputContainer.classList.add('hidden');
        responseOutput.textContent = '';
        textAnalyzeBtn.disabled = true;

        try {
            const result = await callGeminiTextAPI(prompt);
            responseOutput.textContent = result;
            outputContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Text analysis error:', error);
            responseOutput.textContent = `An error occurred: ${error.message}. Please try again later.`;
            outputContainer.classList.remove('hidden');
        } finally {
            loadingSpinner.classList.add('hidden');
            textAnalyzeBtn.disabled = false;
        }
    });

    // Image Generation Logic
    imageGenerateBtn.addEventListener('click', async () => {
        const imagePrompt = imageInput.value.trim();
        if (!imagePrompt) {
            alert('Please enter a description for the image.');
            return;
        }

        loadingSpinner.classList.remove('hidden');
        imageOutputContainer.classList.add('hidden');
        imageGenerateBtn.disabled = true;

        try {
            const imageUrl = await callGeminiImageAPI(imagePrompt);
            generatedImage.src = imageUrl;
            imageOutputContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Image generation error:', error);
            alert(`Image generation failed: ${error.message}.`);
        } finally {
            loadingSpinner.classList.add('hidden');
            imageGenerateBtn.disabled = false;
        }
    });
});
