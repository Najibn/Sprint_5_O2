// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useAuth } from './utils/auth';
import AdminLayout from './components/Layout/AdminLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ListUsers from './pages/Users/ListUsers';
import CreateUser from './pages/Users/CreateUser';
import EditUser from './pages/Users/EditUser';
import ListProducts from './pages/Products/ListProducts';
import CreateProduct from './pages/Products/CreateProduct';
import EditProduct from './pages/Products/EditProduct';
import ListMaintenanceRecords from './pages/MaintenanceRecords/ListMaintenanceRecords';
import CreateMaintenanceRecord from './pages/MaintenanceRecords/CreateMaintenanceRecord';
import EditMaintenanceRecord from './pages/MaintenanceRecords/EditMaintenanceRecord';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route element={<AdminRoute />}>
          {/* Users Routes */}
          <Route path="users">
            <Route index element={<ListUsers />} />
            <Route path="create" element={<CreateUser />} />
            <Route path=":id/edit" element={<EditUser />} />
          </Route>
          
          {/* Products Routes */}
          <Route path="products">
            <Route index element={<ListProducts />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path=":id/edit" element={<EditProduct />} />
          </Route>
          
          {/* Maintenance Records Routes */}
          <Route path="maintenance-records">
            <Route index element={<ListMaintenanceRecords />} />
            <Route path="create" element={<CreateMaintenanceRecord />} />
            <Route path=":id/edit" element={<EditMaintenanceRecord />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;