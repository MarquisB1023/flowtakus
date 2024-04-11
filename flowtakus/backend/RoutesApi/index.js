const cartsRouter = require('./cartsRoutes.js')
const productsRouter = require('./productsRoutes.js')

const apiRouter = require('express').Router()


apiRouter.use('/auth', require('./auth.js'))

apiRouter.use('/orderRoutes',cartsRouter)
apiRouter.use('/productsRoutes',productsRouter)

module.exports = apiRouter