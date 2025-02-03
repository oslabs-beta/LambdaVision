import {
    CloudWatchLogsClient,
    PutMetricAlarmCommand,
    DescribeAlarmsCommand,
    DeleteAlarmsCommand,
  } from "@aws-sdk/client-cloudwatch-logs";
  
  // ✅ Step 1: Initialize CloudWatch Logs Client
  const client = new CloudWatchLogsClient({ region: "us-east-1" });
  
  /**
   * ✅ Create an Alert in CloudWatch
   * 1. Extract `alarmName`, `metricName`, and `threshold` from the request.
   * 2. Validate that all required parameters are provided.
   * 3. Construct the CloudWatch PutMetricAlarmCommand.
   * 4. Send the command to AWS.
   * 5. Return a success response or handle any errors.
   */
  export const createAlert = async (req, res, next) => {
    try {
      // 🔹 Extract request data
      const { alarmName, metricName, threshold } = req.body;
  
      // 🔹 Validate input
      if (!alarmName || !metricName || threshold === undefined) {
        return res.status(400).json({ error: "Missing required parameters: alarmName, metricName, threshold" });
      }
  
      // 🔹 Prepare CloudWatch alarm creation command
      const command = new PutMetricAlarmCommand({
        AlarmName: alarmName,
        MetricName: metricName,
        Threshold: threshold,
        ComparisonOperator: "GreaterThanThreshold",
        EvaluationPeriods: 1,
        Namespace: "AWS/Lambda",
        Period: 60,
        Statistic: "Average",
        ActionsEnabled: false, // 🔹 Set true if you want notifications
      });
  
      // 🔹 Execute command
      await client.send(command);
  
      // 🔹 Send success response
      res.status(201).json({ message: "Alert created successfully", alarmName });
    } catch (err) {
      // 🔹 Handle errors gracefully
      console.error("Error creating alert:", err);
      next({ status: 500, message: "Failed to create alert", details: err.message });
    }
  };
  
  /**
   * ✅ List All Alerts from CloudWatch
   * 1. Send a request to AWS CloudWatch to retrieve all metric alarms.
   * 2. Check if there are any alarms.
   * 3. Return alarms in the response or handle the error.
   */
  export const listAlerts = async (req, res, next) => {
    try {
      // 🔹 Prepare command to get CloudWatch alarms
      const command = new DescribeAlarmsCommand({});
  
      // 🔹 Execute command and get response
      const response = await client.send(command);
  
      // 🔹 Check if there are alarms
      if (!response.MetricAlarms || response.MetricAlarms.length === 0) {
        return res.status(404).json({ error: "No alerts found in CloudWatch" });
      }
  
      // 🔹 Send list of alarms
      res.json(response.MetricAlarms);
    } catch (err) {
      // 🔹 Handle errors gracefully
      console.error("Error retrieving alerts:", err);
      next({ status: 500, message: "Failed to retrieve alerts", details: err.message });
    }
  };
  
  /**
   * ✅ Delete an Alert in CloudWatch
   * 1. Extract `alarmName` from request parameters.
   * 2. Validate that `alarmName` is provided.
   * 3. Construct the CloudWatch DeleteAlarmsCommand.
   * 4. Send the command to AWS.
   * 5. Return a success response or handle any errors.
   */
  export const deleteAlert = async (req, res, next) => {
    try {
      // 🔹 Extract request parameter
      const { alarmName } = req.params;
  
      // 🔹 Validate input
      if (!alarmName) {
        return res.status(400).json({ error: "Missing required parameter: alarmName" });
      }
  
      // 🔹 Prepare CloudWatch alarm deletion command
      const command = new DeleteAlarmsCommand({
        AlarmNames: [alarmName],
      });
  
      // 🔹 Execute command
      await client.send(command);
  
      // 🔹 Send success response
      res.json({ message: "Alert deleted successfully", alarmName });
    } catch (err) {
      // 🔹 Handle errors gracefully
      console.error("Error deleting alert:", err);
      next({ status: 500, message: "Failed to delete alert", details: err.message });
    }
  };