import * as OpenApiValidator from "express-openapi-validator";
import path from "path";

const isDocker = process.env.IS_DOCKER === "true";
const swaggerPath = isDocker
  ? "/app/doc/OpenAPI_swagger.yml"
  : path.join(__dirname, "../../../doc/OpenAPI_swagger.yml");

export const openApiValidator = OpenApiValidator.middleware({
  apiSpec: swaggerPath,
  validateRequests: true,
});
