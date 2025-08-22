document.getElementById('generateBtn').addEventListener('click', () => {
  const seed = document.getElementById('seedInput').value;
  const version = document.getElementById('versionSelect').value;

  if (!seed) {
    alert('Please enter a seed');
    return;
  }

  // Example API (Chunkbase alternative): seed -> structures
  fetch(`https://api.openmc.world/structures?seed=${seed}&version=${version}`)
    .then(res => res.json())
    .then(data => {
      let html = "<h2>Structures Found:</h2><ul>";
      data.structures.forEach(s => {
        html += `<li>${s.type} at X:${s.x}, Z:${s.z}</li>`;
      });
      html += "</ul>";
      document.getElementById('mapContainer').innerHTML = html;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('mapContainer').innerHTML = "Error fetching data.";
    });
});
