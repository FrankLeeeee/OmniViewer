# OmniViewer
---

## Contributor
- Li Shenggui

## Version
v0.3


## 更新日志
2020.01.30
新增
1. 支持下载图片
2. 支持多开

优化
1. 优化了系统架构
2. 更换了Django作为后端框架

<br>

2020.01.06
新增
1. 支持在当前目录下进行关键词搜索
2. 支持redis缓存 + 多线程
3. 支持百万级的图片浏览
4. 支持多进程并发
5. 支持大图预览缩放

优化
1. 优化项目架构，提高服务器效率
2. 优化大图预览
3. 优化渲染逻辑

修复
1. 修复图片后缀与真实格式不一致导致预览失败的bug
2. 修复图片加载失败后不显示图片路径的bug

<br>

2019.12.22
新增
1. 支持显示文件名
2. 支持tsv文件的预览
3. 支持按名字排列
4. 支持进入双击进入文件夹、.list文件和.tsv文件
5. 支持返回多层上级目录的操作
6. 支持对图片进行统计分析（图片张数，图片格式数量，图片标注数量和数据源数量）
7. 支持看大图时显示图片路径和尺寸

优化  
1. 优化图片布局 
2. 优化图片自适应性图片列表
3. 优化过渡动画
4. 优化success, error message信息
5. 优化代码注释

修复
1. 修复加载大图时上一张图片仍然短暂停留的bug
2. 修复了在failure页面无法搜索的bug

## Features

###### 配置
1. 可以在config.py里调整搜索结果的排数
2. 可以在config.py里调整预览图片的大小，越小越快，但越模糊。

###### 图片预览
1. 可以快速预览远程的图片，带宽占用低
2. 可以点击小图看到清晰原图
3. 支持预览文件夹路径，.list文件, .tsv文件和单个图片文件
4. 支持页数跳转
5. 支持路径跳转
6. 支持responsive layout
7. 支持图片统计分析


## How to use
1. git clone \<this repo\>
2. cd OmniViewer
3. pip install -r requirements.txt
4. python manage.py runserver


## To-Do for v0.2
- [x] 支持显示文件名
- [x] 优化图片布局,优化自适应性图片列表
- [x] 支持tsv文件的预览
- [x] 支持按名字排列
- [x] 支持进入双击进入文件夹
- [x] 支持返回多层上级目录的操作
- [x] 支持对图片进行统计分析（图片张数，图片格式数量，图片标注数量和数据源数量）
- [x] 完善success, error message信息
- [x] 支持看大图时显示图片路径和尺寸
- [x] 修复加载大图时上一张图片仍然短暂停留的bug

## To-Do for v0.3
- [x] 支持文件夹内搜索
- [x] 支持redis
- [x] 优化服务器结构，支持多线程和缓存，支持百万级的图片浏览
- [x] 修复图片后缀与真实格式不一致导致预览失败的bug
- [x] 修复图片加载失败后不显示图片路径的bug
- [x] 支持多进程并发
- [x] 优化大图预览，支持缩放

## To-Do for v0.4
- [x] 支持观看视频
- [x] 支持下载图片
- [x] 支持多开
- [ ] 支持编辑list, tsv
- [ ] 支持预览annotation
- [ ] 支持删除图片、生成新的list文件
- [ ] 支持sampling
- [ ] 支持历史记录

## Contact Me
如果有bug或者别的需求，请钉钉“Frank 李升桂”
