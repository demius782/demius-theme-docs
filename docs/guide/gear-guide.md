# 装备页面配置指南

本指南详细介绍如何在 Demius 主题中配置和使用装备页面功能。

---

## 📋 目录

- [功能特性](#功能特性)
- [快速开始](#快速开始)
- [数据配置](#数据配置)
- [使用示例](#使用示例)
- [常见问题](#常见问题)

---

## ✨ 功能特性

- ✅ **分组展示**：支持多个装备分组
- ✅ **图片展示**：大图展示装备外观
- ✅ **详细信息**：名称、描述、价格
- ✅ **购买链接**：支持多个电商平台
- ✅ **评论系统**：集成Artalk评论
- ✅ **响应式**：完美适配各种屏幕
- ✅ **暗色模式**：自动适配主题

---

## 🚀 快速开始

### 1. 数据文件配置

在 `data/gear.yaml` 中配置装备数据：

```yaml
groups:
  - name: "数码装备"
    description: "日常使用的数码产品"
    items:
      - name: "iPhone 15 Pro Max"
        image: "https://example.com/iphone.jpg"
        description: "A17 Pro 芯片，钛金属设计"
        price: "¥9999"
        links:
          - platform: "京东"
            url: "https://item.jd.com/xxx"
            icon: "🛒"
```

### 2. 重新构建

```bash
hugo server
```

### 3. 访问装备页面

访问 `http://localhost:1313/gear/`

---

## 📝 数据配置

### 文件结构

```yaml
groups:                          # 装备分组列表
  - name: "分组名称"              # 分组标题
    description: "分组描述"       # 分组简介（可选）
    items:                       # 该分组的装备列表
      - name: "装备名称"          # 必填
        image: "图片URL"          # 必填
        description: "装备描述"   # 可选
        price: "价格"            # 可选
        links:                   # 购买链接列表（可选）
          - platform: "平台名"   # 链接平台
            url: "链接地址"      # 跳转URL
            icon: "图标"         # emoji或文字
```

### 完整配置示例

```yaml
groups:
  # 第一组：数码装备
  - name: "数码装备"
    description: "日常使用的数码产品"
    items:
      - name: "iPhone 15 Pro Max"
        image: "https://example.com/iphone.jpg"
        description: "A17 Pro 芯片，钛金属设计，超强性能"
        price: "¥9999"
        links:
          - platform: "京东"
            url: "https://item.jd.com/example1"
            icon: "🛒"
          - platform: "淘宝"
            url: "https://item.taobao.com/example1"
            icon: "🛍️"
          - platform: "天猫"
            url: "https://detail.tmall.com/example1"
            icon: "🐱"
      
      - name: "MacBook Pro 14"
        image: "https://example.com/macbook.jpg"
        description: "M3 Pro 芯片，14.2 英寸 Liquid Retina XDR 显示屏"
        price: "¥15999"
        links:
          - platform: "Apple 官网"
            url: "https://www.apple.com.cn/macbook-pro"
            icon: "🍎"
          - platform: "京东"
            url: "https://item.jd.com/example2"
            icon: "🛒"
  
  # 第二组：外设装备
  - name: "外设装备"
    description: "提升工作效率的外设产品"
    items:
      - name: "罗技 MX Master 3S"
        image: "https://example.com/mouse.jpg"
        description: "人体工学设计，8K DPI 传感器，静音按键"
        price: "¥799"
        links:
          - platform: "京东"
            url: "https://item.jd.com/example3"
            icon: "🛒"
          - platform: "天猫"
            url: "https://detail.tmall.com/example3"
            icon: "🐱"
      
      - name: "HHKB Type-S"
        image: "https://example.com/keyboard.jpg"
        description: "静电容键盘，静音版本，程序员最爱"
        price: "¥2499"
        links:
          - platform: "京东"
            url: "https://item.jd.com/example4"
            icon: "🛒"
```

### 参数说明

#### **groups** (数组)
- **说明：** 装备分组列表
- **必填：** ✅

#### **name** (字符串)
- **说明：** 分组名称或装备名称
- **必填：** ✅
- **示例：** `"数码装备"`, `"iPhone 15 Pro"`

#### **description** (字符串)
- **说明：** 分组描述或装备详情
- **必填：** ⭕
- **建议长度：** 10-50字

#### **image** (字符串)
- **说明：** 装备图片 URL
- **必填：** ✅ (装备项)
- **建议尺寸：** 300×200px 或 更高
- **格式：** JPG/PNG/WebP

#### **price** (字符串)
- **说明：** 装备价格
- **必填：** ⭕
- **格式：** 自由格式（如 `"¥9999"`, `"$999"`）

#### **links** (数组)
- **说明：** 购买链接列表
- **必填：** ⭕
- **参数：**
  - `platform`: 平台名称
  - `url`: 跳转链接
  - `icon`: 图标(emoji/文字)

---

## 🎨 使用示例

### 示例一：最小配置

```yaml
groups:
  - name: "我的设备"
    items:
      - name: "iPhone"
        image: "https://example.com/iphone.jpg"
```

**说明：** 只包含必填字段

---

### 示例二：带价格和链接

```yaml
groups:
  - name: "数码产品"
    description: "我在用的设备"
    items:
      - name: "iPad Pro"
        image: "https://example.com/ipad.jpg"
        description: "M2 芯片，生产力工具"
        price: "¥6999"
        links:
          - platform: "Apple"
            url: "https://apple.com/ipad"
            icon: "🍎"
```

---

### 示例三：多分组多装备

```yaml
groups:
  # 工作设备
  - name: "工作设备"
    description: "日常工作使用"
    items:
      - name: "MacBook Pro"
        image: "/img/macbook.jpg"
        price: "¥15999"
        links:
          - platform: "官网"
            url: "https://apple.com"
            icon: "🍎"
      
      - name: "显示器"
        image: "/img/monitor.jpg"
        price: "¥2999"
        links:
          - platform: "京东"
            url: "https://jd.com/xxx"
            icon: "🛒"
  
  # 娱乐设备
  - name: "娱乐设备"
    description: "游戏和影音"
    items:
      - name: "PS5"
        image: "/img/ps5.jpg"
        price: "¥3999"
        links:
          - platform: "京东"
            url: "https://jd.com/xxx"
            icon: "🎮"
```

---

### 示例四：无价格装备

```yaml
groups:
  - name: "收藏品"
    items:
      - name: "限量版机械键盘"
        image: "/img/keyboard.jpg"
        description: "珍贵的收藏品"
        # 不填写 price，则不显示价格标签
        links:
          - platform: "官网"
            url: "https://example.com"
            icon: "🔗"
```

---

### 示例五：只有一个购买链接

```yaml
groups:
  - name: "软件工具"
    items:
      - name: "Notion"
        image: "/img/notion.jpg"
        description: "笔记和协作工具"
        price: "$10/月"
        links:
          - platform: "官网"
            url: "https://notion.so"
            icon: ""  # 可以留空
```

---

## 🎯 图片建议

### 规格建议

**尺寸：**
- 推荐：300×200px (3:2比例)
- 最小：200×133px
- 最大：不超过800px宽度

**格式：**
- JPG（压缩到 < 100KB）
- WebP（更小体积）
- PNG（透明背景）

**内容：**
- ✅ 产品正面清晰图
- ✅ 白底或纯色背景
- ❌ 避免过多文字
- ❌ 避免过度PS

### 图片来源

1. **官方网站**
   - 产品页面
   - 新闻稿图片
   - 高清素材库

2. **电商平台**
   - 京东商品图
   - 淘宝详情页
   - 天猫产品图

3. **自行拍摄**
   - 使用高质量相机
   - 充足光线
   - 简洁背景

4. **图床托管**
   - 使用CDN加速
   - 稳定可靠
   - 避免失效

---

## 🛒 购买链接配置

### 常用平台图标

```yaml
# 电商平台
- platform: "京东"
  icon: "🛒"

- platform: "淘宝"
  icon: "🛍️"

- platform: "天猫"
  icon: "🐱"

- platform: "拼多多"
  icon: "🎁"

# 品牌官网
- platform: "Apple"
  icon: "🍎"

- platform: "官网"
  icon: "🔗"

# 其他
- platform: "Amazon"
  icon: "📦"

- platform: "闲鱼"
  icon: "🐟"
```

### 渐变色按钮

购买按钮自动按顺序分配5种渐变色：

1. 紫蓝渐变
2. 粉红渐变
3. 蓝青渐变
4. 绿青渐变
5. 粉黄渐变

---

## 📱 响应式布局

### 桌面端 (> 768px)

- 3列网格布局
- 卡片间距 1.5rem
- 图片高度 200px

### 平板端 (481-768px)

- 1列网格布局
- 卡片间距 1.2rem
- 图片高度 180px

### 移动端 (< 480px)

- 1列网格布局
- 卡片间距 1rem
- 图片高度 160px

---

## 🌙 暗色模式

### 自动适配

- 卡片背景变深
- 文字颜色反转
- 图片亮度调整
- 按钮颜色保持

### 无需额外配置

暗色模式下所有样式自动适配

---

## 💬 评论系统

### 启用评论

装备页面自动集成评论系统（如果全局启用）

**配置：**
```toml
[params.comment]
  enable = true
  system = "artalk"
```

详见：[评论系统配置指南](umami-analytics-guide.md)

---

## 🔧 高级定制

### 修改卡片布局

```css
.gear-grid {
  grid-template-columns: repeat(4, 1fr);  /* 4列 */
  gap: 2rem;  /* 更大间距 */
}
```

### 修改图片高度

```css
.gear-image-wrapper {
  height: 250px;  /* 默认200px */
}
```

### 修改价格标签位置

```css
.gear-price-tag {
  top: auto;
  bottom: 0.8rem;  /* 移到底部 */
}
```

---

## 🔍 常见问题

### Q1: 装备页面不显示？

**检查：**
1. ✅ `content/gear.md` 文件存在
2. ✅ `data/gear.yaml` 文件存在
3. ✅ YAML 格式正确
4. ✅ 导航菜单配置正确

### Q2: 图片不显示？

**原因：**
- 图片链接失效
- 跨域问题
- 路径错误

**解决：**
1. 使用稳定CDN
2. 本地图片放在 `static/img/`
3. 检查URL格式

### Q3: 如何隐藏价格？

**方法：** 不填写 `price` 字段

```yaml
- name: "装备名"
  image: "..."
  description: "..."
  # price: ""  # 注释掉或删除
```

### Q4: 购买链接打不开？

**检查：**
1. ✅ URL 包含 `http://` 或 `https://`
2. ✅ URL 格式正确
3. ✅ 链接未失效

### Q5: 如何添加新装备？

在 `data/gear.yaml` 中添加：

```yaml
groups:
  - name: "现有分组"
    items:
      # ... 现有装备 ...
      
      # 新增装备
      - name: "新装备"
        image: "..."
        description: "..."
        price: "..."
```

### Q6: 如何新增分组？

```yaml
groups:
  # ... 现有分组 ...
  
  # 新分组
  - name: "新分组名称"
    description: "分组描述"
    items:
      - name: "..."
        image: "..."
```

### Q7: 装备顺序如何调整？

**说明：** 按照 YAML 文件中的顺序显示

**调整：** 直接在文件中调整顺序

---

## 🎯 最佳实践

### 1. 分组原则

**按类型分组：**
- 数码装备
- 外设装备
- 生活用品
- 办公用品

**按用途分组：**
- 工作设备
- 娱乐设备
- 学习工具
- 健身器材

**按场景分组：**
- 桌面设置
- 移动装备
- 户外装备

### 2. 图片优化

- 使用 WebP 格式
- 压缩到合理大小
- 统一尺寸比例
- 使用 CDN 托管

### 3. 内容撰写

**名称：**
- 简洁明确
- 包含品牌型号
- 3-20字

**描述：**
- 突出特点
- 简明扼要
- 10-50字

**价格：**
- 准确标注
- 及时更新
- 可加币种

### 4. 链接管理

- 使用短链接
- 定期检查有效性
- 优先选择稳定平台
- 考虑添加返利链接

---

## 📊 功能对比

| 功能 | 支持 | 说明 |
|------|------|------|
| 分组展示 | ✅ | 无限分组 |
| 图片展示 | ✅ | 响应式图片 |
| 价格显示 | ✅ | 可选显示 |
| 购买链接 | ✅ | 多平台支持 |
| 评论系统 | ✅ | 自动集成 |
| 响应式 | ✅ | 完美适配 |
| 暗色模式 | ✅ | 自动适配 |
| 搜索功能 | ❌ | 暂不支持 |
| 筛选功能 | ❌ | 暂不支持 |

---

## 🔄 更新日志

### v1.0.0 (2025-10-24)
- ✨ 支持分组展示
- ✅ 图片、名称、描述、价格
- ✅ 多平台购买链接
- ✅ 集成评论系统
- ✅ 响应式设计
- ✅ 暗色模式适配

---

**祝使用愉快！** 🎉

