import { table, secret } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table, secret],
      },
      args: {
        auth: { iam: true },
      },
    },
  },
});

api.route("POST /notes", {
  handler: "packages/functions/src/create.main",
});

api.route("GET /notes/{id}", {
  handler: "packages/functions/src/get.main",
});

api.route("GET /notes", {
  handler: "packages/functions/src/list.main",
});

api.route("PUT /notes/{id}", {
  handler: "packages/functions/src/update.main",
});

api.route("DELETE /notes/{id}", {
  handler: "packages/functions/src/delete.main",
});

api.route("POST /billing", {
  handler: "packages/functions/src/billing.main",
});
