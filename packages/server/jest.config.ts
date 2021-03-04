import path from 'path';

export default {
    clearMocks: true,
    preset: 'ts-jest',
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testEnvironment: path.join(__dirname, './prisma/prisma-test-env.ts'),
};
