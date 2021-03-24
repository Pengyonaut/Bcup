import React from "react";
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import axios from "axios"
import SplashScreen from './SplashScreen'
import Feedback from './Feedback'


class Helpcenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      searchStatus: null,
      contactStatus: null,
      searchQuery: null,
      result:[],
     
    };
  }


  componentDidMount() {
    axios.get(`http://localhost:1337/projects/${this.props.projectId}`)
      .then(res => {
        const result = res.data;
        this.setState({result});
       console.log(result)
        

      
      })
  }

  handleCallback = (childData) => {
    this.setState({ searchQuery: childData })
   

  }

  openHelp() {
    this.setState({
      visible: !this.state.visible
    })

  }



  render() {
    const hcPosition = {
      position: "fixed",
      zIndex: "1081",
      height: "100vh",
      right: "0px",
      top: "0px",
      width: "384px"
    };

    const help_button = {
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      width:"4rem",
      height:"4rem",
      borderRadius:"100px",
     

    }

    return (
      <div>
        <button onClick={this.openHelp.bind(this)} className="btn btn-primary" style={help_button}>
          <svg style={{fill:"white"}} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none"  height="24" width="24" /><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12.01,18 c-0.7,0-1.26-0.56-1.26-1.26c0-0.71,0.56-1.25,1.26-1.25c0.71,0,1.25,0.54,1.25,1.25C13.25,17.43,12.72,18,12.01,18z M15.02,10.6 c-0.76,1.11-1.48,1.46-1.87,2.17c-0.16,0.29-0.22,0.48-0.22,1.41h-1.82c0-0.49-0.08-1.29,0.31-1.98c0.49-0.87,1.42-1.39,1.96-2.16 c0.57-0.81,0.25-2.33-1.37-2.33c-1.06,0-1.58,0.8-1.8,1.48L8.56,8.49C9.01,7.15,10.22,6,11.99,6c1.48,0,2.49,0.67,3.01,1.52 C15.44,8.24,15.7,9.59,15.02,10.6z" /></g></svg>
        </button>
        {this.state.visible ?

          <div className="card shadow-max help-center-panel" style={hcPosition}>
            <div className="card-header px-4 pt-4 pb-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="m-0">Help center</h4>
                <button onClick={this.openHelp.bind(this)} className="btn btn-link px-0" tabIndex="0">
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="24"
                      width="24"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                      <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                  </i>
                </button>
              </div>

              <Header visible={this.state.visible} closingMethod={this.openHelp} parentCallback={this.handleCallback} searchStatus={this.state.result.showsearch}></Header>
            </div>
            <Body apiData={this.state.result.question_answers} searchQuery={this.state.searchQuery}></Body>
            {this.state.result.showcontact ? <Footer projectId = {this.props.projectId}></Footer> : ""}

          </div>

          : ""
        }
                <SplashScreen apiData={this.state.result}></SplashScreen>
                <Feedback apiData={this.state.result.showfeedback} projectId={this.props.projectId}></Feedback>
      </div>
    );
  }
}

export default Helpcenter;
