import React from "react";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import style from "../styles/component_modules/Carousel.module.css";
import Img from "../assets/images/image.svg";

const Carousel = () => {
  return (
    <CCarousel controls indicators dark className={style["carousel"]}>
      <CCarouselItem className={style["carousel-item"]}>
        <CImage
          className="d-block w-100"
          src={Img}
          alt="slide 1"
          width={300}
          height={300}
          style={{ borderRadius: "10px" }}
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          className="d-block w-100"
          src={Img}
          alt="slide 2"
          width={300}
          height={300}
          style={{ borderRadius: "10px" }}
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          className="d-block w-100"
          src={Img}
          alt="slide 3"
          width={300}
          height={300}
          style={{ borderRadius: "10px" }}
        />
        <CCarouselCaption className="d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </CCarouselCaption>
      </CCarouselItem>
    </CCarousel>
  );
};

export default Carousel;
