import React from "react";
import axios from "axios"

let marked = require("marked")

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        result: [],
        active:true,
    
       
    };
  }



  
  componentDidMount() {
    axios.get(`http://localhost:1337/splashscreens/`)
      .then(res => {
        const result = res.data[0];
        this.setState({
            result
         });
        
        
      })
  }

  closeSplash() {
      this.setState({
       result:0
    
      })
      
  }

 

  render() {


    const splashHeight = {
      height:"478px"
    }

    const splashHeightandImage = 
    {
      height:"478px",
      background:"linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.6)),url(" + this.state.result.imgurl + ")",
      backgroundSize:"cover",
      
    }


    return (
   <div>
     {this.state.result.active ? 
        <div className="h-100" style={{position:"fixed", width:"100%", top:"0", left:"0", backgroundColor:"rgba(0,0,0,.4)", zIndex:"1000"}} >
            <div className="container h-100">
                <div className="d-flex align-items-md-center h-100">
                <div className="bg-white shadow position-relative w-100" style={{minHeight: splashHeight, overflow:"hidden auto"}}>
                <div style={{position:"absolute", top:"32px", right:"32px", zIndex:"1", cursor:"pointer"}}>
                <button onClick={this.closeSplash.bind(this)} className="btn btn-link px-0" tabIndex="0">
                  <i className="sgwt-widgets-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="close"
                      className="icon undefined"
                      fill="currentColor"
                      height="24"
                      width="24"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                      <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                  </i>
                </button>
                </div>
                
                <div className="row">
                <div className="col-lg-6 bg-primary" style={this.state.result.imgurl !== 0 ? splashHeightandImage : splashHeight}>
                <div className="d-flex align-items-center justify-content-center h-100">
                    <h2 className="text-white splash-title">{this.state.result.title}</h2>
                </div>
                </div>

                
                <div style={{height:splashHeight}} className="col-lg-6 d-flex align-items-center justify-content-center">
                    <div className="row" style={{pading:"128px 0px 72px", maxWidth:"600px", width:"100%"}}>
                    <div className="col-lg-12 px-4 mt-1">
                      <div dangerouslySetInnerHTML = {{__html: marked(this.state.result.message)}}></div>
                 
                    </div>
                    </div>
                </div>
                


                </div>
                </div>
                </div>
                </div>
                </div>
           
      :
      ""
  }

  </div>
    );
  }
}

export default Footer;
