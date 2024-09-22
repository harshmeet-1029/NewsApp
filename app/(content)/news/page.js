import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

const NewsPage = async () => {
  const news = await getAllNews();
  return (
    <>
      <h1>News Page</h1>
      {news && <NewsList news={news} />}
    </>
  );
};

export default NewsPage;
