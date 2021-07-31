module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        commonjs: true,
        es6: true,
        amd: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['off', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/prop-types': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': [
            'off',
            {
                // allowHigherOrderFunctions: false,
                allowDirectConstAssertionInArrowFunctions: true
            }
        ],
        '@typescript-eslint/no-empty-function': [
            'warn',
            {allow: ['arrowFunctions']}
        ],
        '@typescript-eslint/no-var-requires': ['off'],
        'eol-last': ['error'],
        'quote-props': ['error', 'as-needed']
    }
};
