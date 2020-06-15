import { Request, Response } from 'express';

export default class ExamplesController {
 public async show(req:Request, res:Response): Promise<Response> {
  return res.json({ message: 'Hello World' });
 }
}