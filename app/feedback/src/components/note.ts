export interface Note {
  author: string;
  content: string;
  type: string;
  timestamp: number;
  x: number;
  y: number;
  idx: string;
  deleted: boolean;
  content_idx: string;
}
// TODO: have content id field for relation to match feedback to respective assignment
