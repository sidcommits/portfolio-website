module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'node_modules/.bin/next',
      args: 'start -p 6767',
      cwd: '/var/www/portfolio-website',
      env: {
        NODE_ENV: 'production',
        PORT: 6767,
      },
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
}
