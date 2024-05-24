// App.js (javascript)
// Benjamin, Sam, Vinh, David
// Started: 
// Last edited 2024-05-24 (yyyy mm dd)

import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Library from "./components/Library";
import AddBook from "./components/AddBook";

function App() {
    const user = localStorage.getItem("token");

    return (
        <Routes>
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/library/add-book" exact element={<AddBook />} />
            <Route path="/library" exact element={<Library />} />
            <Route path="/" element={<Navigate replace to={user ? "/library" : "/login"} />} />
        </Routes>
    );
}

export default App;
