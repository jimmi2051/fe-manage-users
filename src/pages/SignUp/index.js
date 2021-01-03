import React, { useRef, useState, useContext } from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import CropImage from "components/cropImage";
import { AppContext } from "layout/AppContext";
import { REGEX_PHONE } from "utils/Constants";
const API_URL = process.env.REACT_APP_URL_API;
export default function SignUpPage() {
  const { appContext } = useContext(AppContext);
  const [preViewImage, setPreviewImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [namePhoto, setNamePhoto] = useState("");
  let [userToCreate, setUserToCreate] = useState({
    email: "",
    name: "",
    address: "",
    telephone: "",
  });
  const [errors, setErrors] = useState([]);
  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    const ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }
  const formRef = useRef(null);
  const handleChangeUser = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    userToCreate[name] = value;
    setUserToCreate({ ...userToCreate });
  };
  const fileSelectHandler = (e) => {
    try {
      let file = e.target.files[0];
      if (file.name.match(/(jpe?g|png)$/i)) {
        const fileName = file.name;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const urlImg = reader.result;
          handleOpenPopupCrop(fileName, urlImg);
        });
        reader.readAsDataURL(e.target.files[0]);
      } else {
        appContext.notifyError("Notification", "The file selected is invalid.");
        return;
      }
    } catch {}
  };

  const handleOpenPopupCrop = (fileName, urlImg) => {
    setNamePhoto(fileName);
    setPreviewImage(urlImg);
    setShowPopup(true);
  };
  const handleReset = () => {
    formRef.current.reset();
    setUserToCreate({
      email: "",
      name: "",
      address: "",
      telephone: "",
    });
    setNamePhoto("");
    setPreviewImage("");
    setErrors([]);
  };
  const handleSaveUrlImg = (url) => {
    setPreviewImage(url);
    setShowPopup(false);
  };
  const handleValidate = (user) => {
    let isValidate = true;
    let tempErrors = [];
    if (!user.name || user.name === "") {
      let error = {
        field: "name",
        message: "Name is require!",
      };
      tempErrors.push(error);
      isValidate = false;
    }
    if (!user.email || user.email === "") {
      let error = {
        field: "email",
        message: "Email is require!",
      };
      tempErrors.push(error);
      isValidate = false;
    }
    if (!preViewImage || preViewImage === "") {
      let error = {
        field: "photo",
        message: "Photo is require!",
      };
      tempErrors.push(error);
      isValidate = false;
    }
    if (user.telephone && !REGEX_PHONE.test(user.telephone)) {
      let error = {
        field: "telephone",
        message: "Phone is Phone number is invalid format!",
      };
      tempErrors.push(error);
      isValidate = false;
    }
    setErrors([...tempErrors]);
    return isValidate;
  };
  const handleSignUp = () => {
    if (handleValidate(userToCreate)) {
      const formData = new FormData();
      if (preViewImage && preViewImage !== "") {
        const blob = dataURItoBlob(preViewImage);
        const file = new File([blob], namePhoto);
        formData.append("photo", file, namePhoto);
      }
      formData.append("email", userToCreate.email);
      formData.append("name", userToCreate.name);
      formData.append("address", userToCreate.address);
      formData.append("telephone", userToCreate.telephone);

      fetch(`${API_URL}/api/v0/signup`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status) {
            setErrors([]);
            appContext.notifySuccess(
              "Notification",
              `Sign Up Successfully. Your information: ${JSON.stringify(
                result.data
              )}`
            );
            handleReset();
          } else {
            if (result.errors) {
              setErrors([...result.errors]);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          appContext.notifyError("Notification", `Message error: ${error}`);
        });
    } else {
      appContext.notifyError(
        "Notification",
        "Validate fields failed. Please check and try again!"
      );
    }
  };
  const findError = (name) => {
    return errors.findIndex((error) => error.field === name);
  };
  return (
    <Row>
      {showPopup && (
        <CropImage
          show={showPopup}
          title={"Upload photo"}
          handleClose={() => {
            setShowPopup(false);
            setPreviewImage("");
            setNamePhoto("");
          }}
          urlImg={preViewImage}
          handleSave={handleSaveUrlImg}
        />
      )}
      <Col>
        <Card>
          <Card.Header as="h5">Sign Up</Card.Header>
          <Card.Body>
            <Row className="justify-content-md-center">
              <Col xl={8}>
                <Form ref={formRef}>
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                      Email (*):
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        onChange={handleChangeUser}
                        name="email"
                        type="text"
                        placeholder="Your email"
                        className={findError("email") > -1 ? "input-error" : ""}
                      />
                    </Col>
                    {findError("email") > -1 && (
                      <>
                        <Form.Label column sm="2"></Form.Label>
                        <Col sm="10">
                          {errors.map((error, index) => {
                            if (error.field === "email") {
                              return (
                                <Form.Text key={index} className="text-danger">
                                  (*) {error.message}{" "}
                                </Form.Text>
                              );
                            }
                          })}{" "}
                        </Col>
                      </>
                    )}
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextName">
                    <Form.Label column sm="2">
                      Name (*):
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        onChange={handleChangeUser}
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className={findError("name") > -1 ? "input-error" : ""}
                      />
                    </Col>
                    {findError("name") > -1 && (
                      <>
                        <Form.Label column sm="2"></Form.Label>
                        <Col sm="10">
                          {errors.map((error, index) => {
                            if (error.field === "name") {
                              return (
                                <Form.Text key={index} className="text-danger">
                                  (*) {error.message}{" "}
                                </Form.Text>
                              );
                            }
                          })}{" "}
                        </Col>
                      </>
                    )}
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextAdress">
                    <Form.Label column sm="2">
                      Address:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        onChange={handleChangeUser}
                        name="address"
                        type="text"
                        placeholder="Your adress"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextPhone">
                    <Form.Label column sm="2">
                      Phone number:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        onChange={handleChangeUser}
                        name="telephone"
                        type="text"
                        placeholder="Your phone number"
                        className={
                          findError("telephone") > -1 ? "input-error" : ""
                        }
                      />
                    </Col>
                    {findError("telephone") > -1 && (
                      <>
                        <Form.Label column sm="2"></Form.Label>
                        <Col sm="10">
                          {errors.map((error, index) => {
                            if (error.field === "telephone") {
                              return (
                                <Form.Text key={index} className="text-danger">
                                  (*) {error.message}{" "}
                                </Form.Text>
                              );
                            }
                          })}{" "}
                        </Col>
                      </>
                    )}
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextPhoto">
                    <Form.Label column sm="2">
                      Photo (*):
                    </Form.Label>
                    <Col sm="10">
                      <div className="custom-file">
                        <input
                          type="file"
                          className={
                            findError("photo") > -1
                              ? "input-error custom-file-input"
                              : "custom-file-input"
                          }
                          onChange={fileSelectHandler}
                          id="customFile"
                          lang="en"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          {namePhoto && namePhoto !== ""
                            ? namePhoto
                            : "Choose file"}
                        </label>
                      </div>
                    </Col>
                    {findError("photo") > -1 && (
                      <>
                        <Form.Label column sm="2"></Form.Label>
                        <Col sm="10">
                          {errors.map((error, index) => {
                            if (error.field === "photo") {
                              return (
                                <Form.Text key={index} className="text-danger">
                                  (*) {error.message}{" "}
                                </Form.Text>
                              );
                            }
                          })}{" "}
                        </Col>
                      </>
                    )}
                  </Form.Group>
                  {preViewImage && preViewImage !== "" && (
                    <Form.Group as={Row} controlId="formPlaintextPhoto">
                      <Form.Label column sm="2">
                        Preview Photo:
                      </Form.Label>
                      <Col sm="10" className="thumbnail-preview">
                        <img
                          className="thumbnail-preview-image"
                          src={preViewImage}
                          alt={namePhoto}
                        />
                        <Button
                          onClick={() => {
                            handleOpenPopupCrop(namePhoto, preViewImage);
                          }}
                          variant="outline-success mr-2"
                          className="btn-edit"
                        >
                          <i className="fa fa-edit"></i>
                        </Button>{" "}
                        <Button
                          onClick={() => {
                            setNamePhoto("");
                            setPreviewImage("");
                          }}
                          variant="outline-danger ml-2"
                          className="btn-remove"
                        >
                          <i className="fa fa-remove"></i>
                        </Button>{" "}
                      </Col>
                    </Form.Group>
                  )}
                  <Form.Group
                    as={Row}
                    className="justify-content-center mt-5"
                    controlId="formPlaintextEmail"
                  >
                    <Col className="text-center" sm="6">
                      <Button
                        onClick={handleSignUp}
                        variant="outline-primary mr-2"
                      >
                        Submit
                      </Button>{" "}
                      <Button
                        onClick={handleReset}
                        variant="outline-secondary ml-2"
                      >
                        Reset
                      </Button>{" "}
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
