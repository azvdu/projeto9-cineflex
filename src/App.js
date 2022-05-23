import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Componentes/Home/index";
import Header from "./Componentes/Header/index";
import EscolherSesseao from "./Componentes/EscolherSessao/index"
import EscolherAssento from "./Componentes/EscolherAssento";

import "./CSS/reset.css"
import "./CSS/styles.css"

export default function App () {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/sessoes/:id" element={<EscolherSesseao />}/>
                <Route path="/assentos/:idSessao" element={<EscolherAssento />}/>
                
            </Routes>
        </BrowserRouter>
    )
}