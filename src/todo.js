const todo = (title, description, dueDate, priority) => {
    let completed = false;
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    
    const toggleComplete = () => {
        completed = !completed;
    };

    const changePriority = (pVlaue) => {
        priority = pVlaue;
    };

    return { getTitle, getDescription, getDueDate, getPriority, toggleComplete, changePriority };
  };

  export default todo;