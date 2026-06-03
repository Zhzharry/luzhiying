# 露之营网页版

## Docker 启动

在 `网页版` 目录执行：

```powershell
docker compose up -d --build
```

或直接运行：

```powershell
.\scripts\docker-up.ps1
```

## 访问地址

- 全容器前端首页：`http://localhost:18080`
- 全容器后端 API：`http://localhost:18081/api/camps`
- MySQL：`localhost:13306`

## 本机混合启动

如果当前 Docker 镜像源无法拉取 `node/nginx/jdk`，可以直接运行：

```powershell
.\scripts\start-local.ps1
```

停止：

```powershell
.\scripts\stop-local.ps1
```

本机混合启动访问地址：

- 前端首页：`http://localhost:5173`
- 后端 API：`http://localhost:8080/api/camps`

## 说明

- `mysql` 会自动导入 `backend/sql/schema.sql` 和 `backend/sql/seed.sql`
- 前端容器通过 `nginx` 反向代理 `/api` 到后端
- 当前页面主链已可直接浏览：首页、找营地、营地详情、攻略、后台列表页
