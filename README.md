# Web网易云项目
## 介绍
模仿网易云官方的一个在线听歌音乐平台，涵盖了三种登录方式，以及不同音乐模块
### 项目背景
> 在平时的生活中，我们需要音乐来让自己的生活变得更有趣味性，在听音乐的同时我们也需要收藏，评论，搜索等，所以为了更加方便大家享受音乐，一个音乐网站就显得尤为的重要，所以我觉得需要实现一个基于Vue框架的音乐网站。
### 技术栈
主要使用Vue框架来完成本次项目的实现，使用技术有如下一些：
- nodejs   进行模拟网易云官方的数据请求(代理)
- vue-cli  进行项目基础框架的构建
- vue-router 进行项目的路由管理
- vuex 进行不同路由的数据通信,保存状态，方便统一管理
- eslint 进行代码的统一规范
- vant element-ui   ui组件库
- axios 进行网络请求的封装
### 开发环境
开发环境为：windows
开发工具：vscode
开发调试工具：chrome浏览器
开发运行环境：node环境
代码管理：git
上线环境：windows+ nginx

### 解决跨域
> 在服务器端进行配置,添加响应头Access-Control-Allow-Origin，设置为* 
```js
res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
    })
```
## 功能说明
```
1.登录
为了方便用户的使用，登录我们采取了三种不同登录方式，账号登录，扫描二维码登录，手机验证码登录。
登录的账号是与本身网易云的账号相同的，直接登录即可。

2.主页
显示的功能主要有：搜索框  头像 昵称banner  板块分类（个性推荐，歌单大全，排行榜，歌手，最新音乐）音乐控制
通过对用户听的歌曲进行智能算法的分析，为不同用户推荐不同歌单 。通过不同音乐板块的选择，给予用户更多的余地去发现自己喜欢的音乐

3.二级页面
显示的功能主要有：各板块歌单详情页面，歌手详情页面，侧边小功能（短视频观看，每日推荐，播放历史，网易收藏的歌单以及上面自己创建的歌单 ），视频详情页和MV详情页

```
## 安装教程
npm install 安装相关依赖
// 项目以及接口运行命令
node app.js


