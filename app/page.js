import Link from "next/link";

export default function HomePage() {
  return (
    <div id="home">
      <h1>Next.js Routing & Page Rendering</h1>
      <h3>
        {" "}
        <Link href="/news">Lets go to see News</Link>
      </h3>
    </div>
  );
}
