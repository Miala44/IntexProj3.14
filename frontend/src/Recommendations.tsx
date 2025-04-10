// import React from 'react';
// import { useEffect, useState } from 'react';

// const Recommendations = ({ userId = 1 }) => {
//   const [recs, setRecs] = useState<string[]>([]);

//   useEffect(() => {
//     fetch(
//       'https://group3-14flaskapi-hhcxf9g7f0h7cee7.westus-01.azurewebsites.net/api/recommend/user/1'
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('✅ Data fetched from Flask:', data);
//         setRecs(data.recommendations || []);
//       })
//       .catch((err) => console.error('Error fetching recommendations:', err));
//   }, [userId]);

//   console.log('📦 recs to render:', recs);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Recommended for You</h2>
//       <ul className="list-disc list-inside">
//         {recs.map((movie, idx) => (
//           <li key={idx}>{movie}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Recommendations;
