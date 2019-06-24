import { Component, Prop, Vue } from 'vue-property-decorator';
import { log } from '@/logger';

@Component
export default class DrawingBoard extends Vue{

    @Prop() private readonly clickerMode!: string;

    private mouse = {
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
        //log.info(this.$store.state.feedback.annotations);

        return this.$store.state.feedback.annotations.filter( (curr_annotation) => {
            return curr_annotation.content_idx === this.$route.params.idx;
        }, this);
        // filter only gets the annotation(s) that are on the content
    }

    public deserializeAnnotation(data, canvas){
        const img = new Image();
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
            ctx.globalCompositeOperation = (this.clickerMode === 'annotate') ? 'source-over' : 'destination-out';
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
        if(this.clickerMode === 'annotate' || this.clickerMode === 'erase'){
            this.annotateMode(event);
        }else if(this.clickerMode === 'clear'){
            this.clear();
        }
    }

    public async mounted() {
        if( this.$store.state.feedback.annotations.length === 0 ){ // TODO: fix this to not be the second dispatch bandaid fix
            await this.$store.dispatch('feedback/annotations');
        }
        const curr_annotation = this.annotation;
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;   
        log.info(this.annotation);
        if(this.annotation.length>0){
            log.info('deserializing annotation');
            this.annotation.forEach(element => {
                this.deserializeAnnotation(element.content, c);
            });
        }else{
            log.info('undefined');
        }
    }

    public clear() { // TODO: fix delay on this that occurs (if possible)
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, 1024, 768);
    }

}

