import browserSync from 'browser-sync'

import { configs } from '../configs'

browserSync({
  port: configs.port.dev,
  // reloadDelay: 1000,
  files: "./src",
  server: "./dist",
  browser: ["iexplore"],
  watch: true
});
