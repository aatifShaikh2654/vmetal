module.exports = {
    apps: [
      {
        name: 'v-metals',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
          PORT: 4000
        }
      }
    ]
  };