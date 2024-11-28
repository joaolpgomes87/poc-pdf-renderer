export interface Endorsement {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Transcript {
  title?: string;
  issued_for?: string;
  date?: string;
  content: string | string[] | Record<string, any>;
  footer?: string;
  id: string;
  email: string;
  issued_to: string;
  endorsements: Endorsement[];
} 