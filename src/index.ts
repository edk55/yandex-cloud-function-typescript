import { Handler } from './typings';

export const handler: Handler = (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ event, context }),
  };
};
