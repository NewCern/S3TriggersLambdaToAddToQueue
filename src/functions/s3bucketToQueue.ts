// import { S3Client, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
// import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

// async function putBucketContentsInQueue(bucketName: string, queueUrl: string): Promise<void> {
//   // Create the AWS clients for S3 and SQS
//   const s3Client = new S3Client({ region: "us-west-2" }); // Specify the appropriate region
//   const sqsClient = new SQSClient({ region: "us-west-2" }); // Specify the appropriate region

//   try {
//     // List the objects in the specified bucket
//     const listObjectsCommand = new ListObjectsCommand({ Bucket: bucketName });
//     const response = await s3Client.send(listObjectsCommand);

//     if (response.Contents) {
//       // Iterate over the objects and send each one to the SQS queue
//       for (const obj of response.Contents) {
//         // Get the object key
//         const objKey = obj.Key;

//         // Get the object data from S3
//         const getObjectCommand = new GetObjectCommand({ Bucket: bucketName, Key: objKey });
//         const getObjectResponse = await s3Client.send(getObjectCommand);
//         const objData = getObjectResponse.Body?.toString("utf-8");

//         if (objData) {
//           // Send the object data to the SQS queue
//           const sendMessageCommand = new SendMessageCommand({ QueueUrl: queueUrl, MessageBody: objData });
//           await sqsClient.send(sendMessageCommand);
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
