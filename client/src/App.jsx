import "./App.css";
import React from 'react';
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from './pages/Register';
import PageNotFound from "./pages/PageNotFound";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/layout/Header";
import ErrorMessage from "./components/layout/ErroMessage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRouteMiddleware } from "./utils/PrivateRouteMiddleware";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <ErrorMessage />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" 
          element={
          <PrivateRouteMiddleware>
            <Chat />
          </PrivateRouteMiddleware>} 
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
