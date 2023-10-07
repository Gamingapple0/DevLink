// setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The path you want to proxy (e.g., /api/users/me)
    createProxyMiddleware({
      target: 'https://api.chatengine.io', // The target API server
      changeOrigin: true, // Required for changing the origin of the request
      headers: {
        // Add any headers required by the API (e.g., authentication headers)
        'projectID': '798c851f-99d3-4327-bef3-f5077111a552',
        "userName": "admin@gmail.com",
        "userSecret": "wr1WBqRoH3ZWz1FQCOxSEIR4AIR2"
        // Add more headers if needed
      },
    })
  );
};
