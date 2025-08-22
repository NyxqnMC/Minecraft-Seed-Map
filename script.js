// script.js
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

document.getElementById('generateBtn').addEventListener('click', async () => {
  const seed = document.getElementById('seedInput').value.trim();
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = '';

  if (!seed) {
    errorDiv.textContent = 'Please enter a valid seed.';
    return;
  }

  try {
    const response = await fetch(`https://api.mcsrvstat.us/seed/${seed}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    if (!data.structures) {
      errorDiv.textContent = 'No structure data found for this seed.';
      return;
    }

    map.setView([0, 0], 2);
    Object.values(data.structures).forEach(structure => {
      if (structure.x !== undefined && structure.z !== undefined) {
        L.marker([structure.z, structure.x])
          .addTo(map)
          .bindPopup(`<b>${structure.type}</b><br>X: ${structure.x}, Z: ${structure.z}`);
      }
    });
  } catch (err) {
    errorDiv.textContent = 'Error fetching data.';
    console.error(err);
  }
});
