#### show pdf in react  360

You can use pdf.js, and use texture in Plane/Box/Cylinder/Model/Plane/Sphere component.
use canvas in client.js or NativeModules

###### 1. add pdf.js in index.html
```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.min.js"></script>

```

###### 2. add PdfModule
```

import {Module} from 'react-360-web';
let pagenum = 1 // pdf cunrrentNum
let pageRendering = true // is pdf rendering
export default class PdfModule extends Module{
    constructor(context){
        super('PdfModule')
        this._context = context
    }

    $showPdf(pdfUrl  ,width, height , scale  ){
        this.pdfUrl = pdfUrl
        this.width = width
        this.height = height
        this.scale = scale

        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.cx = this.canvas.getContext('2d');

        this.showPage(pagenum)

        this._context.registerTextureSource('fps', this.canvas, {updateOnFrame: true}); // Needs an update each frame
    }

 showPage  (num)  {
    const url = this.pdfUrl
    const width = this.width
    const height = this.height
    const scale = this.scale
    const canvas = this.canvas
    const ctx = this.cx
    pageRendering = true;
    // document.getElementById('content').style.display = 'block';//show pdf loading
    pdfjsLib.getDocument(url).then(function(pdf){
        if(num === 'next'){
            pagenum ++;
        }else if(num === 'last'){
            pagenum --;
        }
        if(pagenum < 1){
            pagenum = 0
            return
        }else if(pagenum > pdf.numPages){
            pagenum = pdf.numPages
            return
        }

        pdf.getPage(pagenum).then(function(page){
            const viewport = page.getViewport(scale);
            canvas.height = height;
            canvas.width = width;
            // Render PDF page into canvas context
            const renderContext = {
            canvasContext: ctx,
            viewport: viewport
            };
            var renderTask = page.render(renderContext);
            // Wait for rendering to finish
            renderTask.promise.then(function () {
            pageRendering = false;
            // document.getElementById('content').style.display = 'none';//hide pdf loading
            })
            .catch(e=>{
            pageRendering = false;
            // document.getElementById('content').style.display = 'none';//hide pdf loading
            });
        }).catch(e=>console.log(e));
    })
  }
}
```


###### 3. pass pdfurl/ width / height / pdf scale to module


###### 4. then you can use pdfmodule in your code
see index.js
```
componentWillMount(){
    PDF.showPdf('http://localhost:8081/output.pdf',512,1024,2)
  }

  render() {
    return (
      <View style={styles.panel}>
        <Plane
        dimWidth={512}
        dimHeight={512}
        dimDepth={100}
        texture={texture('fps')} // Use our custom texture
      />
        <View style={styles.greetingBox}>
          <VrButton onClick={()=>{
            PDF.showPage('next') // show next page
            // PDF.showPage('last') // show last page
          }}>
            <Text style={styles.text}>
              enter
            </Text>

          </VrButton>
        </View>
      </View>
    );
  }

```