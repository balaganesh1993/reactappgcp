import logo from './logo.svg';
import './App.css';
import { jwtDecode} from 'jwt-decode';
import {useEffect, useState} from 'react'
function App() {

   const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
        

    console.log("Encoded Token: "+ response.credential)
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;

  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;

  }
  useEffect(() => {
      /*global google */
      google.accounts.id.initialize({
        client_id: "182266817297-5ihtpeqrbhltdhvjergvnopbkoh89mk0.apps.googleusercontent.com",
        callback: handleCallbackResponse
      })

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline" , size: "large"}
      );

      google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
     
     <div id="signInDiv"></div>
     {
      Object.keys(user).length !=0 &&
      <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
     }
     
     { user && 
       <div> 
        <img src= {user.picture} ></img>
        <h3>{user.name}</h3>
       </div>
     }
    </div>
  );
}

export default App;
