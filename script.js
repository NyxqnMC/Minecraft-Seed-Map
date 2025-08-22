const seedInput = document.getElementById('seedInput');
const versionSelect = document.getElementById('versionSelect');
const generateBtn = document.getElementById('generateBtn');
const errorMsg = document.getElementById('errorMsg');
const mapDiv = document.getElementById('map');

let map = L.map(mapDiv).setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

generateBtn.addEventListener('click', async () => {
  const seed = seedInput.value.trim();
  const version = versionSelect.value;
  errorMsg.textContent = '';
  map.eachLayer((layer) => layer !== map.options.layers ? map.removeLayer(layer) : null);

  if (!seed) {
    errorMsg.textContent = 'Please enter a seed.';
    return;
  }

  try {
    // Example: call your own hosted API (or local processing) using cubiomes
    const response = await fetch(`https://your-api-url/structures?seed=${encodeURIComponent(seed)}&version=${version}`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const data = await response.json();
    if (!data.structures || data.structures.length === 0) {
      errorMsg.textContent = 'No structures found for this seed/version combination.';
      return;
    }

    data.structures.forEach(s => {
      const marker = L.marker([s.z, s.x]).addTo(map);
      marker.bindPopup(`<strong>${s.type}</strong><br>X: ${s.x}, Z: ${s.z}`);
    });

    // Fit map to markers
    const coords = data.structures.map(s => L.latLng(s.z, s.x));
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50] });

  } catch (err) {
    console.error(err);
    errorMsg.textContent = 'Error retrieving structure data. Please check your seed and version, or try again later.';
  }
});
