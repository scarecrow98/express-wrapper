import { MyController } from "./app/controllers/my-controller";
import { ExpressWrapperApplication } from "./core";

const port = 3000;
const app = new ExpressWrapperApplication(port);

app.registerControllers([
    MyController
]);

app.start(() => {
    console.log('server is running...');
});
