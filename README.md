# express-wrapper

This is a simple library that is built around Express JS to use it with controller classes and decorators
My goal was to get to know Typescript more, in particular its metadata and reflection API.
This project does not use the reflect-metadata library, it utilizes the built-in `Object.getOwnPropertyDescriptor` and `Object.defineProperty` functions to append metadata to classes and methods.

## Example
Here's how you would initialize your application:
```Javascript
import { MyController } from  "./app/controllers/my-controller";
import { ExpressWrapperApplication } from  "./core";

const port = 3000;
const app = new ExpressWrapperApplication(port);

app.registerControllers([
	MyController
]);

app.start(() => {
	console.log('server is running...');
});

```
And here's how you would create a controller class:
```Javascript
import { Request, Response } from  "express";
import { Controller, Get, Post } from  "../../core/decorators";

@Controller('/my')
export class MyController {
	@Get('/test')
	getTest(req: Request, res: Response) {
		res.send('Hello, World!');
	}
	
	@Post('/test')
	postTest() {
		...
	}
}
```