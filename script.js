// DATA TO PLAYBACK
// Modify these values to see the UI change automatically
let platformData = [
    { label: "Sleep, recovery and personal energy", val: 10 },
    { label: "Ability to focus", val: 10 },
    { label: "Stress load and emotional pressure", val: 10 },
    { label: "Trust, psychological safety and openness", val: 10 },
    { label: "Clarity of goals, priorities and decisions", val: 10 },
    { label: "Support, coaching and feedback from leaders", val: 10 },
    { label: "Match between tasks and work settings", val: 10 },
    { label: "Quality and usability of digital tools", val: 10 },
    { label: "Hybrid patterns, meetings and collaboration norms", val: 10 },
    { label: "Physical comfort and ergonomics", val: 10 }
];

// Check for query parameters and update values if present
const urlParams = new URLSearchParams(window.location.search);
const pointsParam = urlParams.get('points');

if (pointsParam) {
    try {
        // Try parsing as JSON array first
        let points = JSON.parse(pointsParam);

        // If not an array, maybe it's a comma-separated string
        if (!Array.isArray(points)) {
            points = pointsParam.split(',').map(Number);
        }

        if (Array.isArray(points) && points.length === 10) {
            platformData = platformData.map((item, index) => ({
                ...item,
                val: Number(points[index]) || 0
            }));
        }
    } catch (e) {
        // Fallback for simple comma-separated list
        const points = pointsParam.split(',').map(Number);
        if (points.length === 10) {
            platformData = platformData.map((item, index) => ({
                ...item,
                val: Number(points[index]) || 0
            }));
        }
    }
}



function renderSummary() {

    const sumDisplay = document.getElementById('sum-display');
    const instrContainer = document.getElementById('instruction-container');

    let total = 0;
    // body.innerHTML = ''; // Table removed from HTML

    platformData.forEach(item => {
        total += item.val;
        // Logic for rendering rows removed as per request
    });

    sumDisplay.textContent = total;

    if (total === 100) {
        instrContainer.innerHTML = `
            <div class="instruction-box status-valid">
                <span class="instruction-header">✓ VALIDATION SUCCESSFUL</span>
                Your points total 100 exactly. This requirement has been met.
            </div>`;
    } else {
        instrContainer.innerHTML = `
            <div class="instruction-box status-required">
                <span class="instruction-header">⚠ ACTION REQUIRED</span>
                The current summation is <strong>${total}</strong>. “Your scores must add up to 100. Please adjust your allocations.”
            </div>`;
    }
}

window.onload = renderSummary;