document.addEventListener('DOMContentLoaded', () => {
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
    const webhookUrl = 'http://localhost:5678/webhook/ed8edf39-4d90-4cb8-ac71-aa115950abec';

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

        if (!webhookUrl || webhookUrl === 'http://localhost:5678/webhook/ed8edf39-4d90-4cb8-ac71-aa115950abec') {
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



