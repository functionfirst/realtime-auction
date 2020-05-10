const isProduction = (() => process.env.NODE_ENV === 'production')();

const corsAllowedList = process.env.CORS_ALLOWED_LIST.split(',')

module.exports = {
  corsAllowedList,
  isProduction
}
