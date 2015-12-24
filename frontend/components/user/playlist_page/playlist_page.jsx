var React = require("react");
var PlaylistStore = require("../../../stores/playlist_store");
var PlaylistActions = require("../../../actions/playlist_actions");

var PlaylistPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var params = this.props.params;
    var identifier = params.username + "-" + params.playlist;

    return { playlist: PlaylistStore.find(identifier) };
  },

  componentWillMount: function () {
    var username = this.props.params.username;
    var slug = this.props.params.playlist;

    PlaylistActions.fetchPlaylist(username, slug);
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.username;
    var nextPlaylist = nextProps.params.playlist;

    var sameUser = (this.props.params.username === nextUser);
    var samePlaylist = (this.props.params.playlist === nextPlaylist);

    if (sameUser && samePlaylist) { return; }

    PlaylistActions.fetchPlaylist(nextUser, nextPlaylist);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <h1>{ this.state.playlist.title }</h1>
        </div>
      </div>
    );
  }
});

module.exports = PlaylistPage;