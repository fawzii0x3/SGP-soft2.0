import { Request, Response } from 'express'
export {}

export global {
  type MyContext = {
    req: Request & { session: {  productId: string, userId:number,orderId: number } }
    res: Response
    client: BetterSqlite3.Database
  }
}
