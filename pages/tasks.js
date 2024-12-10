import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import "../styles/pages/tasks.scss";
import Header from '../components/Header';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import BottomActions from '../components/BottomActions';
import FilterButtons from '../components/FilterButtons';

const Tasks = () => {
   const [tasks, setTasks] = useState([]);
   const [tasksLeft, setTasksLeft] = useState(0);
   const [filter, setFilter] = useState('all'); 
   const [username, setUsername] = useState("");
   const [message, setMessage] = useState('');
   const router = useRouter();

   const todoWrapperRef = useRef(null); 
   const headerRef = useRef(null); 

   useEffect(() => {
      const adjustHeaderPosition = () => {
        if (todoWrapperRef.current && headerRef.current) {
          const availableHeight = window.innerHeight - todoWrapperRef.current.offsetHeight;
          headerRef.current.style.top = `${availableHeight / 4}px`;
        }
      };
    
      adjustHeaderPosition();
    
      window.addEventListener('resize', adjustHeaderPosition);
    
      return () => {
        window.removeEventListener('resize', adjustHeaderPosition);
      };
   }, [tasks]); 

    
   useEffect(() => {
      const fetchUsername = async () => {
         try {
            const res = await fetch('/api/user', {
               method: 'GET',
               credentials: 'include', 
            });
   
            if (res.ok) {
               const data = await res.json();
               setUsername(data.username);
            } else if (res.status === 401) {
               router.push('/login'); 
            } else {
               console.error("Failed to fetch username");
            }
         } catch (error) {
            console.error("Error fetching username:", error);
         }
      };
  
      fetchUsername();
   }, [router]);
  

   useEffect(() => {
      const fetchTasks = async () => {
         
         try {
            const res = await fetch('/api/tasks', {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' },
               credentials: 'include', 
            });
   
            if (res.ok) {
               const data = await res.json();
               console.log("Fetched tasks data:", data); 
               setTasks(data.tasks);
            } else {
               console.error("Failed to fetch tasks");
            }
         } catch (error) {
            console.error("Error fetching tasks:", error);
         }
      };
   
      fetchTasks();
   }, []);


   const handleFilterChange = (filterType) => {
      setFilter(filterType);

      const filteredTasks = tasks.map(task => ({
         ...task,
         hidden:
            filterType === 'active' ? task.completed : 
            filterType === 'completed' ? !task.completed : 
            false, 
      }));

      setTasks(filteredTasks);

      const visibleTasks = filteredTasks.filter(task => !task.hidden);
      if (visibleTasks.length === 0) {
         const noTasksMessage =
            filterType === 'active'
               ? 'No active tasks to show.'
               : filterType === 'completed'
               ? 'No completed tasks to show.'
               : '';
         setMessage(noTasksMessage);
      } else {
         setMessage('');
      }
   };

   const updateTasksLeft = (tasks) => {
      if (Array.isArray(tasks)) {
        const totalLeftTasks = tasks.filter((task) => !task.completed).length;
        setTasksLeft(totalLeftTasks);
      }
   };
  
   useEffect(() => {
      updateTasksLeft(tasks); 
   }, [tasks]);

   return (
      <>
         <Header username={username} headerRef={headerRef}/>

         <div ref={todoWrapperRef} className='todo-wrapper'>
            <TaskInput 
               username={username}
               setTasks={setTasks}
               updateTasksLeft={updateTasksLeft}
               tasks={tasks} 
            />

            <div className='todo-list'>
               <TaskList 
                  tasks={tasks}
                  filter={filter}
                  setTasks={setTasks}
               />

               {message && <p className="message">{message}</p>}

               <BottomActions 
                  tasks={tasks}
                  setTasks={setTasks}
                  updateTasksLeft={updateTasksLeft}
                  tasksLeft={tasksLeft}
               />
            </div>

            <FilterButtons 
               handleFilterChange={handleFilterChange}
               filter={filter}
            />
         </div>         
      </>    
   );
};

export default Tasks;