import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react-swc';
import dns from 'dns';
import { resolve } from 'path';
import postcssNesting from 'postcss-nesting';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from 'tailwindcss';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv } from 'vite';
import envCompatible from 'vite-plugin-env-compatible';
import vitePluginImp from 'vite-plugin-imp';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import Inspect from 'vite-plugin-inspect';

dns.setDefaultResultOrder('verbatim');

type viteConfigProps = {
  mode: string;
};

export default ({ mode }: viteConfigProps) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      sourcemap: false,
      ...(process.env.ANALYZE === 'true' && {
        rollupOptions: {
          cache: false,
          plugins: [
            visualizer({
              filename: 'bundle-report.html', // Output file
              open: true, // Auto open in browser
              gzipSize: true, // Show gzip size
              brotliSize: true, // Show brotli size
            }),
          ],
        },
      }),
    },
    cacheDir: '.vite',
    css: {
      postcss: {
        plugins: [postcssNesting(), tailwindcss()],
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
      include: ['dayjs', 'dayjs/plugin/utc', 'dayjs/plugin/timezone', 'antd'],
    },
    plugins: [
      react(),
      envCompatible(),
      viteTsconfigPaths(),
      svgrPlugin(),
      svgr(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: name => {
              if (name === 'auto-complete' || name === 'time-picker') {
                return false;
              }
              return `antd/es/${name}/style/index.js`;
            },
          },
        ],
      }),
      AutoImport({
        dts: './src/@types/auto-imports.d.ts',
        imports: ['vitest'],
      }),
      ...(process.env.ANALYZE === 'true'
        ? [
            Inspect({
              dev: true,
              build: true,
              open: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: [
        { find: '~', replacement: resolve(__dirname, './node_modules') },
        { find: '@root', replacement: resolve(__dirname, '.') },
      ],
    },
    server: {
      open: true,
      port: 3002,
    },
  });
};
