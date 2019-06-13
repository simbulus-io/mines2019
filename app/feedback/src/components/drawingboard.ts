import { Component, Prop, Vue } from 'vue-property-decorator';

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

    public annotateMode (event) {
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;
        if (this.mouse.down) {
            this.currentMouse();
            this.$store.state.feedback.clickerMode === 'annotate'
            ctx.globalCompositeOperation = this.$store.state.feedback.clickerMode === 'annotate' ? 'source-over' : 'destination-out';
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
    }

    public mounted() {
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;       
        ctx.translate(0.5, 0.5);
        ctx.imageSmoothingEnabled= false;
        // this.draw();
    }

}

