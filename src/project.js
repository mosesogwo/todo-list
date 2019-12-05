const projects = JSON.parse(localStorage.getItem('projects_key')) || [];
let activeProjectId = JSON.parse(localStorage.getItem('active_project_id_key'));

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
  render();
}

const render = () => {
  renderProjects();
  renderTodos();
}

const setActiveProjectId = (value) => {
  activeProjectId = value;
}

const getActiveProject = () => {
  return projects.find(project => project.id === activeProjectId);
}

const clearContainer = (container) => {
  while(container.firstChild) {
    container.firstChild.remove();
  }
}

const renderProjects = () => {
  const projectsDiv = document.querySelector('.project');
  clearContainer(projectsDiv);
  projects.forEach((project) => {
    let template = document.createElement("a");
    template.classList.add("list-group-item", "list-group-item-action");
    template.setAttribute("data-id", `${project.id}`);
    template.setAttribute('href','#');
    template.innerHTML = `${ project.name } <span class="badge badge-primary badge-pill">${ project.todos.length }</span>`;
    if (project.id === activeProjectId) {
      template.classList.add("active");
    }
    projectsDiv.appendChild(template);
  });
}

const renderTodos = () => {
  const activeProject = getActiveProject();
  const todosDiv = document.querySelector('.todos');
  clearContainer(todosDiv);
  activeProject.todos.forEach((todo, idx) => {
    let template = document.createElement("a");
    template.setAttribute('href','#');
    template.setAttribute('id', `${ idx }`);
    template.classList.add("list-group-item", "list-group-item-action");
    template.innerHTML = `<h4>${ todo.title }</h4>`;
    let details = document.createElement("p");
    details.classList.add("hidden");
    details.innerText = "Description here \n Description here";
    template.appendChild(details)
    let editTodo = document.createElement("div");
    editTodo.classList.add("edit-todo", "text-right");
    editTodo.innerHTML = `
    <span><button class="btn btn-success">&#x2714;</button></span>
    <span><button class="btn btn-danger">&#x2715;</button></span>
    <span><button class="btn btn-primary">&#x270E;</button></span>`;
    template.appendChild(editTodo);
    if (todo.completed) {
      template.classList.add('completed');
    }
    todosDiv.appendChild(template);
  });
}

export { project, projects, save, render, activeProjectId, setActiveProjectId, getActiveProject};