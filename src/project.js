/* global document */
import todo from './todo';

/* eslint-disable no-param-reassign */
const retrieveProjects = () => {
  const storedProjects = JSON.parse(localStorage.getItem('projects_key')) || [];
  const newProjects = JSON.parse(JSON.stringify(storedProjects));
  if (newProjects.length > 0) {
    newProjects.forEach((p) => {
      p.todos.forEach((t, tIdx) => {
        const newT = todo(t.title, t.description, t.dueDate, t.priority);
        newT.completed = t.completed;
        p.todos[tIdx] = newT;
      });
    });
  }
  return newProjects;
};

const projects = retrieveProjects();

const prepareForStorage = () => {
  const projectsForStorage = JSON.parse(JSON.stringify(projects));
  projects.forEach((p, pIdx) => {
    p.todos.forEach((t, tIdx) => {
      projectsForStorage[pIdx].todos[tIdx] = t.getTodoData();
    });
  });
  return projectsForStorage;
};

const project = (name) => {
  const todos = [];
  const id = Date.now().toString();
  const addToProjects = () => {
    projects.push({ id, name, todos });
  };
  return {
    id, name, todos, addToProjects,
  };
};

export { project, projects, prepareForStorage };
