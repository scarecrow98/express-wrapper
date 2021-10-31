import express from "express";
import { RouteInfo } from "./decorators";

export class ExpressWrapperApplication {
    server: express.Express;
    
    port: number;

    controllers: any[] = [];

    constructor(port: number) {
        this.port = port;
        this.server = express();
    }

    registerControllers(controllers: any[] = []) {
        this.controllers = controllers;
        this.initializeRouteHandlers();
    }

    start(callback?: (() => void | undefined)) {
        this.server.listen(this.port, callback);
    }

    /**
     * @see https://nehalist.io/routing-with-typescript-decorators/
     */
    private initializeRouteHandlers() {
        this.controllers.forEach(controller => {
            //todo: more strict checks on what 'controller' actually is
            const pathPropDesc = Object.getOwnPropertyDescriptor(controller, 'path');

            if (pathPropDesc === undefined) {
                return;
            }

            const basePath = pathPropDesc.value || '/';

            const routes = (Object.getOwnPropertyDescriptor(controller, 'routes')?.value || []) as Array<RouteInfo>;

            const controllerObject = new controller(); //todo: inject controllet ctor deps
            routes.forEach(route => {
                const fullRoute = basePath + route.path;
                this.server[route.httpMethod](fullRoute, controllerObject[route.method]);
            });
        });
    }
}


