const WelcomeMsg = ({ initialPosts }) => {
  return (
    <>
      <div className="w-100 mt-5" style={{ maxWidth: "700px" }}>
        <h1 className="h3 text-center">Currently, there are no posts.</h1>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary my-4" onClick={initialPosts}>
            Get Post from Server
          </button>
        </div>
      </div>
    </>
  );
};
export default WelcomeMsg;
