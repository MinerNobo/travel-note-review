# 旅行笔记审核系统

## 项目简介

这是一个基于 React + TypeScript + Vite 的旅行笔记审核管理系统，旨在提供高效、便捷的旅行笔记审核流程。[立即体验](https://moruka.top)(该链接尚未通过备案，可能无法访问)，[ip访问](http://124.71.204.101)

## 项目状态

![Build Status](https://img.shields.io/github/actions/workflow/status/MinerNobo/travel-note-review/ci.yml)
![Code Coverage](https://img.shields.io/codecov/c/github/MinerNobo/travel-note-review)
![Version](https://img.shields.io/github/package-json/v/MinerNobo/travel-note-review)

## 使用说明

由于本项目仅供游记管理人员使用，故不开设注册功能，管理员和审核员账号在后端服务初始化时自行创建。
以下是当前的设置，如有需求可以更改后端的环境变量更改密码。

管理员
`用户名`：admin
`密码`：jd5cBC5c24d!

审核员
`用户名`：reviewer
`密码`：jd5cBC5c24d!

## 技术栈

- React 19
- TypeScript
- Vite
- TanStack Query
- TanStack Router
- ShadcnUI
- React Hook Form

## 项目结构

```
src/
├── components/       # 普通组件
├── pages/            # 页面组件
├── hooks/            # 自定义 React Hooks
├── routes/           # 路由组件
├── api/              # API 请求函数
└── types/            # TypeScript 类型定义
```

## 部署指南

### 服务器环境

- 推荐 Node.js v20+
- Nginx 反向代理配置

### 生产环境部署步骤

1. 克隆项目
2. 安装依赖: `pnpm install`
3. 构建项目: `pnpm run build`
4. 重启nginx服务：`sudo systemctl reload nginx`(先配置nginx)

## 已完成功能

- [x] JWT用户认证
- [x] 旅行笔记列表展示
- [x] 多维度筛选（状态、关键字、日期范围）
- [x] 分页功能(根据页面大小调整页面记录数)
- [x] 审核操作（通过、拒绝）
- [x] 管理员删除功能
- [x] 详细的游记预览
- [x] 权限控制

## 开发环境准备

### 前置条件

- Node.js (v20+)
- pnpm (v8+)

### 克隆项目

```bash
git clone https://github.com/MinerNobo/travel-note-review.git
cd travel-note-review
```

### 安装依赖

```bash
pnpm install
```

### 运行开发服务器

```bash
pnpm run dev
```

### 构建生产版本

```bash
pnpm run build
```

## 联系方式

- 项目负责人：[戴亮(MinerNobo)](https://github.com/MinerNobo)
- 电子邮件：3313976380@qq.com
