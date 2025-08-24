import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import { useState } from "react";
import PostListProvider from "../src/store/post-list-store";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");
  return (
    <div className="d-flex flex-column min-vh-100">
      <PostListProvider>
        <Header />
        <div className="d-flex flex-grow-1">
          <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <main className="flex-grow-1 px-4 pt-4 bg-white">
            {selectedTab === "Home" ? <PostList /> : <CreatePost />}
          </main>
        </div>
        <Footer />
      </PostListProvider>
    </div>
  );
}

export default App;
