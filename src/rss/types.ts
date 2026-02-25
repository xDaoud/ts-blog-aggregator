export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export type RSSPost = {
  title: string;
  url: string;
  description?: string;
  publishedAt?: Date;
  feedId: string;
};