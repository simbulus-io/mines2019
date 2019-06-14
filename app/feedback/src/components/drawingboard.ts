import { Component, Prop, Vue } from 'vue-property-decorator';
import { log } from '@/logger';

@Component
export default class DrawingBoard extends Vue{

    private mouse= {
        currentx: 0,
        currenty: 0,
        previousx: 0,
        previousy: 0,
        down: false
    }

    constructor() {
        super();
    }

    public currentMouse() {
        const c = document.getElementById('canvas') as HTMLElement;
        const rect = c.getBoundingClientRect();
        this.mouse.currentx= this.mouse.currentx - rect.left;
        this.mouse.currenty= this.mouse.currenty - rect.top - window.scrollY;
    }

    public get annotation(){
        log.info('***********')
        log.info(this.$store.state.feedback.annotations);

        return this.$store.state.feedback.annotations.filter( (curr_annotation) => {
            return curr_annotation.content_idx === this.$route.params.idx;
        }, this);
        // filter only gets the sticky notes that are on the content
  
    }
    public deserializeAnnotation(data, canvas){
        const img = new Image();
        log.info(data + 'Hello');
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
        };
        img.src = data;

    }
  

    public annotateMode (event) {
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;
        if (this.mouse.down) {
            this.currentMouse();
            ctx.globalCompositeOperation = (this.$store.state.feedback.clickerMode === 'annotate') ? 'source-over' : 'destination-out';
            ctx.beginPath();
            ctx.moveTo(this.mouse.previousx, this.mouse.previousy);
            ctx.lineTo(this.mouse.currentx, this.mouse.currenty);
            ctx.lineCap = 'round';
            ctx.strokeStyle ='red';
            if(ctx.globalCompositeOperation === 'destination-out'){
                ctx.lineWidth = 25;
            }
            else{
                ctx.lineWidth = 4;
            }
            // ctx.getImageData
            ctx.stroke();
            ctx.closePath(); 
        }
    };

    public handleMouseDown (event) {
        this.mouse.down = true;
        this.mouse.currentx = event.pageX;
        this.mouse.currenty = event.pageY;
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;        
        this.currentMouse();
        this.mouse.previousx = this.mouse.currentx;
        this.mouse.previousy = this.mouse.currenty;
    }

    public handleMouseUp() {
        this.mouse.down = false;
    }

    public handleMouseMove (event) {
        this.mouse.previousx = this.mouse.currentx;
        this.mouse.previousy = this.mouse.currenty;
        this.mouse.currentx = event.pageX;
        this.mouse.currenty = event.pageY;
        if(this.$store.state.feedback.clickerMode === 'annotate'){
            this.annotateMode(event);
        }
        if(this.$store.state.feedback.clickerMode === 'erase'){
            this.annotateMode(event);
        }
        if(this.$store.state.feedback.clickerMode === 'clear'){
            this.clear();
        }
    }

    public mounted() {
        const curr_annotation = this.annotation;
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;   
        // if(curr_annotation === null){
        //     log.info('current annotation is null');
        //     // ctx.translate(0.5, 0.5);
        //     // ctx.imageSmoothingEnabled= false;
        // }
        // else{
            // log.info('current annotation is not null');
            log.info(this.annotation);
            if(this.annotation){
                log.info('deserializing annotation');
                log.info(this.annotation[0].content);
                this.deserializeAnnotation(this.annotation[0].content, c);
            }
            else
            {
                log.info('undefined');
            }
        // }
    }

    public clear() {
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, 1024, 768);
    }

}

