// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    ignorePatterns: ['/dist/*', 'expo-env.d.ts'],
    extends: ['expo', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
    },
};
