'use strict';

var fs    = require('fs');

var PHOTOSWIPE_VERSION = '4.1.0';

module.exports = {

  description: 'Adds Photoswipe lib from npm and generate custom src',

  normalizeEntityName: function() {/* generator with no args */},

  afterInstall: function(options) {
    return this.addPackageToProject('photoswipe', PHOTOSWIPE_VERSION);
  }

};
