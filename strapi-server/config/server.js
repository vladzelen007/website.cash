module.exports = ({ env }) => {
  ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 3001),
    admin: {
      url: "http://127.0.0.1:3001/dashboard",
      auth: {
        secret: env('ADMIN_JWT_SECRET', 'f23693853fe2f932b9432eeaf9ea8b27')
      },
    },
  });
}