import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// const Layout = () => {
//   return (<>
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-8 bg-gray-100 min-h-screen md:ml-64">
//         <Outlet />
//       </main>
//     </div>
//   </>
//   );
// };
const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-black text-white">
        <Sidebar />
      </div>
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};


export default Layout;
