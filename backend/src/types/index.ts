export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  slug: string;
  created_at: string;
  updated_at: string;
}
