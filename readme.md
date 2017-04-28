# Webpack 2.3.3 Concepts & Guides

## Concepts

**webpack拥有四个重要概念**：

### entry
webpack为应用建立了图状的依赖关系，而entry就是所有依赖的启动点。

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

### output
用于指定webpack打包后资源的存放位置。

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

### loaders
以模块化方式转换`.css`、`.html`、`.scss`、`.jpg`等类型文件，并添加这些资源到webpack依赖地图中。

```javascript
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;
```

### plugins
loder只能执行单个文件的处理，plugings通常用来处理多个任务，以及在被打包模块的*compilations*或*chunks*上自定义功能。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```


## Getting Started

webpack2新特性之一，是实现了**ES2015 module import**的*import/export*语法。

> ./index.html

```html
<html>
  <head>
    <title>webpack 2 demo</title>
  </head>
  <body>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

> ./app/index.js

```javascript
import _ from 'lodash';

function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

> webpack.config.js

```javascript
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```


## Installation

```
npm install --save-dev webpack
npm install --global webpack
```

```javascript
"scripts": {
    "start": "webpack --config mywebpack.config.js"
}
```

## Code Splitting

代码切割，将源代码分离打包到不同的bundle中，以实现在路由或者事件发生时代码的动态的加载。

可以使用webpack完成2种类型的代码切割。

### 1、为了缓存和并行加载的资源切割(*Resource splitting for caching and parallel loads*)

#### 第3方库切割(*Vendor code splitting*)
第3方库通常不会进行修改，如果需要保留这些库之前的bundle，从而发挥用户浏览器的缓存机制，可以通过`CommonsChunkPlugin`插件进行打包。

#### CSS切割(*CSS splitting*)
前端开发人员可能需要根据应用的逻辑，分离CSS样式到各自独立的bundle，增强浏览器的缓存能力，并实现CSS样式的并行加载，从而避免FOUC(*flash of unstyled content，无样式内容闪烁*)。通常，我们使用`ExtractTextWebpackPlugin`来实现这一功能。

### 2、按需代码切割(*On demand code-splitting*)
可以通过`import()`或`require.ensure()`建立动态的代码切割点，以实现代码按需加载，并控制模块的细粒度。


## Code Splitting - CSS
使用webpack打包CSS文件，可以让webpack像引入其它模块一样引入样式，

`css-loader`：以JS模块的方式打包CSS。

`ExtractTextWebpackPlugin`：将CSS打包成独立的CSS文件。

### Importing CSS

```javascript
import 'bootstrap/dist/css/bootstrap.css';
```

### Using `css-loader` and `style-loader`

* `css-loader`：用于解释并解析CSS中的`@import`和`url()`，

* `style-loader`：通过向DOM插入`<style>`标签的方式动态插入CSS样式。

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  }
}
```

> 这种方式的缺点在于，不能使用浏览器的能力去异步、并行的加载CSS，页面必须等待全部JS包被加载后，CSS样式才能生效。

### Using `ExtractTextWebpackPlugin`

使用`extract-text-webpack-plugin`插件打包CSS，可以解决上面提到的问题，但是需要在html中手动引入CSS外部文件。

```javascript
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
}
```


## Code Splitting - Libraries

项目中引用的第3方插件和库，开发过程中通常不会进行修改，打包这些插件和库到项目代码中，对于浏览器缓存而言是无效的。

> index.js

```javascript
var moment = require('moment');
console.log(moment().format());
```

> webpack.config.js

```javascript
var path = require('path');

module.exports = function(env) {
    return {
        entry: './index.js',
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
```

> 上面的方式，会将moment.js和index.js的代码打包在一起，所以这并不是一个好主意。

### Multiple Entries

现在让我们通过添加多个entry point来尝试解决这个问题。

> webpack.config.js

```javascript
var path = require('path');

module.exports = function (env) {
  return {
    entry: {
      main: './app/index.js',
      vendor: 'moment'
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}
```

执行webpack之后，可以发现项目被打包为了2个文件，但是moment.js也被同时打包进这2个文件中。这是因为moment是应用程序index.js的主依赖，而每个entry point都会打包各自的依赖。因此，这里我们需要引入`CommonsChunkPlugin`插件。

该插件可以协助开发人员将不同包下的通用模块抽取到一个通用的包当中，从而完成第3方库与项目源代码的分离。

