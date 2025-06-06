# 🐍 在线贪吃蛇游戏

一个现代化的在线贪吃蛇游戏，支持穿墙功能，使用纯HTML、CSS和JavaScript开发。

## ✨ 游戏特色

- **穿墙功能** - 蛇可以从一边的墙壁穿越到另一边，游戏更有趣！
- **响应式设计** - 支持桌面和移动设备
- **本地存储** - 自动保存最高分记录
- **美观界面** - 现代化的渐变背景和动画效果
- **多种控制方式** - 支持键盘方向键、WASD键和移动端触摸按钮
- **暂停功能** - 按空格键可以暂停/继续游戏

## 🎮 游戏规则

1. 使用方向键或WASD控制蛇的移动方向
2. 吃到红色食物可以得分并增长蛇身
3. 当蛇撞到边界时会从另一边出现（穿墙功能）
4. 避免蛇头撞到自己的身体
5. 按空格键可以暂停/继续游戏

## 🚀 如何运行

1. 确保所有文件都在同一个文件夹中：
   - `index.html`
   - `style.css`
   - `script.js`

2. 双击 `index.html` 文件即可在浏览器中打开游戏

或者：

1. 在文件夹中右键选择"在此处打开终端"
2. 如果你有Python，运行：`python -m http.server 8080`
3. 在浏览器中访问：`http://localhost:8080`

## 🛠 技术栈

- **HTML5** - 游戏结构和Canvas画布
- **CSS3** - 样式设计和响应式布局
- **JavaScript** - 游戏逻辑和交互功能

## 📱 移动端支持

游戏完全支持移动设备，包括：
- 触摸按钮控制
- 响应式界面设计
- 适合小屏幕的优化

## 🔧 自定义设置

你可以轻松修改游戏设置：

在 `script.js` 中：
- `gridSize` - 调整游戏网格大小
- `setTimeout(gameLoop, 150)` - 调整游戏速度（数值越小越快）
- 分数系统 - 修改 `score += 10` 来调整得分

## 📦 上传到GitHub

1. 在GitHub上创建新仓库
2. 在本地文件夹中打开终端
3. 运行以下命令：

```bash
git init
git add .
git commit -m "初始提交：贪吃蛇游戏"
git branch -M main
git remote add origin https://github.com/你的用户名/snake-game.git
git push -u origin main
```

## 🌐 部署到GitHub Pages

1. 在GitHub仓库中进入Settings
2. 找到Pages选项
3. 选择Source为"Deploy from a branch"
4. 选择分支为"main"
5. 等待几分钟后即可通过 `https://你的用户名.github.io/snake-game` 访问

## 🎯 未来功能计划

- [ ] 增加不同难度级别
- [ ] 添加音效和背景音乐
- [ ] 多人对战模式
- [ ] 更多游戏主题
- [ ] 排行榜功能

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个游戏！

## 📄 许可证

MIT License - 可以自由使用、修改和分发

---

享受游戏吧！🎉 