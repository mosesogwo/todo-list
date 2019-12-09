const todo = (title, description, dueDate, priority) => {
  let completed = false;
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const isComplete = () => completed;

  const toggleComplete = () => {
    completed = !completed;
  };

  const getTodoData = () => ({
    title, description, dueDate, priority, completed,
  });

  /* eslint-disable no-param-reassign */
  const changePriority = (pVlaue) => {
    priority = pVlaue;
  };

  const changeTitle = (pTitle) => {
    title = pTitle;
  };

  const changeDescription = (pDescription) => {
    description = pDescription;
  };

  const changeDueDate = (pDate) => {
    dueDate = pDate;
  };

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    isComplete,
    toggleComplete,
    getTodoData,
    changePriority,
    changeDescription,
    changeTitle,
    changeDueDate,
  };
};

export default todo;
