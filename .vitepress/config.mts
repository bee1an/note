import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'node:path'

const root = path.resolve(__dirname, '..')

const pathSrc = path.join(root, 'src')

const getMdTitle = (filePath: string) => {
	const firstLine = fs.readFileSync(filePath).toString().split('\n')[0]
	return firstLine.replace('# ', '').replace('\r', '')
}

const generateDeepSidebar = (files: string[], dirname: string, ...parents: string[]) => {
	return files
		.sort()
		.map((file) => {
			let fullPath = path.join(dirname, file)

			if (fs.statSync(fullPath).isDirectory()) {
				const newFiles = fs.readdirSync(fullPath)

				const sameNameFile = newFiles.find((_file) => _file.split('.')[0] === file)

				const items = generateDeepSidebar(
					newFiles.filter((f) => f !== sameNameFile),
					fullPath,
					...parents,
					file
				)

				let text: string, link: string | undefined

				if (sameNameFile) {
					text = getMdTitle(path.join(fullPath, sameNameFile))
					link = path.join('/src', ...parents, file, sameNameFile).replaceAll('\\', '/')
				} else {
					text = getMdTitle(path.join(fullPath, 'index.md'))
				}

				return { text, link, items }
			}

			if (!file.endsWith('.md') || file === 'index.md') {
				return null
			}

			return {
				text: getMdTitle(fullPath),
				link: path.join('/src', ...parents, file).replaceAll('\\', '/')
			}
		})
		.filter((item) => item !== null)
}

const sidebar = generateDeepSidebar(fs.readdirSync(pathSrc), pathSrc)

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: '/yak-note/',
	title: '随手记',
	description: '记录遇到的任何东西',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: '首页', link: '/' },
			{ text: '笔记页', link: '/src' }
		],
		socialLinks: [{ icon: 'github', link: 'https://github.com/bee1an/yak-note' }],
		sidebar: [
			{
				text: getMdTitle(path.join(pathSrc, 'index.md')),
				link: '/src/index.md',
				items: []
			},
			...sidebar
		],
		search: {
			provider: 'local'
		},
		docFooter: {
			prev: '上一页',
			next: '下一页'
		},
		lastUpdated: {
			text: '最后更新时间'
		}
	},
	lastUpdated: true,
	ignoreDeadLinks: ['./LICENSE']
})
