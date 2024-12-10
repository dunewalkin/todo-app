const BottomActions = ({ tasksLeft, tasks, setTasks, updateTasksLeft }) => {

   const handleClearCompleted = async () => {
      const response = await fetch('api/tasks/clear', {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({}),
      });

      if (response.ok) {
         const remainingTasks = tasks.filter(task => !task.completed);
         setTasks(remainingTasks);
         updateTasksLeft(remainingTasks);
      } else {
         console.error('Failed to clear completed tasks');
      }
   };

   return (
      <div className="bottom-wrapper">
         <p className='tasks-left'>{tasksLeft} items left</p>
         <button className="clear-tasks" onClick={() => handleClearCompleted()}><span>Clear Completed</span></button>
      </div>
   );
};

export default BottomActions;