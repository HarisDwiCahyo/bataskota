//Perhitungan total data
const totalPilar = data.length;
const totalKemantren = data1.length;
const totalKelurahan = data2.length;
const totalRW = data3.length;
// Update the HTML element with the total count
document.getElementById("total-pilar").textContent = totalPilar;
document.getElementById("total-kemantren").textContent = totalKemantren;
document.getElementById("total-kelurahan").textContent = totalKelurahan;
document.getElementById("total-rw").textContent = totalRW;

//chart pba dan pabu ========================================================================
// Calculate total counts for PBA and PBU
const totalPBA = data.filter((item) => item.nopilar.includes("PBA")).length;
const totalPBU = data.filter((item) => item.nopilar.includes("PBU")).length;

// Update the HTML with the total counts
document.getElementById("total-pba").textContent = totalPBA;
document.getElementById("total-pbu").textContent = totalPBU;

// Create the pie chart comparing PBA and PBU
new Chartist.Pie(
    "#total-pba-pbu-card .donut-chart",
    {
        series: [totalPBA, totalPBU],
        labels: ["PBA", "PBU"],
    },
    {
        donut: true,
        donutWidth: 10,
        donutSolid: true,
        startAngle: 270,
        showLabel: false,
        height: "143px",
        plugins: [Chartist.plugins.tooltip()],
    }
);

//chart paba dan pabu ========================================================================

// Filter and count total PABA and PABU
const totalPABA = data.filter((item) => item.nopilar.includes("PABA")).length;
const totalPABU = data.filter((item) => item.nopilar.includes("PABU")).length;

// Update the HTML with the total counts
document.getElementById("total-paba").textContent = totalPABA;
document.getElementById("total-pabu").textContent = totalPABU;

// Create the pie chart comparing PABA and PABU
new Chartist.Pie(
    "#total-paba-pabu-card .donut-chart",
    {
        series: [totalPABA, totalPABU],
        labels: ["PABA", "PABU"],
    },
    {
        donut: true,
        donutWidth: 10,
        donutSolid: true,
        startAngle: 270,
        showLabel: false, // Show labels on the chart
        height: "143px",
        plugins: [Chartist.plugins.tooltip()],
    }
);

//chart paba dan pabu ========================================================================
const totalPKBA = data.filter((item) => item.nopilar.includes("PKBA")).length;
const totalPKBU = data.filter((item) => item.nopilar.includes("PKBU")).length;

// Update the HTML with the total counts
document.getElementById("total-pkba").textContent = totalPKBA;
document.getElementById("total-pkbu").textContent = totalPKBU;

// Create the pie chart comparing PKBA and PKBU
new Chartist.Pie(
    "#total-pkba-pkbu-card .donut-chart",
    {
        series: [totalPKBA, totalPKBU],
        labels: ["PKBA", "PKBU"],
    },
    {
        donut: true,
        donutWidth: 10,
        donutSolid: true,
        startAngle: 270,
        showLabel: false,
        height: "143px",
        plugins: [Chartist.plugins.tooltip()],
    }
);
// Hitung PBA dan PABU =============================================================================
// Filter data to get only PBA entries
const DataPBA = data.filter((item) => item.nopilar.includes("PBA"));
const JumlahDataPBA = DataPBA.length;

// Function to update the progress bar and text
function updateProgressBarPBA(condition, totalCount) {
    const filteredData = DataPBA.filter((item) => item.kondisi === condition);
    const filteredCount = filteredData.length;
    const percentage = (filteredCount / totalCount) * 100;

    // Update HTML elements
    document.getElementById(
        `total-pba-${condition.toLowerCase()}`
    ).textContent = filteredCount;
    document.getElementById(
        `progress-bar-${condition.toLowerCase()}`
    ).style.width = `${percentage}%`;
    document
        .getElementById(`progress-bar-${condition.toLowerCase()}`)
        .setAttribute("aria-valuenow", percentage);
    document.getElementById(
        `progress-text-${condition.toLowerCase()}`
    ).textContent = `${percentage.toFixed(2)}% completed`;
}

// Update progress bars for each condition
updateProgressBarPBA("Baik", JumlahDataPBA);
updateProgressBarPBA("Rusak", JumlahDataPBA);
updateProgressBarPBA("Hilang", JumlahDataPBA);

// Filter data to get only PBU entries
const DataPBU = data.filter((item) => item.nopilar.includes("PBU"));
const JumlahDataPBU = DataPBU.length;

// Function to update the progress bar and text
function updateProgressBarPBU(condition, totalCount) {
    const filteredData = DataPBU.filter((item) => item.kondisi === condition);
    const filteredCount = filteredData.length;
    const percentage = (filteredCount / totalCount) * 100;

    // Update HTML elements
    document.getElementById(
        `total-pbu-${condition.toLowerCase()}`
    ).textContent = filteredCount;
    document.getElementById(
        `progress-bar-${condition.toLowerCase()}-pbu`
    ).style.width = `${percentage}%`;
    document
        .getElementById(`progress-bar-${condition.toLowerCase()}-pbu`)
        .setAttribute("aria-valuenow", percentage);
    document.getElementById(
        `progress-text-${condition.toLowerCase()}-pbu`
    ).textContent = `${percentage.toFixed(2)}% completed`;
}

