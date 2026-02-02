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
    // CLEANING STEP: Remove any [ or ] brackets that might be wrapping the variables
    // This fixes the issue where [[EBS_I1]] fails to parse correctly.
    const cleanPointsString = pointsParam.replace(/[\[\]]/g, '');

    // Split by comma and convert everything to a clean Number
    const pointsArray = cleanPointsString.split(',')
        .map(p => parseFloat(p.trim()))
        .filter(p => !isNaN(p));

    // Update platformData if we have the correct amount of points
    if (pointsArray.length === 10) {
        platformData = platformData.map((item, index) => ({
            ...item,
            val: pointsArray[index]
        }));
    }
}

function renderSummary() {
    const sumDisplay = document.getElementById('sum-display');
    const instrContainer = document.getElementById('instruction-container');

    if (!sumDisplay || !instrContainer) return;

    // Calculate total using reduce for accuracy
    const total = platformData.reduce((acc, item) => acc + item.val, 0);

    sumDisplay.textContent = total;

    const target = 100;
    const remaining = target - total;

    if (total === target) {
        instrContainer.innerHTML = `
            <div class="instruction-box status-valid" style="background: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 15px; border-radius: 8px;">
                <span class="instruction-header" style="font-weight: 800; display: block;">✓ VALIDATION SUCCESSFUL</span>
                Your points total 100 exactly. This requirement has been met.
            </div>`;
    } else if (total < target) {
        instrContainer.innerHTML = `
            <div class="instruction-box status-required" style="background: #fff7ed; border: 1px solid #f97316; color: #9a3412; padding: 15px; border-radius: 8px;">
                <span class="instruction-header" style="font-weight: 800; display: block;">⚠ ACTION REQUIRED</span>
                You have <strong>${remaining}</strong> points left to allocate. Please distribute these among the categories to reach the total of 100.
            </div>`;
    } else {
        instrContainer.innerHTML = `
            <div class="instruction-box status-over" style="background: #fef2f2; border: 1px solid #ef4444; color: #991b1b; padding: 15px; border-radius: 8px;">
                <span class="instruction-header" style="font-weight: 800; display: block;">⚠ REDUCE TOTAL</span>
                The current summation is <strong>${total}</strong>. You are over by ${Math.abs(remaining)} points. Please adjust your allocations to equal 100.
            </div>`;
    }
}

window.onload = renderSummary;