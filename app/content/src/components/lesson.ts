export interface Lesson {
    _id: string;
    idx: string;
    path: string;
    name: string;
    url: string;
    status: string;
    notes: {
        idx: string;
        text: string;
      }[];
    keywords: string[];
    standards: string[];
  }