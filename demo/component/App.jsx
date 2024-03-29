import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { LegendBars } from "./LegendBar";

import './basic.css'

const NotFound = () => {
  return(
    <div style={{ color: '#151515' }} >
        <h1> 404; Did not find that page, <br/> perhaps try another? </h1>
    </div>
  )
}

const DemoLink = (props) => (
    <Link to={props.link} style={{ margin: '10px' }} >
        <div style={{ borderRadius: '25px/20px', backgroundColor: 'hsla(200,65%,50%,01)', padding: '5px 15px' }} >
            { props.display }
        </div>
    </Link>
)

const Home = (props) => {
 return (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: '100%' }} >
      <DemoLink link="legendbars" display="Several Legend Bar Variations" />
  </div>
 )
}

function App() {
  return (
    <div>
        <BrowserRouter width='100%' height='100%' >
            <Routes>
                <Route path="/legendbars" element={<LegendBars />} />
                <Route default element={<NotFound /> } />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export { App }
