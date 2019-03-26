import React, { Component } from "react";
import "./summary.scss";
export default class Summary extends Component {
  render() {
    const {
      profilA,
      profilB,
      nogi,
      kolki,
      zaslepki,
      fasolki,
      zlaczka3,
      zlaczka4,
      suma,
      materialy,
      marza
    } = this.props.summary;
    const partsArr = [];
    const materialArr = [];
    materialy.map((item, i) => {
      if (item !== null) {
        materialArr.push(
          <tr key={i}>
            <td>
              {item.typ} - {item.rodzaj.nazwa}
            </td>
            <td>{item.rodzaj.cena.toFixed(2)}</td>
            <td>{(item.rodzaj.cena * 1.23).toFixed(2)}</td>
            <td>
              {item.wymiar.toFixed(2)} m<sup>2</sup>
            </td>
            <td>{item.w_netto.toFixed(2)}</td>
            <td>{item.w_brutto.toFixed(2)}</td>
          </tr>
        );
      }
    });

    return (
      <div>
        <h3>Podsumowanie</h3>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-sm">
            <thead className="text-uppercase">
              <tr>
                <th scope="col">produkt</th>
                <th scope="col">cena netto(pln)</th>
                <th scope="col">cena brutto(pln)</th>
                <th scope="col">ilość</th>
                <th scope="col">wartość netto(pln)</th>
                <th scope="col">wartość brutto(pln)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fit">{profilA.nazwa}</td>
                <td>{profilA.netto}</td>
                <td>{profilA.brutto}</td>
                <td className="fit">
                  {profilA.ilosc} {profilA.jednostka}
                </td>
                <td>{profilA.w_netto}</td>
                <td>{profilA.w_brutto}</td>
              </tr>
              <tr>
                <td className="fit">{profilB.nazwa}</td>
                <td>{profilB.netto}</td>
                <td>{profilB.brutto}</td>
                <td className="fit">
                  {profilB.ilosc} {profilB.jednostka}
                </td>
                <td>{profilB.w_netto}</td>
                <td>{profilB.w_brutto}</td>
              </tr>
              {nogi.ilosc !== 0 ? (
                <tr>
                  <td className="fit">{nogi.nazwa}</td>
                  <td>{nogi.netto}</td>
                  <td>{nogi.brutto}</td>
                  <td className="fit">{nogi.jednostka}</td>
                  <td>{nogi.w_netto}</td>
                  <td>{nogi.w_brutto}</td>
                </tr>
              ) : fasolki.ilosc !== 0 ? (
                <tr>
                  <td className="fit">{fasolki.nazwa}</td>
                  <td>{fasolki.netto}</td>
                  <td>{fasolki.brutto}</td>
                  <td className="fit">{fasolki.jednostka}</td>
                  <td>{fasolki.w_netto}</td>
                  <td>{fasolki.w_brutto}</td>
                </tr>
              ) : kolki.ilosc !== 0 ? (
                <tr>
                  <td className="fit">{kolki.nazwa}</td>
                  <td>{kolki.netto}</td>
                  <td>{kolki.brutto}</td>
                  <td className="fit">{kolki.jednostka}</td>
                  <td>{kolki.w_netto}</td>
                  <td>{kolki.w_brutto}</td>
                </tr>
              ) : null}
              {zaslepki.ilosc !== 0 ? (
                <tr>
                  <td className="fit">{zaslepki.nazwa}</td>
                  <td>{zaslepki.netto}</td>
                  <td>{zaslepki.brutto}</td>
                  <td className="fit">{zaslepki.jednostka}</td>
                  <td>{zaslepki.w_netto}</td>
                  <td>{zaslepki.w_brutto}</td>
                </tr>
              ) : null}
              <tr>
                <td className="fit">{zlaczka3.nazwa}</td>
                <td>{zlaczka3.netto}</td>
                <td>{zlaczka3.brutto}</td>
                <td className="fit">
                  {zlaczka3.ilosc} {zlaczka3.jednostka}
                </td>
                <td>{zlaczka3.w_netto}</td>
                <td>{zlaczka3.w_brutto}</td>
              </tr>
              {zlaczka4.ilosc !== 0 ? (
                <tr>
                  <td className="fit">{zlaczka4.nazwa}</td>
                  <td>{zlaczka4.netto}</td>
                  <td>{zlaczka4.brutto}</td>
                  <td className="fit">
                    {zlaczka4.ilosc} {zlaczka4.jednostka}
                  </td>
                  <td>{zlaczka4.w_netto}</td>
                  <td>{zlaczka4.w_brutto}</td>
                </tr>
              ) : null}
              {materialArr}
              <tr>
                <td className="fit">{marza.nazwa}</td>
                <td>-</td>
                <td>-</td>
                <td className="fit">{marza.jednostka}</td>
                <td>{marza.netto}</td>
                <td>{marza.netto}</td>
              </tr>
            </tbody>
            <tfoot className="text-uppercase">
              <tr className="sum">
                <td colSpan="4">Suma:</td>
                <td className="price">{suma.netto}</td>
                <td className="price">{suma.brutto}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}
