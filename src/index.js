/* global document */
import './style.css';
import todo from './todo';
import { project, projects, prepareForStorage } from './project';

let activeProjectId = '';

const setActiveProjectId = (value) => {
  activeProjectId = value;
};

const getActiveProject = () => projects.find(p => p.id === activeProjectId);

const clearContainer = (container) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};


const renderTodos = () => {
  const activeProject = getActiveProject();
  const todosDiv = document.querySelector('.todos');
  clearContainer(todosDiv);

  activeProject.todos.forEach((td, idx) => {
    const template = document.createElement('a');
    template.setAttribute('id', `${idx}`);
    template.classList.add('list-group-item', 'list-group-item-action');
    template.innerHTML = `<h4>${td.getTitle()}</h4>`;
    const details = document.createElement('p');
    details.innerText = `${td.getDescription()}`;
    const dueDate = document.createElement('p');
    dueDate.innerText = `On: ${td.getDueDate()}`;
    const priority = document.createElement('p');
    priority.innerText = `Priority: ${td.getPriority()}`;
    template.appendChild(details);
    template.appendChild(dueDate);
    template.appendChild(priority);
    const editTodo = document.createElement('div');
    editTodo.classList.add('edit', 'text-right');
    editTodo.innerHTML = `
  <span><button class="btn btn-success complete-todo">&#x2714;</button></span>
  <span><button class="btn btn-danger delete-todo">&#x2715;</button></span>
  <span><button class="btn btn-primary edit-todo">&#x270E;</button></span>
  <form class="edit-todo-form bg-primary text-light p-2 hidden">
    <label for="title">Title:</label>
    <input type="text" class="form-control" id="title" placeholder="Edit todo title">
    
    <label for="desc">Details:</label>
    <textarea type="text" class="form-control" id="desc" placeholder="Edit description of activity" rows="3"></textarea>

    <label for="date">Due Date:</label>
    <input type="date" class="form-control" id="date" placeholder="Edit due date"></textarea>
      
    <label for="priority">Priority</label>
      <select class="form-control" id="priority">
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
    <button type="submit" class="btn btn-primary btn-block">Submit</button>
  </form>`;

    template.appendChild(editTodo);
    if (td.isComplete() === true) {
      template.classList.add('completed');
      template.children[0].classList.toggle('completed');
      template.children[1].classList.toggle('completed');
      template.children[2].classList.toggle('completed');
      template.children[3].classList.toggle('completed');
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
  projects.forEach((p) => {
    const template = document.createElement('a');
    template.classList.add('list-group-item', 'list-group-item-action');
    template.setAttribute('data-id', `${p.id}`);
    template.setAttribute('href', '#');
    template.innerHTML = `${p.name} <span class="badge badge-primary badge-pill">${p.todos.length}</span>`;
    if (p.id === activeProjectId) {
      template.classList.add('active');
    }
    projectsDiv.appendChild(template);
  });
};

const render = () => {
  renderProjects();
  renderTodos();
};

const save = () => {
  localStorage.setItem('projects_key', JSON.stringify(prepareForStorage()));
  render();
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
  const deleteProjectBtn = document.querySelector('.delete-project');

  newProjectBtn.addEventListener('click', () => {
    clearForm(newProjectForm);
  });

  newProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = newProjectForm.querySelector('#projectName').value;
    if (name !== '') {
      const newProject = project(name);
      newProject.addToProjects();
      setActiveProjectId(newProject.id);
      clearForm(newProjectForm);
      save();
    }
  });

  deleteProjectBtn.addEventListener('click', () => {
    const pToDelete = getActiveProject();
    const pToDeleteIdx = projects.findIndex(p => p.id === pToDelete.id);
    projects.splice(pToDeleteIdx, 1);
    save();
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

    if (title !== '' && desc !== '' && date !== '' && priority !== '') {
      const newTodo = todo(title, desc, date, priority);
      const activeProject = getActiveProject();
      activeProject.todos.push(newTodo);
      clearForm(newTodoForm);
      save();
    }
  });

  projectsContainer.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'a') {
      setActiveProjectId(event.target.dataset.id);
      save();
    }
  });

  todosContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('complete-todo')) {
      const todoBody = event.target.parentNode.parentNode.parentNode;
      const todoTitle = todoBody.children[0].innerHTML;
      const activeProject = getActiveProject();
      const clickedTodo = activeProject.todos.find(t => t.getTitle() === todoTitle);
      clickedTodo.toggleComplete();
      save();
    }
    if (event.target.classList.contains('delete-todo')) {
      const todoBody = event.target.parentNode.parentNode.parentNode;
      const todoTitle = todoBody.children[0].innerHTML;
      const activeProject = getActiveProject();
      const clickedTodo = activeProject.todos.find(t => t.getTitle() === todoTitle);
      activeProject.todos.splice(activeProject.todos.indexOf(clickedTodo), 1);
      save();
    }
    if (event.target.classList.contains('edit-todo')) {
      const todoBody = event.target.parentNode.parentNode.parentNode;
      const todoTitle = todoBody.children[0].innerHTML;
      const activeProject = getActiveProject();
      const clickedTodo = activeProject.todos.find(t => t.getTitle() === todoTitle);
      const editTodoForm = todoBody.querySelector('.edit-todo-form');
      editTodoForm.querySelector('#title').value = clickedTodo.getTitle();
      editTodoForm.querySelector('#desc').value = clickedTodo.getDescription();
      editTodoForm.querySelector('#date').value = clickedTodo.getDueDate();
      editTodoForm.querySelector('#priority').value = clickedTodo.getPriority();
      editTodoForm.classList.toggle('hidden');

      editTodoForm.addEventListener('submit', () => {
        event.preventDefault();
        const title = editTodoForm.querySelector('#title').value;
        const desc = editTodoForm.querySelector('#desc').value;
        const date = editTodoForm.querySelector('#date').value;
        const priority = editTodoForm.querySelector('#priority').value;

        if (title !== '' && desc !== '' && date !== '' && priority !== '') {
          clickedTodo.changeTitle(title);
          clickedTodo.changeDescription(desc);
          clickedTodo.changePriority(priority);
          clickedTodo.changeDueDate(date);
          clearForm(editTodoForm);
          save();
        }
      });
    }
  });

  if (projects.length === 0) {
    (() => {
      const defaultProject = project('General');
      defaultProject.addToProjects();
    })();
  }
};

pageLoad();
render();
