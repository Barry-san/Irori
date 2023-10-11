export type postData = {
  head: {
    title: string;
    category: string;
    date: string;
    author?: string;
    description: string;
    thumbnail?: string;
  };
  body: {
    content: string;
  };
};
