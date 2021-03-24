import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Helpcenter from "./components/Helpcenter"
import "./custom.css"




function App() {
  return (
    <div>
    <Helpcenter 
    showSearchbar={true}
    showContact={true}
    projectId="605922c8e1bc7f0015a1fcfe"
    ></Helpcenter>
    
    </div>
  );
}

export default App;
