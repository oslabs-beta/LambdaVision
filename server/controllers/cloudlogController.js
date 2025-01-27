import {
  CloudWatchLogsClient,
  DescribeLogGroupsCommand,
} from "@aws-sdk/client-cloudwatch-logs";

const client = new CloudWatchLogsClient({ region: "us-east-1" });

const listLogGroups = async () => {
  try {
    const command = new DescribeLogGroupsCommand({});
    const response = await client.send(command);
    console.log("Log Groups:", response.logGroups);
  } catch (err) {
    console.error("Error listing log groups:", err);
  }
};

listLogGroups();

import { DescribeLogStreamsCommand } from "@aws-sdk/client-cloudwatch-logs";

const listLogStreams = async (logGroupName) => {
  try {
    const command = new DescribeLogStreamsCommand({
      logGroupName: logGroupName,
    });
    const response = await client.send(command);
    console.log("Log Streams:", response.logStreams);
  } catch (err) {
    console.error("Error listing log streams:", err);
  }
};

listLogStreams("/aws/lambda/my-lambda-function");

import { GetLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";

const getLogEvents = async (logGroupName, logStreamName) => {
  try {
    const command = new GetLogEventsCommand({
      logGroupName: logGroupName,
      logStreamName: logStreamName,
      limit: 50, // Number of events to fetch
    });
    const response = await client.send(command);
    response.events.forEach((event) => console.log(event.message));
  } catch (err) {
    console.error("Error fetching log events:", err);
  }
};

getLogEvents("/aws/lambda/my-lambda-function", "2025/01/23/[$LATEST]abcd1234");

import { FilterLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";

const filterLogEvents = async (logGroupName, filterPattern) => {
  try {
    const command = new FilterLogEventsCommand({
      logGroupName: logGroupName,
      filterPattern: filterPattern, // Example: 'ERROR'
    });
    const response = await client.send(command);
    response.events.forEach((event) => console.log(event.message));
  } catch (err) {
    console.error("Error filtering log events:", err);
  }
};

filterLogEvents("/aws/lambda/my-lambda-function", "ERROR");
