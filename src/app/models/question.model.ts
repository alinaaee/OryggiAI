export interface AnswerDto {
  answerID: string;        // must match the JSON property name exactly
  answerText: string;
}


export interface QuestionDto {
checkboxLabel: any;
  answerMasters: any;
  questionID:   string;
  questionText: string;
  inputType:    'text' | 'select' | 'slider' | 'checkbox' | 'textarea'  | 'radio'; 
  sortOrder:    number;
  answers:      AnswerDto[];
    required?: boolean;   // Optional: indicates if the field is required
//   answers?: Array<AnswerDto>; // For select input, contains possible answers
  minValue?: number;    // For range input, minimum value
  maxValue?: number;    // For range input, maximum value
  step?: number; 
}
