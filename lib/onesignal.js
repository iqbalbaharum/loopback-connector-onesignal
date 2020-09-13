const OneSignalNode = require('onesignal-node');  

/**
 * initialize
 */
exports.initialize = function (datasource, cb) {
  var settings = datasource.settings
  var client = new OneSignalNode.Client(settings.appId, settings.appKey)
  datasource.connector = new OneSignal(client)
  cb && cb()
}

function OneSignal(client) {
  this.name = 'OneSignal'
  this.client = client
}

OneSignal.prototype.sendOne = function(deviceId, message, title) {
  var data = {
    include_player_ids: [
      deviceId
    ],
    headings: {
      'en': title
    },
    contents: {
      'en': message
    }
  }

  this.client.createNotification(data)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
}