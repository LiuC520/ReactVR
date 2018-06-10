
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