'use strict';

import React from 'react';

import { TextField, IconButton } from 'material-ui';

import './searchInput.less';

export default class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = { term: "" };
  }

  submit({ term }){
    const { onSubmit } = this.props;
    if (onSubmit)
      onSubmit(term || "");
  }

  render(){
    const { hint, disabled, onUpdate } = this.props;
    return (
        <div className="searchInputComponent">
          <TextField fullWidth
                     hintText={ hint }
                     disabled={ disabled }
                     onKeyDown={ ({ keyCode }) => keyCode === 13 && this.submit(this.state) }
                     onChange={ ({ target: { value }}) => {
                        this.setState({ term: value });
                        if (onUpdate)
                          onUpdate(value);
                     }} />

          <IconButton iconClassName="fa fa-search"
                      tooltip="Search"
                      touch={ true }
                      onClick={ () => this.submit(this.state) } />
        </div>
    );
  }
}

SearchInput.propTypes = {
  hint: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  onUpdate: React.PropTypes.func,
  disable: React.PropTypes.bool
};

SearchInput.defaultProps = {
  hint: "Type here to search",
  onSubmit: function(){},
  onUpdate: function(){},
  disable: false
};
