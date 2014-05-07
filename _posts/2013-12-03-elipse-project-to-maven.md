---
layout: post
title:  "Eclipse 项目迁移到 Maven"
date:   2013-12-03 10:20
categories: Java
---

maven是一种广泛使用的java项目管理工具, 有很多优点，本文记录了eclipse 项目迁移到 maven的步骤。

## maven的优势

Maven是一种广泛使用的java项目管理工具，具有以下几点优势：

- maven遵守“约定优于配置”的哲学，因此使用maven管理的项目具有相同的目录结构，有助于标准化和减少学习成本。
- maven引入生命周期的概念，来定义项目从编译到发布的有序构建过程，在每个生命周期阶段通过绑定maven的插件和目标来具体实现构建工作，因此maven有助于构建的自动化和流程化。
- maven通过坐标来定义一个项目的唯一标识，通过pom.xml来配置项目的依赖以及构建过程，配置完成后，maven会自动下载依赖的jar包，并自动解决传递依赖，因此可以简化依赖管理，此外通过使用统一的pom.xml管理项目配置可以实现maven项目跨IDE，跨平台的移植。



## maven项目迁移流程

在eclipse可以安装m2eclipse插件，该插件自带了一个maven环境，可以方便的在eclipse中使用maven。移植流程如下：

1. 新建一个maven项目。在此步骤需要指定项目的Archetype来确定maven项目类型，通过指定GroupId，artifactId，version等信息来定义该项目的坐标（注意，为了不更改源代码，需按原来项目的包结构来定义新项目的坐标和包结构信息）。
2. 将之前项目的src和test源码复制到新建maven项目的对应目录下。
3. 配置pom.xml中依赖相关的内容。根据之前项目的依赖，有两种不同的依赖需要分别处理：
    - 对于在maven[中心仓库](http://search.maven.org/)里能够找到的依赖，直接将在仓库中查到的依赖字段内容复制pom.xml中即可，maven会自动下载该依赖到本地仓库。
    - 对于只有jar包，而不存在与中心仓库里的依赖，需首先将该jar包安装到本地仓库，然后在pom.xml中进行配置。比如对于oracle jdbc6的依赖，需要在该包所在的目录下执行如下命令进行安装（可在eclipse中maven build... 的Goals中执行）

            install:install-file -DgroupId=com.oracle -DartifactId=ojdbc6 -Dversion=11.2.0.1.0 -Dpackaging=jar -Dfile=ojdbc6.jar -DgeneratePom=true

4. 配置pom.xml中构建相关的内容。
    - 指定jdk版本。由于maven-compiler-plugin 默认支持jdk 1.4， 我们需要1.6，需要在pom.xml中的<build>字段增加如下内容：

            <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.1</version>
                    <configuration>
                        <source>1.6</source>
                        <target>1.6</target>
                    </configuration>
            </plugin>

    - 跳过测试错误，继续构建。maven默认的构建会在测试出错时停止，有时我们需要忽略测试错误甚至跳过测试继续构建，可通过配置maven-surefire-plugin插件实现：

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <configuration>
                    <testFailureIgnore>true</testFailureIgnore>
                    <skip>true</skip>
                </configuration>
            </plugin>

    - 安装此项目到本地仓库，以便其它项目对其依赖。当构建完成之后，可以执行install将此项目安装到本地仓库，此后即可使其它maven项目依赖此项目。

    - 得到可运行的jar包。由于项目最终要在服务器上运行，因此还需将项目及其依赖打成jar以便上传至服务器运行。为了实现带依赖的打包，可以使用maven-shade-plugin，该插件将依赖的项目文件打入jar包内，使其与当前项目文件在同一目录下。

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>2.1</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

5. 运行。将得到的jar包上传至服务器，即可使用 `java -cp *.jar mainClass parms` 来执行。