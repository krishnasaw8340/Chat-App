import React, { useState } from 'react';
import "../Join/Join.css"
import logo from "../../Image/logo/logo.png";
import { Link }from "react-router-dom";

let user;
const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = " ";
}
const Join = () => {
    const [name, setName] = useState("");
    

    return (
        <>
            <div className='JoinPage'>
                <div className='joinContainer'>
                        <img src={logo} alt="pic" width="200" height="200" />
                        <input onChange={(e)=> setName(e.target.value)} type='text' placeholder="enter your username" id="joinInput" />
                        <Link onClick={(event)=>
                            !name ? event.preventDefault() : null
                        } to="/chat"> <button onClick={sendUser} id="joinbtn">Log In</button> </Link>
                </div>

            </div>
        </>

    )
}

export default Join;
export {user};

