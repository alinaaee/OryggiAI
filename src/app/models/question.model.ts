export interface AnswerDto {
  answerID: string;      
  answerText: string;
}


export interface QuestionDto {
  checkboxLabel: any;
  answerMasters: any;
  questionID:   string;
  questionText: string;
  inputType: 'text' | 'select' | 'slider' | 'checkbox' | 'textarea'  | 'radio' | 'multiselect'; 
  sortOrder: number;
  answers: AnswerDto[];
  required?: boolean;   
//answers?: Array<AnswerDto>; // For select input, contains possible answers
  minValue?: number;    
  maxValue?: number;    
  step?: number; 
}