// Update progress bars for each condition
updateProgressBarPBU("Baik", JumlahDataPBU);
updateProgressBarPBU("Rusak", JumlahDataPBU);
updateProgressBarPBU("Hilang", JumlahDataPBU);

// Hitung PABA dan PABU =============================================================================
// Filter data for PABA
const DataPABA = data.filter((item) => item.nopilar.includes("PABA"));
const JumlahDataPABA = DataPABA.length;

// Function to update the progress bar and text for PABA
function updateProgressBarPABA(condition, totalCount) {
    const filteredData = DataPABA.filter((item) => item.kondisi === condition);
    const filteredCount = filteredData.length;
    const percentage = (filteredCount / totalCount) * 100;

    // Update HTML elements
    document.getElementById(
        `total-paba-${condition.toLowerCase()}`
    ).textContent = filteredCount;
    document.getElementById(
        `progress-bar-${condition.toLowerCase()}-paba`
    ).style.width = `${percentage}%`;
    document
        .getElementById(`progress-bar-${condition.toLowerCase()}-paba`)
        .setAttribute("aria-valuenow", percentage);
    document.getElementById(
        `progress-text-${condition.toLowerCase()}-paba`
    ).textContent = `${percentage.toFixed(2)}% completed`;
}

// Update progress bars for each condition for PABA
updateProgressBarPABA("Baik", JumlahDataPABA);
updateProgressBarPABA("Rusak", JumlahDataPABA);
updateProgressBarPABA("Hilang", JumlahDataPABA);

// Filter data for PABU
const DataPABU = data.filter((item) => item.nopilar.includes("PABU"));
const JumlahDataPABU = DataPABU.length;

// Function to update the progress bar and text for PABU
function updateProgressBarPABU(condition, totalCount) {
    const filteredData = DataPABU.filter((item) => item.kondisi === condition);
    const filteredCount = filteredData.length;
    const percentage = (filteredCount / totalCount) * 100;

    // Update HTML elements
    document.getElementById(
        `total-pabu-${condition.toLowerCase()}`
    ).textContent = filteredCount;
    document.getElementById(
        `progress-bar-${condition.toLowerCase()}-pabu`
    ).style.width = `${percentage}%`;
    document
        .getElementById(`progress-bar-${condition.toLowerCase()}-pabu`)
        .setAttribute("aria-valuenow", percentage);
    document.getElementById(
        `progress-text-${condition.toLowerCase()}-pabu`
    ).textContent = `${percentage.toFixed(2)}% completed`;
}

// Update progress bars for each condition for PABU
updateProgressBarPABU("Baik", JumlahDataPABU);
updateProgressBarPABU("Rusak", JumlahDataPABU);
updateProgressBarPABU("Hilang", JumlahDataPABU);

//PKBA dan PKBU ===================================================================================
const DataPKBA = data.filter((item) => item.nopilar.includes("PKBA"));
const JumlahDataPKBA = DataPKBA.length;

const DataPKBU = data.filter((item) => item.nopilar.includes("PKBU"));
const JumlahDataPKBU = DataPKBU.length;

// Function to update the progress bar and text for PKBA
function updateProgressBarPKBA(condition, totalCount) {
    const filteredData = DataPKBA.filter((item) => item.kondisi === condition);
    const filteredCount = filteredData.length;
    const percentage = (filteredCount / totalCount) * 100;

    document.getElementById(
        `total-pkba-${condition.toLowerCase()}`
    ).textContent = filteredCount;
    document.getElementById(
        `progress-bar-${condition.toLowerCase()}-pkba`
    ).style.width = `${percentage}%`;
    document
        .getElementById(`progress-bar-${condition.toLowerCase()}-pkba`)
        .setAttribute("aria-valuenow", percentage);
    document.getElementById(
        `progress-text-${condition.toLowerCase()}-pkba`
    ).textContent = `${percentage.toFixed(2)}% completed`;
}

// Update progress bars for each condition for PKBA
updateProgressBarPKBA("Baik", JumlahDataPKBA);
updateProgressBarPKBA("Rusak", JumlahDataPKBA);
updateProgressBarPKBA("Hilang", JumlahDataPKBA);

// Function to update the progress bar and text for PKBU
function updateProgressBarPKBU(condition, totalCount) {
    const filteredData = DataPKBU.filter((item) => item.kondisi === condition);
    const filteredCount = filteredData.length;
    const percentage = (filteredCount / totalCount) * 100;

    document.getElementById(
        `total-pkbu-${condition.toLowerCase()}`
    ).textContent = filteredCount;
    document.getElementById(
        `progress-bar-${condition.toLowerCase()}-pkbu`
    ).style.width = `${percentage}%`;
    document
        .getElementById(`progress-bar-${condition.toLowerCase()}-pkbu`)
        .setAttribute("aria-valuenow", percentage);
    document.getElementById(
        `progress-text-${condition.toLowerCase()}-pkbu`
    ).textContent = `${percentage.toFixed(2)}% completed`;
}

// Update progress bars for each condition for PKBU
updateProgressBarPKBU("Baik", JumlahDataPKBU);
updateProgressBarPKBU("Rusak", JumlahDataPKBU);
updateProgressBarPKBU("Hilang", JumlahDataPKBU);
