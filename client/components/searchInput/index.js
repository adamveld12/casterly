import React, { Component } from 'react'

import { TextField, IconButton } from 'material-ui'

import './searchInput.less'

export default class SearchInput extends Component {
  submit(term){
    const { onSubmit } = this.props
   onSubmit && onSubmit(term || "")
  }

  render(){
    const { hint, disabled, onUpdate } = this.props
    const { value } = this.state

    return (
        <div className="searchInputComponent">
          <TextField fullWidth
                     hintText={ hint }
                     disabled={ disabled }
                     onEnterKeyDown={ () => this.submit(value) }
                     onChange={ ({ target: { value }}) => {
                        this.setState({ value })
                        onUpdate && onUpdate(value)
                     }} />

          <IconButton iconClassName="fa fa-search"
                      tooltip="Search"
                      touch={ true }
                      onClick={ () => this.submit(value) } />
        </div>
    );
  }
}

SearchInput.propTypes = {
  hint: React.PropTypes.string,
  onSubmit: React.PropTypes.func.isRequired,
  onUpdate: React.PropTypes.func,
  disable: React.PropTypes.bool,
};

SearchInput.defaultProps = {
  hint: "Type here to search",
  onUpdate: function(){},
  disable: false
};
