---
layout: post
title:  "Spark 概述"
date:   2015-05-03 10:00
categories: blog Spark
---


## 介绍Spark 是一个快速通用的大规模数据处理引擎，最初由加州大学Berkeley 分校的AMPLab所开发，目前是Apache开源项目，由开源社区和Databricks公司维护，主要由Scala开发，提供Scala、Java和Python API。
相比于Hadoop MapReduce将每次计算结果保存至硬盘，Spark可以方便的将结果保存在内存中，能够更好的利用内存计算速度优势，可以获得比MapReduce 数十倍的速度优势。因此，Spark更加适合于需要对中间结果多次使用的迭代运算场景，如机器学习等领域。
Spark 中主要由三个部分组成：RDD、DAG和运行时支持。RDD(Resilient Distributed Datasets，弹性分布式数据集)是Spark中对内存模型的抽象，用来描述用户数据并支持用户的数据操作。DAG(Directed acyclic graph，有向无环图)是Spark的任务执行描述，任务规划器根据目标RDD来生成一个由Stage构成的DAG，该DAG描述了Stage间的依赖关系以及Stage内的并行策略。运行时支持则使生成的DAG计划能够在分布式环境中物理执行，解决计算资源协调，数据网络传输等工作。借由这三个部分，用户基于RDD编写程序，由任务调度器生成执行DAG，并将此DAG在分布式环境中执行最终取得结果。
下面将首先给出一个例子来快速了解整个工作流程，然后再分别对RDD、DAG和运行时支持三个部分进行讨论。
## 例子
### GroupByTest
GroupByTest 是Spark中自带的一个例子，该例子要实现的逻辑如下图所示：

![1.1](/images/Spark/1.1.png)
例子源码如下：

```object GroupByTest {  def main(args: Array[String]) {    val sparkConf = new SparkConf().setAppName("GroupBy Test")    var numMappers = 100    var numKVPairs = 10000    var valSize = 1000    var numReducers = 36        val sc = new SparkContext(sparkConf)    val pairs1 = sc.parallelize(0 until numMappers, numMappers).flatMap { p =>      val ranGen = new Random      var arr1 = new Array[(Int, Array[Byte])](numKVPairs)      for (i <- 0 until numKVPairs) {        val byteArr = new Array[Byte](valSize)        ranGen.nextBytes(byteArr)        arr1(i) = (ranGen.nextInt(Int.MaxValue), byteArr)      }      arr1    }.cache()    // Enforce that everything has been calculated and in cache    pairs1.count()    val resultRDD = pairs1.groupByKey(numReducers)    println(resultRDD.count())    sc.stop()  }}

```代码流程如下：
1.	初始化sparkConf2.	初始化 sparkContext，这一步确定了程序作为driver的地位3.	生成pairs1，pairs1包含 numMappers个arr1: Array[(Int, Byte[])]，length 为 numKVPairs，每一个 Byte[] 的 length 为 valSize，Int 为随机生成的整数。4.	将生成的pairs1 cache到内存中5.	执行操作count，统计元素个数6.	执行groupByKey操作，这将产生numReducers个reducer，r educer 将收到的 <Int, Byte[]> records 中拥有相同 Int 的 records 聚在一起，得到 <Int, list(Byte[], Byte[], ..., Byte[])>7.	对groupBy结果进行count，得到pairs1中不同int的总个数8.	关闭sparkContext，应用程序运行结束

### RDD关系图
groupBy后的resultRDD的依赖关系如下所示：

```MapPartitionsRDD[3] at groupByKey at GroupByTest.scala:51 (36 partitions)  ShuffledRDD[2] at groupByKey at GroupByTest.scala:51 (36 partitions)    FlatMappedRDD[1] at flatMap at GroupByTest.scala:38 (100 partitions)      ParallelCollectionRDD[0] at parallelize at GroupByTest.scala:38 (100 partitions)```用图表示如下：

![1.2](/images/Spark/1.2.png)
每个RDD的生成流程如下：
1.	ParallelCollectionRDD 由 sc.parallelize(0 until numMappers, numMappers) 生成，每个partition包括一个整数i2.	FlatMappedRDD 由flatMap操作生成，对每个partition生成 Array[(Int, Array[Byte])]3.	ShuffledRDD 由groupByKey操作生成，将100个partition中的元素按照key hash分布到36个ShuffledRDD 中，该步结果为系统自动产生的中间结果，用户不能访问到4.	MapPartitionsRDD由groupByKey操作生成，对每个ShuffledRDD进行聚合操作，得到用户想要的结果
RDD支持两类操作：transformations 和 actions。 transformations类操作将会得到一个新的RDD，该类操作是lazy的，并不会触发计算，只是保存操作以及关系；而actions类操作将执行RDD的计算并将结果返回给driver 程序。以上的RDD均由transformations类操作得到，而count操作是actions类操作，将会触发RDD计算，在每个partition进行count操作后再返回driver程序进行sum，得到用户期望结果。
### DAG执行图
对于该任务，以上得到了RDD的依赖关系图，Spark的任务规划器将根据此来生成DAG执行图，如下所示：

![1.3](/images/Spark/1.3.png)
Spark的物理执行包括job、stage和task几个层次的概念。其中 job可以包含一到多个stage，stage中可以包含一到多个task。
在该应用中，由于调用了两次count计算，产生了两个job，第一个由pairs1.count触发产生，对于此job分析如下：
-	整个job只包含1个stage-	ResultStage 包含100个ResultTask-	每个task 先计算flatMap，产生FlatMappedRDD，然后执行count，统计每个partition中的records个数-	由于pairs1 被cache，则task计算得到的FlatMappedRDD后会将其包含的partitions都cache到executor的内存中-	全部task执行完成后，driver收集每个task的执行结果，进行sum-	job 0 结束
第二个job由resultRDD.count触发生成，该job分析如下：
-	整个job包含2个stage-	ShuffleMapStage包含100个ShuffleMapTask，每个task负责从cache中读取pairs1的一部分数据并将其partition，将partition结果写入磁盘-	ResultStage 包含36个ResultTask，每个task首先shuffle自己要处理的数据，边 fetch 数据边进行 aggregate 以及后续的 mapPartitions() 操作，最后进行 count() 计算得到 result-	task执行完成后，driver收集每个task的执行结果，进行sum-	job 1 结束
### 运行时支持
Spark集群的部署图如下所示：

![1.4](/images/Spark/1.4.png)
整个集群分为 Master 节点和 Worker 节点。Master 节点上常驻 Master 守护进程，负责管理全部的 Worker 节点。Worker 节点上常驻 Worker 守护进程，负责与 Master 节点通信并管理 executors。Driver 用来连接spark 集群并运行用户写的 Spark 程序（application），可以运行于master节点或worker节点，也可以运行于用户自己的PC上。
## 小结
GroupByTest是一个数据处理的应用，通过分析源码了解了driver 程序对相应逻辑的spark 实现方式，通过分析生成的RDD了解了Spark的逻辑执行计划，通过分析DAG图了解了Spark的物理执行计划，最后通过部署架构图，了解了集群中各机器的角色以及Spark运行任务的方式。

## 参考
[Spark code](https://github.com/apache/spark)

[Spark internal](https://github.com/JerryLead/SparkInternals)