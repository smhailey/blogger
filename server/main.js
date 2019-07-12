// /this is where the actual server will live
//NOTE  dont forget to run npm init on your project so you have your package.json before installing dependencies!
import express from 'express'
import bp from 'body-parser'
import "./db/dbconfig"

let port = 3000


let server = express()
server.use(bp.json())

function defaultErrorHandler(req, res, next) {
  res.status(404).send("route not found")
}

server.use('*', defaultErrorHandler)

server.listen(port, () => {
  console.log("server is running on port: ", port, "you better go catch it!")
})