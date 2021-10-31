import { Request, Response } from "express";
import { Controller, Get, Post } from "../../core/decorators";

@Controller('/my')
export class MyController {

    @Get('/test')
    getTest(req: Request, res: Response) {
        res.send('Hello, World!');
    }

    @Post('/test')
    postTest() {

    }
}