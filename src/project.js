const projects = JSON.parse(localStorage.getItem('projects_key')) || [];

const project = (name) => {
  const todos = [];

  const addToProjects = () => {
    projects.push ({ name, todos });
  }
  return { name, todos, addToProjects };
}

const save = () => {
  localStorage.setItem('projects_key', JSON.stringify(projects));
  renderProjects();
}

const renderProjects = () => {
  const projectsDiv = document.querySelector('.project');
  projectsDiv.innerHTML = '';
  projects.forEach((project) => {
    let template = `
    <a href="#" class="list-group-item list-group-item-action"> ${ project.name } <span class="badge badge-primary badge-pill">${ project.todos.length }</span></a>`;
    projectsDiv.insertAdjacentHTML('beforeend', template);
  });
}

export { project, projects, save, renderProjects };