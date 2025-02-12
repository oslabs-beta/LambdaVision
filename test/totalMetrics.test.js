const request = require('supertest');
const app = require('../server/server');
const User = require('../server/models/User');


//Mock AWS SDK clients
jest.mock("@aws-sdk/client-lambda", () => ({
    LambdaClient: jest.fn().mockImplementation(() => ({
      listFunctions: jest.fn().mockResolvedValue({
        Functions: [{ FunctionName: "testLambda" }],
      }),
    })),
  }));


jest.mock("@aws-sdk/client-cloudwatch", () => ({
    CloudWatchClient: jest.fn().mockImplementation(() => ({
      send: jest.fn().mockImplementation((command) => {
        if (command.input.MetricName === "Invocations") return { Datapoints: [{ Sum: 10 }] };
        if (command.input.MetricName === "Errors") return { Datapoints: [{ Sum: 1 }] };
        if (command.input.MetricName === "Duration") return { Datapoints: [{ Average: 200 }] };
        return { Datapoints: [] };
      }),
    })),
  }));

// Mock User model
jest.mock("../server/models/User.js");


describe("GET /api/lambda/total-metrics", () => {
    it("should return Lambda metrics for a user", async () => {
      User.findById.mockResolvedValue({
        awsCredential: {
          AWS_ACCESS_KEY_ID: "mockKey",
          AWS_SECRET_ACCESS_KEY: "mockSecret",
          AWS_REGION: "us-east-1",
        },
      });
  
      const res = await request(app)
        .get("/api/lambda/total-metrics")
        .set("Authorization", "Bearer mockToken");
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("totalFunctions", 1);
      expect(res.body).toHaveProperty("totalInvocations", 10);
      expect(res.body).toHaveProperty("totalErrors", 1);
      expect(res.body).toHaveProperty("errorRate", "10.00%");
      expect(res.body).toHaveProperty("averageDuration", "200.00 ms");
    });
  
    it("should return 403 if AWS credentials are missing", async () => {
      User.findById.mockResolvedValue(null);
  
      const res = await request(app)
        .get("/api/metrics/lambda/total-metrics")
        .set("Authorization", "Bearer mockToken");
  
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("error", "AWS credentials not found for user");
    });
  
    it("should handle AWS SDK errors", async () => {
      User.findById.mockResolvedValue({
        awsCredential: {
          AWS_ACCESS_KEY_ID: "mockKey",
          AWS_SECRET_ACCESS_KEY: "mockSecret",
          AWS_REGION: "us-east-1",
        },
      });
  
      const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");
      CloudWatchClient.mockImplementation(() => ({
        send: jest.fn().mockRejectedValue(new Error("AWS Error")),
      }));
  
      const res = await request(app)
        .get("/api/metrics/lambda/total-metrics")
        .set("Authorization", "Bearer mockToken");
  
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("error", "Failed to fetch Lambda metrics");
    });
  });