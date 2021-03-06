# HiveServer 2 And Clients

## 简介

- HiveServer2(HS2) 是一个服务器接口,使远程客户端对 hive 执行查询和检索结果。基于节俭RPC,当前的实现是一种改进的版本 HiveServer 和支持多客户端并发性和身份验证

## 一、Setting Up HiveServer2

启动 HiveServer2

- https://cwiki.apache.org/confluence/display/Hive/Setting+Up+HiveServer2

### 1、 Authentication/Security Configuration  认证/安全配置

- HiveServer2支持匿名(没有验证)和没有SASL,Kerberos(GSSAPI),通过LDAP,可插入自定义的身份验证和可插入身份验证模块(PAM,支持蜂巢0.13开始)。



## 二、HiveServer2 Clients

### 1. 配置说明

``` conf
hive.server2.transport.mode          – 默认值为binary（TCP），可选值HTTP。  
hive.server2.thrift.http.port        – HTTP的监听端口，默认值为10001。  
hive.server2.thrift.http.path        – 服务的端点名称，默认为 cliservice。  
hive.server2.thrift.http.min.worker.threads     – 服务池中的最小工作线程，默认为5。  
hive.server2.thrift.http.max.worker.threads     – 服务池中的最大工作线程，默认为500。
```


### 2. beeline 客户端连接 HiveServer2

- https://cwiki.apache.org/confluence/display/Hive/HiveServer2+Clients

``` sh
1. tcp 默认方式
beeline -u jdbc:hive2://hostname:10000/default -nhadoop -phadoop

2. http 方式
!connect jdbc:hive2://hostname:10000/default?hive.server2.transport.mode=http;hive.server2.thrift.http.path=cliservice
```


## 三、命令

``` sh
1、重启 hive-server2
    sudo service hive-server2 restart

  脚本启动
    ps -aux | grep hiveserver2
    kill -15 删除进程号
    sudo nohup nice -n 0 /opt/cloudera/parcels/CDH/bin/hive --service hiveserver2 10000 >> /tmp/hiver-server2.log 2>&1 &

2、重启元数据
  sudo service hive-metastore restart


3、hive debug 模式
  hive --hiveconf  hive.root.logger=DEBUG,console

```
