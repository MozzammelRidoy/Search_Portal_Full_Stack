import express, { Router } from 'express'
import { GenerateRoutes } from '../modules/generate/generate_route'

const routers: Router = express.Router()

const moduleRoutes = [
  {
    path: '/generate',
    route: GenerateRoutes
  }
]

moduleRoutes.forEach(route => {
  routers.use(route.path, route.route)
})

export default routers
