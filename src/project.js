const projects = JSON.parse(localStorage.getItem('projects_key')) || [];

const project = (name) => {
  const todos = [];
  const id = Date.now().toString();
  const addToProjects = () => {
    projects.push ({ id, name, todos });
  }
  return { id, name, todos, addToProjects };
};

export { project, projects };