/* jshint node: true */
'use strict';

var fs   = require('fs');
var path = require('path');
var Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cli-photoswipe',

  included: function(app) {    
    this._super.included.apply(this, arguments);
    this.app  = app;
    var psDir ='vendor/ember-photoswipe/dist';
    
    app.import(psDir + '/photoswipe.css');
    app.import(psDir + '/default-skin/default-skin.css');
    app.import(psDir + '/photoswipe.js');
    app.import(psDir + '/photoswipe-ui-default.min.js');
    },

  treeForPublic: function() {    
    
    var psDir =path.dirname(require.resolve('photoswipe/dist/photoswipe.js'));
    var svgPath = path.join(psDir, 'default-skin');
    
    var publicTree = new Funnel(this.treeGenerator(svgPath), {
      srcDir: '/',
      destDir: '/assets',
      exclude: ['default-skin.css']
    });
    
    return publicTree;
  },


  treeForVendor: function () {     
    let include = [];   
    include.push('dist/*.css');
    include.push('dist/*.js');      
    include.push('dist/default-skin/*.*');
    const assetDir = path.join(
      this.project.root,
      "node_modules",
      "photoswipe"
    ); 
    let tree= fastbootTransform(new Funnel(assetDir, { destDir: 'ember-photoswipe', include: include }));         
    let trees=[];
    trees.push(tree);
    return this._super(mergeTrees(trees, { overwrite: true }));
  }

};
