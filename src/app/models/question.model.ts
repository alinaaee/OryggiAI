export interface AnswerDto {
  answerID: string;      
  answerText: string;
}


export interface QuestionDto {
  pageKey: string;    
  isActive: boolean;  
  checkboxLabel: any;
  answerMasters: any;
  questionID:   string;
  questionText: string;
  inputType: 'text' | 'select' | 'slider' | 'checkbox' | 'textarea'  | 'radio' | 'multiselect'; 
  sortOrder: number;
  answers: AnswerDto[];
  required?: boolean;   
  minValue?: number;    
  maxValue?: number;    
  step?: number; 
}
