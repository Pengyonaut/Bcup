import React from "react";
import axios from "axios"


class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: this.props.json,
      showContact: true,
      contactForm: true,
      email: "",
      message: "",
      falseEmail: false,
      falseMessage: false
    };
  }

  handleClick() {
    this.setState({
      contactForm: !this.state.contactForm
    })
  }


  handleContact = event => {
    event.preventDefault();

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(this.state.email) && this.state.message.length > 1) {

      this.setState({
        falseEmail: false,
        falseMessage: false
      })
      axios.post(`http://localhost:1337/contacts`,
        {
          email: this.state.email,
          message: this.state.message,
          project: this.props.projectId
        })

        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }
    else {
      this.setState({
        falseEmail: true,
        falseMessage: true
      })
    }
  }

  handleMail = event => {
    this.setState({ email: event.target.value });
    console.log(this.state.email)
  }


  handleMessage = event => {
    this.setState({ message: event.target.value });
  }




  render() {


    return (
      <div>
        {this.state.contactForm ?
          <div className="card-footer px-4 pb-3">
            <p className="text-secondary">Can't find what you are looking for?</p>
            <a onClick={this.handleClick.bind(this)}> <button className="btn btn-primary btn-block btn-lg" type="button" >
              Contact us
        </button></a>
          </div>
          :

          <div>
            <div style={{ height: "100vh", position: "absolute", top: "0", width: "100%", backgroundColor: "#fff", zIndex:"9999" }}>
              <div className="card-header px-4 pt-4 pb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="m-0"> <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" onClick={this.handleClick.bind(this)} height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" /></svg>
          Contact us</h4>

                </div>
              </div>

              <div className="px-4">
              <p className="py-2 text-secondary">Send us a message, we will come back to you as soon as possible.</p>

                <div className="form-group pt-4">
                  <input type="text" onChange={this.handleMail.bind(this)} className="form-control" placeholder="Email"></input>

                </div>

                <div className="form-group">
                  <textarea name="" id="message" cols="30" rows="7" className="form-control" onChange={this.handleMessage.bind(this)} placeholder="Message"></textarea>
                  {this.state.falseMessage ? <p className="text-danger">Your information seems to be incorrect, please check your form again.</p> : ""}
                </div>

                <a> <button onClick={this.handleContact.bind(this)} className="btn btn-primary btn-block btn-lg" type="button" >
                  Send
        </button></a>

              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Footer;
