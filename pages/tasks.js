// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router'; // Импорт useRouter

// const Tasks = () => {
//    const [tasks, setTasks] = useState([]);
//    const [tasksLeft, setTasksLeft] = useState(0);
//    const [filter, setFilter] = useState('all'); // active, completed, all
//    const [username, setUsername] = useState("");
//    const router = useRouter();

//    useEffect(() => {
//       const storedUsername = localStorage.getItem("username");
//       if (storedUsername) {
//       setUsername(storedUsername);
//       } else {
//       // Если имя пользователя не найдено, перенаправить на страницу логина
//       router.push("/login");
//       }
//    }, []);
 

//   useEffect(() => {
//       // Загрузка задач при монтировании компонента
//       const fetchTasks = async () => {
//          const response = await fetch('/api/tasks');
//          const data = await response.json();
//          setTasks(data);
//          updateTasksLeft(data);
//       };

//       fetchTasks();
//    }, []);

//    const updateTasksLeft = (tasks) => {
//       const totalLeftTasks = tasks.filter((task) => !task.completed).length;
//       setTasksLeft(totalLeftTasks);
//    };

//   const handleAddTask = async (e) => {
//    e.preventDefault();
 
//    const taskInput = e.target.elements.task;
//    const task = taskInput.value;
 
//    if (!task) return;
 
//    try {
//       const response = await fetch("/api/tasks/add", {
//          method: "POST",
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({ task }),
//       });

//       if (response.ok) {
//          const newTask = { name: task, completed: false };
//          setTasks((prevTasks) => [...prevTasks, newTask]); // Обновляем список задач
//          updateTasksLeft([...tasks, newTask]); // Обновляем количество незавершённых задач
//          taskInput.value = ""; // Очищаем поле ввода
//       } else {
//          console.error("Failed to add task");
//       }
//       } catch (error) {
//       console.error("Error adding task:", error);
//       }
//    };
 

//    const handleToggleTask = async (taskName, completed) => {
//       const response = await fetch('/tasks/toggle', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({ task: taskName, completed }),
//       });

//       if (response.ok) {
//          const updatedTasks = tasks.map(task =>
//          task.name === taskName ? { ...task, completed } : task
//          );
//          setTasks(updatedTasks);
//          updateTasksLeft(updatedTasks);
//       } else {
//          console.error('Failed to update task');
//       }
//    };

//    const handleDeleteTask = async (taskName) => {
//       const response = await fetch('/tasks/delete', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({ task: taskName }),
//       });

//       if (response.ok) {
//          const updatedTasks = tasks.filter(task => task.name !== taskName);
//          setTasks(updatedTasks);
//          updateTasksLeft(updatedTasks);
//       } else {
//          console.error('Failed to delete task');
//       }
//    };

//    const handleClearCompleted = async () => {
//       const response = await fetch('/tasks/clear', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({}),
//       });

//       if (response.ok) {
//          const remainingTasks = tasks.filter(task => !task.completed);
//          setTasks(remainingTasks);
//          updateTasksLeft(remainingTasks);
//       } else {
//          console.error('Failed to clear completed tasks');
//       }
//    };

//    const filteredTasks = tasks.filter(task => {
//       if (filter === 'completed') return task.completed;
//       if (filter === 'active') return !task.completed;
//       return true; // 'all' filter
//    });

//    return (
//       <div>
//          <div className="header-wrapper">
//             <h2>{username ? `${username}'s tasks` : "Loading..."}</h2>
//          </div>

//          <div className="todo-wrapper">
//             <form action="/tasks/add" method="POST" className="todo-add">
//                <input type="text" name="task" placeholder="Create a new todo…" required />
//                <input type="submit" value="Add task" />
//             </form>

//             <div className="todo-list">
//                <ul>
//                   {filteredTasks.map((task, index) => (
//                   <li key={index} className="todo-item">
//                      <div className="task-wrapper">
//                         <input
//                         type="checkbox"
//                         className="task-checkbox"
//                         checked={task.completed}
//                         onChange={(e) => handleToggleTask(task.name, e.target.checked)}
//                         />
//                         <label
//                         htmlFor={`task-${index}`}
//                         className={`task-label ${task.completed ? 'completed' : ''}`}
//                         >
//                         {task.name}
//                         </label>
//                      </div>
//                      <button
//                         className="delete-btn"
//                         aria-label="Delete task"
//                         onClick={() => handleDeleteTask(task.name)}
//                      >
//                         Delete
//                      </button>
//                   </li>
//                   ))}
//                </ul>

