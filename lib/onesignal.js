
'use strict';

var OneSignalService = require('./onesignal-service')

const debug = require('debug')('loopback:connector:onesignal');

exports.initialize = function (dataSource, callback) {
  const settings = dataSource.settings || {}

  var connector = new OneSignalService(settings)
  dataSource.connector = connector
  dataSource.connector.dataSource = dataSource

  connector.DataAccessObject = function () {
  }

  for (var m in OneSignalService.prototype) {
    var method = OneSignalService.prototype[m]
    if ('function' === typeof method) {
      connector.DataAccessObject[m] = method.bind(connector);
      for (var k in method) {
        connector.DataAccessObject[m][k] = method[k];
      }
    }
  }

  connector.define = function(model, properties, settings) {
  };
}