document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('adminTableBody');
    // Pull the data that was saved by index.html
    const results = JSON.parse(localStorage.getItem('jambResults')) || [];

    // 1. Update the Big Numbers at the top
    document.getElementById('totalStudents').innerText = results.length;
    
    if (results.length > 0) {
        const scores = results.map(r => r.total);
        document.getElementById('topScore').innerText = Math.max(...scores) + "/400";
        
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        document.getElementById('avgScore').innerText = Math.round(avg) + "/400";
    }

    // 2. Clear the table and show the students
    if (results.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="p-10 text-center text-gray-400">No student has finished the exam yet.</td></tr>`;
    } else {
        // Show newest results first
        results.reverse().forEach(res => {
            const row = `
                <tr class="border-b hover:bg-blue-50/50 transition">
                    <td class="p-6">
                        <div class="font-black text-gray-800">${res.name}</div>
                        <div class="text-[10px] text-gray-400">${res.reg}</div>
                    </td>
                    <td class="p-6 text-xs font-bold text-gray-500">${res.subs}</td>
                    <td class="p-6 font-black text-green-700 text-lg">${res.total}</td>
                    <td class="p-6 text-[10px] text-gray-400">${res.date}</td>
                    <td class="p-6 text-center">
                        <button onclick="window.print()" class="bg-gray-100 p-2 rounded-lg text-xs hover:bg-gray-200">🖨️ Print Slip</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
});

function exportData() {
    alert("Exporting to Excel... (This feature is available in the Full Version)");
}
function clearSystem() {
    if (confirm("WARNING: This will delete ALL student registrations and ALL scores. Are you sure?")) {
        localStorage.clear(); // This wipes the memory clean
        location.reload();    // This refreshes the page to show it's empty
    }
}