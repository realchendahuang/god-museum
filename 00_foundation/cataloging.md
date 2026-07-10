# 编目协议

本协议让 Markdown 条目既适合阅读，也能在未来被网站、数据库或关系图直接消费。

## ID

所有条目使用稳定、全小写的 ASCII ID：

- 神明：deity.传统.名称
- 大殿：hall.序号.名称
- 文明：tradition.名称
- 关系：relation.来源.目标.类型
- 神话事件：myth.传统.名称
- 圣物：relic.传统.名称
- 英雄：hero.传统.名称
- 异兽：being.传统.名称
- 来源：source.作者或传统.作品.定位

文件可以改名，ID 一旦公开引用便不随文件名变化。

## 条目头

每个正式条目使用 YAML front matter。神明条目的最小字段如下：

~~~yaml
---
id: deity.norse.thor
type: deity
name_zh: 索尔
name_native: Þórr
tradition: tradition.norse
primary_halls:
  - hall.04.thunder-wind-rain-fire
secondary_halls:
  - hall.08.war-victory-guardianship
source_status: sourced
setting_status: established
---
~~~

## 状态

### source_status

- sourced：关键陈述已有明确来源；
- partial：只有部分陈述有来源；
- disputed：材料或研究存在实质争议；
- fragmentary：仅存残片、名字或间接证据；
- unsourced：不得作为正式档案发布。

### setting_status

- established：已进入 God-Museum 设定正典；
- proposed：可讨论但尚未进入正典；
- none：只有原典与整理内容，没有原创设定。

## 陈述置信状态

正文需要时可使用：

- 确认：来源直接支持；
- 高可信：多份材料或主流研究共同支持；
- 解释：合理但不是材料原话；
- 争议：存在相互竞争的解释；
- 原创：God-Museum 设定。

## 引用

引用至少包含：

1. 作品或材料名；
2. 具体卷、章、歌、行或条目；
3. 版本或译者；
4. 可访问链接或书目信息；
5. 该来源实际支持的陈述。

来源的完整信息进入 [来源目录](../99_sources/README.md)，条目正文使用稳定来源 ID 引用。
