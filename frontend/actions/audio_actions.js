var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var AudioActions = {
  setToIsPlaying: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_SET_TO_PLAYING
    });
  },

  setToIsPaused: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_SET_TO_PAUSED
    });
  },

  setToIsEnded: function (time) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_SET_TO_ENDED,
      response: time
    });
  },

  setCurrentTime: function (time) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_CURRENT_TIME_RECEIVED,
      response: time
    });
  },

  setVolume: function (volume) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_VOLUME_RECEIVED,
      response: volume
    });
  },

  setDuration: function (duration) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_DURATION_RECEIVED,
      response: duration
    });
  }
};

module.exports = AudioActions;