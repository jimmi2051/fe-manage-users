import React, { useContext, useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Card,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import Pagination from "react-js-pagination";
import { UserContext } from "contexts/User";
import { NavLink } from "react-router-dom";
const CustomLink = (props) => <NavLink {...props}>{props.children}</NavLink>;
const BuildingPage = (props) => {
  const { user } = useContext(UserContext);
  // Parms for pagination.
  const [totalItems, setTotalItems] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);

  const [userList, setUserList] = useState([]);

  // Func fetch list organization.
  const handleGetUsers = (page, pageActive) => {
    const params = { page, pageActive };
    const proListUsers = user.fetchGetUsers(params);
    proListUsers.then((res) => {
      if (res.status) {
        const { data } = res;
        setTotalItems(data.total);
        setUserList([...data.data]);
      }
    });
    // const proListBuilding = buildings.fetchBuilding(pageActive, itemPerPage);
    // proListBuilding.then((res) => {
    //   const { buildings } = res;
    //   if (buildings) {
    //     setListBuilding(buildings.rows);
    //     setTotalItems(buildings.count);
    //   }
    // });
  };

  // Componentdidmount
  useEffect(() => {
    handleGetUsers(pageActive, itemPerPage);
  }, []);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header as="h5">User List</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Button
                  as={CustomLink}
                  to="/sign-up"
                  href="/sign-up"
                  variant="dark"
                >
                  Sign Up
                </Button>
              </Col>
              <Col>
                <Form inline className="justify-content-end">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover size="xl" className="mt-sm-4">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Phone number</th>
                      <th>Address</th>
                      <th>Photo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.length > 0 &&
                      userList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item._id}</td>
                            <td>{item.email}</td>
                            <td>{item.name}</td>
                            <td>{item.telephone}</td>
                            <td>{item.address}</td>
                            <td>{item.photo}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <Pagination
                  activePage={pageActive}
                  itemsCountPerPage={itemPerPage}
                  totalItemsCount={totalItems}
                  pageRangeDisplayed={5}
                  onChange={(pageActive) => {
                    setPageActive(pageActive);
                    handleGetUsers(pageActive, itemPerPage);
                  }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default BuildingPage;
