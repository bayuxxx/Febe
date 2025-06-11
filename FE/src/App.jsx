import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { RemoveToken } from "./utils/RemoveToken";

// Import pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

// Import PrivateNavbar
import PrivateNavbar from "./components/PrivateNavbar";
import PredictionPage from "./pages/Prediksi";
import ChatApp from "./pages/Chat";
import RiwayatPage from "./pages/Riwayat";
import DiabetesForm from "./components/DiabetesForm";
import DiabetesResponse from "./components/DiabetesResponse";
import HeartAttackPredictionForm from "./pages/HeartAttackForm";
import HeartAttackResponse from "./pages/HeartAttackResponse";

// Utility to check JWT presence
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Protected Route component with PrivateNavbar
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? (
    <>
      <PrivateNavbar />
      {children}
    </>
  ) : (
    <Navigate to="/signin" replace />
  );
};

function App() {

  useEffect(() => {
    RemoveToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/prediksi"
          element={
            <PrivateRoute>
              <PredictionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/consultation"
          element={
            <PrivateRoute>
              <ChatApp />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <RiwayatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/diabetes-form"
          element={
            <PrivateRoute>
              <DiabetesForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/diabetes-response"
          element={
            <PrivateRoute>
              <DiabetesResponse />
            </PrivateRoute>
          }
        />
        <Route
          path="/heart-attack-form"
          element={
            <PrivateRoute>
              <HeartAttackPredictionForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/heart-attack-response"
          element={
            <PrivateRoute>
              <HeartAttackResponse />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
