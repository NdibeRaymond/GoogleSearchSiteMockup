import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class PageWrapper extends Component {

render(){

return (

  <>
    {this.props.children}
  </>
)

}

}

export default PageWrapper;
