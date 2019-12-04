import './style.css';
import todo from './todo';
import { project, save, setActiveProjectId, getActiveProject } from './project';

const pageLoad = () => {
  const newProjectBtn = document.querySelector('.new-project');
  const newProjectForm = document.querySelector('.new-project-form');
  const newTodoBtn = document.querySelector('.new-todo');
  const newTodoForm = document.querySelector('.new-todo-form');
  const projectsContainer = document.querySelector('.project');

  newProjectBtn.addEventListener('click', () => {
    newProjectForm.classList.toggle('hidden');
  });

  newProjectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = newProjectForm.querySelector('#projectName').value;
    if ( name !== "") {
      const newProject = project(name);
      newProject.addToProjects();
      save();
    } 
  });

  newTodoBtn.addEventListener('click', () => {
    newTodoForm.classList.toggle('hidden');
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
      save();
    }
  });

  projectsContainer.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === "a") {
      setActiveProjectId(event.target.dataset.id);
      save();
    }
  });
}

pageLoad();