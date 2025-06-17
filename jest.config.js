// Jest测试配置文件
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/test/**/*.test.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/', 'extension.test.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
};
