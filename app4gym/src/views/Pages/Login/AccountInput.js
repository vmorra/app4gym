import React, { Component } from 'react';

class AccountInput extends Component{
  constructor(props) {
     super(props);
  }

    render() {
      var btnAccountNameClass = 'form-control';
      var inGrupoAccountNameClass = 'input-group mb-3';
      if (this.props.cefan) {
        btnAccountNameClass += ' form-control-danger';
        inGrupoAccountNameClass += ' has-danger';
      }
      return(
        <div className={inGrupoAccountNameClass}>
          <span className="input-group-addon"><i className="icon-user"></i></span>
          <input type="text" className={btnAccountNameClass} placeholder="Username" onChange={this.props.handleChangeAccountName}/>
        </div>
      )
    }
}

export default AccountInput;
