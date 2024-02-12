import React from "react";
import ReactDOM from "react-dom";
import Routing from "./component/Routing";
import {MovieProvider} from "./component/MovieContext"
ReactDOM.createRoot(document.getElementById("root")).render(
    <MovieProvider>
        <Routing />
    </MovieProvider>
);