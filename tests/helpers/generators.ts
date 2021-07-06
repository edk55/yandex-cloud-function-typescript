import { IContext, IEvent } from '../../src/typings';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type GeneratorFn<T = unknown> = (overrides?: DeepPartial<T>) => T;

export const generateContext: GeneratorFn<IContext> = (overrides) => ({
  functionName: 'function-name',
  functionVersion: 'function-version',
  memoryLimitInMB: '128',
  requestId: '1234-5678-90',
  ...overrides,
  token: overrides?.token && {
    access_token: '',
    expires_in: 0,
    token_type: 'Bearer',
    ...overrides.token,
  },
});

export const generateEvent: GeneratorFn<IEvent> = (overrides) => ({
  ...overrides,
  multiValueQueryStringParameters: {
    // fix because of DeepPartial
    ...(overrides?.multiValueQueryStringParameters as Record<string, string[] | undefined>),
  },
  multiValueHeaders: {
    // fix because of DeepPartial
    ...(overrides?.multiValueHeaders as Record<string, string[] | undefined>),
  },
  httpMethod: overrides?.httpMethod ?? 'GET',
  requestContext: {
    httpMethod: overrides?.httpMethod ?? 'GET',
    requestId: 'request-id',
    requestTime: '123456',
    requestTimeEpoch: 1,
    ...overrides?.requestContext,
    identity: {
      sourceIp: '127.0.0.1',
      userAgent: 'user-agent',
      ...overrides?.requestContext?.identity,
    },
  },
});
