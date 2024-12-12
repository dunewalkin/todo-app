const FilterButtons = ({ handleFilterChange, filter }) => {

   return (
      <div className="buttons-wrapper">
         <button  
            className={`all-tasks ${filter === 'all' ? 'button-active' : ''}`}
            onClick={() => handleFilterChange('all')}
            aria-label="Show all tasks">
               <span>All</span>
         </button>
         <button 
            className={`completed-tasks ${filter === 'completed' ? 'button-active' : ''}`}
            onClick={() => handleFilterChange('completed')}
            aria-label="Show completed tasks">
               <span>Completed</span>
         </button>
         <button 
            className={`active-tasks ${filter === 'active' ? 'button-active' : ''}`}
            onClick={() => handleFilterChange('active')}
            aria-label="Show active tasks">
               <span>Active</span>
         </button>
      </div>
   );
};

export default FilterButtons;