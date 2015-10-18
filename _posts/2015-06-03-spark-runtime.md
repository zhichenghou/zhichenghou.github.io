---
layout: post
title:  "Spark 运行时支持"
date:   2015-06-03 10:00
categories: blog Spark
---


Spark 可以运行于单机模式和集群模式，集群模式中可以运行在hadoop yarn和Mesos上，但无论运行在何种模式下，其逻辑架构相同，如下图所示：

![4.1](/images/Spark/4.1.png)

Spark通过Netty实现网络通信，Worker端使用线程池进行并行计算，这与多数分布式计算应用类似，但是其中数据如何通过ShuffleDependency在stage间传递是值得关注的部分，本章将重点介绍Spark运行时数据shuffle的相关内容。Spark 的Shuffle分为Shuffle Write 和 Shuffle Read 两个部分，其中shuffle write 实现数据的划分和持久化，而shuffle read 则读入数据并aggregate 数据。## Shuffle Write
由于不要求数据有序，shuffle write的任务很简单：将数据 partition 好，并持久化。之所以要持久化，一方面是要减少内存存储空间压力，另一方面也是为了 fault-tolerance。Shuffle write的实现也很简单：将 shuffle write的处理逻辑加入到ShuffleMapStage （ShuffleMapTask所在的 stage） 的最后，该 stage 的 final RDD 每输出一个 record 就将其 partition 并持久化。如下图所示：

![4.2](/images/Spark/4.2.png)
上图有 4 个 ShuffleMapTask要在同一个 worker node 上运行，CPU core 数为 2，可以同时运行两个 task。每个 task的执行结果（该 stage 的 finalRDD 中某个 partition 包含的 records）被逐一写到本地磁盘上。每个 task 包含 R 个缓冲区，R = reducer 个数（也就是下一个 stage 中 task 的个数），缓冲区被称为 bucket。
ShuffleMapTask的执行过程很简单：先利用 pipeline计算得到finalRDD中对应 partition 的 records。每得到一个 record就将其送到对应的 bucket 里，具体是哪个 bucket 由partitioner.partition(record.getKey()))决定。每个 bucket里面的数据会不断被写到本地磁盘上，形成一个ShuffleBlockFile或者简称 FileSegment。之后的 reducer 会去 fetch 属于自己的 FileSegment，进入 shuffle read 阶段。
## Shuffle Read
要计算ShuffleRDD中的数据，必须先把前一个RDD中的数据fetch过来，这就是shuffle read。为了满足stage 的概念，fetch发生在parent stage中全部ShuffleMapTask中执行完成后才开始，而且在划分stage时会将该stage 的final RDD注册到MapOutputTrackerMaster来指示ShuffleMapTask输出数据的位置，shuffle read 时会询问该位置进行数据的fetch。Shuffle read过程中数据是边fetch边处理的，会根据不同的操作有不同的处理逻辑实现，处理后的结果会保存在内存或磁盘上，比例可以由用户配置。
## 小结
本章介绍Spark的运行时支持，给出了架构图和集群中各角色的作用，并重点介绍了任务执行过程中数据在不同机器之间的流转，即Shuffle。分别介绍Shuffle Write 和Shuffle Read 两部分，了解了数据的分区、持久化以及fetch的过程这整个数据的流向。## 参考
[Spark code](https://github.com/apache/spark)

[Spark internal](https://github.com/JerryLead/SparkInternals)