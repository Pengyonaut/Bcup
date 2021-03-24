import React from "react";



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: this.props.json,
      visible:this.props.visible,
      searchStatus:this.props.searchStatus,
      searchQuery:""
    };
  }

  changeValue(e) {
      e.preventDefault()
      this.setState({searchQuery:e.target.value})
     
      this.props.parentCallback(this.state.searchQuery);
   
  }


  

  render() {

    return (
   <div>
       
         <div>
          {this.state.searchStatus ?
          <div className="pt-3">
            <form className="form-inline flex-grow-1"autoComplete="off">
              <div className="input-group  flex-grow-1">
                <div className="input-group-prepend input-group-merged">
                  <i className="sgwt-widgets-icon icon-sm text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="search"
                      className="icon undefined"
                      fill="currentColor"
                    >
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                      <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                  </i>
                </div>
                <input
                  type="search"
                  className="form-control"
                  onChange={e => this.changeValue(e)}
                  placeholder="Search topic or choose one below"
                  autoFocus=""
                ></input>
              </div>
            </form>
          </div>
  : ""}
        </div>
    </div>
    );
  }
}

export default Header;
