# UINIO-Web-Vue2

a elegance **Vue 2** & **Webpack 5** scaffold without vue-cli.

![](sources/assets/favicon.ico)

## Domain Object

- login`login`
- layout`layout`
  - dashboard`dashboard`
  - demo`demo`

![](sources/assets/electron.png)

## Installation and deployment

```bash
1. git clone https://github.com/uinika/UINIO-Web-Vue2.git
2. cd aves
3. npm i
4. npm start
5. Open browser with http://localhost:5000/dev/index.html
```

## Thirdparty Library

- [NodeJS 18.16.x](https://nodejs.org/)
- [Vue 2.6.x](https://vuejs.org/)
- [Vuex 3.6.x](https://vuejs.org/)
- [Vue-Router 3.5.x](https://vuejs.org/)
- [Vue-i18n 8.22.x](http://kazupon.github.io/vue-i18n/)
- [Webpack 5.65.x](https://webpack.js.org/)
- [Element-UI 2.15.x](element.eleme.io/)
- [Vuetify 2.6.x](https://vuetifyjs.com/)

## Project Release

1. Update penguin/sources/partials/common/http.js

> Update base url for global ajax connection.

2. npm run clean

> Remove all of thing within the `output/build`.

3. npm run build

> compile source code to the directory `output/build`.

4. npm run release

> compress build folder to the directory `output/release year-month-day hour.minute.second.zip`.

5. npm run electron

> you must execute `npm start` before activate this command.
