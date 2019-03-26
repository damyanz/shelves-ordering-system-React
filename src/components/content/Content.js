import React, { Component } from "react";
import "./content.scss";
import Visualisation from "./visualisation/Visualisation";
import Options from "./options/Options";
//import Shelves from "./Shelves/Shelves";
import Loader from "../loader/Loader";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Link } from "react-router-dom";

export default class Content extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      color: "#000000",
      data_m: null,
      data_p: null,
      dims: {
        w: 70,
        h: 50,
        d: 70
      },
      type: false,
      mountingType: null,
      legsType: false,
      amount: 2,
      materials: [[null, null], [null, null]],
      summary: null,
      user: null,
      orderPlaced: false,
      optMsg: ""
    };
  }
  getData = () => {
    const WizDB = firebase.database().ref("/wizualizacja");
    WizDB.on("value", data => {
      const val = data.val();
      const summaryObj = {};
      val.czesci.map(item => {
        const { nazwa, jednostka, netto } = item.szczegoly;
        summaryObj[item.typ] = {
          nazwa: nazwa,
          jednostka: jednostka,
          netto: parseFloat(netto).toFixed(2),
          brutto: (parseFloat(netto) * 1.23).toFixed(2)
        };
        return null;
      });

      summaryObj.materialy = [];
      summaryObj.suma = {};

      this.setState(
        {
          data_p: val.czesci,
          data_m: val.materialy.lista,
          marza_m: val.materialy.marza,
          summary: summaryObj
        },
        () => this.updateSummary()
      );
    });
  };

  userListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (this._isMounted) this.setState({ user: user.uid });
      } else {
        if (this._isMounted) this.setState({ user: null });
      }
    });
  };
  addPart = name => {};
  updateSummary = () => {
    const {
      profilA,
      profilB,
      nogi,
      fasolki,
      kolki,
      zaslepki,
      zlaczka3,
      zlaczka4,
      marza
    } = this.state.summary;

    const { w, h, d } = this.state.dims;
    const newSummary = { ...this.state.summary };
    newSummary.wymiary = this.state.dims;
    newSummary.ilosc_polek = this.state.amount;

    newSummary.profilA.ilosc = 0;
    newSummary.profilA.w_netto = 0;
    newSummary.profilA.w_brutto = 0;
    newSummary.profilB.ilosc = 0;
    newSummary.profilB.w_netto = 0;
    newSummary.profilB.w_brutto = 0;

    if (this.state.type) {
      newSummary.nogi.ilosc = 1;
      newSummary.fasolki.ilosc = 0;
      newSummary.kolki.ilosc = 0;
      newSummary.zaslepki.ilosc = 0;
      newSummary.zlaczka3.ilosc = 4;
      newSummary.zlaczka4.ilosc = (this.state.amount - 1) * 4;
    } else {
      if (this.state.mountingType == 1) {
        newSummary.kolki.ilosc = 1;
        newSummary.zaslepki.ilosc = 1;
        newSummary.fasolki.ilosc = 0;
      } else if (this.state.mountingType == 0) {
        newSummary.fasolki.ilosc = 1;
        newSummary.zaslepki.ilosc = 0;
        newSummary.kolki.ilosc = 0;
      } else {
        newSummary.fasolki.ilosc = 0;
        newSummary.zaslepki.ilosc = 0;
        newSummary.kolki.ilosc = 0;
      }
      newSummary.nogi.ilosc = 0;
      newSummary.zlaczka3.ilosc = 8;
      newSummary.zlaczka4.ilosc = (this.state.amount - 2) * 4;
    }
    const marza_ulamek = marza.netto * 0.01 + 1;
    const marza_m_ulamek = this.state.marza_m * 0.01 + 1;

    newSummary.nogi.w_netto = nogi.netto * nogi.ilosc * marza_ulamek;
    newSummary.nogi.w_brutto = nogi.brutto * nogi.ilosc;
    newSummary.fasolki.w_netto = fasolki.netto * fasolki.ilosc * marza_ulamek;
    newSummary.fasolki.w_brutto = fasolki.brutto * fasolki.ilosc;
    newSummary.zaslepki.w_netto =
      zaslepki.netto * zaslepki.ilosc * marza_ulamek;
    newSummary.zaslepki.w_brutto = zaslepki.brutto * zaslepki.ilosc;
    newSummary.kolki.w_netto = kolki.netto * kolki.ilosc * marza_ulamek;
    newSummary.kolki.w_brutto = kolki.brutto * kolki.ilosc;
    newSummary.zlaczka3.w_netto =
      zlaczka3.ilosc * zlaczka3.netto * marza_ulamek;
    newSummary.zlaczka3.w_brutto = zlaczka3.brutto * zlaczka3.ilosc;
    newSummary.zlaczka4.w_netto =
      zlaczka4.ilosc * zlaczka4.netto * marza_ulamek;
    newSummary.zlaczka4.w_brutto = zlaczka4.brutto * zlaczka4.ilosc;

    newSummary.suma.netto = 0;
    newSummary.suma.brutto = 0;

    newSummary.materialy = [];
    this.state.materials.map((item, i) => {
      if (item[0] !== null) {
        newSummary.materialy.push({
          wymiar: (w - 4) * (d - 4) * 0.0001,
          typ: this.state.data_m[item[0]].typ,
          rodzaj: this.state.data_m[item[0]].rodzaje[item[1]],
          w_netto: parseFloat(
            (w - 4) *
              (d - 4) *
              0.0001 *
              this.state.data_m[item[0]].rodzaje[item[1]].cena
          ),
          w_brutto: parseFloat(
            (w - 4) *
              (d - 4) *
              0.0001 *
              this.state.data_m[item[0]].rodzaje[item[1]].cena *
              1.23
          )
        });

        if (parseInt(w) > parseInt(d)) {
          newSummary.profilA.ilosc += 2 * (d - 4) * 0.01;
          newSummary.profilB.ilosc += 2 * (w - 4) * 0.01;
        } else {
          newSummary.profilA.ilosc += 2 * (w - 4) * 0.01;
          newSummary.profilB.ilosc += 2 * (d - 4) * 0.01;
        }
      } else {
        newSummary.profilA.ilosc += (2 * (w - 4) + 2 * (d - 4)) * 0.01;
        //   (newSummary.profilA.ilosc + (2 * (w - 4) + 2 * (d - 4))) * 0.01;

        newSummary.materialy.push(null);
      }
      if (newSummary.materialy[i] !== null) {
        newSummary.suma.netto =
          parseFloat(newSummary.suma.netto) +
          newSummary.materialy[i].w_netto * marza_m_ulamek;
        newSummary.suma.brutto =
          parseFloat(newSummary.suma.brutto) + newSummary.materialy[i].w_brutto;
      }
      return null;
    });

    newSummary.profilA.ilosc += (4 * h - 8 * this.state.amount) * 0.01;
    newSummary.profilA.w_netto =
      profilA.netto * newSummary.profilA.ilosc * marza_ulamek;
    newSummary.profilA.w_brutto = profilA.brutto * newSummary.profilA.ilosc;
    newSummary.profilB.w_netto =
      profilB.netto * newSummary.profilB.ilosc * marza_ulamek;
    newSummary.profilB.w_brutto = profilB.brutto * newSummary.profilB.ilosc;

    newSummary.suma.netto = (
      newSummary.suma.netto +
      newSummary.profilA.w_netto +
      newSummary.profilB.w_netto +
      newSummary.nogi.w_netto +
      newSummary.fasolki.w_netto +
      newSummary.kolki.w_netto +
      newSummary.zaslepki.w_netto +
      newSummary.zlaczka3.w_netto +
      newSummary.zlaczka4.w_netto
    ).toFixed(2);
    newSummary.suma.brutto = (parseFloat(newSummary.suma.netto) * 1.23).toFixed(
      2
    );

    this.setState({
      summary: newSummary
    });
  };

  componentDidMount() {
    this._isMounted = true;

    this.getData();
    this.userListener();
  }

  placeOrder = () => {
    const { user, summary, optMsg } = this.state;
    const timestamp = new Date().getTime();
    firebase
      .database()
      .ref(`users/${user}/orders/${timestamp}`)
      .set({
        timestamp
      });
    firebase
      .database()
      .ref(`orders/${timestamp}`)
      .set({
        numer: timestamp,
        uzytkownik: user,
        data: new Date().toLocaleString("pl"),
        szczegoly: summary,
        timestamp: timestamp,
        status: 0,
        uwagi: optMsg
      })
      .then(() =>
        this.setState(
          {
            orderPlaced: true
          },
          () => {
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
              this.setState({ orderPlaced: false });
            }, 5000);
          }
        )
      );
  };

  updateOptionalMessage = e => {
    this.setState({
      optMsg: e.target.value
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
    this.userListener();
  }

  changeMaterials = arr => {
    this.setState(
      {
        materials: arr
      },
      () => this.updateSummary()
    );
  };
  changeDims = (type, val) => {
    let dims = { ...this.state.dims };
    switch (type) {
      case "w":
        dims.w = val;
        break;
      case "h":
        dims.h = val;
        break;
      case "d":
        dims.d = val;
        break;
      default:
        break;
    }
    this.setState({ dims }, () => this.updateSummary());
  };

  changeType = type => {
    this.setState(
      {
        type: type
      },
      () => this.updateSummary()
    );
  };
  changeMountingType = type => {
    this.setState(
      {
        mountingType: type
      },
      () => this.updateSummary()
    );
  };

  changeAmount = amount => {
    this.setState(
      {
        amount: amount
      },
      () => this.updateSummary()
    );
  };

  generatePlates = data => {
    let temp = [...this.state.materials];
    temp[data.id] = data.arr;
    this.setState(
      {
        materials: temp
      },
      () => this.updateSummary()
    );
  };

  render() {
    return (
      <div className="main">
        {this.state.data_m && this.state.data_p ? (
          <div>
            <div className="row">
              <div className="col-xl-8 visualisation">
                <Visualisation
                  materialsArr={this.state.materials}
                  dims={this.state.dims}
                  type={this.state.type}
                  amount={this.state.amount}
                  data={this.state.data_m}
                />

                {this.state.summary.suma.netto && (
                  <SummaryTable
                    w_netto={this.state.summary.suma.netto}
                    w_brutto={this.state.summary.suma.brutto}
                  />
                )}
              </div>
              <div className="col-xl-4 options">
                <Options
                  data={this.state.data_m}
                  handleDims={this.changeDims}
                  handleType={this.changeType}
                  handleMountingType={this.changeMountingType}
                  handleAmount={this.changeAmount}
                  handleMaterials={this.changeMaterials}
                  shelvesData={this.state.data_m}
                  shelvesAmount={this.state.amount}
                  shelvesGeneratePlates={this.generatePlates}
                />
                {this.state.user ? (
                  <div className="optMsgBox">
                    <textarea
                      className="optMsg"
                      placeholder="Uwagi do zamówienia (opcjonalnie)"
                      value={this.state.optMsg}
                      onChange={this.updateOptionalMessage}
                    />
                  </div>
                ) : null}
                <div className="buttonbox">
                  <button
                    type="submit"
                    className={this.state.user ? "redButton" : "grayButton"}
                    disabled={!this.state.user}
                    onClick={this.placeOrder}
                  >
                    ZŁÓŻ ZAMÓWIENIE
                  </button>
                </div>
                {!this.state.user ? (
                  <small>
                    Proszę się{" "}
                    <Link to="/zaloguj">
                      <strong>zalogować</strong>
                    </Link>
                    , aby złożyć zamówienie.
                  </small>
                ) : null}
                {this.state.orderPlaced && (
                  <div className="alert alert-success">
                    <strong>Sukces!</strong> Twoje zamówienie zostało złożone.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export const SummaryTable = ({ w_netto, w_brutto }) => {
  return (
    <div className="table-responsive">
      <table className="table table-sm">
        <thead className="text-uppercase">
          <tr>
            <th scope="col" />
            <th scope="col">netto</th>
            <th scope="col">brutto</th>
          </tr>
        </thead>
        <tbody>
          <tr />
        </tbody>
        <tfoot className="text-uppercase">
          <tr className="sum">
            <td>Suma:</td>
            <td className="price">{w_netto.replace(".", ",")} zł</td>
            <td className="price">{w_brutto.replace(".", ",")} zł</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
