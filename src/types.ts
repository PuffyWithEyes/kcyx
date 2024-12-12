export interface Item {
  type: 'image' | 'text';
  src?: string;
  alt?: string;
  content?: string;
}

export interface PostItem {
  type: 'image' | 'text';
  src?: string;
  content?: string;
}
