// import { useEffect, useState } from "react";

// export default function Home() {

//     const [restaurants, setRestaurants] = useState([]);
//     const [users, setUsers] = useState([]);


//     useEffect(() => {
//         (async () => {
//             const results = await fetch("/api/list").then(response => response.json());
//             console.log("Results from API:", results); // Для отладки
//             setUsers(results);
//         })();
//     }, []);

//     return (
//         <div className={styles.container}>

//             <main className={styles.main}>
//                 <h1 className={styles.title}>
//                     MongoDB with <a href="https://nextjs.org">Next.js!</a> Example
//                 </h1>
//                 <br />
//                 <div className={styles.grid}>
//                     {restaurants.map(restaurant => (
//                         <div className={styles.card} key={restaurant._id}>
//                             <h2>{restaurant.name}</h2>
//                             <p>{restaurant.address.street}</p>
//                         </div>
//                     ))}
//                 </div>
//             </main>
//         </div>
//     )
// }