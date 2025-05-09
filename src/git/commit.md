# commit 规范

这些库的配合流程

-> 使用 `commitlint` + `cz-git` 生成 commit message -> 使用 `husky` + `lint-staged` 校验暂存区代码是否符合 eslint, prettier 等规范 -> 使用 `husky` + `commitlint` 校验`commit message`是否符合规范 -> 校验全部通过, 允许 commit

## [commitlint](https://github.com/conventional-changelog/commitlint)

搭配[husky](https://github.com/typicode/husky), 可以在提交代码前校验提交信息是否符合规范

```bash
# 安装 commitlint
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

创建 `commitlint.config.js`

prompt 配置使用 [`cz-git`](#cz-git) 适配器

```js
export default defineConfig({
	extends: ['@commitlint/config-conventional']
	/* 
    prompt: 配置为cz-git的内容
  */
})
```

安装完成后, 可以使用 `npx commitlint --from HEAD~1 --to HEAD --verbose` 命令来校验**上一次提交信息**是否符合规范

## [husky](https://github.com/typicode/husky)

git hooks 工具, 可以在 git 钩子中执行命令, 比如在提交代码前校验提交信息是否符合规范

初始化

```bash
npm install --save-dev husky
npx husky init

# 使用echo创建注意文件字符集问题
echo "npx --no commitlint --edit `$1" > .husky/commit-msg
```

注意 `.husky/pre-commit` 文件的内容, 可能会存在不存在的命令, `.husky/pre-commit` 可以置空

完成后可以执行 commit message 中的内容会自动校验, 不通过会显示错误信息

```bash
# 这个是一个测试message错误的情况
git commit -m "foo: this will fail"

#  husky > commit-msg
No staged files match any of provided globs.
⧗   input: foo: this will fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg script failed (code 1)
```

## [lint-staged](https://github.com/lint-staged/lint-staged)

在 git 暂存区的文件上运行命令(eslint, prettier 等)

思考: 为什么不在 pre-commit 中时候使用 eslint 或者 prettier 等命令

- eslint 或者 prettier 等命令会检查整个项目, 项目庞大时会浪费时间
- 只检查修改的文件, 可以提高效率, 所以需要整个工具

安装

```bash
npm install --save-dev lint-staged
```

配置, 使用最常用的在 `package.json` 中配置, [其他配置方法](https://github.com/lint-staged/lint-staged?tab=readme-ov-file#configuration)

```json
// 以下配置借鉴了naive-ui的配置
{
	"lint-staged": {
		"*{.js,.ts,.tsx}": ["prettier --write", "eslint --fix"],
		"*.vue": ["prettier --parser=vue --write", "eslint --fix"],
		"*.css": ["prettier --write"],
		"*.md": ["prettier --write --parser markdown --prose-wrap never", "eslint --fix"]
	}
}
```

使用

```bash
# 在husky中安装钩子
echo "npm lint-staged" > .husky/pre-commit

# or
node -e "fs.appendFileSync('.husky/pre-commit', '\nnpm lint-staged')"
```

## [commitizen](https://github.com/commitizen/cz-cli)

使用命令行来提交 commit message

需要一个适配器, [默认适配器](https://github.com/commitizen/cz-conventional-changelog)

适配器推荐使用 [`cz-git`](#cz-git)

**全局安装**

```bash
npm install -g commitizen

# 安装适配器
npm install -g cz-conventional-changelog

# 全局配置适配器
# 使用echo创建注意文件字符集问题
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

可以在 `.czrc` 文件下添加[更多配置](https://github.com/commitizen/cz-conventional-changelog?tab=readme-ov-file#configuration)

**局部配置[参考](https://github.com/commitizen/cz-cli?tab=readme-ov-file#making-your-repo-commitizen-friendly)**

完成后使用 `cz -a` 命令即可

## [cz-git](https://cz-git.qbb.sh/zh/)

- 更好的图标支持
- 更友好的文档

> 将上面例子中 `cz-conventional-changelog` 替换为 `cz-git` 即可全局安装

推荐全局安装

完成后使用 cz -a 命令即可

结合 `commitlint` 使用

```bash
npm install --save-dev cz-git
```

[cz-git 结合 commitlint 配置](#cz-git-结合-commitlint-配置)

## cz-git 结合 commitlint 配置

```js
// commitlint.config.js

import { defineConfig } from 'cz-git'

export default defineConfig({
	extends: ['@commitlint/config-conventional'],
	prompt: {
		messages: {
			type: "Select the type of change that you're committing:",
			scope: 'Denote the SCOPE of this change (optional):',
			customScope: 'Denote the SCOPE of this change:',
			subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
			body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
			breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
			footerPrefixSelect: 'Select the ISSUES type of changeList by this change (optional):',
			customFooterPrefix: 'Input ISSUES prefix:',
			footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
			generatingByAI: 'Generating your AI commit subject...',
			generatedSelectByAI: 'Select suitable subject by AI generated:',
			confirmCommit: 'Are you sure you want to proceed with the commit above?'
		},
		types: [
			{
				value: 'feat',
				name: 'feat:     ✨  A new feature',
				emoji: ':sparkles:'
			},
			{ value: 'fix', name: 'fix:      🐛  A bug fix', emoji: ':bug:' },
			{
				value: 'docs',
				name: 'docs:     📝  Documentation only changes',
				emoji: ':memo:'
			},
			{
				value: 'style',
				name: 'style:    💄  Changes that do not affect the meaning of the code',
				emoji: ':lipstick:'
			},
			{
				value: 'refactor',
				name: 'refactor: ♻️   A code change that neither fixes a bug nor adds a feature',
				emoji: ':recycle:'
			},
			{
				value: 'perf',
				name: 'perf:     ⚡️  A code change that improves performance',
				emoji: ':zap:'
			},
			{
				value: 'test',
				name: 'test:     ✅  Adding missing tests or correcting existing tests',
				emoji: ':white_check_mark:'
			},
			{
				value: 'build',
				name: 'build:    📦️   Changes that affect the build system or external dependencies',
				emoji: ':package:'
			},
			{
				value: 'ci',
				name: 'ci:       🎡  Changes to our CI configuration files and scripts',
				emoji: ':ferris_wheel:'
			},
			{
				value: 'chore',
				name: "chore:    🔨  Other changes that don't modify src or test files",
				emoji: ':hammer:'
			},
			{
				value: 'revert',
				name: 'revert:   ⏪️  Reverts a previous commit',
				emoji: ':rewind:'
			}
		],
		useEmoji: true,
		emojiAlign: 'center',
		useAI: false,
		aiNumber: 1,
		themeColorCode: '',
		scopes: [],
		allowCustomScopes: true,
		allowEmptyScopes: true,
		customScopesAlign: 'bottom',
		customScopesAlias: 'custom',
		emptyScopesAlias: 'empty',
		upperCaseSubject: false,
		markBreakingChangeMode: false,
		allowBreakingChanges: ['feat', 'fix'],
		breaklineNumber: 100,
		breaklineChar: '|',
		skipQuestions: [],
		issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
		customIssuePrefixAlign: 'top',
		emptyIssuePrefixAlias: 'skip',
		customIssuePrefixAlias: 'custom',
		allowCustomIssuePrefix: true,
		allowEmptyIssuePrefix: true,
		confirmColorize: true,
		scopeOverrides: undefined,
		defaultBody: '',
		defaultIssues: '',
		defaultScope: ['test'],
		defaultSubject: ''
	}
})
```

(更多配置)[https://cz-git.qbb.sh/zh/config/]
