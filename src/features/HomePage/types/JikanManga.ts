export type JikanManga = {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
  title: string;
  score: number;
  genres: { name: string }[];
  synopsis: string;
};
