import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import styleX from 'vite-plugin-stylex';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// 현재 모듈의 URL을 파일 경로로 변환
const __filename = fileURLToPath(import.meta.url);
// 파일 경로에서 디렉토리 경로 추출
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({}),
		tsconfigPaths(),
		react(),
		styleX(),
		svgr({
			include: '**/*.svg?react',
		}),
	],
	resolve: {
		alias: {
			'~': `${__dirname}/src`,
		},
	},
});
