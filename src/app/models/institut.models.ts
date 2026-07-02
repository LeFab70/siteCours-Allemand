export interface Language {
  name: string;
  flagEmoji: string;
  tagline: string;
  icon: string;
  colorFrom: string;
  colorTo: string;
}

export interface Exam {
  code: string;
  label: string;
  description: string;
}

export interface VisaStep {
  icon: string;
  text: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
