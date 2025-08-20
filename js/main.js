// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("HCI Lab page loaded");

  // Fetch data from JSON file (index.json)
  fetch('/data/index.json')
    .then(response => response.json())
    .then(data => {
      loadResearchAreas(data.researchAreas); // Load research areas
      loadEvents(data.events);
    
    })
    .catch(error => console.error("Failed to load index.json:", error));

  // Fetch data from project.json and load projects
  fetch('/data/project.json')
    .then(response => response.json())
    .then(data => {
      loadProjects(data.projects);
    })
    .catch(error => console.error("Failed to load project.json:", error));
});

// Toggle mobile navigation menu
function toggleNav() {
  var nav = document.getElementById("mainNav");
  nav.classList.toggle("open");
}

// Load Research Areas dynamically
function loadResearchAreas(researchAreas) {
  const container = document.querySelector('#research-areas');
  if (!container) return; // Safety check if the container is not found
  container.innerHTML = "<ul class='list-unstyled ps-3'>"; // Bootstrap padding

  researchAreas.forEach(area => {
    container.innerHTML += `<li>${area.title}</li>`; // Simple bullet point list
  });
}

// Load Upcoming Events dynamically
function loadEvents(events) {
  const list = document.querySelector('#event-list');
  if (!list) return; // Safety check if the list is not found
  list.innerHTML = "";

  events.forEach(event => {
    const item = `
      <li class="list-group-item">
        <h4>${event.name}</h4>
        <p><strong>Date:</strong> ${event.date}</p>
        <p>${event.description}</p>
      </li>`;
    list.innerHTML += item;
  });
}

// Load Projects dynamically into Bootstrap cards
function loadProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container) return; // Safety check if container is not found

  container.innerHTML = ""; // Clear any existing projects

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('col-md-4');

    projectCard.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${project.image}" class="card-img-top" alt="${project.name}" />
        <div class="card-body text-center">
          <h5 class="card-title">${project.name}</h5>
          <button class="btn btn-primary mt-3" onclick="showDescription('${escapeQuotes(project.description)}')">Read More</button>
        </div>
      </div>
    `;

    container.appendChild(projectCard);
  });
}

// Show project description inside Bootstrap modal
function showDescription(description) {
  const descriptionElement = document.getElementById('project-description');
  if (!descriptionElement) return;

  descriptionElement.innerText = description;

  var myModal = new bootstrap.Modal(document.getElementById('descriptionModal'));
  myModal.show();
}

// Helper function to escape single quotes in description
function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}
