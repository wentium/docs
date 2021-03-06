# 数据部，申请服务器资源

## 申请原因

### 一、数据增长

#### 1. 数据增长

2016-05 数据部共 2.5 T 数据量, 集群本身 2.9 T 存储能力, 目前存储达到 80+ %, 为了更好支持业务发展,需要对 Hadoop 集群数据存储能力进行扩充

#### 2. 扩充节点数量、扩充后可持续时间

- 根据数据增长趋势, 需要升级 6 个存储节点 6 x 1200 G, 集群容量扩容到 7 T 左右

- 预计可支持业务到 201701 月份, 月增长 600G

| Date | HDFS |
| --- | --- |
| 201604 | 1919 G |
| 201605 | 2488 G |
| 201606 | 3119 G |
| 201607 | 3719 G |
| 201608 | 4319 G |
| 201609 | 4919 G |
| 201610 | 5519 G |
| 201611 | 6119 G |
| 201612 | 6719 G |


## 现状以及申请机器类型

### 一、现状

- [服务器现状](service/dw-server/dw-servers.md)

- 计划下掉的 data 节点, 共 2988

| 配置 | host_name | IP | 价格 |
| --- | --- | --- | --- |
| 2核,内存:6G,系统盘:20G,数据盘:600G | uhadoop-ociicy-core1 | 10.10.33.175 | 498 |
| 2核,内存:6G,系统盘:20G,数据盘:600G | uhadoop-ociicy-core2 | 10.10.7.68 | 498 |
| 2核,内存:6G,系统盘:20G,数据盘:600G | uhadoop-ociicy-core3 | 10.10.43.97 | 498 |
| 2核,内存:6G,系统盘:20G,数据盘:600G | uhadoop-ociicy-core4 | 10.10.240.22 | 498 |
| 2核,内存:6G,系统盘:20G,数据盘:600G | uhadoop-ociicy-core6 | 10.10.222.21 | 498 |
| 2核,内存:6G,系统盘:20G,数据盘:600G | uhadoop-ociicy-core7 | 10.10.59.5 | 498 |


### 二、计划升级的 6 台 data 节点

- 共 5988

| 配置 | 台数 | 单价 |
| --- | --- | --- |
| 4 核, 内存: 12G, 系统盘:20G, 数据盘: 1200G |	1 | 998 |
| 4 核, 内存: 12G, 系统盘:20G, 数据盘: 1200G |	1 | 998 |
| 4 核, 内存: 12G, 系统盘:20G, 数据盘: 1200G |	1 | 998 |
| 4 核, 内存: 12G, 系统盘:20G, 数据盘: 1200G |	1 | 998 |
| 4 核, 内存: 12G, 系统盘:20G, 数据盘: 1200G |	1 | 998 |
| 4 核, 内存: 12G, 系统盘:20G, 数据盘: 1200G |	1 | 998 |


### 三、升级用到的费用

- 6 月份会多支出 5988 元, 6 月份会把旧的 data 节点下掉
- 7 月份开始每个月会多出 5988 - 2988 = 3000 的支出
- 7 月份 hadoop 集群, 升级完成后的总支出是 9592, 原来是 (6592)
  - master 1208
  - data 5988
  - task 2396
