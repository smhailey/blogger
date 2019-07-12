// this is where the actual server will live
//NOTE  dont forget to run npm init on your project so you have your package.json before installing dependencies!
import express from 'express'
import bp from 'body-parser'
import "./db/dbconfig"

import BlogController from './controllers/blogsControllers'

let port = 3000
let server = express()
server.use(bp.json())

server.use('/api/Blogs', new BlogController().router)

function defaultErrorHandler(req, res, next) {
  res.status(404).send("route not found")
}

server.use('*', defaultErrorHandler)

server.use((error, req, res, next) => {
  res.status(error.status || 400).send(error)
})

server.listen(port, () => {
  console.log("Your server is running on port: ", port, "you better go catch it!")
})