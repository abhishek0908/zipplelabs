import React from "react"
import ReactDOM  from "react-dom/client"
import UserForm from "./UserForm";
const AppLayout = ()=>{
   return(
    <div className="app">
        <UserForm/>
    </div>
   )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout/>)