//                <div className="bottom-wrapper">
//                   <p className="tasks-left">{tasksLeft} items left</p>
//                   <button className="clear-tasks" onClick={handleClearCompleted}>Clear Completed</button>
//                </div>
//             </div>

//             <div className="buttons-wrapper">
//                <button
//                   className={`all-tasks ${filter === 'all' ? 'button-active' : ''}`}
//                   onClick={() => setFilter('all')}
//                >
//                   All
//                </button>
//                <button
//                   className={`completed-tasks ${filter === 'completed' ? 'button-active' : ''}`}
//                   onClick={() => setFilter('completed')}
//                >
//                   Completed
//                </button>
//                <button
//                   className={`active-tasks ${filter === 'active' ? 'button-active' : ''}`}
//                   onClick={() => setFilter('active')}
//                >
//                   Active
//                </button>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default Tasks;





import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Tasks = () => {
   const [tasks, setTasks] = useState([]);
   const [tasksLeft, setTasksLeft] = useState(0);
   const [filter, setFilter] = useState('all'); // active, completed, all
   const [username, setUsername] = useState("");
   const router = useRouter();

   useEffect(() => {
      // Получаем имя пользователя из localStorage
      const storedUsername = localStorage.getItem("username");
      if (!storedUsername) {
         // Если пользователь не авторизован, перенаправляем на страницу логина
         router.push("/login");
      } else {
         setUsername(storedUsername);
      }
   }, [router]);

   // useEffect(() => {
   //    const fetchTasks = async () => {
   //       const token = localStorage.getItem("token"); // Получаем токен из localStorage
   //       console.log("Token:", token); // Выводим токен в консоль
   
   //       if (!token) {
   //          console.error("Token is missing");
   //          return;
   //       }
   
   //       const res = await fetch('/api/tasks', {
   //          method: 'GET',
   //          headers: {
   //             'Authorization': `Bearer ${token}`,
   //             'Content-Type': 'application/json',
   //          }
   //       });
   
   //       if (res.ok) {
   //          const data = await res.json();
   //          console.log("Fetched tasks data:", data); 
   //          setTasks(data);
   //          // updateTasksLeft(data);
   //       } else {
   //          console.error("Failed to fetch tasks");
   //       }
   //    };
   
   //    fetchTasks();
   // }, []);
   
   

   // useEffect(() => {
   //    const fetchTasks = async () => {
   //       const token = localStorage.getItem("token");
   //       if (!token) {
   //          console.error("Token is missing");
   //          return;
   //       }
   
   //       try {
   //          const res = await fetch('/api/tasks', {
   //             method: 'GET',
   //             headers: {
   //                'Authorization': `Bearer ${token}`,
   //                'Content-Type': 'application/json',
   //             }
   //          });
   
   //          if (res.ok) {
   //             const data = await res.json();
   //             console.log("Fetched tasks data:", data); // Убедитесь, что данные приходят как объект с ключом `tasks`
   
   //             // Устанавливаем только массив задач
   //             setTasks(data.tasks); 
   //          } else {
   //             console.error("Failed to fetch tasks");
   //          }
   //       } catch (error) {
   //          console.error("Error fetching tasks:", error);
   //       }
   //    };
   
   //    fetchTasks();
   // }, []);

   useEffect(() => {
      const fetchTasks = async () => {
         const token = localStorage.getItem("token");
         if (!token) {
            console.error("Token is missing");
            return;
         }
   
         try {
            const res = await fetch('/api/tasks', {
               method: 'GET',
               headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
               }
            });
   
            if (res.ok) {
               const data = await res.json();
               console.log("Fetched tasks data:", data); // Убедитесь, что получаете массив строк
   
               // Преобразуем массив строк в массив объектов с полем completed
               const formattedTasks = data.tasks.map(name => ({
                  name,
                  completed: false // Значение по умолчанию, если API его не возвращает
               }));
   
               setTasks(formattedTasks); // Сохраняем в состояние
            } else {
               console.error("Failed to fetch tasks");
            }
         } catch (error) {
            console.error("Error fetching tasks:", error);
         }
      };
   
      fetchTasks();
   }, []);
   
   


   const updateTasksLeft = (tasks) => {
      const totalLeftTasks = tasks.filter((task) => !task.completed).length;
      setTasksLeft(totalLeftTasks);
   };

   // const handleAddTask = async (e) => {
   //    e.preventDefault();
   //    const taskInput = e.target.elements.task;
   //    const task = taskInput.value;

   //    if (!task) return;

   //    const token = localStorage.getItem("token");

   //    const res = await fetch('/api/tasks', {
   //       method: 'POST',
   //       headers: {
   //          'Authorization': `Bearer ${token}`,
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify({ task })
   //    });

   //    if (res.ok) {
   //       const newTask = { name: task, completed: false };
   //       setTasks((prevTasks) => [...prevTasks, newTask]);
   //       updateTasksLeft([...tasks, newTask]);
   //       taskInput.value = "";
   //    } else {
   //       console.error("Failed to add task");
   //    }
   // };


   const handleAddTask = async (e) => {
      e.preventDefault();
    
      const taskInput = e.target.elements.task;
      const task = taskInput.value;
    
      if (!task) return;
    
      const username = localStorage.getItem("username"); // Берем имя пользователя из локального хранилища
    
      if (!username) {
        console.error("Username not found in localStorage");
        return;
      }
    
      try {
        const response = await fetch("/api/tasks/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, task }), // Отправляем username и task
        });
    
        if (response.ok) {
          const newTask = await response.json(); // Получаем добавленную задачу с сервера
          setTasks((prevTasks) => [...prevTasks, newTask]); // Обновляем список задач
          updateTasksLeft([...tasks, newTask]); // Обновляем количество незавершённых задач
          taskInput.value = ""; // Очищаем поле ввода
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    };

   const handleToggleTask = async (taskName, completed) => {
      const token = localStorage.getItem("token");

      const res = await fetch('/api/tasks', {
         method: 'PATCH',
         headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ taskName, completed })
      });

      if (res.ok) {
         const updatedTasks = tasks.map(task =>
            task.name === taskName ? { ...task, completed } : task
         );
         setTasks(updatedTasks);
         updateTasksLeft(updatedTasks);
      } else {
         console.error('Failed to update task');
      }
   };

   const handleDeleteTask = async (taskName) => {
      const token = localStorage.getItem("token");

      const res = await fetch('/api/tasks', {
         method: 'DELETE',
         headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ taskName })
      });

      if (res.ok) {
         const updatedTasks = tasks.filter(task => task.name !== taskName);
         
         setTasks(updatedTasks);
         updateTasksLeft(updatedTasks);
      } else {
         console.error('Failed to delete task');
      }
   };

   const filteredTasks = tasks.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'active') return !task.completed;
      return true; // 'all' filter
   });

   console.log("Filtered tasks:", filteredTasks); 

   return (
      <div>
         <div className="header-wrapper">
            <h2>{username ? `${username}'s tasks` : "Loading..."}</h2>
         </div>

         <form onSubmit={handleAddTask} className="todo-add">
            <input type="text" name="task" placeholder="Create a new todo…" required />
            <input type="submit" value="Add task" />
         </form>

         {/* <ul>
            {filteredTasks.map((task, index) => (
               <li key={index}>
                  <div>
                     <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => handleToggleTask(task.name, e.target.checked)}
                     />
                     <label className={task.completed ? 'completed' : ''}>{task.name}</label>
                  </div>
                  <button onClick={() => handleDeleteTask(task.name)}>Delete</button>
               </li>
            ))}
         </ul> */}

<ul>
   {filteredTasks.map((task, index) => (
      <li key={index}>
         <div>
            <input
               type="checkbox"
               checked={task.completed}
               onChange={(e) => handleToggleTask(task.name, e.target.checked)}
            />
            <label className={task.completed ? 'completed' : ''}>{task.name}</label>
         </div>
         <button onClick={() => handleDeleteTask(task.name)}>Delete</button>
      </li>
   ))}
</ul>

         <p>{tasksLeft} items left</p>
      </div>
   );

   // return (
   //    <div>
   //       <h1>My Tasks</h1>
   //       <ul>
   //          {Array.isArray(tasks) ? (
   //             tasks.map((task, index) => <li key={index}>{task}</li>)
   //          ) : (
   //             <p>No tasks available</p>
   //          )}
   //       </ul>
   //    </div>
   // );
};

export default Tasks;
