# 🚀 关于发布

**登录到 npm**

```bash
npm login
```

> 注意不要使用镜像源
>
> ```bash
> npm config set registry https://registry.npmjs.org/
> ```
>
> 换源后再登录

**检查发布内容**

```bash
npm pack --dry-run
```

**发布**

```bash
npm publish
```

**撤回发布**

npm 只允许撤回 **72 小时**内发布的包

```bash
npm unpublish <package-name> --force
```

`--force` 参数表示强制模式
