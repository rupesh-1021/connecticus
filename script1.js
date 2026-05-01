// script1.js - Connecticus Main App Logic

// Show different sections
function showSection(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(section + '-section').classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(document.querySelectorAll('.nav-btn'))
                        .find(btn => btn.getAttribute('onclick').includes(section));
  if (activeBtn) activeBtn.classList.add('active');
}

// Dummy Turf Data
const turfData = [
  { id: 1, name: "Elite Cricket Turf", sport: "Cricket", location: "Velachery", distance: 7, price: 1200, rating: 4.8, img: "https://source.unsplash.com/random/400x250/?cricket" },
  { id: 2, name: "Pro Badminton Hub", sport: "Badminton", location: "Anna Nagar", distance: 11, price: 850, rating: 4.7, img: "https://source.unsplash.com/random/400x250/?badminton" },
  { id: 3, name: "GreenField Football", sport: "Football", location: "Guindy", distance: 14, price: 1600, rating: 4.6, img: "https://source.unsplash.com/random/400x250/?football" },
  { id: 4, name: "Hoop Arena", sport: "Basketball", location: "Tambaram", distance: 19, price: 950, rating: 4.5, img: "https://source.unsplash.com/random/400x250/?basketball" }
];

// Render Sport Cards
function renderSports() {
  const sports = ["Cricket", "Badminton", "Football", "Volleyball", "Basketball"];
  const container = document.getElementById("sportsGrid");
  container.innerHTML = sports.map(sport => `
    <div class="sport-card" onclick="filterTurfs('${sport}')">
      <h3>${sport}</h3>
    </div>
  `).join('');
}

// Search Turfs
function searchTurfs() {
  const container = document.getElementById("turfResults");
  container.innerHTML = "<p style='grid-column:1/-1;text-align:center;padding:50px;'>Finding best turfs near you...</p>";

  setTimeout(() => {
    container.innerHTML = turfData.map(turf => `
      <div class="turf-card">
        <img src="${turf.img}" alt="${turf.name}">
        <div class="turf-info">
          <h3>${turf.name}</h3>
          <p>${turf.location} • ${turf.distance} km away</p>
          <p>⭐ ${turf.rating} • ${turf.sport}</p>
          <p class="price">₹${turf.price} / hour</p>
          <button class="btn-primary" onclick="bookTurf(${turf.id})">Book Now</button>
        </div>
      </div>
    `).join('');
  }, 700);
}

function filterTurfs(sport) {
  alert(`Showing ${sport} turfs near you...`);
  searchTurfs();
}

function bookTurf(id) {
  const turf = turfData.find(t => t.id === id);
  alert(`🎉 Booking started for: ${turf.name}\n\nNext step: Enter teammate details and performance info.`);
}

// Post for Team
function postForTeam() {
  const sport = document.getElementById("sportSelect").value;
  const date = document.getElementById("teamDate").value;

  if (!sport || !date) return alert("Please select sport and date");

  alert(`✅ Your request for ${sport} players on ${date} has been posted successfully!\nPlayers will contact you soon.`);
}

// Render Sample Players
function renderPlayers() {
  const players = [
    {name: "Arjun Reddy", sport: "Cricket", skill: "Batsman", dist: "6 km"},
    {name: "Priya Nair", sport: "Badminton", skill: "Smash Specialist", dist: "9 km"},
    {name: "Rahul Menon", sport: "Football", skill: "Forward", dist: "12 km"}
  ];

  const container = document.getElementById("playerList");
  container.innerHTML = players.map(p => `
    <div class="player-card glass-card">
      <h3>${p.name}</h3>
      <p><strong>Sport:</strong> ${p.sport}</p>
      <p><strong>Skill:</strong> ${p.skill}</p>
      <p><strong>Distance:</strong> ${p.dist}</p>
      <button class="btn-primary" onclick="connectPlayer('${p.name}')">Connect Now</button>
    </div>
  `).join('');
}

function connectPlayer(name) {
  alert(`Connection request sent to ${name}!`);
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  renderSports();
  renderPlayers();
  searchTurfs();
  showSection('booking');
});