"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const client_sqs_1 = require("@aws-sdk/client-sqs");
function putBucketContentsInQueue(bucketName, queueUrl) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Create the AWS clients for S3 and SQS
        const s3Client = new client_s3_1.S3Client({ region: "us-west-2" }); // Specify the appropriate region
        const sqsClient = new client_sqs_1.SQSClient({ region: "us-west-2" }); // Specify the appropriate region
        try {
            // List the objects in the specified bucket
            const listObjectsCommand = new client_s3_1.ListObjectsCommand({ Bucket: bucketName });
            const response = yield s3Client.send(listObjectsCommand);
            if (response.Contents) {
                // Iterate over the objects and send each one to the SQS queue
                for (const obj of response.Contents) {
                    // Get the object key
                    const objKey = obj.Key;
                    // Get the object data from S3
                    const getObjectCommand = new client_s3_1.GetObjectCommand({ Bucket: bucketName, Key: objKey });
                    const getObjectResponse = yield s3Client.send(getObjectCommand);
                    const objData = (_a = getObjectResponse.Body) === null || _a === void 0 ? void 0 : _a.toString("utf-8");
                    if (objData) {
                        // Send the object data to the SQS queue
                        const sendMessageCommand = new client_sqs_1.SendMessageCommand({ QueueUrl: queueUrl, MessageBody: objData });
                        yield sqsClient.send(sendMessageCommand);
                    }
                }
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
