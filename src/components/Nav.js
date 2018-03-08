import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/users';
import {Menu, Container} from 'semantic-ui-react';
import {SPOTIFY_AUTH_URL} from '../config';
class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
    render() {
        let {authenticated} = this.props.user;
    return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
            Spotify Playlist Analyzer
        </Menu.Item>
            <Menu.Item as={NavLink} to="/" exact>Home</Menu.Item>
            {authenticated ? <Menu.Item onClick={()=>this.props.logout()}>logout</Menu.Item> : <Menu.Item as='a' href={SPOTIFY_AUTH_URL}>login</Menu.Item> }    
      </Container>
    </Menu>);
  }
}


function mapStateToProps(state) {
    let { user } = state;
    return { user };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            logout
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
