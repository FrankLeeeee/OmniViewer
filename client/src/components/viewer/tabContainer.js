import React from "react";
import ViewerContainer from "@src/components/viewer/viewerContainer";
import StatsContainer from "@src/components/stats/statsContainer";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import apiWrapper from "@src/api_action_wrapper";

export default class TabContainer extends React.Component {
  loadStats = () => {
    apiWrapper.loadStats();
  };

  render() {
    return (
      <Tab.Container defaultActiveKey="viewer">
        <Row>
          <Col>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="viewer">浏览</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="stats" onSelect={this.loadStats}>
                  统计
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    window.open("/manual", "_blank");
                  }}
                >
                  用户手册
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="viewer">
                <ViewerContainer />
              </Tab.Pane>
              <Tab.Pane eventKey="stats">
                <StatsContainer />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}
