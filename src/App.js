import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import MainPage from "./components/Pages/MainPage";
import HistoryPage from "./components/Pages/HistoryPage";
import StatPage from "./components/Pages/StatPage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import supabaseService from "./services/supabaseService";



function App() {

  const { getDevices } = supabaseService();


  useEffect(() => {
    getDevices()
    .then(({devices, error}) => {
      if (devices) {
        console.log(devices);
      };
      if (error) {
        console.log(error.message);
      }
    });
  }, []);


  return (
    <div className="App" >
      <Header h="40px"/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/history" element={<HistoryPage/>}/>
        <Route path="/statistics" element={<StatPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
