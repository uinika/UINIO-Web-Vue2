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


