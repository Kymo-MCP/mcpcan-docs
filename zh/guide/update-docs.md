# 为MCPCAN文档贡献内容

🎉 MCPCAN 帮助文档喊你来搞事情啦！这可是个[开源宝藏项目](https://github.com/Kymo-MCP/mcpcan)，超欢迎大家花式贡献～

要是读文档时发现 bug、想提建议，或者手痒想动笔添内容，直接冲 GitHub 就好！提交 issue 吐槽 / 支招，或是发起 pull request 直接上手改，我们会火速响应，绝不辜负你的热情呀～<br>

## 如何提交贡献
我们将文档问题分为以下几类：<br>
● 内容勘误（错别字 / 内容不正确）<br>
● 内容缺失（需要补充新的内容）<br>

### 内容勘误
如果你在阅读某篇文档的时候发现存在内容错误，或者想要修改部分内容，请点击文档页面右侧目录栏内的 **“在 GitHub 上编辑”** 按钮，使用 GitHub 内置的在线编辑器修改文件，然后提交 pull request 并简单描述本次修改行为。标题格式请使用 
Fix: Update xxx，我们将在收到请求后进行 review，无误后将合并你的修改。<br>

![alt text](../../public/images/content_update.png)
当然，你也可以在 [Issues 页](https://github.com/Kymo-MCP/mcpcan/issues)贴上文档链接，并简单描述需要修改的内容。收到反馈后将尽快处理。
### 内容缺失
如果你想要提交新的文档至代码仓库中，请遵循以下步骤：<br>
1. Fork 代码仓库<br>

首先将代码仓库 Fork 至你的 GitHub 账号内，然后使用 Git 拉取代码仓库至本地：
```bash
git clone https://github.com/<your-github-account>/mcpcan-docs.git
```

你也可以使用 GitHub 在线代码编辑器，在合适的目录内提交新的 md 文件。<br>

2. 找到对应的文档目录并提交文件<br>
   
例如，你想要提交第三方工具的使用文档，请在 
`/guides/tools/tool-configuration/` 目录内提交新的 md 文件（建议提供中英双语内容）。<br>

3. 提交 pull request<br>

提交 pull request 时，请使用 
`Docs: add xxx `的格式，并在描述栏内简单说明文档的大致内容，我们在收到请求后进行 review，无误后将合并你的修改。<br>
### 最佳实践<br>

我们非常欢迎你分享使用 MCPCAN 搭建的创新应用案例！为了帮助社区成员更好地理解和复现你的实践经验，建议按照以下框架来组织内容：
```bash
1. 项目简介
   - 应用场景和解决的问题
   - 核心功能和特点介绍
   - 最终效果展示

2. 项目原理/流程介绍

3. 前置准备（如有）
   - 所需资源清单
   - 工具依赖要求

4. MCPCAN 平台实践步骤（参考）
   - 应用创建和基础配置
   - 应用流程搭建详解
   - 关键节点配置说明

5. 常见问题
```
   为了便于用户理解，建议为文章添加必要说明截图。 请以在线图片链接的形式提交图片内容。我们期待你的精彩分享，一起助力 MCPCAN 社区的知识积累！

## 获取帮助
如果你在贡献过程中遇到困难或者有任何问题，可以通过相关的 [GitHub 问题](https://github.com/Kymo-MCP/mcpcan/issues)提出你的疑问。