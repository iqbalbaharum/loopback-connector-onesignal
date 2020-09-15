'use strict';
const {Connector} = require('loopback-connector');
const OneSignalNode = require('onesignal-node');  
const debug = require('debug')('loopback:connector:onesignal');

/**
 * initialize
 */
exports.initialize = function (datasource, cb) {
  var settings = datasource.settings
  // Connector.call(this, 'onesignal', settings)
  var client = new OneSignalNode.Client(settings.appId, settings.appKey)
  datasource.connector = new OneSignal(client)
  datasource.connector.dataSource = datasource
}

function OneSignal(client) {
  this.name = 'onesignal'
  this.client = client
}

OneSignal.prototype.notify = function(deviceId, message, title) {
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

  console.log('Sending notification')

  this.client.createNotification(data)
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err)
      debug('Error '+ err)
    })
}

OneSignal.prototype.getTypes = function() {
  return ['onesignal'];
};

OneSignal.prototype.getDataAccessObject = function() {
  return this.DataAccessObject;
};

exports.OneSignal = OneSignal