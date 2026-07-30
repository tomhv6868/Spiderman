// ===============================
// DOM Elements
// ===============================

const analyzeBtn = document.getElementById("analyzeBtn");
const urlInput = document.getElementById("urlInput");
const statusText = document.getElementById("status");
const summary = document.getElementById("summary");

// ===============================
// Event Listener
// ===============================

analyzeBtn.addEventListener("click", analyzeDocumentation);

// ===============================
// Main Function
// ===============================

async function analyzeDocumentation() {

    const url = urlInput.value.trim();

    if (!url) {
        alert("Please enter a documentation URL.");
        return;
    }

    if (!isValidUrl(url)) {
        alert("Please enter a valid URL.");
        return;
    }

    setLoading(true);

    try {

        const result = await summarizeDocumentation(url);

        renderSummary(result);

        statusText.textContent = "Status: Completed";

    }
    catch (error) {

        summary.innerHTML = `
            <div class="placeholder">
                <h3>Error</h3>
                <p>${error.message}</p>
            </div>
        `;

        statusText.textContent = "Status: Failed";

    }
    finally {
        setLoading(false);

    }

}

// ===============================
// Loading State
// ===============================

function setLoading(isLoading) {

    analyzeBtn.disabled = isLoading;

    if (isLoading) {

        analyzeBtn.textContent = "Analyzing...";

        statusText.textContent = "Status: Analyzing...";

        summary.innerHTML = `
            <div class="placeholder">
                <h3>Analyzing Documentation...</h3>
                <p>Please wait while the AI is processing the page.</p>
            </div>
        `;

    } else {

        analyzeBtn.textContent = "Analyze Documentation";

    }

}

// ===============================
// Backend API
// ===============================

async function summarizeDocumentation(url) {

    const response = await fetch("http://127.0.0.1:8000/api/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || "Unable to summarize this documentation.");
    }

    return response.json();

}

// ===============================
// Render Summary
// ===============================

function renderSummary(data) {

    summary.innerHTML = `

<div class="summary-section">

<h2>Overview</h2>

<p>${data.overview}</p>

</div>

<div class="summary-section">

<h2>Goal</h2>

<p>${data.goal}</p>

</div>

<div class="summary-section">

<h2>Prerequisites</h2>

<ul>

${list(data.prerequisites)}

</ul>

</div>

<div class="summary-section">

<h2>Main Steps</h2>

<ol>

${orderedList(data.steps)}

</ol>

</div>

<div class="summary-section">

<h2>Important Commands</h2>

<pre>${data.commands.join("\n")}</pre>

</div>

<div class="summary-section">

<h2>Important Files</h2>

<ul>

${list(data.files)}

</ul>

</div>

<div class="summary-section">

<h2>Key Notes</h2>

<ul>

${list(data.notes)}

</ul>

</div>

<div class="summary-section">

<h2>Checklist</h2>

<ul>

${checkList(data.checklist)}

</ul>

</div>

`;

    setLoading(false);

}

// ===============================
// Helper Functions
// ===============================

function list(items) {

    return items
        .map(item => `<li>${item}</li>`)
        .join("");

}

function orderedList(items) {

    return items
        .map(item => `<li>${item}</li>`)
        .join("");

}

function checkList(items) {

    return items
        .map(item => `<li>✅ ${item}</li>`)
        .join("");

}

function isValidUrl(url) {

    try {

        new URL(url);

        return true;

    }
    catch {

        return false;

    }

}
