export type postData = {
  head: {
    title: string;
    category: string;
    date: string;
    author: string;
    description: string;
    thumbnail: string;
    uid?: string;
  };
  body: {
    content: string;
  };
};
