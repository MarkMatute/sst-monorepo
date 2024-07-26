// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Uploads");

// Create DDB
export const table = new sst.aws.Dynamo("Notes", {
  fields: {
    userId: "string",
    noteId: "string",
  },
  primaryIndex: {
    hashKey: "userId",
    rangeKey: "noteId",
  },
});