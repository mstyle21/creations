type PageBannerProps = {
  pageTitle: string;
  admin?: boolean;
};

const PageBanner = ({ pageTitle, admin = false }: PageBannerProps) => {
  return (
    <section className={`banner-area ${admin ? "admin-" : ""}page-banner`}>
      <div className="container">
        <div className="page-title">
          <h1>{pageTitle}</h1>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