> webpack.config.js

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function (env) {
  return {
    entry: {
      main: './app/index.js',
      vendor: 'moment'
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor' // Specify the common bundle's name.
      })
    ]
  }
}
```

### Implicit Common Vendor Chunk

可以让CommonsChunkPlugin只处理第3方库。

> webpack.config.js

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function () {
  return {
    entry: {
      main: './app/index.js'
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      })
    ]
  };
}
```

### Manifest File

通过上面方法打包后的JS文件会，会在修改应用代码后，在包名的后缀上添加随机生成的哈希值，但是这样就无法让浏览器缓存打包后的通用第3方库。造成这个问题的原因，是每一次打包，webpack都会生成一些辅助完成其工作的运行时代码。只打包成一个文件时，运行时代码被编译到该文件。但是，当多个bundle生成的时候，这些运行时代码会被编译到通用第3方库所处的包(*例如我们例子中的vendor*)。

解决这个问题，需要将运行时代码，放置到专门的manifest文件，从而稳定通用包的哈希后缀。

> webpack.config.js

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function (env) {
  return {
    entry: {
      main: './app/index.js',
      vendor: 'moment'
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'] // Specify the common bundle's name.
      })
    ]
  }
};
```

通过使用隐式的*common vendor chunk*，可以达到相同的目的。

> webpack.config.js

```javascript
var webpack = require('webpack');
var path = require('path');

module.exports = function () {
  return {
    entry: {
      main: './app/index.js' //Notice that we do not have an explicit vendor entry here
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
      })
    ]
  };
}
```


## Code Splitting - Async

对于应用代码的按需异步加载，webpack支持2种方式：

* import()：首选，ES6建议。
* require.ensure()：传统，webpack指定。

### Dynamic import: import()

webpack实现了import()函数，该函数以模块名称作为参数，并返回一个promise。

> index.js

```javascript
function determineDate() {
  import('moment').then(function(moment) {
    console.log(moment().format());
  }).catch(function(err) {
    console.log('Failed to load moment', err);
  });
}

determineDate();
```

例如，`import("./locale/${language}.json")`会根据解析后的`${language}`变量加载`english.json`或`german.json`。

#### Promise polyfill

import()内部实现依赖于浏览器内置的Promise对象，对于旧版本浏览器，需要使用es6-promise或promise-polyfill等polyfill。

```javascript
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
// or
import 'es6-promise/auto';
// or
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}
```

#### Chunk names

从webpack2.4开始，动态引用的chunk名称可以通过魔法注释进行指定。

```javascript
import(/* webpackChunkName: "my-chunk-name" */ 'module');
```

#### Usage with Babel

如果要使用babel的`import`，需要添加`syntax-dynamic-import`插件支持。

> webpack.config.js

```javascript
module.exports = {
  entry: './index-es2015.js',
  output: {
    filename: 'dist.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ],
          plugins: ['syntax-dynamic-import']
        }
      }]
    }]
  }
};
```

#### Usage with Babel and async/await

如果需要使用babel实现的ES2017 async/await，需要再额外添加如下代码支持。

    'syntax-dynamic-import',
    'transform-async-to-generator',
    'transform-regenerator',
    'transform-runtime'


#### System.import is deprecated

`System.import`已经在webpack v2.1.0-beta.28中被弃用，并被`import()`取代。

### require.ensure()

编译时，webpack会静态的解析应用程序中的`require.ensure()`，其回调函数中`require()`的依赖将会被添加到一个新的chunk。

`require.ensure()`的具体使用语法如下：

```javascript
require.ensure(
  dependencies: String[],
  callback: function(require),
  errorCallback: function(error),
  chunkName: String
)
```

现在我们使用`require.ensure()`来重新上面`import()`的例子：

> index.js

```javascript
function determineDate() {
  require.ensure([], function(require) {
    var moment = require('moment');
    console.log(moment().format());
  });
}
```


## Building for Production

下面的内容，将会讲述webpack用于生产环境的一些最佳实践和工具。

### The Automatic Way

运行`webpack -p`等价于操作`webpack --optimize-minimize --define process.env.NODE_ENV="'production'")`，这将会执行以下步骤：

* （1）使用UglifyJsPlugin进行代码混淆。
* （2）执行LoaderOptionsPlugin。
* （3）设置nodejs环境变量，从而以不同方式去编译指定的包。

#### Minification

在命令行指定`--optimize-minimize`选项时，下面的plugin配置将会被添加。

> 需要依赖devtool options，从而生成Source Maps。

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: options.devtool && (options.devtool.indexOf("sourcemap") >= 0 || options.devtool.indexOf("source-map") >= 0)
    })
  ]
};
```

