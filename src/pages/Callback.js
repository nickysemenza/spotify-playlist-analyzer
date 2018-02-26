import React, { Component } from 'react';
import QueryString from 'query-string';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initiateLoginFromCallback } from '../actions/users';
import { Link } from 'react-router-dom';
class CallbackPage extends Component {
  componentDidMount() {
    let q = QueryString.parse(window.location.hash);
    console.log(q);
    this.props.initiateLoginFromCallback(q);
  }
  render() {
    // let  q = QueryString.parse(window.location.hash);
    // console.log(q);
    // return <div>aaa</div>;
    return (
      <div>
        <Link to="/">aaa</Link>
        <pre>{JSON.stringify(this.props, true, 2)}</pre>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ initiateLoginFromCallback }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CallbackPage);
