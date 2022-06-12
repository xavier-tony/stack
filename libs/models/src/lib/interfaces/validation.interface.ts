export interface ValidationMessage {
  code: string;
  message: string;
  valid: boolean | undefined;
}
export interface Validation {
  heading?: string;
  messages: ValidationMessage[];
}
