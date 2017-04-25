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

* `style-loader`：通过向DOM插入<style>标签的方式动态插入CSS样式。

```javascript
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }]
    }
}
```

> 这种方式的缺点在于，不能使用浏览器的能力去异步、并行的加载CSS，页面必须等待全部JS包被加载后，CSS样式才能生效。

### Using `ExtractTextWebpackPlugin`
