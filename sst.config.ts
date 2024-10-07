/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sstapiapp",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    

    const api = new sst.aws.ApiGatewayV2("MyApi");
    api.route("GET /", {
      handler: "functions/index.upload",
      permissions: [
        {
          actions: ["s3:ListAllMyBuckets"],
          resources: ["*"]  // should be an array
        }
      ],
    });
    
    api.route("POST /chat", {
      handler: "functions/index.getData",
      permissions: [
        {
          actions: ["bedrock:*"],
          resources: ["*"]  // should be an array
        }
      ],
    })

    const website = new sst.aws.StaticSite("sstapiapp", {
      build: {
        output: "dist",
        command: "npm run build"
      },
      environment: {
        VITE_APP_URL: api.url,
      }
    })
    
  },
});
