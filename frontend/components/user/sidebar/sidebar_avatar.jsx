var React = require("react");
var SessionStore = require("../../../stores/session_store");
var UserActions = require("../../../actions/user_actions");

var SidebarAvatar = React.createClass({
  _handleFile: function () {
    var file = this.refs.file.files[0];
    var currentUserId = SessionStore.getCurrentUserId();

    UserActions.uploadImage(currentUserId, file);
  },

  renderUpload: function () {
    var username = this.props.user.username;
    var isCurrentUser = SessionStore.isCurrentUser(username);

    if (isCurrentUser) {
      return (
        <span className="btn btn-default btn-file">
          <i className="fa fa-camera"></i> Upload new avatar

          <input ref="file" id="upload-avatar" type="file"
            onChange={ this._handleFile } />
        </span>
      );
    }
  },

  render: function () {
    return (
      <div className="avatar">
        <img className="avatar" src={ this.props.user.avatar_square } />

        { this.renderUpload() }
      </div>
    );
  }
});

module.exports = SidebarAvatar;