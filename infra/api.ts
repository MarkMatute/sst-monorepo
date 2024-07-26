import { table } from "./storage";

export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table],
      },
    },
  },
});

api.route("POST /notes", {
  handler: "packages/functions/src/create.main",
});