#### Source Maps

在webpack配置文件中，可以通过`devtool`对象去设置Source Map类型(*目前webpack支持7种Source Map类型*)，其中`cheap-module-source-map`是最简单的一个选项，可以对每行进行单独映射。

#### Node Environment Variable

运行`webpack -p`或`--define process.env.NODE_ENV="'production'"`的时候，将会以下面的方式调用`DefinePlugin`。

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  /*...*/
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

`DefinePlugin`用于对源代码执行**搜索或替换**操作，代码中所有`process.env.NODE_ENV`都会被`"production"`替换，然后再由UglifyJS进行混淆操作。

```
// 下面这句代码
if (process.env.NODE_ENV !== 'production') console.log('...')
// 都会被渲染为
if (false) console.log('...')
```

### The Manual Way

可以针对不同的场景，分离webpack配置文件。

#### Simple Approach

最简单的方式是直接去定义2个完整的配置文件：

> webpack.dev.js

```javascript
module.exports = {
  devtool: 'cheap-module-source-map',

  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  devServer: {
    port: 7777,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: publicPath
  }
}
```

> webpack.prod.js

```javascript
module.exports = {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
}
```

> webpack.config.js

```javascript
module.exports = function(env) {
  return require('./webpack.${env}.js')
}
```

> package.json

```javascript
"scripts": {
  "build:dev": "webpack --env=dev --progress --profile --colors",
  "build:dist": "webpack --env=prod --progress --profile --colors"
}
```

#### Advanced Approach

更复杂的方式是去抽象一个可以放置不同运行环境下通用配置的base，然后通过环境变量来具体指定merge哪一个配置。

具体的merge操作需要使用到`webpack-merge`并提供相应选项，下面将会展现一个比较简单的版本。

> webpack.common.js

```javascript
module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e)\.ts$/],
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
}
```

> webpack.prod.js

```javascript
const Merge = require('webpack-merge');
const CommonConfig = require('./base.js');

module.exports = function(env) {
  return Merge(CommonConfig, {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    ]
  })
}
You will noti
```


## Caching

如果需要长期缓存webpack生成的静态资源，需要执行如下步骤操作：

* 1. 使用`[chunkhash]`添加内容依赖的缓存克星。

* 2. 抽取webpack manifest清单到分散的文件中去。

* 3. 确保包含启动代码的entry point chunk不会为同一组依赖改变哈希。

当然，我们还可以进行进一步的调优：

* 1. 当在HTML中需要相关资源的时候，通过compiler stats去获取文件的名称。
* 2. 在加载资源前，生成chunk manifest JSON并且将其内联到HTML页面。

### The problem

通过在webpack配置文件的output中设置占位符，从而为打包后的文件名添加唯一的哈希值。

下面代码会生成2个文件(每个entry一个文件)，

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  entry: {
    vendor: "./src/vendor.js",
    main: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[hash].js"
  }
};
```

运行这个配置后会得到如下信息：

```javascript
Hash: 2a6c1fee4b5b0d2c9285
Version: webpack 2.2.0
Time: 62ms
                         Asset     Size  Chunks             Chunk Names
vendor.2a6c1fee4b5b0d2c9285.js  2.58 kB       0  [emitted]  vendor
  main.2a6c1fee4b5b0d2c9285.js  2.57 kB       1  [emitted]  main
   [0] ./src/index.js 63 bytes {1} [built]
   [1] ./src/vendor.js 63 bytes {0} [built]
```

但是，问题在于，当执行任意修改操作之后，webpack会更新所有的文件名，而浏览器无法进行缓存。

### Generating unique hashes for each file

webpack可以基于文件的内容来生成hash，只需要用`[chunkhash]`替换`[hash]`。

```javascript
module.exports = {
  /*...*/
  output: {
    /*...*/
-   filename: "[name].[hash].js"
+   filename: "[name].[chunkhash].js"
  }
};
```

执行之后，webpack会生成拥有不同hash值的2个文件：

```javascript
module.exports = {
  /*...*/
  output: {
    /*...*/
-   filename: "[name].[hash].js"
+   filename: "[name].[chunkhash].js"
  }
};
```

> 不要在开发过程中使用[chunkhash]，因为这样会拖慢编译的时间。最好能够分离开发环境和生产环境，在开发环境使用`[name].js`，生产环境下使用`[name].[chunkhash].js`。

### Get filenames from webpack compilation stats

因为webpack打包后的js文件名是通过哈希动态生成的，所以需要借助compilation stats在html页面中正确的引入这些随机生成的js文件。

```javascript
// webpack.config.js
const path = require("path");

