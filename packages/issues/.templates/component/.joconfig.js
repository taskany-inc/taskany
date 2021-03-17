const { pascalCase } = require('change-case');

module.exports = {
    title: 'React Component',
    default: 'tsx',
    path: ({ options }, filename) => (options.directory ? `./src/components/${filename}` : './src/components'),
    description: 'Create React component',
    options: {
        directory: {
            type: 'boolean',
            short: 'd',
            description: 'Create as directory',
        },
        module: {
            type: 'string',
            short: 'm',
            description: 'Sub module',
            parse: pascalCase,
        },
    },
    hooks: {
        preFileName: (_, filename) => pascalCase(filename),
    },
};
