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
- 王权与历史行动者：actor.传统.名称
- 异兽：being.传统.名称
- 原创纪事：chronicle.setting.名称
- 设定门：gate.setting.名称
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

### memory_state

记忆状态用于神座、回响和静默条目：

- active：明座，来源、关系和显身条件稳定；
- veiled：隐座，材料存续但实践或语言联系已断；
- dormant：眠座，锚点不足以稳定显身；
- echo：残响，身份尚未确认；
- false-awakening：误醒，由伪证、错译或无语境拼接形成。

完整定义见 [人类、记忆与复苏](./humans-memory-and-revival.md)。

### gate_status

门与通道可使用 `trace`、`open`、`contested`、`sealed`、`dormant` 或 `closed`，并在正文说明状态变化的事件和日期。

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

## 原创纪事条目

原创纪事不应伪装成传统神话事件。最小条目头如下：

~~~yaml
---
id: chronicle.setting.slug
type: chronicle
name_zh:
canon_layer: setting
source_status: sourced
setting_status: established
gate_status: closed
participants: []
permanent_changes: []
---
~~~

`source_status` 只说明事件所借用的身份、权柄和缺口已有来源锚点，不声称纪事本身是历史材料。

每篇纪事必须显式列出：触发事件、来源锚点、参与者、冲突规则、各方所护、处置过程、代价、永久变化和设定层声明。

## 设定层操作契约

一个可作为行动者的条目，设定层应尽可能说明：

- 如何显身；
- 在共殿内能主动做什么；
- 行动需要什么条件和属地；
- 越界或维持行动会付出什么代价；
- 当前有哪些未决关系可能推动新纪事。