module.exports = {
  /*...*/
  plugins: [
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "build", "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    }
  ]
};
```

> 另外，也可以通过插件assets-webpack-plugin或webpack-manifest-plugin导出stats.json。

### Deterministic hashes

为了缩小生成代码的体积，webpack使用标识符来代替模块的名称。编译时映射到chunk文件名的标识符会被生成，并会被放置到一个被称为`chunk manifest`的javascript对象。

> 为了在编译过程中生成这些标识符，webpack会使用NamedModulesPlugin(*开发环境*)和NamedModulesPlugin(*生产环境*)插件。

这个`chunk manifest`对象会和启动、运行时的代码一起，被放置到入口点chunk，从而协助webpack打包后代码的运行。

但是问题在于，修改应用代码任意位置时，都会更新我们的entry chunk去包含新的manifest，从而产生新的哈希，导致浏览器的缓存失效。

修复这个问题， 需要使用`ChunkManifestWebpackPlugin`将manifest抽象到单独的json文件，在webpack运行时通过1个变量替换chunk manifest。当然，另外一个更好的实践是通过`CommonsChunkPlugin`将运行时的代码抽象到单独的文件，

下面webpack配置文件，展示了如何生成manifest和运行时文件到编译目录：

> webpack.config.js

```javascript
// webpack.config.js
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");

module.exports = {
  /*...*/
  plugins: [
    /*...*/
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"], // vendor libs + extracted manifest
      minChunks: Infinity,
    }),
    /*...*/
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    })
  ]
};
```

> 上面代码中的manifestVariable属性是用于指向manifest JSON的全局变量，它将会在HTML引入bundle前被定义。

下面是已经完成JSON嵌入了的HTML代码：

```html
<html>
  <head>
    <script>
    //<![CDATA[
    window.webpackManifest = {"0":"main.5f020f80c23aa50ebedf.js","1":"vendor.81adc64d405c8b218485.js"}
    //]]>
    </script>
  </head>
  <body>
  </body>
</html>
```

最后，我们可以使用`webpack-chunk-hash`或`webpack-md5-hash`来根据文件内容的不同，去生成不同的hash值.

> 最终webpack.config.js看起来是这样的。

```javascript
var path = require("path");
var webpack = require("webpack");
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackChunkHash = require("webpack-chunk-hash");

module.exports = {
  entry: {
    vendor: "./src/vendor.js", // vendor reference file(s)
    main: "./src/index.js" // application code
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"], // vendor libs + extracted manifest
      minChunks: Infinity,
    }),
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    })
  ]
};
```

上面的配置当中，vendor chunk将不会改变其hash(*除非修改了代码及其依赖*)，下面代码是moduleB.js被修改2次后的输出：

```
> node_modules/.bin/webpack

Hash: f0ae5bf7c6a1fd3b2127
Version: webpack 2.2.0
Time: 102ms
                           Asset       Size  Chunks             Chunk Names
    main.9ebe4bf7d99ffc17e75f.js  509 bytes    0, 2  [emitted]  main
  vendor.81adc64d405c8b218485.js  159 bytes    1, 2  [emitted]  vendor
             chunk-manifest.json   73 bytes          [emitted]
manifest.d41d8cd98f00b204e980.js    5.56 kB       2  [emitted]  manifest
```

```
> node_modules/.bin/webpack

Hash: b5fb8e138b039ab515f3
Version: webpack 2.2.0
Time: 87ms
                           Asset       Size  Chunks             Chunk Names
    main.5f020f80c23aa50ebedf.js  521 bytes    0, 2  [emitted]  main
  vendor.81adc64d405c8b218485.js  159 bytes    1, 2  [emitted]  vendor
             chunk-manifest.json   73 bytes          [emitted]
