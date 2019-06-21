// RBM - from the CL yarn add vue-loading-overlay
//
import { Component, Prop, Vue }                    from 'vue-property-decorator';
import SegmentSelector from './segment';

declare class SegmentType {
  public offset:number;
  public height:number;
  public group:number;
  public idx:number;
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

  private _drag_start_seg:SegmentType|null = null;
  private _drag_grp = 0;
  private _drag_undo:any = {};
  private ui_stage = 1;

  private handle_down(e)
  {
    let seg = this.get_segment_for_event(e);

    if (seg) {
      this._drag_undo = { };
      this._drag_undo[seg.idx] = seg.group;
      this._drag_start_seg = seg;
      if (e.button === 2) {
        this._drag_grp = -1; // right-click erase
      } else if (seg.group>=0) { // Same color
         this._drag_grp = seg.group;
      } else { // create new group
        let max = 0;
        this.get_segments().forEach((ss)=>{
          if (ss.group >= max) max = ss.group+1;
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

  private handle_stage2(e)
  {
    this.ui_stage = 2;
  }

  private handle_stage1(e)
  {
    this.ui_stage = 1;
  }

  private handle_upload(e)
  {
    console.log('TBD: UPLOAD!!!');
  }

  private get_groups()
  {
    let segs = this.get_segments();
    let groups:Array<any> = [];

    let last_group:any = null;
    let last_gid = -2;
    segs.forEach((seg)=>{
      if (seg.group>=0) {
        function new_group(gid) {
          last_group = { segments:[], height:0 };
          last_gid = gid;
          groups.push(last_group);
        }
        if (last_group == null) new_group(seg.group);
        if (last_gid !== seg.group) new_group(seg.group);

        // Here, guaranteed to have a last_group
        last_group.segments.push(seg);
        last_group.height += seg.height;
      }
    });

    return groups;
  }

  private get_outer_style() {
    if (this.ui_stage === 2) return 'background-color:#ccc';
    return '';
  }

  private get_group_segment_style(group_segment) {
    return `height:${ group_segment.height }px`;
  }
  private get_group_segment_img_style(group_segment) {
    return `position:relative;top:${ -group_segment.offset }px`;
  }

  private handle_move(e)
  {
    if (this._drag_start_seg) {
      let seg = this.get_segment_for_event(e);
      if (seg) this.color_segments_between(this._drag_start_seg, seg, this._drag_grp);
    }
  }

  private color_segments_between(start, end, grp)
  {
    let segs = this.get_segments();
    if (segs.indexOf(start) > segs.indexOf(end)) {
      let tmp = start;
      start = end;
      end = tmp;
    }

    for (let idx in this._drag_undo) {
      let seg:SegmentType = segs[parseInt(idx)];
      seg.group = this._drag_undo[idx];
    }

    let on = false;
    segs.forEach((seg)=>{
      if (seg === start) on = true;
      if (on) {
        if (!this._drag_undo[seg.idx]) this._drag_undo[seg.idx] = seg.group;
        seg.group = grp;
      }
      if (seg === end) on = false;
    });
  }

  private handle_up(e)
  {
    window.removeEventListener('mousemove', this.handle_move);
    if (this._drag_start_seg) {
      this._drag_start_seg = null;
    }
  }

  private get_segment_for_event(e)
  {
    let uicont = this.nearest(e.target, "ui-cont");
    if (uicont) {
      let r = uicont.getBoundingClientRect();
      let x = e.clientX - r.left;
      let y = e.clientY - r.top + uicont.scrollTop;
      let s = this.get_segment_at(y);
      return s;
    }
    return null;
  }

  private get_segment_at(y) {
    let hits = this.get_segments().filter((seg) => {
      return (seg.offset <= y && seg.offset+seg.height >= y);
    });

    return hits[0];
  }

  private get_segment_style(seg) {
    let style = `top:${ seg.offset }px; height: ${ seg.height }px`;
    if (seg.group>=0) {
      let color = COLORS[seg.group % COLORS.length];
      style += `;background-color:${ color }`;
    }
    return style;
  }

  private get_segments() {
    if (this.segments==null) {
      const white_space_rows = this.prop_job.summary.white_space_rows;
      this.segments = [];
      let i = 0;
      let last_offset = 0;
      while (i<white_space_rows.length) {
        let row = white_space_rows[i];
        let offset = row[0];
        let height = row[1]-row[0];
        if (i>0) {
          this.segments.push({ offset:last_offset, height:row[0]-last_offset, group:-1, idx:this.segments.length });
        }
        last_offset = offset + height;
        this.segments.push({ offset, height, group:-1, idx:this.segments.length });
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
