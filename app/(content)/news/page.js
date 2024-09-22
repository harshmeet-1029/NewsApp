"use client";
import NewsList from "@/components/news-list";
import { useEffect, useState } from "react";

const NewsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/news");

      if (!response.ok) {
        setError("Failed to fetch data!");
        setIsLoading(false);
      }

      const news = await response.json();
      setNews(news);
      setIsLoading(false);
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>News Page</h1>
      {news && <NewsList news={news} />}
    </>
  );
};

export default NewsPage;
