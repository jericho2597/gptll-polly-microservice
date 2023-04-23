const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const polly = new AWS.Polly();

const getRandomVoice = () => {
  const voices = ['Mizuki', 'Takumi'];
  return voices[Math.floor(Math.random() * voices.length)];
};

module.exports.handler = async (event) => {
  // Check if the request body contains data
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Request body is missing' }),
    };
  }

  // Parse the request body
  const data = JSON.parse(event.body);

  // Check if the content length exceeds 200 characters
  if (data.content.length > 200) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Content length exceeds the 200 characters limit' }),
    };
  }

  // Check if the data contains the 'name' and 'content' fields
  if (!data.name || !data.content) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Name or content field is missing from the data' }),
    };
  }

  // Generate audio using Amazon Polly
  const params = {
    OutputFormat: 'mp3',
    Text: data.content,
    TextType: 'text',
    VoiceId: getRandomVoice(),
    LanguageCode: 'ja-JP',
  };

  try {
    const { AudioStream } = await polly.synthesizeSpeech(params).promise();

    // Upload the audio file to the S3 bucket
    const fileName = `${data.name}.mp3`;
    await s3
      .putObject({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: AudioStream,
        ContentType: 'audio/mpeg',
        ACL: 'public-read',
      })
      .promise();

    // Return the URL of the uploaded audio file
    const url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Audio file generated and uploaded successfully', url }),
    };
  } catch (error) {
    console.error('Error generating or uploading audio file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error generating or uploading audio file' }),
    };
  }
};