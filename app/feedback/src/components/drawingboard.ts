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
        this.mouse.currentx= this.mouse.currentx - rect.left,
        this.mouse.currenty= this.mouse.currenty - rect.top
    }

    public draw (event) {
        // requestAnimationFrame(this.draw);
        //  && !(this.$store.state.feedback.clickerMode === 'pointer')
        if (this.mouse.down) {
            const c = document.getElementById('canvas') as HTMLCanvasElement;
            const ctx = c.getContext('2d') as CanvasRenderingContext2D;
            this.currentMouse();
            ctx.lineTo(this.mouse.currentx, this.mouse.currenty);
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle ='#F63E02';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    };

      //erase
    public erase (event) {
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 4;
        ctx.stroke();
    }
        
    public handleMouseDown (event) {
        this.mouse.down = true;
        this.mouse.currentx = event.pageX;
        this.mouse.currenty = event.pageY;
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;        this.currentMouse();
        ctx.moveTo(this.mouse.currentx, this.mouse.currenty)
    }

    public handleMouseUp() {
        this.mouse.down = false;
    }
    
    public handleMouseMove (event) {
        this.mouse.currentx = event.pageX;
        this.mouse.currenty = event.pageY;
        if(this.$store.state.feedback.clickerMode === 'annotate'){
            this.draw(event)
        }
        else {
            this.erase(event);
        }
    }

    public created() {
        const c = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;        ctx.translate(0.5, 0.5);
        ctx.imageSmoothingEnabled= false;
        // this.draw();
    }

}

    // Vue.component('drawing-board', {
    //     data: function () {
    //       return {
    //         mouse: {
    //           current: {
    //             x: 0,
    //             y: 0
    //           },
    //           previous: {
    //             x: 0,
    //             y: 0
    //           },
    //           down: false
    //         }
    //       }
    //     },
    //     computed: {
    //       currentMouse: function () {
    //         let c = document.getElementById('canvas');
    //         let rect = c.getBoundingClientRect();
        
    //         return {
    //           x: this.mouse.current.x - rect.left,
    //           y: this.mouse.current.y - rect.top
    //         }
    //       }
    //     },
    //     methods: {
    //       draw: function (event) {
        
        
    //         // requestAnimationFrame(this.draw);
    //        if (this.mouse.down ) {
    //          let c = document.getElementById('canvas');

    //       let ctx = c.getContext('2d');
            
    //          ctx.clearRect(0,0,800,800);
            

    //       ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
    //          ctx.strokeStyle ='#F63E02';
    //          ctx.lineWidth = 2;
    //       ctx.stroke()
    //        }
        
    //       },
    //       handleMouseDown: function (event) {
    //         this.mouse.down = true;
    //         this.mouse.current = {
    //           x: event.pageX,
    //           y: event.pageY
    //         }

    //               let c = document.getElementById('canvas');
    //         let ctx = c.getContext('2d');

    //         ctx.moveTo(this.currentMouse.x, this.currentMouse.y)
        

    //       },
    //           handleMouseUp: function () {
    //         this.mouse.down = false;
    //       },
    //       handleMouseMove: function (event) {

    //         this.mouse.current = {
    //           x: event.pageX,
    //           y: event.pageY
    //         }
        
    //         this.draw(event)
        
    //       }
    //     },
    // ready: function () {
    //     let c = document.getElementById('canvas');
    //     let ctx = c.getContext('2d');
    //     ctx.translate(0.5, 0.5);
    //     ctx.imageSmoothingEnabled= false;
    //     // this.draw();
    //   }
    //   })