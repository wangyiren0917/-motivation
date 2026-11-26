# Transit Stats Figma 原型补全

这份 Figma 插件基于已有的 Transit Stats 桌面和手机画板，补上原型播放入口、首屏入场、固定导航、章节跳转、桌面 Full / TL;DR 切换、桌面深色状态和 Contact 浮层。原稿中的五列滚动封面、体验标签和品牌轮播会随画板实例一起保留。手机里的产品界面沿用原有图片和动图。

[原网页参考](https://charleshonig.design/transitstats)

## 交给另一个 agent

1. 把目标 Figma 文件链接交给 agent。它需要用可编辑该文件的 Figma 账号连接，并确认写入额度可用。
2. 让它先读取 [code.js](./code.js) 并检查目标文件。脚本引用了原稿中的 Page 2（`4:5`）、桌面画板（`8:2`）、手机画板（`8:3`）和交互组件区域（`14:2`）。如果稿子被复制到了新文件，先通过图层名称和结构重新定位节点，再更新相关 ID。
3. 用 Figma 写入工具执行时，按运行环境调整脚本入口、重复运行检测和退出逻辑。脚本末尾的 `figma.closePlugin()` 和写入插件数据的 `setPluginData()` 用于桌面插件环境。
4. 打开 Figma 的演示模式，完成下面的验收。这个仓库只包含补全脚本，目标文件需要已经有复刻好的长页和互动组件。

## 在 Figma 桌面端手动运行

1. 将 [manifest.json](./manifest.json) 和 [code.js](./code.js) 保存到同一个本地文件夹。
2. 打开有编辑权限的 Transit Stats 设计稿。在 Figma 桌面端的 **Plugins → Development → Import plugin from manifest** 选择 `manifest.json`。
3. 从 **Plugins → Development** 运行 **Transit Stats Prototype**。生成后，从 **Desktop · Transit Stats** 或 **Mobile · Transit Stats** 开始播放。

## 验收

- 两个播放入口均能打开，首屏入场后五列封面继续滚动。
- 桌面滚动时顶栏和侧栏固定，点侧栏可跳到对应章节，Full 和 TL;DR 可来回切换。
- 体验标签、品牌轮播、桌面主题切换和 Contact 浮层能正常操作。
- 手机原型可以滚动，两个轮播的前后按钮能切换内容。

现有桌面原型的封面滚动、体验标签和品牌轮播已实测。补全脚本通过了 JavaScript 语法检查，首屏入场、固定导航等新增连线仍需在目标 Figma 文件中实跑验收。
