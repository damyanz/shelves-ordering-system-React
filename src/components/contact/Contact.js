import React, { Component } from "react";
import "./contact.scss";

export default class Contact extends Component {
  render() {
    return (
      <section className="contact">
        <h3>Kontakt</h3>
        <div className="row bg">
          <div className="col-xl-4">
            <div className="sheet">
              <article className="info">
                <strong>COMPANY-NAME Sp. z o.o.</strong>
                <br />
                <p>
                  ul. Garncarska 18
                  <br /> 31-115 Kraków
                  <br />
                  <br />
                  OFFICE + ACCESSORIES:
                  <br />
                  Jan Kowalski
                  <br />
                  e-mail:{" "}
                  <a href="mailto:przykladowy@mail.eu">przykladowy@mail.eu</a>
                  <br />
                  tel: +48 123 123 123
                  <br />
                  <br />
                  NIP: PL123-456-78-90
                  <br />
                  Regon: 123456789
                  <br />
                  <br />
                  tel: +48 (12) 12 34 567 <br />
                  fax: +48 (12) 12 34 567
                </p>
              </article>
            </div>
          </div>
          <div className="col-xl-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.311580781097!2d19.925588715717378!3d50.061726179423616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b0bbe999b81%3A0x3100845afd9d82da!2sGarncarska+18%2C+31-115+Krak%C3%B3w!5e0!3m2!1spl!2spl!4v1553557684083"
              className="map"
              title="location"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    );
  }
}
