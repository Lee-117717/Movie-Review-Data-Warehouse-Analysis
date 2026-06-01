# 电影影评数据仓库离线分析系统

## 项目简介
本项目是《数据仓库离线分析实践》课程设计，基于 **Hadoop+Hive+MySQL+Spring Boot+Vue+ECharts** 技术栈，实现了一套完整的电影影评大数据离线分析系统。
项目完整覆盖了**集群搭建、数据仓库建模、ETL处理、多维分析与可视化大屏展示**全流程。

## 技术栈
- 大数据平台：Hadoop、Hive、Sqoop
- 后端：Java Spring Boot
- 前端：Vue3、ECharts
- 数据库：MySQL
- 运行环境：CentOS 7.9、VMware

## 项目功能
- 大数据集群搭建（HDFS/YARN/Hive）
- 数据仓库设计：四层数仓（ODS/DWD/DWS/ADS）+ 星型模型
- 数据ETL：清洗、聚合、数据同步
- 多维分析：电影评分TOP20、类型分布、用户画像、观影行为分析
- 可视化大屏：6类核心图表展示分析结果

## 项目结构
- `MovieAnalysisBackend/`：Spring Boot 后端接口代码
- `web-visual/`：Vue 可视化大屏前端代码
- `docs/`：课程设计报告、项目文档
- `screenshots/`：系统运行截图、可视化图表、集群截图
- `README.md`：项目说明文档

## 运行步骤
1.  在 CentOS 7.9 环境中部署 Hadoop+Hive 集群
2.  执行 Hive 建表语句，完成数据仓库分层与数据加载
3.  运行ETL脚本，完成数据清洗、聚合与分析计算
4.  通过Sqoop将分析结果同步至MySQL数据库
5.  启动 Spring Boot 后端服务
6.  启动 Vue 前端项目，访问可视化大屏

## 项目亮点
✅ 完整的大数据离线分析项目，可直接用于求职展示
✅ 企业级数据仓库分层设计与星型模型建模
✅ 前后端分离架构，实现专业的可视化大屏
✅ 覆盖从数据采集、存储、分析到可视化的完整大数据处理流程