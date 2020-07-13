module.exports = {
    extends: ['airbnb', 'plugin:jest/recommended'],
    parser: 'babel-eslint',
    globals: {
        document: true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
    },
    plugins: ['react', 'prettier', 'jest', 'react-hooks'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'import/prefer-default-export': 'off',
        'jsx-a11y/no-autofocus': 'warn'
    },
};
