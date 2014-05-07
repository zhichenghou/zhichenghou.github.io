Title: 使用pelican和github pages搭建博客
Date: 2013-12-05 10:20
Category: Blog
Tags: Pelican, Python
Summary: pelican是一个使用python的静态博客生成工具，可以将markdown等语言写成的博客翻译为静态的html文件，方便部署在github pages等其它静态博客托管平台上，本文记录了你现在看到的这个blog生成的过程。

## 介绍

[pelican](http://getpelican.com/) 是一个使用python的静态博客生成工具，可以将markdown等语言写成的博客翻译为静态的html文件，方便部署在github pages等其它静态博客托管平台上，本文记录了你现在看到的这个blog生成的过程。

## 安装

按照pelican的[官方文档](http://docs.getpelican.com/en/latest/)即可方便的安装成功：

1. 使用pip安装pelican：
		
		pip install pelican

2. 安装markdown：
		
		pip install markdown

## 生成博客目录

pelican自带了一个生成网站目录文件结构的工具，在终端执行：

	pelican-quickstart

pelican会询问一些问题来生成网站的配置，这些配置最终保存在`pelicanconf.py`文件中。

## 一些设置

pelican的设置最终保存在`pelicanconf.py`文件中， [设置文档](http://docs.getpelican.com/en/latest/settings.html)给出了所有可用的设置，在此列出几个常用的设置。

1. 	设置主题：可以在pelican的安装目录下找到默认的主题，该主题名为`notmyidea`。为了对此主题进行定制，可以将该文件夹复制到当前项目的themes文件夹中，然后在`pelicanconf.py`中增加如下配置

		THEME = 'themes/notmyidea'

	本博客对该模板主要定制了三个地方：

	* 修改index页： 修改`index.html`，只显示标题和summary
	
	* 修改样式： 在`main.css`添加如下内容，使得代码和图片的显示更加美观：
		
	  		code, pre {
	  		  padding: 0 3px 2px;
			  font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
			  font-size: 12px;
			  color: #333333;
			}

			img{ 
				width:90%;
			}

	* 修改来支持mathjax： 修改`base.html`, 在`head`中增加如下内容来支持mathjax，可以使用latex写公式：
			
			{# latex #}
			<script type="text/x-mathjax-config">
			  MathJax.Hub.Config({
			  "HTML-CSS": {
			  styles: {
			  ".MathJax .mo, .MathJax .mi": {color: "black"}}
			  },
			  tex2jax: {inlineMath: [['$','$'], ['\\\\(','\\\\)']],processEscapes: true}
			  });
			</script>

			<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

2. 	设置静态文件路径：对于文章中的图片, markdown文件中可以使用`![UML图](images/DPython/chain_of_responsibility.png)`来指明， images文件夹在content目录下，为了使生成的output目录中同样有image文件夹，可以增加如下配置

		STATIC_PATHS = ['images']

这样当pelican生成output时会复制该目录到output目录中。

## 书写文章

当完成以上步骤后，只要在content文件夹中新建markdown文件，然后就可以在该文件中书写文章了，不过pelican会根据文章的元数据来生成最终的文章，因此在每篇文章的开头要指定该文档的元数据，就像下面这样：

	Title: 使用pelican和github pages搭建博客
	Date: 2013-12-05 10:20
	Category: Blog
	Tags: Pelican, Python
	Summary: pelican是一个使用python的静态博客生成工具，可以将markdown等语言写成的博客翻译为静态的html文件，方便部署在github pages等其它静态博客托管平台上，本文记录了你现在看到的这个blog生成的过程。

## 生成html

当书写完文章就可以使用pelican生成html了，在项目文件夹下执行如下操作：
	
	pelican content -s pelicanconf.py

生成的网站的文件在output文件夹下，可以进入该文件夹，执行下面的命令来进行预览：

	python -m SimpleHTTPServer

访问 http://localhost:8000 就可以预览了。


## 部署到github pages

[github pages](http://pages.github.com)提供了静态网页的托管平台，通过在github中新建一个名为"username.github.io"的项目(该处以及以下的username表示你的github用户名)，然后将pelican生成的静态网页（output文件夹下的所有内容）放到该项目的master分支下就可以得到一个博客网站了。为了实现这个目的首先需要将本地的output文件夹下的内容push到项目的master分支，需要在output文件夹下进行如下操作：

	git init .
	git remote add origin https://github.com/username/username.github.io.git
	git add .
	git commit 
	git push origin master:master

至此访问http://username.github.io应该可以看到你的博客了。

此外，为了将本地博客项目的所有内容放到github上，可以将博客项目的内容放到github项目的source分支上， 在本地项目的文件夹下执行如下操作：

	git init .
	git remote add origin https://github.com/username/username.github.io.git
	git add .
	git commit 
	git push origin source:source

这样博客的原始内容也放在github上了。

## 自动化脚本

为了简化以后的操作，我还写了一个小脚本来简化操作，将该脚本放到项目文件夹下，可以通过如下命令来完成相应操作：

	python cli.py <target>

其中target可以为 clean，generate， preview， deploy 和push_source，分别实现清理，生成，预览，部署和上传源代码的操作。该脚本`cli.py`的内容如下
	
	:::python
	#!/usr/bin/env python
	# -*- coding: utf-8 -*- #

	from os import system, chdir, getcwd
	from sys import argv

	def execute(cmd):
		print cmd
		system(cmd)

	def clean():
		cmd = 'rm -rf output/*'
		execute(cmd)

	def generate():
		clean()
		cmd = 'pelican content -s pelicanconf.py'
		execute(cmd)

	def preview():
		generate()
		chdir('output')
		cmd = 'python -m SimpleHTTPServer'
		execute(cmd)

	def deploy():
		generate()
		chdir('output')
		print getcwd()
		cmd = 'git add --all .'
		execute(cmd)
		cmd = 'git commit'
		execute(cmd)
		cmd = 'git push origin master:master'
		execute(cmd)

	def push_source():
		cmd = 'git add --all .'
		execute(cmd)
		cmd = 'git commit'
		execute(cmd)
		cmd = 'git push origin source:source'
		execute(cmd)

	if __name__ == '__main__':
		if len(argv) != 2:
			print 'cli require 1 parameter,  you hava these options: \n clean generate preview deploy push_source'
		else:
			try :
				action = argv[1] + "()"
				exec(action)
			except:
				print "command is error, you hava these options: \n clean generate preview deploy push_source"

## 参考
+ [pelican doc](http://docs.getpelican.com/en/latest/) 
+ [jinja2](http://jinja.pocoo.org/)

### 完
