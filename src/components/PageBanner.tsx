const PageBanner = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <section className="banner-area page-banner">
      <div className="container">
        <div className="page-title">
          <h1>{pageTitle}</h1>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
