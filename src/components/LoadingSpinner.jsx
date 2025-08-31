const LoadingSpinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border mt-5 fs-3"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
