import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import NewsList from "@/components/news-list";
import Link from "next/link";
import { Suspense } from "react";

export const FilterHeader = async ({ year, month }) => {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;

  if (year && !month) {
    links = getAvailableNewsMonths(year);
  } else if (month && year) {
    links = await getAvailableNewsYears();
  }

  if (
    (year && !availableYears?.includes(year)) ||
    (month && !getAvailableNewsMonths(year)?.includes(month))
  ) {
    throw new Error("Invalid Filter");
  }

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            let href = year
              ? month
                ? `/archive/${link}`
                : `/archive/${year}/${link}`
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
  );
};

export const FilterdNews = async ({ year, month }) => {
  let news;
  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  }
  let newsConent;

  if (year || month) {
    newsConent = <p>No News found for the selected year.</p>;
  }

  if (news && news.length > 0) {
    newsConent = <NewsList news={news} />;
  }

  return newsConent;
};
const FilterdNewsPage = async ({ params }) => {
  const filter = params.filter; //Hold array

  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
      {/* THey both are independent */}
      <Suspense fallback={<p>Loading Filters....</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading News....</p>}>
        <FilterdNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
};

export default FilterdNewsPage;
