const FilterButtons = ({ handleFilterChange, filter }) => {

   return (
      <div className="buttons-wrapper">
         <button  
            className={`all-tasks ${filter === 'all' ? 'button-active' : ''}`}
            onClick={() => handleFilterChange('all')}>
               <span>All</span>
         </button>
         <button 
            className={`completed-tasks ${filter === 'completed' ? 'button-active' : ''}`}
            onClick={() => handleFilterChange('completed')}>
               <span>Completed</span>
         </button>
         <button 
            className={`active-tasks ${filter === 'active' ? 'button-active' : ''}`}
            onClick={() => handleFilterChange('active')}>
               <span>Active</span>
         </button>
      </div>
   );
};

export default FilterButtons;