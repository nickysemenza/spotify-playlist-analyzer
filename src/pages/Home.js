import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPlaylists } from '../actions/users';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.getPlaylists}>get playlists</Button>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>URI</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.user.playlists.map(p => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/playlist/${p.uri}`}>{p.name}</Link>
                </Table.Cell>
                <Table.Cell>{p.owner.display_name || p.owner.id}</Table.Cell>

                {/*<Table.Cell><pre>{JSON.stringify(p.owner, true, 2)}</pre></Table.Cell>*/}
                {/*<Table.Cell><pre>{JSON.stringify(p.owner, true, 2)}</pre></Table.Cell>*/}
                <Table.Cell>{p.uri}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getPlaylists }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
