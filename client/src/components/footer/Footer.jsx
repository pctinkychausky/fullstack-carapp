import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <MDBFooter
        className="text-center"
        color="white"
        bgColor="none"
        style={{
          backgroundColor: "#0971f1",
        }}
      >
        <MDBContainer className="p-4">
          <section className="mb-4">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="facebook-f" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="twitter" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="google" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="instagram" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="linkedin-in" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="github" />
            </a>
          </section>

          <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto"></div>
              </div>
            </form>
          </section>

          <section className="">
            <MDBRow>
              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Rentalcar.com</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Nelson House
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Dereham
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Norfolk NR19 1DJ
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      United Kingdom
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase"> About us</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Travel Info
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Need help? Call:</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      01362 852288
                    </a>
                  </li>
                </ul>
                <h5 className="text-uppercase">From outside the UK:</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      +44 1362 852288
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">Office Opening Hours:</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Monday to Saturday & Bank Holidays: 08:00 HRS - 17:00 HRS
                      (UK)
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Sunday: Closed
                    </a>
                  </li>
                </ul>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            Economy Car Hire Ltd t/a Zest Car Rental
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer;
