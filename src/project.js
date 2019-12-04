const projects = JSON.parse(localStorage.getItem('projects_key')) || [];
let activeProjectId = JSON.parse(localStorage.getItem('active_project_id_key'))

const project = (name) => {
  const todos = [];
  const id = Date.now().toString();
  const addToProjects = () => {
    projects.push ({ id, name, todos, addToProjects });
  }
  return { id, name, todos, addToProjects };
}

const save = () => {
  localStorage.setItem('projects_key', JSON.stringify(projects));
  localStorage.setItem('active_project_id_key', JSON.stringify(activeProjectId));
  renderProjects();
}

const renderProjects = () => {
  const projectsDiv = document.querySelector('.project');
  projectsDiv.innerHTML = '';
  projects.forEach((project) => {
    let template = document.createElement("a");
    template.classList.add("list-group-item", "list-group-item-action");
    template.setAttribute("data-id", `${project.id}`);
    template.innerHTML = `${ project.name } <span class="badge badge-primary badge-pill">${ project.todos.length }</span>`;
    if (project.id === activeProjectId) {
      template.classList.add("active");
    }
    projectsDiv.appendChild(template);
  });
}

const setActiveProjectId = (value) => {
  activeProjectId = value;
}

export { project, projects, save, renderProjects, activeProjectId, setActiveProjectId };