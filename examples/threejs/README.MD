#### 示例
###### 调试安装步骤：首先进入threejs文件下面的具体示例中，然后打开命令输入：npm install ,安装完毕，需要修改threejs模块下面的文件，否则会出现解析出错，把threejs下面的build文件夹下面的三个文件拷贝到 具体的示例/node_modules/three/build下面，然后在命令行输入 npm start,再打开浏览器输入：localhost:8081/vr/，等待加载资源完成。
###### 你也可以按照我的另一篇文章：[http://www.jianshu.com/p/6a9980a0a42b](http://www.jianshu.com/p/6a9980a0a42b)来自己修改threejs文件，然后自己打包threejs

#### 下面是直接可以查看的，在react vr中文网上也有哦， [www.vr-react.com](http://www.vr-react.com/)

###### 1. [webgl_animation_cloth](http://www.vr-react.com/example/threejs/webgl_animation_cloth)
 ![image](https://github.com/LiuC520/ReactVR/blob/master/examples/threejs/webgl_animation_cloth/example.gif)
###### 2. [webgl_animation_keyframes_json](http://www.vr-react.com/example/threejs/webgl_animation_keyframes_json)
 ![image](https://github.com/LiuC520/ReactVR/blob/master/examples/threejs/webgl_animation_keyframes_json/example.gif)
###### 3. [webgl_animation_scene](http://www.vr-react.com/example/threejs/webgl_animation_scene)
 ![image](https://github.com/LiuC520/ReactVR/blob/master/examples/threejs/webgl_animation_scene/example.gif)
###### 4. [webgl_animation_skinning_blending](http://www.vr-react.com/example/threejs/webgl_animation_skinning_blending)
 ![image](https://github.com/LiuC520/ReactVR/blob/master/examples/threejs/webgl_animation_skinning_blending/example.gif)
###### 5.webgl_animation_skinning_morph 
###### 6. [webgl_camera](http://www.vr-react.com/example/threejs/webgl_camera) 
因为目前的react vr的VRinstance实例只能添加一个摄像机，所以看不到threejs原有的左右分别渲染的效果，如果要修改效果，可以把client.js的VRInstance中的{camera:camera,}去掉，就可以看到效果了
 ![image](https://github.com/LiuC520/ReactVR/blob/master/examples/threejs/webgl_camera/example.gif)
###### 7.webgl_camera_array 
###### 8. [webgl_camera_cinematic](http://www.vr-react.com/example/threejs/webgl_camera_cinematic) 
在threejs的源码基础上添加了cinematic相机的支持，可以修改index.vr.js里面的传到native的参数哦，看到不同的效果哦
 ![image](https://github.com/LiuC520/ReactVR/blob/master/examples/threejs/webgl_camera_cinematic/example.gif)
###### 9. [webgl_camera_logarithmicdepthbuffer](http://www.vr-react.com/example/threejs/webgl_camera_logarithmicdepthbuffer) 
 ![image](https://github.com/LiuC520/ReactVR/blob/master/examples/threejs/webgl_camera_logarithmicdepthbuffer/example.gif)






 ###### 问题
 ###### 1、render左右使用不同相机渲染
 ###### 2、目前camera不支持相机数组或者多个相机，相机数组需要修改源码添加 ArrayCamera