import MainHeader from "@/components/main-header";

export const metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

const ContentLayout = ({ children }) => {
  return (
    <div id="page">
      <MainHeader />
      {children}
    </div>
  );
};

export default ContentLayout;
