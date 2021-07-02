import { Handler } from './typings';

export const handler: Handler = (event, context) => {
  console.log('Hello world!');

  return {
    statusCode: 200,
    body: JSON.stringify({ event, context }),
  };
};
