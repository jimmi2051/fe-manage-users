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
import { AppContext } from "layout/AppContext";
const API_URL = process.env.REACT_APP_URL_API;
const CustomLink = (props) => <NavLink {...props}>{props.children}</NavLink>;
const UserListPage = (props) => {
  const { user } = useContext(UserContext);
  const { appContext } = useContext(AppContext);
  // Parms for pagination.
  const [totalItems, setTotalItems] = useState(0);
  const [pageActive, setPageActive] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [itemPerPage, setItemPerPage] = useState(10);
  const [keySearch, setKeySearch] = useState("");
  const [userList, setUserList] = useState([]);

  // Func fetch list organization.
  const handleGetUsers = (page, pageSize) => {
    const params = { page, pageSize, keySearch };
    const proListUsers = user.fetchGetUsers(params);
    proListUsers.then((res) => {
      if (res.status) {
        const { data } = res;
        setTotalItems(data.total);
        setUserList([...data.data]);
      } else {
        if (res.errors) {
          res.errors.forEach((error) => {
            appContext.notifyError(
              "Notification",
              `Field error: ${error.field} | Message error: ${error.message}`
            );
          });
        }
      }
    });
  };

  // Componentdidmount
  useEffect(() => {
    handleGetUsers(pageActive, itemPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Col sm={4} md={4} xl={2}>
                <Form inline className="justify-content-end search-user">
                  <FormControl
                    type="text"
                    placeholder="Search by name or email"
                    className="input-search"
                    onChange={(evt) => {
                      console.log("evt ==>", evt);
                      setKeySearch(evt.currentTarget.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleGetUsers(pageActive, itemPerPage);
                        e.preventDefault();
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      handleGetUsers(pageActive, itemPerPage);
                    }}
                    variant="outline-success"
                    className="btn-search"
                  >
                    <i className="fa fa-search" aria-hidden="true" />
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table
                  striped
                  bordered
                  hover
                  size="xl"
                  className="mt-sm-4 user-list"
                >
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: 100 }}>
                        Index
                      </th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Photo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.length > 0 &&
                      userList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{item.email ?? ""}</td>
                            <td>{item.name ?? ""}</td>
                            <td>{item.telephone ?? ""}</td>
                            <td>{item.address ?? ""}</td>
                            <td className="thumbnail">
                              <img
                                src={`${API_URL}${item.photo}`}
                                alt={item.photo}
                                className="thumbnail-image"
                              />
                            </td>
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
export default UserListPage;
