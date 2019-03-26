import React, { Component } from "react";
import "./gallery.scss";
import Lightbox from "react-images";
export default class Gallery extends Component {
  state = {
    currentImage: 0
  };

  componentDidMount() {
    this.createThumbs();
  }

  toggleLightbox = (val, img = 0) => {
    this.setState({
      currentImage: img,
      lightboxIsOpen: val
    });
  };

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  createThumbs = () => {
    let elArr = [];
    let rowArr = [];
    images.map((item, i) => {
      const img = (
        <img
          key={i}
          src={item.thumb}
          alt={`Zdjęcie ${i}`}
          onClick={() => this.toggleLightbox(true, i)}
        />
      );
      rowArr.push(img);

      if (i % 3 === 2) {
        elArr.push(
          <div key={i} className="gallery__row">
            {rowArr}
          </div>
        );
        rowArr = [];
      }
      return null;
    });

    return elArr;
  };
  render() {
    return (
      <section className="gallery">
        <h3>Galeria zdjęć</h3>
        <Lightbox
          images={images}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          onClose={() => this.toggleLightbox(false)}
        />
        <div className="gallery__grid">{this.createThumbs()}</div>
      </section>
    );
  }
}
const images = [
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2F0.jpeg?alt=media&token=ee0a0f9c-8fef-4dad-8405-c5cef1c4406e",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2F0.jpeg?alt=media&token=a811c817-a0db-4886-b646-deb3e153f7c2"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2F1.jpeg?alt=media&token=21cfd3e3-2a6f-46ed-8a46-c7963e231edd",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2F1.jpeg?alt=media&token=6b8cd3c2-652e-4fd6-b74a-75a50fc4887e"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2F2.jpeg?alt=media&token=67965e1c-8dd5-4cca-82a8-80fca891a0d9",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2F2.jpeg?alt=media&token=a561374c-4d85-4336-b8a0-85c53bfee299"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2F3.jpeg?alt=media&token=3eade6e4-247c-4744-9222-52d3cd1eee3b",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2F3.jpeg?alt=media&token=c527807b-9f40-4abf-8e02-3a5294d67951"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2F4.jpeg?alt=media&token=8f670fca-7e41-4ec1-a053-784875c64878",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2F4.jpeg?alt=media&token=923acccf-3fe8-4edb-b26c-6f8ffc385763"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2FAdobeStock_197998683.jpeg?alt=media&token=21e94216-df0f-4b4d-8640-3d323c268b33",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2FAdobeStock_197998683.jpeg?alt=media&token=4173ef7f-545a-4a35-ad03-8b8a963395f9"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2FAdobeStock_197998689.jpeg?alt=media&token=24ab9f5f-d0be-492f-ba40-b97958b0d9fd",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2FAdobeStock_197998689.jpeg?alt=media&token=893c9a9f-d8cc-49a2-9266-ecd93d3330e9"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2FAdobeStock_197998700.jpeg?alt=media&token=09b613fa-5873-4ecc-9b06-ba16da45970a",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2FAdobeStock_197998700.jpeg?alt=media&token=dbc54e12-c418-4a62-92dd-cc99135e7743"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2FAdobeStock_204485497.jpeg?alt=media&token=b767ad60-ae0a-4288-90e5-8d13934cd875",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2FAdobeStock_204485497.jpeg?alt=media&token=8bc8f3d0-ed85-4cf2-a846-791e67ed53ab"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2FAdobeStock_228074196.jpeg?alt=media&token=77ca1915-57a7-4caf-8671-a2db691f2fd8",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2FAdobeStock_228074196.jpeg?alt=media&token=5598910e-c1f7-41ec-9071-033e25ff4357"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551930986913.jpg?alt=media&token=1448169b-fca6-486c-abc8-89639e238796",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551930986913.jpg?alt=media&token=5c5b8afe-9621-4b87-9e03-0110a2c3f3da"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551930992270.jpg?alt=media&token=3fe3754a-4acc-4376-866f-bebb64e000e1",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551930992270.jpg?alt=media&token=daa9d7bb-6d47-4d7f-a095-515ac424cfad"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551930999847.jpg?alt=media&token=10936b28-a1f9-4192-93ba-aa3603908a63",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551930999847.jpg?alt=media&token=90d1557a-d75a-40db-8cf3-89a47930ac1a"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551931007403.jpg?alt=media&token=f0dab40d-527e-4eab-84bd-14212b0b8a51",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551931007403.jpg?alt=media&token=45ae6fc3-9ca2-4ee1-bbbd-3b41e7230bae"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551931012518.jpg?alt=media&token=dc09aa51-2c6c-41c5-8103-ee49fe457a04",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551931012518.jpg?alt=media&token=f8b3b5cb-8653-4fb8-9efd-8f80948bbdac"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551931104192.jpg?alt=media&token=88b8d93b-6690-47eb-97ed-412b33fc1c77",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551931104192.jpg?alt=media&token=de08ae4f-b207-4c16-afba-2a6d0dff221c"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551931360627.jpg?alt=media&token=bcd2d14f-615c-4b98-b25a-8f67266f8ebd",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551931360627.jpg?alt=media&token=7d09de9e-d5ed-4382-9643-9213a781ad3c"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551965605455.jpg?alt=media&token=cd632747-5f3d-4c40-9e01-953fe9954f1a",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551965605455.jpg?alt=media&token=559bdafc-a501-4525-975d-18e5a965cc9f"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551965673653.jpg?alt=media&token=694007df-3b9f-4dd8-9ccd-89821ed2e75f",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551965673653.jpg?alt=media&token=7d5c16f2-3f0b-4835-ae30-577a9e6c7eb9"
  },
  {
    src:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/galeria%2Fmmexport1551965681555.jpg?alt=media&token=38ecf6dd-5f7e-4023-a3e3-c8b8e2b57897",
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/shelf-estimation.appspot.com/o/miniatury%2Fmmexport1551965681555.jpg?alt=media&token=8f947a45-f3c8-4828-a3b0-688b7c36f886"
  }
];
