import React, { useState } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const CropImage = (props) => {
  const {
    show = false,
    handleClose = () => {},
    handleSave = () => {},
    title = "",
    urlImg = "",
  } = props;

  const [isCropped, setCropped] = useState(false);

  let cropper;
  const cropImage = () => {
    if (cropper === null && typeof cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    const dataUrl = cropper.getCroppedCanvas().toDataURL();
    handleSave(dataUrl);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      className="modal-building"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {isCropped ? (
        <div>
          <Modal.Body>
            <Row>
              <Col md="8">
                <h4>Crop image</h4>
                <Cropper
                  ref={(ref) => {
                    cropper = ref;
                  }}
                  src={urlImg}
                  style={{ height: 400, width: "100%" }}
                  preview=".img-preview"
                  aspectRatio={16 / 9}
                  guides={false}
                />
              </Col>
              <Col md="4">
                <div style={{ marginTop: "10px" }}>
                  <h4>Preview</h4>
                  <div
                    className="img-preview"
                    style={{ width: "100%", height: 300, overflow: "hidden" }}
                  />
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={() => cropImage()}>
              Crop and Save
            </Button>{" "}
            <Button
              onClick={() => {
                setCropped(false);
              }}
              variant="danger"
            >
              Back
            </Button>{" "}
          </Modal.Footer>
        </div>
      ) : (
        <div>
          <Modal.Body>
            <div className="row">
              <div className="col-xl-12">
                <img src={urlImg} style={{ width: "100%" }} alt="#" />
              </div>
            </div>
            <div className="text-center">
              <Button
                variant="success"
                onClick={() => {
                  setCropped(true);
                }}
                className="mt-3"
              >
                Crop
              </Button>{" "}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handleSave(urlImg);
              }}
            >
              Save
            </Button>{" "}
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      )}
    </Modal>
  );
};
export default CropImage;
