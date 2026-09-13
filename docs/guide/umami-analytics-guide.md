# Umami 统计配置指南

## 📖 简介

Umami 是一款开源、注重隐私的网站分析工具，可以替代 Google Analytics。本指南将帮助你在 Demius 主题中配置和使用 Umami 统计功能。

## 🚀 快速开始

### 1. 部署 Umami 服务

你需要先部署一个 Umami 统计服务。可以选择以下方式：

#### 方式一：Docker 部署（推荐）

```bash
# 使用 Docker Compose
version: '3'
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://username:password@db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: your-secret-key
    depends_on:
      - db
    restart: always
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: username
      POSTGRES_PASSWORD: password
    volumes:
      - ./umami-db-data:/var/lib/postgresql/data
    restart: always
```

#### 方式二：Vercel 部署

1. Fork [Umami GitHub 仓库](https://github.com/umami-software/umami)
2. 在 Vercel 中导入项目
3. 配置数据库连接（推荐使用 Vercel Postgres）
4. 部署完成

#### 方式三：使用第三方服务

使用 Umami Cloud 等托管服务（可能需要付费）。

### 2. 在 Umami 后台添加网站

1. 登录 Umami 后台（默认用户名：`admin`，密码：`umami`）
2. 点击 **Settings** → **Websites** → **Add website**
3. 填写网站信息：
   - Name: 你的网站名称
   - Domain: 你的域名（如：blog.example.com）
   - Timezone: 选择时区（如：Asia/Shanghai）
4. 保存后会生成一个 **Website ID**，记录下来

### 3. 配置主题

在 `hugo.toml` 中添加 Umami 配置：

```toml
# ===== Umami统计配置 =====
[params.analytics]
  [params.analytics.umami]
    enable = true                          # 是否启用Umami统计
    scriptUrl = "https://umami.demius.tech/script.js"  # Umami统计脚本地址
    websiteId = "YOUR_UMAMI_WEBSITE_ID"  # 网站ID
    showInDataPage = true                  # 是否在数据页面显示统计数据
    apiUrl = "https://umami-api.example.com/"  # 统计数据API地址
```

**参数说明：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `enable` | Boolean | 是 | 全局开关，控制是否启用统计跟踪 |
| `scriptUrl` | String | 是 | Umami跟踪脚本地址，格式：`https://your-umami-domain/script.js` |
| `websiteId` | String | 是 | 在Umami后台创建网站后获得的唯一ID |
| `showInDataPage` | Boolean | 否 | 是否在数据页面（/data/）显示统计信息，默认false |
| `apiUrl` | String | 否 | 统计数据API地址，用于数据页面获取访问统计 |

### 4. 添加数据页面菜单（可选）

如果启用了 `showInDataPage`，建议在导航菜单中添加数据页面链接：

```toml
[[menu.main]]
  name = "数据"
  url = "/data/"
  weight = 7
  [menu.main.params]
    icon = "/img/icons/data.svg"
```

## 📊 数据页面功能

当 `showInDataPage = true` 且配置了 `apiUrl` 后，主题会在 `/data/` 页面显示实时统计数据。

### 显示的数据指标

- **今日访客（UV）**: 今天的独立访客数
- **今日浏览（PV）**: 今天的页面浏览量
- **昨日访客**: 昨天的独立访客数
- **昨日浏览**: 昨天的页面浏览量
- **本月浏览**: 本月累计浏览量
- **本年浏览**: 本年累计浏览量

### 数据展示特性

- 🎨 精美的数据卡片设计
- 🌈 每个指标独特的渐变色图标
- 💫 数字递增动画效果
- 📈 支持千分位格式化显示
- 🔄 自动获取和刷新数据
- 🌓 完美适配暗色模式
- 📱 响应式布局，手机端友好
- ⚡ PJAX 无刷新切换支持

## 🔧 API 配置（可选）

如果要使用数据页面功能，需要创建一个 API 端点来提供统计数据。

### PHP API 示例

创建一个 PHP 文件（如 `index.php`）作为 API 端点：

```php
<?php
// ========== 完整的CORS配置 ==========
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

// 处理OPTIONS预检请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// ========== 缓存配置 ==========
$cache_file = __DIR__ . '/umami_cache.json';
$cache_time = 600; // 缓存10分钟

// 检查缓存
if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_time) {
    echo file_get_contents($cache_file);
    exit;
}

// ========== Umami API配置 ==========
$umami_base = 'https://umami.demius.tech';  // Umami服务器地址
$website_id = 'YOUR_UMAMI_WEBSITE_ID';  // 网站ID

// ========== 登录获取Token ==========
$login_data = json_encode([
    'username' => 'admin',           // Umami后台用户名
    'password' => 'your-password'    // Umami后台密码
]);

$ch = curl_init($umami_base . '/api/auth/login');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $login_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
curl_close($ch);

$auth = json_decode($response, true);
if (!isset($auth['token'])) {
    echo json_encode(['error' => 'Umami登录失败']);
    exit;
}

$token = $auth['token'];

// ========== 获取统计数据 ==========
function fetch_umami_stats($url, $token) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json'
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

// 时间戳计算
$today_start = strtotime('today') * 1000;
$today_end = time() * 1000;
$yesterday_start = strtotime('yesterday') * 1000;
$yesterday_end = strtotime('today') * 1000 - 1;
$month_start = strtotime(date('Y-m-01')) * 1000;
$year_start = strtotime(date('Y-01-01')) * 1000;

// 构建API请求
$base_url = "$umami_base/api/websites/$website_id/stats";

$stats = [
    'today_uv' => fetch_umami_stats("$base_url?startAt=$today_start&endAt=$today_end", $token)['visitors']['value'] ?? 0,
    'today_pv' => fetch_umami_stats("$base_url?startAt=$today_start&endAt=$today_end", $token)['pageviews']['value'] ?? 0,
    'yesterday_uv' => fetch_umami_stats("$base_url?startAt=$yesterday_start&endAt=$yesterday_end", $token)['visitors']['value'] ?? 0,
    'yesterday_pv' => fetch_umami_stats("$base_url?startAt=$yesterday_start&endAt=$yesterday_end", $token)['pageviews']['value'] ?? 0,
    'month_pv' => fetch_umami_stats("$base_url?startAt=$month_start&endAt=$today_end", $token)['pageviews']['value'] ?? 0,
    'year_pv' => fetch_umami_stats("$base_url?startAt=$year_start&endAt=$today_end", $token)['pageviews']['value'] ?? 0,
];

// 保存到缓存
$json = json_encode($stats);
file_put_contents($cache_file, $json);

// 输出结果
echo $json;
?>
```

**API 返回格式：**

```json
{
  "today_uv": 123,
  "today_pv": 456,
  "yesterday_uv": 89,
  "yesterday_pv": 234,
  "month_pv": 5678,
  "year_pv": 12345
}
```

### Node.js API 示例

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

// CORS配置
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Umami配置
const UMAMI_BASE = 'https://umami.demius.tech';
const WEBSITE_ID = 'your-website-id';
const USERNAME = 'admin';
const PASSWORD = 'your-password';

let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 600000; // 10分钟

// 获取统计数据
app.get('/', async (req, res) => {
  // 检查缓存
  if (cache && Date.now() - cacheTime < CACHE_DURATION) {
    return res.json(cache);
  }

  try {
    // 登录获取token
    const authResponse = await axios.post(`${UMAMI_BASE}/api/auth/login`, {
      username: USERNAME,
      password: PASSWORD
    });
    const token = authResponse.data.token;

    // 时间戳
    const now = Date.now();
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const yesterdayStart = todayStart - 86400000;
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime();

    // 获取统计数据
    const headers = { Authorization: `Bearer ${token}` };
    const baseUrl = `${UMAMI_BASE}/api/websites/${WEBSITE_ID}/stats`;

    const [todayStats, yesterdayStats, monthStats, yearStats] = await Promise.all([
      axios.get(`${baseUrl}?startAt=${todayStart}&endAt=${now}`, { headers }),
      axios.get(`${baseUrl}?startAt=${yesterdayStart}&endAt=${todayStart}`, { headers }),
      axios.get(`${baseUrl}?startAt=${monthStart}&endAt=${now}`, { headers }),
      axios.get(`${baseUrl}?startAt=${yearStart}&endAt=${now}`, { headers })
    ]);

    const stats = {
      today_uv: todayStats.data.visitors?.value || 0,
      today_pv: todayStats.data.pageviews?.value || 0,
      yesterday_uv: yesterdayStats.data.visitors?.value || 0,
      yesterday_pv: yesterdayStats.data.pageviews?.value || 0,
      month_pv: monthStats.data.pageviews?.value || 0,
      year_pv: yearStats.data.pageviews?.value || 0
    };

    // 更新缓存
    cache = stats;
    cacheTime = Date.now();

    res.json(stats);
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.status(500).json({ error: '获取统计数据失败' });
  }
});

app.listen(3001, () => {
  console.log('API服务运行在 http://localhost:3001');
});
```

## 🔒 CORS 配置

如果你的 API 和网站在不同域名下，需要配置 CORS。

### Nginx 配置

```nginx
server {
    listen 443 ssl;
    server_name umamiapi.example.com;

    location / {
        # CORS配置
        add_header Access-Control-Allow-Origin * always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        add_header Access-Control-Max-Age 86400 always;

        # 处理OPTIONS请求
        if ($request_method = OPTIONS) {
            return 204;
        }

        # 反向代理或PHP配置
        # ...
    }
}
```

### Apache 配置

```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
    Header set Access-Control-Max-Age "86400"
</IfModule>
```

## 🎯 最佳实践

### 1. 使用简单请求避免 OPTIONS 预检

主题默认使用"简单请求"方式调用 API，不会触发 OPTIONS 预检请求：

```javascript
// 不指定headers，让浏览器使用默认的简单请求
const response = await fetch(apiUrl);
```

这样可以避免复杂的 CORS 预检配置。

### 2. 启用缓存减少 API 调用

在 API 端建议启用缓存（如示例中的 10 分钟缓存），减少对 Umami 服务器的请求频率。

### 3. 保护 API 安全

如果你的 API 只允许特定域名访问，使用更严格的 CORS 配置：

```nginx
# 只允许你的博客域名访问
add_header Access-Control-Allow-Origin "https://blog.example.com" always;
```

### 4. 监控 API 性能

定期检查 API 响应时间和错误日志，确保统计数据能正常显示。

## 🐛 常见问题

### 1. 统计脚本不生效

**问题**：网站访问量没有被统计。

**解决方案**：
- 检查 `scriptUrl` 是否正确
- 检查 `websiteId` 是否正确
- 在浏览器开发者工具中查看 `script.js` 是否加载成功
- 检查 Umami 服务器是否正常运行

### 2. 数据页面显示"加载失败"

**问题**：数据页面无法获取统计数据。

**解决方案**：
- 检查 `apiUrl` 是否可访问
- 检查 CORS 配置是否正确
- 查看浏览器控制台的错误信息
- 检查 API 返回的数据格式是否正确

### 3. CORS 预检请求失败

**问题**：浏览器报错 `Response to preflight request doesn't pass access control check`。

**解决方案**：
- 确保 API 正确处理 OPTIONS 请求
- 在 PHP 中添加 OPTIONS 处理逻辑（参见示例）
- 或者使用简单请求方式（不添加自定义 headers）

### 4. 数据显示为 0

**问题**：所有数据都显示为 0。

**解决方案**：
- 检查 Umami 后台是否有数据
- 检查 API 的时间戳计算是否正确
- 检查 API 响应的数据格式
- 查看 API 服务器的错误日志

## 📚 相关资源

- [Umami 官方文档](https://umami.is/docs)
- [Umami GitHub 仓库](https://github.com/umami-software/umami)
- [Umami API 文档](https://umami.is/docs/api)
- [主题更新日志](../content/posts/Demius主题更新日志.md)
- [主题使用文档](../content/posts/demius主题使用文档.md)

## 💡 提示

- 统计脚本使用 `defer` 属性加载，不会阻塞页面渲染
- 数据页面使用骨架屏，提供更好的加载体验
- 所有统计数据都在前端显示，不会泄露敏感信息
- 支持 PJAX 无刷新切换，数据会自动重新加载

## 🎨 自定义样式

如果你想自定义数据页面的样式，可以修改 `themes/demius/assets/css/_data-page.css` 文件。

数据卡片使用 CSS 变量，可以轻松自定义颜色：

```css
/* 自定义数据卡片渐变色 */
.analytics-icon.today-uv {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.analytics-icon.today-pv {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* 更多自定义... */
```

## 📞 支持

如果遇到问题，可以：
1. 查看浏览器控制台的错误信息
2. 检查 Hugo 构建日志
3. 参考本文档的常见问题部分
4. 在主题仓库提交 Issue

---

**最后更新**: 2025-10-28  
**适用版本**: Demius v2.4.0+

