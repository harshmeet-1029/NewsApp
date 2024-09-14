import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import NewsList from "@/components/news-list";
import Link from "next/link";

const FilterdNewsPage = ({ params }) => {
  const filter = params.filter; //Hold array

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  let links = getAvailableNewsYears();

  let news;
  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  } else if (selectedMonth && selectedYear) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = getAvailableNewsYears();
  }

  console.log(news);
  let newsConent;

  if (selectedYear || selectedMonth) {
    newsConent = <p>No News found for the selected year.</p>;
  }

  if (news && news.length > 0) {
    newsConent = <NewsList news={news} />;
  }

  if (
    (selectedYear && !getAvailableNewsYears()?.includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear)?.includes(+selectedMonth))
  ) {
    throw new Error("Invalid Filter");
  }
  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              let href = selectedYear
                ? selectedMonth
                  ? `/archive/${link}`
                  : `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;
              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsConent}
    </>
  );
  /* 
  const news = getNewsForYear(newsYear);
  return <NewsList news={news} />; */
};

export default FilterdNewsPage;
