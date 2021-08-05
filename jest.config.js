module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testEnvironment: 'jsdom',
    // 告诉jest去哪里找模块资源，同webpack中的modules
    moduleDirectories: [
        'src',
        'node_modules'
    ],
    //测试用例目录
    testRegex: '(/__tests__/.*.test)\\.[jt]sx?$',
    //覆盖的文件类型
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    // 测试报告阀值
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    //忽略的目录
    // coveragePathIgnorePatterns: [
    //     '/node_modules/',
    // ],
    //测试覆盖文件
    // collectCoverageFrom: [
    //     '**/*.test.{ts,tsx}',
    // ]
};
