import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom"
import APP from "./component/app";
import "./styles/style.scss"
import ErrorBoundary from "./component/use-error-boundary"
ReactDOM.render(
    <BrowserRouter>
    <ErrorBoundary>
    <APP/>
    </ErrorBoundary>
    </BrowserRouter>,document.getElementById("root")
)