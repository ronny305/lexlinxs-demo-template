export interface Question {
  id: string;
  type: 'text' | 'email' | 'select' | 'multiline';
  question: string;
  placeholder?: string;
  options?: string[];
}

export interface FormState {
  [key: string]: string;
}