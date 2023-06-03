import "reflect-metadata"
import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'type-graphql'
import db from './db'
import sqlite from 'better-sqlite3'
import session from 'express-session'
import { defaultPathSession } from './constant'
import BetterSqliteStore from 'better-sqlite3-session-store'
import cors from "cors"
import ip from "ip"
import resolvers from "./Resolvers";
// Construct a schema, using GraphQL schema language

// The root provides a resolver function for each API endpoint

const app = express()

const client = new sqlite(defaultPathSession)
const SqliteStore = BetterSqliteStore(session)
app.use(
  session({
    name: 'sgp',
    store: new SqliteStore({
      client,
      expired: {
        clear: false,
        intervalMs: 1000 * 60 * 60 * 24 * 7,
      }
    }),
    secret: 'keyboard cat',
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // ! in prod set it to true
      maxAge: 1000 * 60 * 60 * 24 * 7 // 10 years
    },
    resave: false
  })
)

async function main() {
  await db.initialize()
  const schema = await buildSchema({
    resolvers,
    validate:false
  })
  console.log(`http://${ip.address()}:5173`)
  app.all(
    '/graphql',
    cors({
      origin:["http://localhost:5173",`http://${ip.address()}:5173`], credentials:true

    }),
    createHandler({
      schema,
      context: ({context}) => {

        return {
          req:context.res.req,
          res:context.res,
          client:client
        }
      }
    })
  )
}

export { app, main }
