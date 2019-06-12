// tslint:disable
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class DrawingBoard extends Vue{


    mouse= {

        currentx: 0,
        currenty: 0,
        previousx: 0,
        previousy: 0,
        down: false

}

    currentMouse() {

        var c = <HTMLElement>document.getElementById("canvas");
        var rect = c.getBoundingClientRect();


        this.mouse.currentx= this.mouse.currentx - rect.left,
        this.mouse.currenty= this.mouse.currenty - rect.top

    }

    constructor() {
        super();
    }
    draw (event) {


        // requestAnimationFrame(this.draw);
       if (this.mouse.down ) {
         var c = <HTMLCanvasElement>document.getElementById("canvas");

      var ctx = <CanvasRenderingContext2D>c.getContext("2d");

         ctx.clearRect(0,0,800,800);

    this.currentMouse();
      ctx.lineTo(this.mouse.currentx, this.mouse.currenty);
         ctx.strokeStyle ="#F63E02";
         ctx.lineWidth = 2;
      ctx.stroke()
       }

      };
      public handleMouseDown (event) {

        this.mouse.down = true;
        this.mouse.currentx = event.pageX;
        this.mouse.currenty = event.pageY;

              var c = <HTMLCanvasElement>document.getElementById("canvas");
        var ctx = <CanvasRenderingContext2D>c.getContext("2d");
        this.currentMouse();
        ctx.moveTo(this.mouse.currentx, this.mouse.currenty)


      }
      handleMouseUp() {
        this.mouse.down = false;
      }
      handleMouseMove (event) {

        this.mouse.currentx = event.pageX;
        this.mouse.currenty = event.pageY;

        this.draw(event)

      }

      created() {
        var c = <HTMLCanvasElement>document.getElementById("canvas");
        var ctx = <CanvasRenderingContext2D>c.getContext("2d");
        ctx.translate(0.5, 0.5);
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
//         var c = document.getElementById("canvas");
//         var rect = c.getBoundingClientRect();

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
//          var c = document.getElementById("canvas");

//       var ctx = c.getContext("2d");

//          ctx.clearRect(0,0,800,800);


//       ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
//          ctx.strokeStyle ="#F63E02";
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

//               var c = document.getElementById("canvas");
//         var ctx = c.getContext("2d");

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
//     var c = document.getElementById("canvas");
//     var ctx = c.getContext("2d");
//     ctx.translate(0.5, 0.5);
//     ctx.imageSmoothingEnabled= false;
//     // this.draw();
//   }
//   })