# express-simple-bundles
Creates cachable bundle files for javascript and CSS, using md5 suffixes.

## Installation

  npm install express-simple-bundles --save

## usage

Set up your bundles:

````
var bundleSettings = {
  compress : true, // true to compress and minify. If false, each raw file will be included as its own bundle
  bundles: [
     {name : 'main.js', type:"js",output:"public/js/dist/",files:['public/js/functions.js']}, // output is the output folder for a minified version
     {name : 'main.css', type:"css",output:"public/css/dist/", files:['public/css/style.css']}],
   jsEngine: 'uglifyjs',
   cssEngine: 'clean-css'
};

````
Call the bundler:
````
// bundling these settings will set up a global bundle object
require('./expressSimpleBundler').bundle(bundleSettings);
````

Use the bundles in a view:
````
@bundles.css.forEach(function(b){
  <link rel="stylesheet" type="text/css" src="@b" />
})

@bundles.js.forEach(function(b){
  <script type="text/javascript" src="@b"></script>
})
````

Output:
````
<link rel="stylesheet" type="text/css" src="public/css/dist/main.d41d8cd98f00b204e9800998ecf8427e.css" />
<script type="text/javascript" src="public/js/dist/main.af628313630eff47f96c5ddcba59a2c3.js"></script>
````
