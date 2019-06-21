// RBM - from the CL yarn add vue-loading-overlay
//
import { Component, Prop, Vue }                    from 'vue-property-decorator';

declare class SegmentType {
  offset:number;
  height:number;
  group:number;
}

const COLORS = ['green', 'red', 'blue', 'yellow', 'purple', 'cyan', 'white'];

@Component({
  components: {
  }
})
export default class SegmentUI extends Vue {

  // This is how we are doing properties - prop_ is a convention
  @Prop(Object) private readonly prop_job!:{
    args: {
      src:string, // "23d0d29406f.pdf",
      tgt:string, // "23d0d29406f-432d.png",
      crop_rect: [ number, number, number, number ], // [ 0.03, 0.1, 0.93, 0.9 ]
      dpi:number,   // 432,
      pages:string, // "1-4",
      concatenate:boolean // true
    },
    // Other goo...
    result: {
      image_shape:[number, number, number],  // [ 15204, 3304, 4 ]
      fname:string,  // "23d0d29406f-432d.png",
      path:string,   // "/shared/jobs/23d0d29406f/23d0d29406f-432d.png",
      status: number // 0
    },
    // Other goo...
    summary: {
      image:string,  // "/shared/jobs/23d0d29406f/23d0d29406f-108d.png",
      hi_res:string  // "/shared/jobs/23d0d29406f/23d0d29406f-432d.png",
      white_space_rows: Array<[number, number]>, // [ [ 0, 30 ], [ 772, 825 ], ... ]
      dpi: number,  // 108,
      image_shape:[number, number, number],      // [ 3800, 826, 4 ]
    }
  };
  @Prop(String) private readonly prop_server!: string;

  public segments:Array<SegmentType> | null = null;

  constructor() {
    super();
  }

  private nearest(elem:Element|null, cls:string)
  {
    while (elem!=null) {
      if (elem.classList.contains(cls)) return elem;
      elem = elem.parentElement;
    }
    return null;
  }

  private disable_context(e) { e.preventDefault(); }

  private _dragging:SegmentType|null = null;
  private _drag_grp = 0;
  private handle_down(e)
  {
    var seg = this.get_segment_for_event(e);

    if (seg) {
      this._dragging = seg;
      if (e.button==2) {
        this._drag_grp = -1; // right-click erase
      } else if (seg.group>=0) { // Same color
         this._drag_grp = seg.group;
      } else { // create new group
        var max = 0;
        this.get_segments().forEach((ss)=>{
          if (ss.group>=max) max = ss.group+1;
        });
        this._drag_grp = max;
      }

      seg.group = this._drag_grp;
      window.addEventListener('mousemove', this.handle_move);
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }
  private handle_move(e)
  {
    if (this._dragging) {
      var seg = this.get_segment_for_event(e);
      if (seg) seg.group = this._drag_grp;
    }
  }
  private handle_up(e)
  {
    window.removeEventListener('mousemove', this.handle_move);
    if (this._dragging) {
      this._dragging = null;
    }
  }

  private get_segment_for_event(e)
  {
    var uicont = this.nearest(e.target, "ui-cont");
    if (uicont) {
      var r = uicont.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top + uicont.scrollTop;
      var s = this.get_segment_at(y);
      return s;
    }
    return null;
  }

  private get_segment_at(y) {
    var hits = this.get_segments().filter((seg) => {
      return (seg.offset <= y && seg.offset+seg.height >= y);
    });

    return hits[0];
  }

  private get_segment_style(seg) {
    var style = `top:${ seg.offset }px; height: ${ seg.height }px`;
    if (seg.group>=0) {
      var color = COLORS[seg.group % COLORS.length];
      style += `;background-color:${ color }`;
    }
    return style;
  }

  private get_segments() {
    if (this.segments==null) {
      const white_space_rows = this.prop_job.summary.white_space_rows;
      this.segments = [];
      var i = 0;
      var last_offset = 0;
      while (i<white_space_rows.length) {
        var row = white_space_rows[i];
        var offset = row[0];
        var height = row[1]-row[0];
        if (i>0) {
          this.segments.push({ offset:last_offset, height:row[0]-last_offset, group:-1 });
        }
        last_offset = offset + height;
        this.segments.push({ offset, height, group:-1 });
        i++;
      }
    }
    return this.segments;
  }

  // Computed
  private get hello_mines() {
    // First content identifies the store module
    // Second identifies the state member
    return 'hello';
  }

}
