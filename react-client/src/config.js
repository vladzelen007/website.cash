const dev = {
  strapi: {
    api_url: 'http://127.0.0.1:3001'
  }
}

const prod = {
  strapi: {
    api_url: 'https://prod_url/api'
  }
}

const config = (process.env.REACT_APP_STAGE === "production") ? prod : dev;

export default {
  ...config
}
