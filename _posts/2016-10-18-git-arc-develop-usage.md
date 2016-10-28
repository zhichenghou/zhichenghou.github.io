# Git 使用规范以及与 arc 结合使用

## 1. Git 使用规范

- 保持仓库整洁
  - 内容整洁，合理使用 .gitignore，不要将个人开发相关的代码提交到仓库（ide 配置，project 信息等）
  - 分支整洁，远程只允许 master 、develop 和开发中的 feature 分支，完成的 feature 分支要删除
- 避免使用 merge 来合并 commits，使用 rebase 来代替
- 将多个琐碎的提交合并为一个提交
- 书写有意义的 commit message

## 2. 分支模型

仓库中只有 master、develop 和临时存在的 feature 分支

- master 分支为线上环境分支，不能进行 push 操作
- develop 分支为开发测试分支，基于 master 分支且只能超前于 master 分支，要经常 rebase master 分支来保持
- feature 分支应该主要存在于本地仓库，对于长时间开发的 feature，为了避免本地丢失可以 push 到远程仓库，但要注意 feature 结束后进行清理。feature 以 develop 分支为基础且只能超前于 develop 分支，通过 rebase 来保持

## 3. 开发流程

日常开发中，主要有两个场景：feature 开发和 hotfix。

### 3.1 feature 开发流程

对新功能的开发，按照 feature 开发流程进行。

1 基于 develop 分支创建一个 feature 分支

```shell
git checkout develop
git pull
git checkout -b <branch-name>
```

2 开发和提交代码

```shell
git add .
git commit
```

3 经常执行 rebase 来追踪上游 develop 的更改，使用 -i 参数将多个本地提交合并

```shell
git fetch origin
git rebase -i origin/develop
```

4 发起 code review

```shell
arc diff --base git:origin/develop --reviewers <reviewers-name>
```

代码被拒绝，则重复执行 2 ~ 4 的操作，直到代码被接受

5 代码被接受后，将代码合并到 develop 分支

```shell
arc land --onto develop
```

6 部署在测试环境进行测试，重复执行 1 ~ 5 的操作直到通过测试，达到上线要求

7 上线

- 首先，更新 develop 代码

```shell
git checkout develop
git pull
git fetch origin
git rebase -i origin/master
```

- 将 develop 代码与线上 master 代码的 diff 创建 code review, 来进行上线前的检查

```shell
arc diff --base git:origin/master --reviewers <reviewers-name>
```

- 代码检查通过后，将 develop 分支合并到 master，可以部署上线

```shell
arc land --onto master
```

- 此时本地 develop 分支应该已经被删除，需要切出新的 develop 分支，并保持远端一致

```shell
git checkout master
git pull
git checkout -b develop
git push origin develop:develop
```

## 3.2 hotfix 流程

对于线上bug 的修复，按照 hotfix 流程进行。

1 基于 master 创建 hotfix 分支

```shell
git checkout master
git pull
git checkout -b <branch-name>
```

2 开发和提交代码

```shell
git add .
git commit
```

3 发起 code review

```shell
arc diff --base git:origin/master --reviewers <reviewers-name>
```

代码被拒绝，则重复执行 2 ~ 3 的操作，直到代码被接受

4 代码被接受后，将代码合并到 master 分支，部署上线

```shell
arc land --onto master
```

5 注意，此时远端的 develop 已经落后于 master 分支，因此需要进行更新

```shell
git checkout develop
git fetch
git rebase -i origin/develop
git rebase -i origin/master
git push origin develop:develop # 如果发生了冲突，则需要 git push -f，小心操作
```
