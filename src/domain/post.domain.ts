export interface Post {
  id: string;
  creatorId: string;
  content: string;
  categories: string[];
  hashtags: string[];
  shares: string[];
  authorId: string;
  reactions: string[];
  photoUrls: string[];
}
