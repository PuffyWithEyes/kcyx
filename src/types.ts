export interface Item {
  type: 'image' | 'text';
  src?: string;
  alt?: string;
  content?: string;
}