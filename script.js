// DATA TO PLAYBACK
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

// Check for query parameters and update values
const urlParams = new URLSearchParams(window.location.search);
const pointsParam = urlParams.get('points');

if (pointsParam) {
    try {
        let points = JSON.parse(pointsParam);
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
    platformData.forEach(item => {
        total += item.val;
    });

    sumDisplay.textContent = total;

    const target = 100;
    const remaining = target - total;

    if (total === target) {
        instrContainer.innerHTML = `
            <div class="instruction-box status-valid">
                <span class="instruction-header">✓ VALIDATION SUCCESSFUL</span>
                Your points total 100 exactly. This requirement has been met.
            </div>`;
    } else if (total < target) {
        instrContainer.innerHTML = `
            <div class="instruction-box status-required">
                <span class="instruction-header">⚠ ACTION REQUIRED</span>
                You have <strong>${remaining}</strong> points left to allocate. Please distribute these among the categories to reach the total of 100.
            </div>`;
    } else {
        instrContainer.innerHTML = `
            <div class="instruction-box status-over">
                <span class="instruction-header">⚠ REDUCE TOTAL</span>
                The current summation is <strong>${total}</strong>. You are over by ${Math.abs(remaining)} points. Please adjust your allocations to equal 100.
            </div>`;
    }
}

window.onload = renderSummary;