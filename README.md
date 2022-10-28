# gatsby-sleekcms-plugin

Gatsby source plugin for fetching data from SleekCMS

## Install

```bash
yarn add gatsby-sleekcms-plugin
```

## How to use

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: "gatsby-sleekcms-plugin",
    options: {
      xAccessToken: "...",
    },
  },
];
```