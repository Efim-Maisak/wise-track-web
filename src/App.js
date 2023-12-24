import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainPage from "./components/Pages/MainPage";
import HistoryPage from "./components/Pages/HistoryPage";
import StatPage from "./components/Pages/StatPage";
import RegistrationPage from "./components/Pages/RegistrationPage";
import LoginPage from "./components/Pages/LoginPage";
import PasswordRecoveryPage from "./components/Pages/PasswordRecoveryPage";
import ChangePasswordPage from "./components/Pages/ChangePasswordPage";
import NotFoundPage from "./components/Pages/NotFoundPage";


function App() {
  return (
    <div className="App" >
        <RootLayout>
          <Routes>
            <Route path="/" element={<ProtectedRoute><MainPage/></ProtectedRoute>}/>
            <Route path="/history" element={<ProtectedRoute><HistoryPage/></ProtectedRoute>}/>
            <Route path="/statistics" element={<ProtectedRoute><StatPage/></ProtectedRoute>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/recovery" element={<PasswordRecoveryPage/>}/>
            <Route path="/change-pass" element={<ChangePasswordPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </RootLayout>
    </div>
  );
}

export default App;
