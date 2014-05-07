---
layout: post
title:  "机器学习之logistic回归"
date:   2014-01-11 22:56
categories: blog ML
---


logistic回归是一种做分类而不是做回归的方法，该方法是在线性回归的基础上借助sigmoid函数实现的分类器，是一种属于概率统计的分类模型。该方法多用于解决二值分类问题，比如广告点击预测、病人是否患病等。本文将对该方法进行介绍。

## 介绍

该方法与线性回归有很多相似之处，有些概念可以参考之前关于[线性回归的文章](../ji-qi-xue-xi-zhi-xian-xing-hui-gui.html)。

### 假设模型

线性回归的假设模型用 $h(x)$ 表示：

$$ h(x) = \sum_{i=0}^{n}{\theta_i x_i} = \theta^T x $$

其中 $\theta$ 称为参数或权重， $x$ 为输入或特征，$n$ 为特征个数（不包括$x_0$）

该函数的结果取值范围变化很大，可以拟合各种回归问题，而对于分类问题，我们希望得到的结果在一个固定不变动区间范围内，以便我们据此来设定阈值实现分类的判断，sigmoid函数正是这样一种能够使结果在0～1之间的一种函数，sigmoid的函数表示如下

$$ g(z) = \frac{1}{1+e^{-z}}$$

该函数的形状如图所示![sigmoid](/images/MachineLearning/LogisticRegression/sigmoid.png)

将上述两个函数结合就得到了logistic回归的假设模型 $h(x)$ 

$$ h(x) = g(\theta^T x ) =  \frac{1}{1+e^{-\theta^T x }}$$

对于该假设模型的解释为：对于输入$x$，$h(x)$ 为在$\theta$条件下，分类输出为1的概率，数学表示如下

$$ h(x) = P(y=1 | x; \theta) $$

### 优化目标
logistic回归的优化目标是使cost function最小，其中cost function 用 $J(\theta)$ 表示， 为

$$ J(\theta) = \sum_{1}^{n}y^{i}log(h(x^{i})) +(1-y^{i})log(1-h(x^{i})) $$

### 算法

上述的cost function为凸函数，可以使用梯度下降法来找到最小值。计算上述cost function 偏导数为

$$ \frac{\partial}{\partial \theta_j} J(\theta) = (h_\theta (x)-y)x_j$$

使用梯度下降法的更新规则为：

因此对于一个训练样本，更新规则为：

$$\theta_j := \theta_j + \alpha(y^{(i)} - h_\theta (x^{(i)})) x_j ^{(i)} $$

对比发现这和线性回归的形式一模一样，但其实这并不是相同的算法，因为不同于线性回归，logistic 回归的$h(x)$是 $\theta^T x$ 的非线性函数。

对于小数据量可以采取批梯度下降找到全局最优解，对于大数据量而言可以采取随机梯度下降算法来提高算法性能，通过改变学习速度等方法得到近似全局最优解。

## 其它

### 决策边界
logistic 回归的假设模型在$\theta^Tx$后加入了一层sigmoid函数，此时$\theta^Tx$不作为直接输出而是作为决策边界，对于线性的$\theta^Tx$决策边界为一条直线，直线两侧分为两类，对于非线性的$\theta^Tx$，决策边界则为非线性的。

### 多类问题
对于多个类别的分类问题，可以采取one－vs－rest的方法，训练时对每一类得到一个假设模型，对于新的输入，计算每一个假设模型，将其中概率最大的那个假设模型对应的类作为该输入的分类。


## 参考

+ [stanford machine learning cs229](http://cs229.stanford.edu/)
+ [Coursera: machine learning by Andrew Ng](https://www.coursera.org/course/ml)

