const moduleResolverPlugin = [
  'module-resolver',
  {
    root: ['./src'],
    extensions: [
      '.ios.ts',
      '.android.ts',
      '.ts',
      '.ios.tsx',
      '.android.tsx',
      '.tsx',
      '.jsx',
      '.ios.js',
      '.android.js',
      '.js',
      '.json',
      '.svg',
      '.png',
      '.jpg',
    ],
    alias: {
      src: './src',
      config: './config.ts',
    },
  },
];

module.exports = function (api) {
  api.cache(false);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [moduleResolverPlugin],
  };
};
