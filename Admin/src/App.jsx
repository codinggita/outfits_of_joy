import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login.jsx'
import AdminDashboard from './Components/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
        />
        <Route path="/" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
};

// ProtectedRoute component to check for authentication
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/admin/login" />;
  }

  // Render the children (protected component) if token is present
  return children;
}

export default App
