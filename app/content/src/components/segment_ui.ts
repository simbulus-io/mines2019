// RBM - from the CL yarn add vue-loading-overlay
//
import { Component, Prop, Vue }                    from 'vue-property-decorator';
import { puts }                                    from '@/logger';
import SegmentSelector                             from './segment';

declare class SegmentType {
  public offset:number;
  public height:number;
  public group:number;
  public idx:number;
  public d_height:number;
}

const COLORS = ['green', 'red', 'blue', 'yellow', 'purple', 'cyan', 'white'];

@Component({
  components: {
  }
})
export default class SegmentUI extends Vue {

  // This is how we are doing properties - prop_ is a convention
  @Prop(String) private readonly prop_content_image!:(string); // "/shared/jobs/23d0d29406f/23d0d29406f-108d.png",
  @Prop(Array)  private readonly prop_white_space_rows!:(Array<[number, number]>); // [ [ 0, 30 ], [ 772, 825 ], ... ]
  @Prop(Array)  private readonly prop_image_size!:([number, number]); // [ 3800, 826]
  @Prop(Number) private readonly prop_image_dpi!:number;

  public segments:Array<SegmentType> | null = null;

  constructor() {
    super();
  }

  private ui_stage = 1;
  private handle_stage2(e) { this.ui_stage = 2; }
  private handle_stage1(e) { this.ui_stage = 1; }
  private handle_upload(e)
  {
    puts('TBD: UPLOAD!!!');
    puts(this.get_groups())
    // Push get_groups() --> server
    // groups is just: Array<segments:<Array<SegmentType>>
    // each segment, you care about offset and d_height
    // (positive is added whitespace, negative reduces height.)
  }
  private get_outer_style() {
    if (this.ui_stage === 2) return 'background-color:#ccc';
    return '';
  }

  private disable_context(e) { e.preventDefault(); }

  private nearest(elem:Element|null, cls:string)
  {
    while (elem!=null) {
      if (elem.classList.contains(cls)) return elem;
      elem = elem.parentElement;
    }
    return null;
  }

  // - - - - - - - - - - - -
  // Stage 1: Painting segments
  // - - - - - - - - - - - -

  private _drag_start_seg:SegmentType|null = null;
  private _drag_grp = 0;
  private _drag_undo:any = {};

  private handle_paint_down(e)
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
      if (this._drag_grp === -1) seg.d_height = 0; // ungroup resets d_height also

      window.addEventListener('mousemove', this.handle_paint_move);
      window.addEventListener('mouseup', this.handle_paint_up);
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
  }

  private handle_paint_move(e)
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
        if (grp === -1) seg.d_height = 0; // ungroup resets d_height also
      }
      if (seg === end) on = false;
    });
  }

  private cleanup_paint_listeners() { // TODO: how to call this on $destroy ???
    window.removeEventListener('mousemove', this.handle_paint_move);
    window.removeEventListener('mouseup', this.handle_paint_up);
  }

  private handle_paint_up(e)
  {
    this.cleanup_paint_listeners();
    if (this._drag_start_seg) {
      this._drag_start_seg = null;
    }
  }

  private get_segment_for_event(e)
  {
    let uicont = this.nearest(e.target, 'ui-cont');
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
      const white_space_rows = this.prop_white_space_rows;
      this.segments = [];
      let i = 0;
      let last_offset = 0;
      while (i<white_space_rows.length) {
        let row = white_space_rows[i];
        let offset = row[0];
        let height = row[1]-row[0];
        if (i>0) {
          this.segments.push({ offset:last_offset, height:row[0]-last_offset, group:-1, idx:this.segments.length, d_height:0 });
        }
        last_offset = offset + height;
        this.segments.push({ offset, height, group:-1, idx:this.segments.length, d_height:0 });
        i++;
      }
    }

    return this.segments;
  }


  // - - - - - - - - - - - -
  // Stage 2: Groups / edges
  // - - - - - - - - - - - -

  private get_groups()
  {
    let segs = this.get_segments();
    let groups:Array<{ segments:Array<SegmentType> }> = [];

    let last_group:any = null;
    let last_gid = -2;
    segs.forEach((seg)=>{
      if (seg.group>=0) {
        function new_group(gid) {
          last_group = { segments:[] };
          last_gid = gid;
          groups.push(last_group);
        }
        if (last_group == null) new_group(seg.group);
        if (last_gid !== seg.group) new_group(seg.group);

        // Here, guaranteed to have a last_group
        last_group.segments.push(seg);
      }
    });

    return groups;
  }

  private get_group_segment_style(group_segment) {
    if (group_segment.d_height === 0) {
      return `height:${ group_segment.height }px`;
    } else if (group_segment.d_height<0) {
      return `height:${ group_segment.height + group_segment.d_height }px`;
    } else {
      return `height:${ group_segment.height }px;padding-bottom:${ group_segment.d_height }px`;
    }
  }
  private get_group_segment_img_cont_style(group_segment) {
    return `height:${ group_segment.height }px`;
  }
  private get_group_segment_img_style(group_segment) {
    return `position:relative;top:${ -group_segment.offset }px`;
  }

  private _edge_y_start = -1;
  private _edge_drag_seg:SegmentType|null = null;
  private handle_edge_down(e, group, seg)
  {
    if (e.button === 2) { // right-click erases customization
      seg.d_height = 0;
      return;
    }

    this._edge_drag_seg = seg;
    this._edge_y_start = e.clientY - seg.d_height;

    window.addEventListener('mousemove', this.handle_edge_move);
    window.addEventListener('mouseup', this.handle_edge_up);

    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }

  private handle_edge_move(e)
  {
    let seg:SegmentType|null = this._edge_drag_seg;
    if (seg) {
      let dy = e.clientY - this._edge_y_start;
      const min_h = 2.0;
      if (dy < 0 && dy < -(seg.height-min_h)) dy = -seg.height + min_h; // Max negative is height
      seg.d_height = dy;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
}

  private handle_edge_up(e)
  {
    this._edge_drag_seg = null;
    this.cleanup_edge_listeners();
  }

  private cleanup_edge_listeners() { // TODO: how to call this on $destroy ???
    window.removeEventListener('mousemove', this.handle_edge_move);
    window.removeEventListener('mouseup', this.handle_edge_up);
  }

}
