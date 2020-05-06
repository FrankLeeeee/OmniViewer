import React from "react";
import logo from "@public/assets/logo.png";
import "@src/static/user_manual_style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Search from "@src/components/manual/search";
import FileSystem from "@src/components/manual/fileSystem";
import Image from "@src/components/manual/image";
import Video from "@src/components/manual/video";
import ListAndTsv from "@src/components/manual/listAndTsv";

export default class ManualPage extends React.Component {
  render() {
    return (
      <div className="d-flex fluid-container">
        <Tab.Container defaultActiveKey="search">
          <Nav
            className="bg-light border-right flex-column"
            id="sidebar-wrapper"
          >
            <div className="sidebar-heading">
              <img
                src={logo}
                width="25"
                alt="home_logo"
                className="float-left mr-2"
              />
              OmniViewer
            </div>

            <Nav.Item>
              <Nav.Link eventKey="search">Search</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="file-system">File System</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="image">Image</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="video">Video</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="list-and-tsv">List & TSV</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="w-100">
            <Tab.Pane eventKey="search" className="text-center">
              <div className="mt-5 container">
                <Search />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="file-system" className="text-center">
              <div className="mt-5 container">
                <FileSystem />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="image" className="text-center">
              <div className="mt-5 container">
                <Image />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="video" className="text-center">
              <div className="mt-5 container">
                <Video />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="list-and-tsv" className="text-center">
              <div className="mt-5 container">
                <ListAndTsv />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    );
  }
}
