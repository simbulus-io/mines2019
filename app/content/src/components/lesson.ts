export interface Lesson {
    _id: string;
    idx: string;
    path: string;
    name: string;
    subj: string;
    module_num: number;
    lesson_num: number;
    url: string;
    student_docx: string;
    student_pdf: string;
    teacher_docs: string;
    teacher_pdf: string;
    status: string;
    notes: {
        idx: string;
        text: string;
      }[];
    keywords: string[];
    standards: string[];
  }