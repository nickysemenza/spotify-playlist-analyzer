import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPlaylistTracks } from '../actions/users';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
class CallbackPage extends Component {
  constructor(props) {
    super(props);
    this.state = { uri: null };
  }
  componentDidMount = () => {
    this.setURI(this.props.match.params.uri);
  };
  componentWillReceiveProps = nextProps => {
    console.log('sad!');
    let { uri } = nextProps.match.params;
    if (uri !== this.state.uri) {
      this.setURI(uri);
    }
  };
  setURI = uri => {
    this.props.fetchPlaylistTracks(uri);
    this.setState({ uri });
  };
  render() {
    let tracks = this.props.user.playlist_tracks[this.state.uri];
    if (!tracks) return <h1>Loading</h1>;

    let histogram = {};
    tracks.forEach(function(t) {
      t.track.artists.forEach(function(a) {
        // console.log(a);
        let { uri, name } = a;
        if (histogram[uri]) {
          histogram[uri].count++;
        } else {
          histogram[uri] = { count: 1, name };
        }
      });
    });
    console.log(histogram);

    let items = Object.keys(histogram).map(key => [key, histogram[key]]);

    items.sort((first, second) => second[1].count - first[1].count);

    let chartItems = items
      .slice(0, 20)
      .map(x => ({ name: x[1].name, count: x[1].count }));

    return (
      <div>
        <Link to="/">home</Link>
        {/*<pre>{JSON.stringify(items, true, 2)}</pre>*/}

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartItems} margin={{ bottom: 80 }}>
            <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {/*<Legend />*/}
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
              <Table.HeaderCell>URI</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tracks.map(t => (
              <Table.Row key={t.track.id}>
                <Table.Cell>{t.track.name}</Table.Cell>
                <Table.Cell>{t.track.popularity}</Table.Cell>

                <Table.Cell>
                  {t.track.artists.map(a => a.name).join(', ')}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <pre>{JSON.stringify(this.props, true, 2)}</pre>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPlaylistTracks }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CallbackPage);
