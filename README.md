# uni-app-citySelect
最近的工作,以小程序为主,考虑到当前的项目以后也会发布APP,所以就选择了一款跨平台的开发框架uni-app<!-- more -->  
官网:http://uniapp.dcloud.io  
框架的介绍就不在这里多说了.官网上很详细,主要是功能比较完善,可以同时编译成小程序,APP,后续,还将支持H5的编译.  
以前还没有入VUE2.0的坑,所以学起来比较吃力,前两天项目中要用到一个城市的定位与选择的功能,真是让我头大了,不过还没拦到我.  
在github上直接找到了城市选择的vue项目地址:https://github.com/BeijiYang/citySelector  
这是一个区县联动选择的代码,我只要用到城市的,但是想直接用在uni-app里面,还是不行的.
不过通过这个项目又找到这个功能所对应的mpvue项目的地址:https://github.com/originalix/citySelector  
mpvue的代码,虽然uni-app是兼容的,但是我还是花了点时间把他改成了符合自己需求的uni-app的模块,项目地址:https://github.com/xieyushi/uni-app-citySelect  
功能大致如下:
###### 1.自动定位到当前城市(也支持手动重新定位)  
###### 2.手动输入汉字、拼音搜索城市
###### 3.可通过侧边栏选择，城市按拼音首字母排列  
先来一张效果图:  
![image](https://raw.githubusercontent.com/xieyushi/blog/master/blogimg/bloggif3.gif)  
页面间的值传递用的是缓存,比较简洁,功能的实现上,已经没有什么问题.无非就是两个文件,一个.vue,另外一个city.js的数据文件,由于原来的项目,是市与区联动选择的,我删了一部分.vue里面的代码,但是.js中的数据并没有删除,另外.把所有的标签都换成了uni-app的标签,另外添加了定位城市的选择事件.  
页面上有一个自动定位的功能,这个功能请求了腾讯的一个API.大家在测试的时候请勾选"不校验合法域名"的选择,才能正常浏览.  
感谢两位github的同学分享给我这么好的插件,我也只是借花献佛,希望uni-app的生态,能越来越好.  
当前的这个插件,还是有一些问题的.一是市区的选项,我并没有弄进来.因为我现在的需求不需要.另外,就是这个页面的布局不是flex布局,而uni-app其实是推荐使用flex布局的.  
我的博客小程序已经上线了.欢迎大家参观与评论:  
小程序博客二维码如下:  
![image](https://raw.githubusercontent.com/xieyushi/blog/master/blogimg/miniapp.jpg)
