export interface ContactInterface {
  date: {
    id: string;
    send_date: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  subject: string;
  comment: string;
  archived: boolean;
}