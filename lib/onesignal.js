'use strict';
const {Connector} = require('loopback-connector');
const util = require('util');
const OneSignalNode = require('onesignal-node');  
const { OneSignal } = require('..');
const debug = require('debug')('loopback:connector:onesignal');

function OneSignalConnector(settings, dataSource) {
  Connector.call(this, 'onesignal', settings)
  this.debug = settings.debug || debug.enabled;
  if (this.debug) {
    debug('Settings %j', settings);
  }

  this.dataSource = dataSource
  this.client = new OneSignalNode.Client(settings.appId, settings.appKey)

  this.DataAccessObject = function() {}
}

util.inherits(OneSignalConnector, Connector)

OneSignalConnector.prototype.connect = function(callback) {
  callback()
}

/**
 * initialize the contracter
 */
exports.initialize = function (dataSource, callback) {
  const settings = dataSource.settings || {}
  datasource.connector = new OneSignalConnector(settings, dataSource)
  if(callback) {
    dataSource.connector.connect(callback)
  }
}

/**
 * Notification implementation
 * @param {*} deviceId 
 * @param {*} message 
 * @param {*} title 
 */
OneSignalConnector.prototype.notify = function(deviceId, message, title, callback) {
  debug('notify', deviceId, title, message)

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

  debug('Sending notification')

  this.client.createNotification(data)
    .then(response => {
      callback(response)
    })
    .catch(err => {
      callback(err)
      debug('Error '+ err)
    })
}

// OneSignalConnector.prototype.getTypes = function() {
//   return ['onesignal'];
// };

// OneSignalConnector.prototype.getDataAccessObject = function() {
//   return this.DataAccessObject;
// };

exports.OneSignalConnector = OneSignalConnector