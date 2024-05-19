import Boom from "@hapi/boom";

export function validationError(request, h, err) {
  console.error(`ValidationError: ${err.message}`);
  throw Boom.badRequest(`Invalid request payload input: ${err.message}`);
}
