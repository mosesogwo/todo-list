import './style.css';
import todo from './todo';
import { project, projects } from './project';

let activeProjectId = '';

const renderTodos = () => {
const activeProject = getActiveProject();
const todosDiv = document.querySelector('.todos');
clearContainer(todosDiv);

activeProject.todos.forEach((todo, idx) => {
  let template = document.createElement("a");
  template.setAttribute('id', `${ idx }`);
  template.classList.add("list-group-item", "list-group-item-action");
  template.innerHTML = `<h4>${ todo.getTitle() }</h4>`;
  let details = document.createElement("p");
  details.innerText = `${ todo.getDescription() }`;
  template.appendChild(details);
  let editTodo = document.createElement("div");
  editTodo.classList.add("edit", "text-right");
  editTodo.innerHTML = `
  <span><button class="btn btn-success complete-todo">&#x2714;</button></span>
  <span><button class="btn btn-danger delete-todo">&#x2715;</button></span>
  <span><button class="btn btn-primary edit-todo">&#x270E;</button></span>`;
  template.appendChild(editTodo);
  if (todo.isComplete() === true) {
    template.classList.add('completed');
    template.children[0].classList.toggle('completed');
    template.children[1].classList.toggle('completed');
  }
  todosDiv.appendChild(template);
});
};

const renderProjects = () => {
  const projectsDiv = document.querySelector('.project');
  clearContainer(projectsDiv);
  if (activeProjectId === '') {
    activeProjectId = projects[0].id;
  }
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
};

const render = () => {
  renderProjects();
  renderTodos();
};

const save = () => {
  // localStorage.setItem('projects_key', JSON.stringify(projects));
  // localStorage.setItem('active_project_id_key', JSON.stringify(activeProjectId));
  render();
};

const setActiveProjectId = (value) => {
  activeProjectId = value;
};

const getActiveProject = () => {
  return projects.find(project => project.id === activeProjectId);
};

const clearContainer = (container) => {
  while(container.firstChild) {
    container.firstChild.remove();
  }
};

const clearForm = (form) => {
  document.querySelector('#title').value = '';
  document.querySelector('#desc').value = '';
  document.querySelector('#date').value = '';
  document.querySelector('#projectName').value = '';
  form.classList.toggle('hidden');
};

const pageLoad = () => {
  const newProjectBtn = document.querySelector('.new-project');
  const newProjectForm = document.querySelector('.new-project-form');
  const newTodoBtn = document.querySelector('.new-todo');
  const newTodoForm = document.querySelector('.new-todo-form');
  const projectsContainer = document.querySelector('.project');
  const todosContainer = document.querySelector('.todos');
  const completeTodo = document.querySelector('.complete-todo');

  newProjectBtn.addEventListener('click', () => {
    clearForm(newProjectForm);
  });

  newProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = newProjectForm.querySelector('#projectName').value;
    if ( name !== "") {
      let newProject = project(name);
      newProject.addToProjects();
      clearForm(newProjectForm);
      save();
    } 
  });

  newTodoBtn.addEventListener('click', () => {
    clearForm(newTodoForm);
  });

  newTodoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = newTodoForm.querySelector('#title').value;
    const desc = newTodoForm.querySelector('#desc').value;
    const date = newTodoForm.querySelector('#date').value;
    const priority = newTodoForm.querySelector('#priority').value;

    if (title !== "" && desc !== "" && date !== "" && priority !== "") {
      const newTodo = todo(title, desc, date, priority);
      let activeProject = getActiveProject();
      activeProject.todos.push(newTodo);
      clearForm(newTodoForm);
      save();
    }
  });

  projectsContainer.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === "a") {
      setActiveProjectId(event.target.dataset.id);
      save();
    }
  });

  todosContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains("complete-todo")) {
      const todoBody = event.target.parentNode.parentNode.parentNode;
      const todoTitle = todoBody.children[0].innerHTML;
      let activeProject = getActiveProject();
      let clickedTodo = activeProject.todos.find(t => t.getTitle() === todoTitle);
      clickedTodo.toggleComplete();
      save();
    }
    if (event.target.classList.contains("delete-todo")) {
      const todoBody = event.target.parentNode.parentNode.parentNode;
      const todoTitle = todoBody.children[0].innerHTML;
      let activeProject = getActiveProject();
      let clickedTodo = activeProject.todos.find(t => t.getTitle() === todoTitle);
      activeProject.todos.splice(activeProject.todos.indexOf(clickedTodo),1);
      save();
    }
  });

}

pageLoad();
render();