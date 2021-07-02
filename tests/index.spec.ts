import { handler } from '../src/index';
import { generateContext, generateEvent } from './helpers/generators';

test('index.handler is a function', () => {
  expect(typeof handler).toBe('function');
});

test('index.handler returns object', async () => {
  const result = await handler(generateEvent(), generateContext());
  expect(result).toMatchObject({});
});
