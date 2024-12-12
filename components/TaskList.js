const TaskList = ({ tasks, setTasks, filter }) => {

   const handleToggleTask = async (taskName, newStatus) => {
    
      try {
         const res = await fetch('/api/tasks/toggle', {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: taskName, completed: newStatus }), 
         });
      
         if (res.ok) {
            setTasks((prevTasks) =>
               prevTasks.map((task) =>
               task.name === taskName ? { ...task, completed: newStatus } : task
               )
            );
         } else {
            console.error(`Failed to update task status: ${taskName}`);
         }
      } catch (error) {
        console.error("Error updating task status:", error);
      }
   };

   const handleDeleteTask = async (taskName) => {
      try {
         const res = await fetch('/api/tasks/delete', {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: taskName }),
         });
      
         if (res.ok) {
            setTasks((prevTasks) => prevTasks.filter(task => task.name !== taskName)); 
         } else {
            console.error(`Failed to delete task: ${taskName}`);
         }
         } catch (error) {
         console.error("Error deleting task:", error);
      }
   };

   const filteredTasks = tasks.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true; 
   })
   // .sort((a, b) => a.completed - b.completed)
   ;

   
   return (
      <ul>
         {filteredTasks.map((task, index) => (
            <li key={index} className='todo-item'>
               <div className='task-wrapper'>
                  <input
                     type="checkbox"
                     checked={task.completed}
                     className='task-checkbox'
                     onChange={(e) => handleToggleTask(task.name, e.target.checked)} 
                  />
                  <label className={`task-label ${task.completed ? 'completed' : ''}`}>
                     {task.name}
                  </label>
               </div>
               <button className='delete-btn' onClick={() => handleDeleteTask(task.name)}></button>
            </li>
         ))}
      </ul> 
   );
};

export default TaskList;