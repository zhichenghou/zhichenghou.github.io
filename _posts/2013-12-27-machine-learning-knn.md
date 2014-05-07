---
layout: post
title:  "机器学习之K最近邻分类"
date:   2013-12-27 21:20
categories: ML
---


K最近邻 (k-nearest neighbors, KNN) 是最简单的机器学习算法。该方法的思路是：如果一个样本在特征空间中的k个最相似(即特征空间中最邻近)的样本中的大多数属于某一个类别，则该样本也属于这个类别。是一种借由计算与已知类别样本之相似度，来评估未知类别样本可能分类的方法。本文将给出KNN的方法简介和KNN的python代码实现，最后通过一个识别手写数字的具体实例来实际使用knn方法。

## 介绍

KNN是一种成熟而简单的分类算法，KNN方法的思路是：如果一个样本在特征空间中的k个最相似(即特征空间中最邻近)的样本中的大多数属于某一个类别，则该样本也属于这个类别。由该方法的思路描述可知，要使用该方法需要明确以下几点：

* **样本的特征表示**： 如何在特征空间内表示一个样本，并且能够通过该表示区分不同的样本，例如可以用点的x-y坐标作为二维空间内点的特征表示。对于一个样本可能有多种特征表示，通常好的特征表示是能够实现区分不同样本的最简表示。
* **相似度评价**： 该方法需要知道与目标样本最相似的k个样本，而如何度量不同样本之间的相似程度是首要解决的问题，可以定义距离来量化这种相似程度。例如在二维空间内两点之间的欧式距离可以来量化两点的相似度，在多维空间中，与欧式距离类似的二范数是通常的选择。
* **k 参数的选取**： k参数对KNN算法的计算复杂度和分类效果都有影响，当k为1时，目标样本的分类只和距离最近的样本有关，计算时只需遍历一次已知样本找到最近的样本就可以了，而不需对已知样本进行距离排序，优点是计算复杂度小，缺点是容易受噪声影响造成误判；当k大于1时，目标样本的分类则需要由距离最近的k个样本共同决定，需要对已知样本进行距离排序，计算复杂度高，但能够减小噪声的影响。

在明确了以上几点后，我们就可以编码来实现KNN分类器了。

## 实现

要实现一个KNN分类器，需要按照以下几步来完成：


1. 准备数据，得到样本的特征表示。
2. 设计距离计算函数，量化样本间的相似程度。
3. 找到目标样本的k个最近邻，根据这些已正确分类的样本类别来投票产生目标样本的类别。

`knn.py`给出了一中简单的实现
    
    # -*- coding:utf-8 -*-

    import numpy as np
    import matplotlib.pyplot as plt
    import operator



    def loadData(filePath):
        X = []
        Y = []
        line_no = 0
        data = []
        for line in open(filePath):
            line_no += 1
            if line_no <= 32:
                line_data = [int(ch) for ch in line.strip()]
                data.append(line_data)

            if line_no == 33:
                line_no = 0
                X.append(np.array(data))
                data = []
                Y.append(int(line.strip()))

        return np.array(X), np.array(Y)


    def calcDistance(arr1, arr2):
        return np.linalg.norm(arr1 - arr2)

    def knnClassify(X, Y, x_test, k):
        distances = [calcDistance(x, x_test) for x in X]
        indices = np.array(distances).argsort()
        classCount = {}
        for i in range(k):
            label = Y[indices[i]]
            classCount[label] = classCount.get(label, 0) + 1

        sortedClassCount = sorted(classCount.iteritems(), key=operator.itemgetter(1), reverse=True)
        return sortedClassCount[0][0]



    if __name__ == '__main__':
        X, Y = loadData('DataSets/optdigits.txt')
        X_test, Y_test = loadData('DataSets/optdigits-test.txt')
        k = 10
        ploted = []
        i = 0
        for index in range(Y_test.size):
            x_test = X_test[index]
            y_right = Y_test[index]

            if y_right not in ploted:
                y_test = knnClassify(X, Y, x_test, k)
                i += 1
                plt.subplot(2, 5, i)
                plt.title('right ' + str(y_right) + ' - test ' + str(y_test))
                plt.imshow(x_test, cmap=plt.cm.binary)
                plt.gca().xaxis.set_major_locator(plt.NullLocator())
                plt.gca().yaxis.set_major_locator(plt.NullLocator())
                ploted.append(y_right)
        plt.show()
	
代码中的`loadData`函数实现准备数据，返回样本的特征表示矩阵和已知分类（需根据不同数据源来分别实现）。`calcDistance`函数使用二范数计算两个样本间的距离。`knnClassify`实现KNN分类算法，首先计算目标样本与所有样本间的距离，然后排序找到距离最近的k个样本，最后找到k个样本所属类别中样本最多的类别作为目标样本的类别。

## 应用实例

KNN是一种简单而有效的分类算法，最后给出一个使用KNN来识别手写数字的例子。每一个手写的数字以图片的形式保存，处理该图片得到一个32行32列的矩阵作为该样本的特征表示，其中矩阵的每个元素有两种取值：0和1， 0表示该处为空白，1表示该处为写字区域。手写数字2和3的特征矩阵表示如下图所示：

![feature_matrix](/images/MachineLearning/KNN/2_3.png)

该实例的数据来源为[uci的machine learning 数据仓库](http://archive.ics.uci.edu/ml/datasets/Optical+Recognition+of+Handwritten+Digits)，数据的格式为一系列的32＊32的特征矩阵和正确的分类，使用上述代码中的`loadData`可以得到已知样本的列表和对应正确分类的列表。本例将该数据分为两份，一份作为已知样本另一份作为待分类的目标样本，两份样本不同来验证该方法对未知样本的分类能力。

对于一个目标样本通过计算与已知所有样本的距离并找出最近的k个，以这k个样本中多数的所属分类作为目标样本的分类。下图给出了10个数字的分类情况，标题给出了正确的所属分类和KNN计算的所属分类，发现在该组参数下，KNN方法得到了全部正确的分类。

![image](/images/MachineLearning/KNN/result.png)

## 总结

本文介绍了机器学习中简单的k最近邻法分类算法，首先介绍了该方法的思路和需要明确的问题点，并用python给出了一个简单的实现，最后通过识别手写数字的实例展现其在应用上的威力，说明了KNN是一种简单而有效的分类方法。通过本文可以对KNN有一个初步的了解，然而在实际应用中还需根据具体问题要求，找到恰当的样本特征表示方法、距离计算方法和k参数，进而达到预期的效果，这需要对问题本身有深刻而准确的理解往往也比算法本身更加困难。




