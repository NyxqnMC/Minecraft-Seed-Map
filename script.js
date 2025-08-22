const seedInput = document.getElementById('seedInput');
const versionSelect = document.getElementById('versionSelect');
const generateBtn = document.getElementById('generateBtn');
const errorMsg = document.getElementById('errorMsg');

let map = L.map('map').setView([0, 0], 2);

// Add background tiles to map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

generateBtn.addEventListener('click', () => {
  const seed = seedInput.value.trim();
  const version = versionSelect.value;
  errorMsg.textContent = '';

  if (!seed) {
    errorMsg.textContent = 'Please enter a seed.';
    return;
  }

  // Clear old markers
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) map.removeLayer(layer);
  });

  // Fake data (Replace later with real Cubiomes-generated data)
  const structures = [
    { type: "Village", x: 200, z: -150 },
    { type: "Stronghold", x: -400, z: 1200 },
    { type: "Desert Temple", x: 800, z: -300 }
  ];

  if (structures.length === 0) {
    errorMsg.textContent = 'No structures found for this seed.';
    return;
  }

  const markers = [];

  structures.forEach(s => {
    // Convert Minecraft X,Z to map coords (swap X->Lon, Z->Lat just for demo)
    const lat = s.z / 100;
    const lon = s.x / 100;

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`<strong>${s.type}</strong><br>X:${s.x}, Z:${s.z}`);
    markers.push([lat, lon]);
  });

  // Zoom map to fit markers
  if (markers.length > 0) {
    const bounds = L.latLngBounds(markers);
    map.fitBounds(bounds, { padding: [50, 50] });
  }
});
