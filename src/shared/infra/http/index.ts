import "reflect-metadata"
import { container } from "tsyringe";
import '@shared/container/index';
import { BootstrapApplication } from "./bootstrap";

(async () => {
  const server = container.resolve(BootstrapApplication);
  await server.start();
})();