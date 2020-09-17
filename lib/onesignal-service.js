'use strict'

var debug = require('debug') ('loopback:onesignal:service')
const OneSignalNode = require('onesignal-node');
const utils = require('./utils');

// Create class
module.exports = OneSignalService

/**
 * Push Notification constructor.
 * @settings {Object} settings to create one signal
 */
function OneSignalService(settings) {
  this.client = new OneSignalNode.Client(settings.appId, settings.appKey)
}

OneSignalService.prototype.connect = function(cb) {
  cb()
}

OneSignalService.prototype.notify = function(opts, callback) {
    debug('notify', opts.deviceId, opts.title, opts.message)

    callback = callback || utils.createPromiseCallback()

    var data = {
      include_player_ids: [
        opts.deviceId
      ],
      headings: {
        'en': opts.title
      },
      contents: {
        'en': opts.message
      }
    }
  
    this.client.createNotification(data)
      .then(response => {
        callback(response)
      })
      .catch(err => {
        callback(err)
        debug('Error '+ err)
      })
  }