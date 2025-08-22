const seedInput = document.getElementById('seedInput');
const versionSelect = document.getElementById('versionSelect');
const generateBtn = document.getElementById('generateBtn');
const mapContainer = document.getElementById('mapContainer');

generateBtn.addEventListener('click', () => {
  const seed = seedInput.value.trim();
  const version = versionSelect.value;

  if (!seed) {
    mapContainer.innerHTML = "<span style='color:red;'>Please enter a seed.</span>";
    return;
  }

  // Temporary demo data (replace with real Cubiomes-based calculations later)
  const structures = [
    { type: "Village", x: 200, z: -150 },
    { type: "Stronghold", x: -400, z: 1200 },
    { type: "Desert Temple", x: 800, z: -300 }
  ];

  let html = `<h2>Seed: ${seed} (Version ${version})</h2><ul>`;
  structures.forEach(s => {
    html += `<li>${s.type} at X:${s.x}, Z:${s.z}</li>`;
  });
  html += "</ul>";
  mapContainer.innerHTML = html;
});
