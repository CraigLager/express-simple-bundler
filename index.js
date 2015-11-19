// https://github.com/srod/node-minify

var compressor = require('node-minify');

bundles = {js:[],css:[]};


exports.bundle = function(bundleSettings)
{
  bundleSettings.bundles.forEach(function(b){

    var outputArray = b.type === "js" ? bundles.js : bundles.css;
    var engine = b.type === "js" ? bundleSettings.jsEngine : bundleSettings.cssEngine;

    if(!bundleSettings.compress)
    {
      addRawFiles(b,outputArray);
    }
    else {
      createBundle(b,outputArray,engine)
    }
  });
}

function addRawFiles(bundlePackage,outputArray)
{
      bundlePackage.files.forEach(function(f){
        outputArray.push(f.replace('public',''));
      });
}

// types:
// clean-css
// uglifyjs
function createBundle(bundlePackage,outputArray,type)
{
    new compressor.minify({
      type: type,
    fileIn: bundlePackage.files,
    fileOut: bundlePackage.output + bundlePackage.name,
      callback: function(err, min){
        var newFile = renameBundle(bundlePackage.output + bundlePackage.name);
        outputArray.push(newFile);
      }
  });
}

function renameBundle(output)
{
  var md5File = require('md5-file');

  var md5 = md5File(output);
  var newFileName = output.replace('.js',"." + md5 + ".js").replace('.css','.' + md5 + '.css');
  var fs = require('fs');
  fs.rename(output, newFileName , function(err) {
      if ( err ) console.log('ERROR: ' + err);
  });

  return newFileName;
}
