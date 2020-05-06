# OmniViewer

---

## Contributor

- Li Shenggui

## Version

v0.4

## 更新日志

2020.02.02
新增

1. 支持下载图片
2. 支持同一浏览器里多开
3. 添加了用户手册
4. 支持观看 mp4 视频
5. 支持预览 detection + attributes 标注文件
6. 支持更新通知

优化

1. 优化了系统架构
2. 优化验证逻辑
3. 更换了 Django 作为后端框架

修复

1. 修复了 list 文件里出现空白文件名的 bug
2. 修复了返回报错的 bug

<br>

2020.01.06
新增

1. 支持在当前目录下进行关键词搜索
2. 支持 redis 缓存 + 多线程
3. 支持百万级的图片浏览
4. 支持多进程并发
5. 支持大图预览缩放

优化

1. 优化项目架构，提高服务器效率
2. 优化大图预览
3. 优化渲染逻辑

修复

1. 修复图片后缀与真实格式不一致导致预览失败的 bug
2. 修复图片加载失败后不显示图片路径的 bug

<br>

2019.12.22
新增

1. 支持显示文件名
2. 支持 tsv 文件的预览
3. 支持按名字排列
4. 支持进入双击进入文件夹、.list 文件和.tsv 文件
5. 支持返回多层上级目录的操作
6. 支持对图片进行统计分析（图片张数，图片格式数量，图片标注数量和数据源数量）
7. 支持看大图时显示图片路径和尺寸

优化

1. 优化图片布局
2. 优化图片自适应性图片列表
3. 优化过渡动画
4. 优化 success, error message 信息
5. 优化代码注释

修复

1. 修复加载大图时上一张图片仍然短暂停留的 bug
2. 修复了在 failure 页面无法搜索的 bug

## Features

###### 配置

1. 可以在 config.py 里调整搜索结果的排数
2. 可以在 config.py 里调整预览图片的大小，越小越快，但越模糊。

###### 图片预览

1. 可以快速预览远程的图片，带宽占用低
2. 可以点击小图看到清晰原图
3. 支持预览文件夹路径，.list 文件, .tsv 文件和单个图片文件
4. 支持页数跳转
5. 支持路径跳转
6. 支持 responsive layout
7. 支持图片统计分析

## 安装

##### 下载 repository

1. git clone \<this repo\>
2. cd OmniViewer

##### docker 部署前端

1. cd ./docker/client
2. 根据需求改 Dockerfile 里的 ARG
3. docker build -t omniviewer-client .
4. docker run -dit -p ${client_port}:${client_port} --name ov-client omniviewer-client bash
5. docker exec -ti ov-client bash
6. exit from docker

##### docker 部署后端

1. cd ./docker/server
2. 根据需求改 Dockerfile 里的 ARG
3. docker build -t omniviewer-server .
4. docker run -dit -p ${server_port}:${server_port} --name ov-server -v /mnt:/mnt omniviewer-server bash
5. docker exec -ti ov-client bash
6. bash run.sh
7. exit from docker

## To-Do for v0.2

- [x] 支持显示文件名
- [x] 优化图片布局,优化自适应性图片列表
- [x] 支持 tsv 文件的预览
- [x] 支持按名字排列
- [x] 支持进入双击进入文件夹
- [x] 支持返回多层上级目录的操作
- [x] 支持对图片进行统计分析（图片张数，图片格式数量，图片标注数量和数据源数量）
- [x] 完善 success, error message 信息
- [x] 支持看大图时显示图片路径和尺寸
- [x] 修复加载大图时上一张图片仍然短暂停留的 bug

## To-Do for v0.3

- [x] 支持文件夹内搜索
- [x] 支持 redis
- [x] 优化服务器结构，支持多线程和缓存，支持百万级的图片浏览
- [x] 修复图片后缀与真实格式不一致导致预览失败的 bug
- [x] 修复图片加载失败后不显示图片路径的 bug
- [x] 支持多进程并发
- [x] 优化大图预览，支持缩放

## To-Do for v0.4

- [x] 支持观看视频
- [x] 支持下载图片
- [x] 支持多开
- [x] 支持预览 annotation

## To-Do for v0.5

- [ ] 支持编辑 list, tsv
- [ ] 支持 sampling

## Contact Me

如果有 bug 或者别的需求，请钉钉“Frank 李升桂”
