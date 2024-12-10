const TaskInput = ({ tasks, setTasks, updateTasksLeft, username }) => {

   const handleAddTask = async (e) => {
      e.preventDefault();
    
      const taskInput = e.target.elements.task;
      const task = taskInput.value;
    
      try {
        const response = await fetch("/api/tasks/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, task }), 
        });
    
        if (response.ok) {
          const newTask = await response.json(); 
          setTasks((prevTasks) => [...prevTasks, newTask]); 
          updateTasksLeft([...tasks, newTask]);
          taskInput.value = ""; 
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
   };

   return (
      <form onSubmit={handleAddTask} className="todo-add">
         <input type="text" name="task" placeholder="Create a new todo…" required />
         <input type="submit" value="Add task" />
      </form>
   );
};

export default TaskInput;