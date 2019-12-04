import './style.css';
import todo from './todo';
import { project, projects, save, renderProjects, activeProjectId } from './project';

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
  })

  projectsContainer.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === "a") {
      activeProjectId = event.target.dataset.id;
      save();
    }
  })
}

pageLoad();