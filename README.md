[index.html](https://github.com/user-attachments/files/21966102/index.html)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Text Analyzer</title>
    <!-- Use the Inter font from Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <!-- Load Tailwind CSS from CDN for styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Link to the external stylesheet -->
    <link rel="stylesheet" href="style.css">
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="bg-gray-100 flex flex-col min-h-screen">

    <!-- Sidebar Menu -->
    <aside id="sidebar" class="sidebar fixed top-0 left-0 h-full bg-gray-800 text-white p-4 shadow-xl z-50">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Menu</h2>
            <button id="close-sidebar-btn" class="text-gray-400 hover:text-white transition-colors duration-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <nav>
            <ul>
                <li class="mb-2">
                    <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        <i class="fas fa-history mr-3"></i>
                        <span>Recent Texts</span>
                    </a>
                </li>
                <li class="mb-2">
                    <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        <i class="fas fa-bookmark mr-3"></i>
                        <span>Saved</span>
                    </a>
                </li>
                <li class="mb-2">
                    <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                        <i class="fas fa-cog mr-3"></i>
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <div id="main-content" class="main-content flex-grow flex flex-col">
        <!-- Top Navigation Bar -->
        <header class="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-40">
            <div class="flex items-center">
                <button id="open-sidebar-btn" class="text-gray-600 hover:text-gray-900 transition-colors duration-200 mr-4">
                    <i class="fas fa-bars"></i>
                </button>
                <h1 class="text-xl font-bold text-gray-800">AI Text Analyzer</h1>
            </div>
            <div class="flex items-center space-x-4">
                <button id="info-btn" class="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    <i class="fas fa-info-circle text-lg"></i>
                </button>
                <button id="login-btn" class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
                    Login
                </button>
                <div id="profile-btn" class="hidden relative">
                    <button class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">U</button>
                    <!-- Profile dropdown menu, can be added with JS -->
                </div>
            </div>
        </header>

        <!-- Hero Section with Gradient -->
        <div class="hero-background text-white flex flex-col items-center justify-center">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-4">Unleash the power of AI on your text</h2>
            <p class="text-lg text-center opacity-90">Summarize, extract, and transform your content instantly.</p>
        </div>

        <!-- Main content area with form and output -->
        <main class="main-content-section flex-grow flex items-center justify-center p-4">
            <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
                <div class="flex flex-col items-center justify-center">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Paste your text to get started</h2>
                    <p class="text-gray-500 text-center mb-6">Let an AI agent do the magic!</p>
                </div>

                <div class="mb-6">
                    <label for="text-input" class="block text-gray-700 font-semibold mb-2">Your Text</label>
                    <textarea id="text-input" rows="8" class="w-full p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none" placeholder="Paste your text here..."></textarea>
                </div>

                <div class="mb-6">
                    <label for="action-select" class="block text-gray-700 font-semibold mb-2">Choose an Action</label>
                    <select id="action-select" class="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200">
                        <option value="summarize">Summarize</option>
                        <option value="keywords">Extract Keywords</option>
                        <option value="friendly">Rewrite in a Friendly Tone</option>
                    </select>
                </div>
                
                <div class="flex justify-center mb-6">
                    <button id="submit-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                        Analyze Text
                    </button>
                </div>

                <div id="loading-spinner" class="hidden flex justify-center items-center my-4">
                    <div class="animate-spin-custom h-8 w-8 rounded-full border-4 border-t-4 border-indigo-500 border-opacity-25 border-t-indigo-500"></div>
                </div>

                <div id="output-container" class="mt-8 hidden p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">AI Response:</h2>
                    <div id="response-output" class="text-gray-700 leading-relaxed whitespace-pre-wrap"></div>
                </div>

                <!-- Info Modal -->
                <div id="info-modal" class="hidden fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div class="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
                        <h3 class="text-xl font-bold mb-4">About this app</h3>
                        <p class="text-gray-700 mb-4">
                            This is an AI-powered text analyzer that uses a no-code backend built with **n8n**. The frontend is a simple HTML, CSS, and JavaScript application.
                        </p>
                        <button id="close-modal-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full">Got it</button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-gray-800 text-gray-300 p-8 mt-auto">
            <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-lg font-bold text-white mb-2">AI Text Analyzer</h3>
                    <p class="text-sm">A modern web application built with a no-code backend.</p>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white mb-2">Contact</h3>
                    <ul class="text-sm space-y-2">
                        <li>Email: <a href="mailto:contact@example.com" class="hover:text-white transition-colors duration-200">contact@example.com</a></li>
                        <li>Twitter: <a href="#" class="hover:text-white transition-colors duration-200">@yourhandle</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white mb-2">Legal</h3>
                    <ul class="text-sm space-y-2">
                        <li><a href="#" class="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-white transition-colors duration-200">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div class="mt-8 text-center text-sm">
                <p>&copy; 2024 AI Text Analyzer. All rights reserved.</p>
            </div>
        </footer>
    </div>

    <!-- Link to the external JavaScript file -->
    <script src="script.js"></script>
</body>
</html>


[style.css](https://github.com/user-attachments/files/21966114/style.css)/* Custom font, viewport and background styles */
body {
    font-family: 'Inter', sans-serif;
    transition: margin-left 0.3s ease-in-out;
}

/* Styles for the main content area, including sidebar-open state */
.main-content {
    transition: margin-left 0.3s ease-in-out;
    margin-left: 0;
}

.main-content.open {
    margin-left: 256px; /* Width of the sidebar */
}

/* Styles for the collapsible sidebar */
.sidebar {
    width: 256px;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
}

.sidebar.open {
    transform: translateX(0);
}

/* Custom spinner for a more modern look */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-custom {
  animation: spin 1s linear infinite;
}

/* Hero section with a beautiful, custom gradient */
.hero-background {
    background: linear-gradient(to bottom right, #a7b7ff, #7289f3, #5a66a1);
    min-height: 40vh; /* A bit shorter for the hero section */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 1rem;
}

/* Main content section to overlap the hero background */
.main-content-section {
    margin-top: -80px; /* Pull the main content up to overlap the hero section */
    position: relative;
    z-index: 10;
}

[script.js](https://github.com/user-attachments/files/21966119/script.js)document.addEventListener('DOMContentLoaded', () => {
    // Select all necessary elements from the HTML
    const submitBtn = document.getElementById('submit-btn');
    const textInput = document.getElementById('text-input');
    const actionSelect = document.getElementById('action-select');
    const loadingSpinner = document.getElementById('loading-spinner');
    const outputContainer = document.getElementById('output-container');
    const responseOutput = document.getElementById('response-output');
    const openSidebarBtn = document.getElementById('open-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const infoBtn = document.getElementById('info-btn');
    const infoModal = document.getElementById('info-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // IMPORTANT: Replace this placeholder with your actual n8n webhook URL
    const webhookUrl = 'https://five-candles-argue.loca.lt';

    // Handle sidebar toggle functionality
    openSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        mainContent.classList.add('open');
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
        mainContent.classList.remove('open');
    });

    // Handle info modal functionality
    infoBtn.addEventListener('click', () => {
        infoModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        infoModal.classList.add('hidden');
    });

    // Handle the main form submission when the button is clicked
    submitBtn.addEventListener('click', async () => {
        const inputText = textInput.value.trim();
        const selectedAction = actionSelect.value;

        // Validation checks
        if (!inputText) {
            // Use a simple alert since we're not building a custom modal for this
            alert('Please enter some text to analyze.');
            return;
        }

        if (!webhookUrl || webhookUrl === 'YOUR_N8N_WEBHOOK_URL_HERE') {
            alert('Please replace the placeholder URL with your actual n8n webhook URL.');
            return;
        }

        // Show loading spinner and disable the button to prevent multiple submissions
        loadingSpinner.classList.remove('hidden');
        outputContainer.classList.add('hidden');
        responseOutput.textContent = '';
        submitBtn.disabled = true;

        try {
            // Send a POST request to the n8n webhook
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: inputText,
                    action: selectedAction
                }),
            });

            // Check if the network response was successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Display the AI response from the webhook
            if (data && data.response) {
                responseOutput.textContent = data.response;
                outputContainer.classList.remove('hidden');
            } else {
                responseOutput.textContent = 'Sorry, no response from the AI. Please try again.';
                outputContainer.classList.remove('hidden');
            }

        } catch (error) {
            // Handle and display any errors that occur
            console.error('Error fetching data:', error);
            responseOutput.textContent = `An error occurred: ${error.message}. Check the console for more details.`;
            outputContainer.classList.remove('hidden');
        } finally {
            // Hide the loading spinner and re-enable the button regardless of success or failure
            loadingSpinner.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });
});






