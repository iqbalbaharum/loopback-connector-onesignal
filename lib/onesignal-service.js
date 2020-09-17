'use strict'

var debug = require('debug') ('loopback:onesignal:service')
const OneSignalNode = require('onesignal-node');
const utils = require('./utils');

// Create class
module.exports = OneSignalService

/**
 * Push Notification constructor.
 * @settings {Object} configuration data pass from datasource
 */
function OneSignalService(settings) {
  this.client = new OneSignalNode.Client(settings.appId, settings.appKey)
}

/**
 * Connect
 */
OneSignalService.prototype.connect = function(cb) {
  cb()
}

/**
 * Triggered notification to One Signal
 * @params {opts} data pass from the parent
 * @params {callback} turn to promise
 */
OneSignalService.prototype.notify = function(opts, callback) {
  debug('notify', opts)

  callback = callback || utils.createPromiseCallback()

  var data = {
    include_player_ids: opts.playerIds || [],
    include_external_user_ids: opts.externalUserIds || [],
    headings: {
      'en': opts.title
    },
    contents: {
      'en': opts.message
    }
  }
  
  callback.promise = this.client.createNotification(data)
  return callback.promise
}