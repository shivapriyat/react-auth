npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
npm install --save react react-dom react-router-dom
npm install --save-dev webpack webpack-dev-server webpack-cli style-loader css-loader babel-loader

Note to run dev mode
npm run dev
To run production mode:
npx webpack build ---> generates dist folder and bundle.js in it
npx webpack serve --> render bundle.js