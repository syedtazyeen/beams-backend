import { Injectable } from '@nestjs/common';
import { ModuleRef, ModulesContainer } from '@nestjs/core';

@Injectable()
export class AppService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly modulesContainer: ModulesContainer
  ) { }

  getRoutes() {
    const routes = [];

    for (const [key, value] of this.modulesContainer.entries()) {
      for (const [controllerKey, controllerValue] of value.controllers.entries()) {
        const instance = controllerValue.instance;
        const prototype = Object.getPrototypeOf(instance);
        for (const method of Object.getOwnPropertyNames(prototype)) {
          const routeInfo = Reflect.getMetadata('path', prototype[method]);
          if (routeInfo) {
            const methodMetadata = Reflect.getMetadata('method', prototype[method]);
            routes.push({
              path: routeInfo,
              method: methodMetadata,
              controller: prototype.constructor.name,
              handler: method
            });
          }
        }
      }
    }
    return routes;
  }
}
