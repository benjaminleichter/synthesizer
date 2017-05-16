const config = {
    entry: './index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            silent: true
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false // true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false // true
                        }
                    }
                ]
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
}

module.exports = config;
