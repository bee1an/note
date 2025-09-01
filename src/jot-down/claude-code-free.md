# 免费使用Claude code

[Claude code router](https://github.com/musistudio/claude-code-router) + 免费的大模型api

## 免费的大模型api

这个是白嫖最关键的一步, 需要自己去搞定大模型的api调用

这里记录几个目前免费的平台(按照好用度排序)

### 可用

1. [openrouter](https://openrouter.ai)

缺点: 免费次数每日50次太少, 解锁免费模型每日1000次需要充值10.5刀

2. [modelscope](https://www.modelscope.cn/)

缺点: 免费次数太少, 每天2000次(一个init命令消耗了100次), 开源模型有的不支持工具调用(简介上写了支持, 最终测试下来不支持), 好用的模型id(Qwen/Qwen3-Coder-480B-A35B-Instruct)

### 不可用

1. gemini

使用免费的gemini api

这个方法会报500错误, 不知道为什么

2. [openai-gemini](https://github.com/PublicAffairs/openai-gemini)

不可用!!!

将有免费额度gemini的api调用改为兼容openai的格式, 这样就不会报500错误了

这个方法需要一个域名, 域名注册方式(https://register.us.kg/), 优点是便宜

然后将这个域名托管到cloudflare上, 然后将api地址替换为自己的域名地址, 这里给一个示例

```json
{
	"name": "openai",
	"api_base_url": "https://gemini.bee1an.us.kg/api/v1/chat/completions", // 这里是我的域名的子域名: https://gemini.bee1an.us.kg
	"api_key": "xxx",
	"models": ["gemini-2.5-pro"]
}
```

这个方法可以调用大模型, 但是执行任务时会报错, 不知道为什么

如果这个方法可用的话应该可以通过一些特别的方法来提高gemini的使用次数

3. [免费的qwen3](https://qwen3.slmnb.cn/#api)

慢, 模型不聪明

```json
{
	"name": "qwen",
	"api_base_url": "https://api.suanli.cn/v1/chat/completions",
	"api_key": "your-api-key-here",
	"models": ["free:Qwen3-30B-A3B"]
}
```

4. [gemini-balance-lite](https://github.com/tech-shrimp/gemini-balance-lite)

负载均衡的api, 可以调用多个gemini api

还是需要一个自己的域名

问题还是执行任务会报错, http code 429

```json
{
	"name": "gemini",
	"api_base_url": "https://gemini-balance.bee1an.us.kg/v1beta/models/", // 这里一定不要遗忘后面的斜杠
	"api_key": "xxx1,xxx2", // 这里可以使用多个api key用逗号分割
	"models": ["gemini-2.5-pro", "gemini-2.5-flash"],
	"transformer": {
		"use": ["gemini"]
	}
}
```

## Tips

api_base_url的格式一般都是: xxx/chat/completions, gemini除外

## 总结

openrouter + modelscope
