'use strict';

import React from 'react';


import { Dialog, TextField, FlatButton } from 'material-ui';
import { isNullOrWhitespace } from '../../utils.js';
import { ImportRss } from '../../api.js';

import './addFromURL.less'


function invalid(value){
  if (isNullOrWhitespace(value)){
    return "This field is required.";
  }
}


export default class AddFromUrlDialog extends React.Component {
  constructor(){
    super();
    this.state = { open: false, errorText: undefined };
  }

  onChange({ target: { value: rssFeedUrl } }) {
    const errorText = invalid(rssFeedUrl);
    if (rssFeedUrl && errorText){
        this.setState({ rssFeedUrl, errorText, loading: true });
    } else {
        this.setState({ rssFeedUrl, errorText: undefined, loading: true });
    }
  }

  onDismiss(){
    const { onDismiss } = this.props;

    if (onDismiss)
      onDismiss();
  }

  onSubmit(rssFeedUrl){
    const { onSubmit } = this.props;

    if (onSubmit)
      onSubmit(rssFeedUrl);
  }


  render(){
    const { open } = this.props;
    const { rssFeedUrl, errorText } = this.state;

    let customActions = [
      <FlatButton label="Cancel"
                  secondary={ true }
                  onTouchTap={ () => this.onDismiss() } />,

      <FlatButton label="Add Feed"
                  primary={ true }
                  onTouchTap={ () => {
                    this.onSubmit(rssFeedUrl);
                  }} />
    ];

    return (
      <Dialog actions="rssInput"
              open={ open }
              title="Add From A Custom RSS Feed Url"
              actions={ customActions }
              modal={ false } >

          <TextField ref="rssInput"
                     hintText="An RSS Feed Url"
                     errorText={ errorText }
                     onChange={ this.onChange.bind(this) } />
      </Dialog>
    );
  }

}

AddFromUrlDialog.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onDismiss: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired
};

AddFromUrlDialog.defaultProps = {
  onSubmit: function(){},
  onDismiss: function(){},
  open: false
}
