module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://prod_url/api',
  admin: {
    url: 'https://prod_url/dashboard',
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'f23693853fe2f932b9432eeaf9ea8b27')
    },
  },
});
