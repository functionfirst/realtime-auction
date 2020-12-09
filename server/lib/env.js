const isProduction = (() => process.env.NODE_ENV === 'production')();

const port = process.env.PORT || 8080

const corsAllowedList = process.env.CORS_ALLOWED_LIST.split(',')

export {
  corsAllowedList,
  isProduction,
  port
}
