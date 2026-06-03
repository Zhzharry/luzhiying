# 露之营工作区

这个仓库已经按“多端 + 共享后端”重构为工作区结构，当前可重点运行的是 `网页版`。

## 目录结构

- `需求文档/`
  - 产品需求、竞品分析、架构规范
- `网页版/frontend/`
  - `Vue 3 + Vite + Pinia + Vue Router` 用户端与管理后台前端
- `网页版/backend/`
  - `Spring Boot + MyBatis-Plus + MySQL` 共享后端
- `小程序版/frontend/`
  - 小程序前端骨架，未来复用同一个 Java 后端
- `legacy/next-prototype/`
  - 旧版 `Next.js + Prisma` 探索代码，仅保留参考，不再作为主线

## 当前技术路线

- 网页端前端：Vue 3
- 网页端后端：Java Spring Boot
- 网页端数据库：MySQL 8
- 小程序后端：与网页端共用 Java 后端
- 管理后台：与网页端用户端同一前端项目

## 运行前准备

推荐部署方式是纯 Docker。

也就是只要求环境里有：

- `Docker Desktop`
- `Docker Compose`

快速检查命令：

```powershell
docker --version
docker compose version
```

## 方案一：全 Docker 运行

适合你要统一用容器启动 `MySQL + 后端 + 前端`。

### 1. 进入网页版目录

```powershell
cd D:\programming\Workspace\luying\网页版
```

### 2. 预拉取基础镜像

```powershell
docker pull mysql:8.4
docker pull maven:3.9.9-eclipse-temurin-17
docker pull eclipse-temurin:17-jre
docker pull node:20-alpine
docker pull nginx:1.27-alpine
```

### 3. 显式指定 Compose 项目名并启动

这个仓库路径里有中文目录，建议始终带上 `COMPOSE_PROJECT_NAME`，避免 `docker compose` 在某些环境里取项目名失败。

```powershell
$env:COMPOSE_PROJECT_NAME="luyingweb"
docker compose up -d --build
docker compose ps
```

### 4. 查看运行状态

```powershell
docker ps
docker compose logs -f mysql
docker compose logs -f backend
docker compose logs -f frontend
```

### 5. 访问地址

- 前端首页：`http://localhost:18080`
- 找营地页：`http://localhost:18080/discover`
- 示例详情页：`http://localhost:18080/camps/hangzhou-lake-breeze`
- 后端 API：`http://localhost:18081/api/camps`
- MySQL：`localhost:13306`

### 6. 停止容器

```powershell
$env:COMPOSE_PROJECT_NAME="luyingweb"
docker compose down
```

如果你连数据卷也想一起删：

```powershell
$env:COMPOSE_PROJECT_NAME="luyingweb"
docker compose down -v
```

## 一键脚本

如果你不想手敲全部命令，也可以直接用仓库里的脚本。

### 全 Docker

```powershell
cd D:\programming\Workspace\luying\网页版
.\scripts\docker-up.ps1
```

停止：

```powershell
cd D:\programming\Workspace\luying\网页版
.\scripts\docker-down.ps1
```

## 假数据说明

数据库初始化会自动导入：

- `网页版/backend/sql/schema.sql`
- `网页版/backend/sql/seed.sql`

当前内置了可直接演示的数据：

- `6` 个营地
- `6` 篇攻略
- `7` 条评论

你可以直接查：

```powershell
docker exec luying-mysql mysql --default-character-set=utf8mb4 -uroot -proot -D luying -e "SELECT id, name, city FROM camp ORDER BY id;"
docker exec luying-mysql mysql --default-character-set=utf8mb4 -uroot -proot -D luying -e "SELECT id, title, city_scope FROM guide ORDER BY id;"
docker exec luying-mysql mysql --default-character-set=utf8mb4 -uroot -proot -D luying -e "SELECT id, content, status FROM review ORDER BY id;"
```

## 推荐验收地址

建议优先验收这些页面：

- 首页
- 找营地页
- 营地详情页
- 攻略列表页
- 管理台营地列表页

具体地址：

- 首页：`/`
- 找营地：`/discover`
- 营地详情：`/camps/hangzhou-lake-breeze`
- 攻略列表：`/guides`
- 管理台营地：`/admin/camps`

## 常用排查命令

### 查看端口占用

```powershell
netstat -ano | Select-String ":13306"
netstat -ano | Select-String ":18080"
netstat -ano | Select-String ":18081"
```

### 查看容器日志

```powershell
cd D:\programming\Workspace\luying\网页版
$env:COMPOSE_PROJECT_NAME="luyingweb"
docker compose logs -f mysql
docker compose logs -f backend
docker compose logs -f frontend
```

### 查看数据库数据

```powershell
docker exec -it luying-mysql mysql --default-character-set=utf8mb4 -uroot -proot
```

进入 MySQL 后：

```sql
USE luying;
SHOW TABLES;
SELECT * FROM camp;
SELECT * FROM guide;
SELECT * FROM review;
```
