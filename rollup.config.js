import typescript from '@rollup/plugin-typescript';

const tsconfig = './tsconfig.build.json';
const external = [
  'react/jsx-runtime',
  'react',
  'react-dom',
];
const input = [
  './src/components/index.ts',
  './src/hooks/index.ts',
  './src/lib/index.ts',
  './src/index.ts',
];
const config = [
  {
    external,
    input,
    output: {
      dir: 'esm',
      format: 'es',
      preserveModules: true,
    },
    plugins: [typescript({ tsconfig })],
  },
  {
    external,
    input,
    output: {
      dir: 'cjs',
      format: 'cjs',
      exports: 'named',
      preserveModules: true,
      entryFileNames: '[name].cjs',
      generatedCode: {
        arrowFunctions: true,
        constBindings: true,
      },
    },
    plugins: [typescript({ tsconfig })],
  },
];

export default config;
