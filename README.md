# [React VR中文网学习目录：网站](http://www.vr-react.com/)
联系人：刘成，QQ&微信：674668211


#### 这里是众多的例子哦，React VR带您走进3D科幻的世界
### 运行项目步骤
#### 一、下载我的例子，git clone https://github.com/LiuC520/ReactVR
#### 二、打开终端，进入examples目录下面的具体的项目里,cd examples && cd 1.react-vr-flyingbird
#### 三、npm i
#### 四、安装完成后，输入：npm start
#### 五、在浏览器打开 http://localhost:8081/vr/
#### 六、等待加载完成，就可以鼠标点击画面移动了

#### 1、[flyingbird ,在辽阔的打的上听着音乐看着飞翔的一群群小鸟，具体的示例可以查看](http://www.vr-react.com/example/react-vr-flyingbird/)

 ![image](https://github.com/LiuC520/ReactVR/blob/master/flyingbird.gif)
 #### 2、[ReactVrEgg 星空陨石砸到头上了 具体的示例可以查看](http://www.vr-react.com/example/ReactVrEgg/)
#### 3、[天气预报+看片儿哦](http://www.vr-react.com/example/tianqi//)
 ![image](https://github.com/LiuC520/ReactVR/blob/master/tianqi.png)
 但是这个项目需要用到跨域，直接在浏览器中天气是打不开的
 ### 其他示例
#### 1、[ControllerDemo 具体的示例可以查看](http://www.vr-react.com/example/ControllerDemo/)
#### 2、[CylindricalPanel 具体的示例可以查看](http://www.vr-react.com/example/CylindricalPanel/)
#### 3、[DashSample，这个是自定义的播放器播放特定的格式的视频 具体的示例可以查看](http://www.vr-react.com/example/DashSample/)
#### 4、[ModelSample 具体的示例可以查看](http://www.vr-react.com/example/ModelSample/)
#### 5、[VideoSample VideoSample,和DashSample一样的，只不过里面的视频格式不一样而已  具体的示例可以查看](http://www.vr-react.com/example/VideoSample/)
#### 6、[VideoSample360 360度的视频 具体的示例可以查看](http://www.vr-react.com/example/VideoSample360/)
#### 7、[tourexample 具体的示例可以查看](http://www.vr-react.com/example/tourexample/)
#### 8、[cubeexample 具体的示例可以查看](http://www.vr-react.com/example/cubeexample/)
#### 9、[MultiRoot 具体的示例可以查看](http://www.vr-react.com/example/MultiRoot/)

### threejs示例
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
