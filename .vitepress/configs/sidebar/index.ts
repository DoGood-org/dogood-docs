import { architecture } from "./architecture";
import { constants } from "./constants";
import { endpoints } from "./endpoints";
import { entities } from "./entities";
import { frontend } from "./frontend";
import { models } from "./models";

export const sidebar = {
  '/': [architecture, entities, endpoints, constants, models],
  '/frontend/': frontend,
  // Swagger - вимкнути sidebar
  '/api-reference/': [],
}