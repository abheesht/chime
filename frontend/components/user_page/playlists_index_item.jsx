var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var PlayerActions = require("../../actions/player_actions");
var PlaylistTrack = require("./playlist_track");
var History = require("react-router").History;

var PlaylistsIndexItem = React.createClass({
  mixins: [History],

  defaultImage: function () {
    var src = "https://s3-us-west-1.amazonaws.com/chime-audio-assets/blue.jpg";

    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 } className="playlist-image">
        <Image src={ src } thumbnail />
      </Col>
    );
  },

  goToPlaylist: function () {
    var username = this.props.username;
    var slug = this.props.playlist.slug;
    var pathname = "/" + username + "/playlists/" + slug;

    this.history.pushState(null, pathname);
  },

  goToUser: function () {
    var pathname = "/" + this.props.username;

    this.history.pushState(null, pathname);
  },

  playPlaylist: function () {
    PlayerActions.loadPlaylist(this.props.playlist);
  },

  sadMessage: function () {
    return <p>This playlist has no chimes! :(</p>
  },

  trackImage: function () {
    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 } className="playlist-image">
        <span className="btn play-button" onClick={ this.playPlaylist }>
          <Glyphicon glyph="play" className="play-icon"/>
        </span>

        <Image src={ this.props.playlist.tracks[0].img_thumb } thumbnail />
      </Col>
    );
  },

  tracksList: function () {
    var playlist = this.props.playlist;
    var tracks = playlist.tracks;

    var tracksList = tracks.map(function (track, idx) {
      return (
        <PlaylistTrack key={ idx }
          index={ idx + 1 }
          track={ track }
          playlistId={ playlist.id } />
      );
    });

    return <ListGroup>{ tracksList }</ListGroup>;
  },

  render: function () {
    var playlist = this.props.playlist;
    var noTracks = (playlist.tracks.length === 0);

    return (
      <ListGroupItem className="playlist-index-item">
        <Row>
          { noTracks ? this.defaultImage() : this.trackImage() }

          <Col xs={ 9 } sm={ 9 } md={ 9 }>
            <section className="time">
              <p className="time">Created { playlist.time_ago }</p>
            </section>

            <section className="playlist-info">
              <h5 className="username">
                <a className="username" onClick={ this.goToUser }>
                  { playlist.user.username }
                </a>
              </h5>

              <h4 className="title">
                <a className="title" onClick={ this.goToPlaylist }>
                  { playlist.title }
                </a>
              </h4>
            </section>

            { noTracks ? this.sadMessage() : this.tracksList() }
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistsIndexItem;
