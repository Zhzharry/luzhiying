# 露之营网页版

推荐运行方式是纯 Docker。

这样你的部署环境只需要：

- `Docker`
- `Docker Compose`

不需要额外安装：

- `Java`
- `Maven`
- `Node.js`
- `npm`

## 目录说明

- `frontend/`
  - Vue 3 网页前端
- `backend/`
  - Spring Boot Java 后端
- `docker-compose.yml`
  - 前端、后端、MySQL 一体化启动编排

## 一键启动

进入 `网页版` 目录：

```powershell
cd D:\programming\Workspace\luying\网页版
```

直接执行：

```powershell
.\scripts\docker-up.ps1
```

这个脚本会自动：

- 设定 `COMPOSE_PROJECT_NAME=luyingweb`
- 构建前端镜像
- 构建后端镜像
- 拉起 `mysql + backend + frontend`

## 手动启动命令

如果你不想用脚本，也可以直接手动执行：

```powershell
cd D:\programming\Workspace\luying\网页版
$env:COMPOSE_PROJECT_NAME="luyingweb"
docker compose up -d --build
docker compose ps
```

## 建议先预拉取镜像

如果你想先单独拉镜像，再构建运行：

```powershell
docker pull mysql:8.4
docker pull maven:3.9.9-eclipse-temurin-17
docker pull eclipse-temurin:17-jre
docker pull node:20-alpine
docker pull nginx:1.27-alpine
```

## 访问地址

启动完成后可访问：

- 前端首页：`http://localhost:18080`
- 找营地页：`http://localhost:18080/discover`
- 示例详情页：`http://localhost:18080/camps/hangzhou-lake-breeze`
- 攻略页：`http://localhost:18080/guides`
- 管理页：`http://localhost:18080/admin/camps`
- 后端 API：`http://localhost:18081/api/camps`
- MySQL：`localhost:13306`

## 停止服务

脚本方式：

```powershell
cd D:\programming\Workspace\luying\网页版
.\scripts\docker-down.ps1
```

手动方式：

```powershell
cd D:\programming\Workspace\luying\网页版
$env:COMPOSE_PROJECT_NAME="luyingweb"
docker compose down
```

如果你还想删除数据库卷：

```powershell
cd D:\programming\Workspace\luying\网页版
$env:COMPOSE_PROJECT_NAME="luyingweb"
docker compose down -v
```

## 查看日志

```powershell
cd D:\programming\Workspace\luying\网页版
$env:COMPOSE_PROJECT_NAME="luyingweb"
docker compose logs -f mysql
docker compose logs -f backend
docker compose logs -f frontend
```

## 数据初始化

MySQL 容器首次启动时会自动导入：

- `backend/sql/schema.sql`
- `backend/sql/seed.sql`

当前内置假数据包括：

- 6 个营地
- 6 篇攻略
- 7 条评论

## 校验数据库数据

```powershell
docker exec luying-mysql mysql --default-character-set=utf8mb4 -uroot -proot -D luying -e "SELECT id, name, city FROM camp ORDER BY id;"
docker exec luying-mysql mysql --default-character-set=utf8mb4 -uroot -proot -D luying -e "SELECT id, title, city_scope FROM guide ORDER BY id;"
docker exec luying-mysql mysql --default-character-set=utf8mb4 -uroot -proot -D luying -e "SELECT id, content, status FROM review ORDER BY id;"
```

## 常见问题

### 1. `project name must not be empty`

这是 `docker compose` 在当前路径含中文时偶发的问题，所以脚本里已经固定设置了：

```powershell
$env:COMPOSE_PROJECT_NAME="luyingweb"
```

手动执行时也建议带上这一行。

### 2. 镜像拉取失败

如果 `node/nginx/maven/jdk` 镜像拉取失败，通常是当前机器的 Docker 镜像源或网络问题，不是项目代码问题。优先单独执行：

```powershell
docker pull mysql:8.4
docker pull maven:3.9.9-eclipse-temurin-17
docker pull eclipse-temurin:17-jre
docker pull node:20-alpine
docker pull nginx:1.27-alpine
```

### 3. 如何确认前后端都在容器里跑

```powershell
docker ps
```

正常应看到：

- `luying-mysql`
- `luying-backend`
- `luying-frontend`
