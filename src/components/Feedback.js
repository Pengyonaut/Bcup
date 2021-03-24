import React from "react";
import axios from "axios"

class Feedback extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          stars: [],
          rating: 0,
          hovered: 0,
          selectedIcon: "★",
          deselectedIcon: "☆",
          result:[],
          commentVisible:false,
          message:"",
          filledForm:false
          
    
      };

      let outOf = props.outOf ? props.outOf : 5;

      for (var i = 0; i < outOf; i++) {
          this.state.stars.push(i + 1);
      }
  }


  
  componentDidMount() {
    axios.get(`http://localhost:1337/projects/`)
      .then(res => {
        const result = res.data[0];
        this.setState({
            result,
            visible:this.state.result.showfeedback
         });
        
        
      })
  }


  

  changeRating(newRating) {
      this.setState({
          rating: newRating,
          commentVisible:true
      });
      

      if (this.props.onChange)
          this.props.onChange(newRating);
          
  }

  hoverRating(rating) {
      this.setState({
          hovered: rating,
        
      });

  }

  handleMessage = event => {
    this.setState({ message: event.target.value });
  }



  
  closeFeedback() {
    this.setState({result:0})
  }

  
  handleFeedback = event => {
    event.preventDefault();

      axios.post(`http://localhost:1337/feedbacks`,
        {
          int: this.state.rating,
          comment: this.state.message,
          project: this.props.projectId
        })

        .then(res => {
          console.log(res);
          this.filledForm()
        })
    }
  

filledForm() {

  this.setState({
    filledForm:true,
    result:0
  })
  console.log(
    this.state.filledForm
    )
}





  render() {

const formConfirmation = {
  position: "absolute",
  top: "50px", right:"0", backgroundColor: "#fff", zIndex:"4"
}


    const feedbackPosition = {
      position: "fixed",
      zIndex: "3",
      right: "0px",
      top: "50px",
      width: "320px"
    };


      const { stars, rating, hovered, deselectedIcon, selectedIcon } = this.state;

      return (
          <div>
             
            {this.state.result.showfeedback ?
            
              <div className="card shadow-max" style={feedbackPosition}>
              <div className="card border-0 px-4 pt-4 pb-1">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="m-0">Leave a feedback</h4>
                <button onClick={this.closeFeedback.bind(this)} className="btn btn-link px-0" tabIndex="0">
                  <i className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="icon undefined"
                      height="24"
                      width="24"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                      <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                  </i>
                </button>
              </div>
              <p className="card-body-introduction text-secondary mt-2 mb-0 d-block ">Please help us to improve our service by leaving a short review.</p>

              </div>
             
              <div className="rating px-4 py-0 my-0" style={{ fontSize: '2.5em', color: "#007bff" }}>

                  {stars.map(star => {
                      return (
                          <span
                              style={{ cursor: 'pointer' }}
                              onClick={() => { this.changeRating(star); }}
                              onMouseEnter={() => { this.hoverRating(star); }}
                              onMouseLeave={() => { this.hoverRating(0); }}
                          >
                              {rating < star ?
                                  hovered < star ? deselectedIcon : selectedIcon
                                  :
                                  selectedIcon
                              }
                          </span>
                      );
                  })}

              </div>
              { this.state.commentVisible === true ?
              
             <div>
              <div className="form-group p-4 mt-4 border-top">
                <textarea type="text" className="form-control" placeholder="Please tell us why with a short comment ! " onChange={this.handleMessage.bind(this)} cols={40} rows={5} />
             <button onClick={this.handleFeedback.bind(this)} className="btn btn-primary mx-auto btn-lg btn-block mt-4">Send</button>
            </div>
              </div>
              
         
           
          
          : "" }
             </div>
             :""}

              {this.state.filledForm ?
              
            <div className="border-left border-2 border-success shadow-sm py-1 px-4 hide_notification" style={formConfirmation}>
              <div className=" ">
            <p className="my-2 text-success">Form Completed! Thank you for your feedback!</p>
            </div>
            </div>
            
           : ""}     
             <div></div>
             </div>
      );
  }
}


export default Feedback;
