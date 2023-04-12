import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Carousel } from "react-bootstrap";

import "./CompareModal.css";

export default function MyVerticallyCenteredModal(props) {
  console.log(props.compareList);
  console.log(props.bookingData);
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Compare Hotels
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="hotel-room-comparison">
          <Table>
            <thead>
              <tr>
                <th></th>
                {props.compareList.map((data) => (
                  <th>{data.title2}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Images</td>
                {props.compareList.map((data) => (
                  <td>
                    <Carousel>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={props.bookingData.imgurl}
                          alt="Room 1 Image 1"
                          style={{ objectFit: "cover" }}
                        />
                      </Carousel.Item>
                      <Carousel.Item>
                        <img
                          className="d-block w-100"
                          src={props.bookingData.imgurl}
                          alt="Room 1 Image 2"
                          style={{ objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    </Carousel>
                  </td>
                ))}
              </tr>
              <tr>
                <td>Balcony</td>
                {props.compareList.map((data) =>
                  data.Balcony ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>Beside Table</td>
                {props.compareList.map((data) =>
                  data.Beside_Table ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>Fan</td>
                {props.compareList.map((data) =>
                  data.Fan ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>Guest Reviews</td>
                {props.compareList.map((data) =>
                  data.Guest_Reviews ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>House Keeping</td>
                {props.compareList.map((data) =>
                  data.House_Keeping ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              {/* <tr>
                <td>Room Amenities</td>
                {props.compareList.map((data) =>
                  data.Room_Amenities ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr> */}
              <tr>
                <td>Wardrobe</td>
                {props.compareList.map((data) =>
                  data.Wadrobe ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>Wifi</td>
                {props.compareList.map((data) =>
                  data.Wifi ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>Adults</td>
                {props.compareList.map((data) =>
                  data.adults ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>AC</td>
                {props.compareList.map((data) =>
                  data.airconditioned ? (
                    <td>
                      <FaCheck color="green" />
                    </td>
                  ) : (
                    <td>
                      <FaTimes color="red" />
                    </td>
                  )
                )}
              </tr>
              <tr>
                <td>Room Rate</td>
                {props.compareList.map((data) => (
                  <td>{data.perRoom}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div></div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

