import React, { useContext, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

const App = observer( ()=>{ 
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading){
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
      {user.isAuth?
        <NavBar/>
      :
        <div/>
      }
      <AppRouter/>
      {user.isAuth?
        <Footer/>
      :
        <div/>
      }
    </BrowserRouter>
  );
})

export default App;
