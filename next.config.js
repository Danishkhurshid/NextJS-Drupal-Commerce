module.exports = {
  images: {
    domains: ['decoupled-drupal'],
  },
  env: {
    DRUPAL_API_URL: process.env.DRUPAL_API_URL,
    STRIPE_PUB_KEY: process.env.STRIPE_PUB_KEY,
  },

}