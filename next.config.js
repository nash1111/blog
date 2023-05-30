/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "jp"],
    defaultLocale: "en",
  },
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webm)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/[path][name].[hash][ext]",
      },
    });
    config.module.rules.push({
      test: /\.wgsl$/i,
      use: "raw-loader",
    });
    config.plugins.push(
      new webpack.DefinePlugin({
        __SOURCE__: webpack.DefinePlugin.runtimeValue((v) => {
          // Load the source file and set it as a global definition.
          // This is useful for easily embedding a file's source into the page.
          const source = fs.readFileSync(v.module.userRequest, "utf-8");
          return JSON.stringify(source); // Strings need to be wrapped in quotes
        }, []),
      })
    );

    if (!config.node) {
      config.node = {};
    }

    config.node.__filename = true;
    config.node.__dirname = true;

    return config;
  },
};

module.exports = nextConfig;
