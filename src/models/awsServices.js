const { c } = require("../helpers");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { RekognitionClient, SearchFacesByImageCommand } = require("@aws-sdk/client-rekognition");
const uuid = require("uuid").v4;

exports.upload = async (files, options) => {
    const s3client = new S3Client();

    const params = files.map((file) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${options.index}/${uuid()}-${file.originalname}`,
            Body: file.buffer,
            Metadata: options.metadata
        };
    });

    const response = await Promise.all(
        params.map((param) => { s3client.send(new PutObjectCommand(param)) })
    );

    return { response: response, files: c(params).pluck('Key') };
};

exports.rekognitionFindMatch = async (image) => {
    const rekognitionClient = new RekognitionClient({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.aws_access_key_id,
            secretAccessKey: process.env.aws_secret_access_key,
        }
    });
    
    try {
        const command = new SearchFacesByImageCommand({
            CollectionId: process.env.REKOGNITION_COLLECTION_ID,
            Image: {
                Bytes: image.buffer
            },
            MaxFaces: 10,
        });

        const response = await rekognitionClient.send(command);
        return c(response.FaceMatches).sortBy('Similarity').first();
    } catch (error) {
        console.error("Error detecting labels:", error);
    }
}