import { IoHome } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { PiSidebarSimpleDuotone } from "react-icons/pi";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <>
      {/***************** Start Mobile Sidebar ************************/}
      <div
        className="d-flex flex-column flex-shrink-0 bg-body-tertiary d-block d-md-none"
        style={{ width: "4.5rem" }}
      >
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li className="nav-item" onClick={() => setSelectedTab("Home")}>
            <a
              href="#"
              className={`nav-link py-3 border-bottom rounded-0 ${
                selectedTab === "Home" && "active"
              }`}
              aria-current="page"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              aria-label="Home"
              data-bs-original-title="Home"
            >
              <IoHome size={25} />
            </a>
          </li>
          <li onClick={() => setSelectedTab("Create Post")}>
            <a
              href="#"
              className={`nav-link py-3 border-bottom rounded-0 ${
                selectedTab === "Create Post" && "active"
              }`}
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              aria-label="Dashboard"
              data-bs-original-title="Dashboard"
            >
              <MdOutlinePostAdd size={30} />
            </a>
          </li>
        </ul>
        <div className="dropdown border-top">
          <a
            href="/"
            className="d-flex align-items-center justify-content-center p-3 link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width="24"
              height="24"
              className="rounded-circle"
            />
          </a>
        </div>
      </div>

      {/***************** End Mobile Sidebar ************************/}

      {/***************** Start Desktop Sidebar ************************/}
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary d-none d-md-block min-vh-80 container-1200"
        style={{ width: "200px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <PiSidebarSimpleDuotone size={20} />
          <span className="fs-5 ms-3">Navigation</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto h-75">
          <li className="nav-item" onClick={() => setSelectedTab("Home")}>
            <a
              href="#"
              className={` nav-link ${
                selectedTab === "Home" ? "active" : "link-body-emphasis"
              }`}
              aria-current="page"
            >
              <div className="d-flex align-items-center gap-2">
                <IoHome size={15} />
                <span>Home</span>
              </div>
            </a>
          </li>
          <li onClick={() => setSelectedTab("Create Post")}>
            <a
              href="#"
              className={` nav-link ${
                selectedTab === "Create Post" ? "active" : "link-body-emphasis"
              }`}
            >
              <div className="d-flex align-items-center gap-2">
                <MdOutlinePostAdd size={18} />
                <span> Create Post</span>
              </div>
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />{" "}
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/***************** End Desktop Sidebar ************************/}
    </>
  );
};

export default Sidebar;