manifest.d41d8cd98f00b204e980.js    5.56 kB       2  [emitted]  manifest
```

### Manifest inlining

在webpack运行时嵌入chunk manifest(*防止产生多余的HTTP请求*)，需要依赖于开发人员的服务器配置。

对于基于nodejs的服务器端渲染，可以使用`webpack-isomorphic-tools`工具。

> 如果开发人员的服务器不支持任何的服务器端渲染，通常会只生成一个index.html文件，此时可以通过`HtmlWebpackPlugin`和`ScriptExtHtmlWebpackPlugin`或`InlineManifestWebpackPlugin`配合使用来简化设置。


## Development

本节将会讲解webpack在真实开发环境下的使用方法以及相关的工具链，但是不能将其用于生产环境。

### Source Maps

webpack打包代码后，当异常发生时，需要查看错误发生在具体哪一行。source maps提供了许多配置选项来解决这个问题，这些选项各有优缺点，但刚开始通常会使用下面的配置项。

```
devtool: "cheap-eval-source-map"
```

### Choosing a Tool

webpack可以和watch mode特性一起使用，当检测到文件修改时，可以自动重新进行打包编译。

webpack通过`webpack-dev-server`提供了一个热部署的HTTP服务器环境。

如果你已经拥有开发服务器，并希望具备一定的灵活性，可以使用`webpack-dev-middleware `中间件。

`webpack-dev-server`和`webpack-dev-middleware`都使用了内存编译技术(*in-memory compilation*)，这意味bundle并不会保存到硬盘，因而大幅提高了编译速度。

> 通常情况下都会使用`webpack-dev-server`，因为它提供了更多开箱即用的特性。

### webpack Watch Mode

webpack自带的watch model可以检测文件的变化，当任何改变被检测到时都会重新进行编译打包。

可以使用以下命令行，来开启编译打包的进度条：

```
webpack --progress --watch
```

> 原生的watch model不支持web服务器环境，你可以使用`npm install -g serve`指定任意的目录为web服务目录。

### Watch Mode with Chrome DevTools Workspaces

当开发人员将chrome设置为`persist changes when saving from the Sources panel`，就可以不用在chrome上点击刷新，而只需要简单的将webpack设置为：

```
devtool: "inline-source-map"
```

**但是这里存在一些使用上的陷阱**：

* 1.巨大的chunks(通用chunk体积可以超过1M)可能会导致页面加载打包文件不及时，导致出现空白页面，导致需要你手动去刷新浏览器。

* 2.更小的chunks运行更快，但是`inline-source-map`会对源代码进行base64编码，从而延缓运行速度。

#### webpack-dev-server

可以很容易的通过设置，提供实时加载的web服务。

首先确保在`index.html`中引入`output.filename`属性所指定的打包文件，例如像下面例子中那样引入`bundle.js`：

```html
<script src="/bundle.js"></script>
```

然后安装webpack-dev-server：

```
npm install --save-dev webpack-dev-server
```

最后，运行下面命令行会自动打开浏览器`http://localhost:8080`：

```
webpack-dev-server --open
```

这样，每次修改文件并保存后，webpack就会自动执行编译任务，html页面也会自动刷新。

> 接下来可以考虑添加Hot Module Replacement支持，从而可以在无需刷新页面的情况下，自动替换相应模块。

> webpack-dev-server的功能比较强大，例如可以代理请求到后台服务器，更多的配置请查看`devServer`的配置选项。

#### webpack-dev-middleware

webpack-dev-middleware基于nodejs的connect中间件栈，可以用于在已经拥有nodejs服务器的情况下，或者是需要完全的控制服务器的场景下。

该中间件可以在内存中进行编译，并且在编译的过程中，将会延迟请求的响应，直到编译完成。

> 该中间件主要适用于高级用户，相比之下，webpack-dev-server的使用更加容易。

通过下面npm指令安装相关依赖：

```
npm install --save-dev express webpack-dev-middleware
```

安装之后，可以像下面这样使用中间件：

```javascript
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // Same as `output.publicPath` in most cases.
}));

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
```

取决于webpack配置当中的`output.publicPath`和`output.filename`属性，打包出来的`bundle`将会在URL地址`http://localhost:3000/bundle.js`上可用。

`watch mode`默认会被启用，当然你也可以使用`lazy mode`，即只在有请求的时候才会重新编译

如下代码配置，会只在请求`bundle.js`时才进行编译打包操作：

```javascript
app.use(webpackDevMiddleware(compiler, {
  lazy: true,
  filename: "bundle.js" // Same as `output.filename` in most cases.
}));
```
