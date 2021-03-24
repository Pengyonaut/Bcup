import React from "react";


class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLoad: true,
      docIndex: undefined,
      resultExist:false

    };
  }



  handleClick(index) {
    this.setState({
      defaultLoad: !this.state.defaultLoad,
      docIndex: index
    })
  }


  handleReturn() {
    this.setState({
      defaultLoad: !this.state.defaultLoad
    })
  }

 

  

  render() {

    

    const returnQuestions = this.props.apiData.filter((result) => {
      if (this.props.searchQuery == null)
        return result
      else if (result.question.toLowerCase().includes(this.props.searchQuery.toLowerCase()) || result.answer.toLowerCase().includes(this.props.searchQuery.toLowerCase())) {
        return result
      }
    }).map((result, i) => {
     
      return (
        
        <a className="card bg-lvl1 card-bordering card-bordered mb-2 0" onClick={() => this.handleClick(i)} >
          <div className="card-body p-3" style={{cursor:"pointer"}}>
            <div className="card-text">
             
              <p key={i}> {result.question}</p>
            
            </div>

          </div>
        </a>
      
      )
    })





    return (
      <div className="my-2 px-4 card-body">
      <p className="card-body-introduction text-secondary">What do you need help for?</p>

        {this.state.defaultLoad  ?

          returnQuestions
          
          :
          <div className="mb-1">

            <h5 className="mb-3"> {this.props.apiData[this.state.docIndex].question}</h5>
            <p> {this.props.apiData[this.state.docIndex].answer}</p>

            <div style={{cursor:"pointer"}} onClick={this.handleReturn.bind(this)} className="mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" /></svg>     <p  className="d-inline font-weight-bold">Back</p>

            </div>
          </div>
          
          
          }


      </div>

    );
  }
}

export default Body;
