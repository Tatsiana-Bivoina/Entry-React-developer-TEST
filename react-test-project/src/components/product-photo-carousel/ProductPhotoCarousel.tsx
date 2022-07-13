import React, { Component } from 'react';
import './product-photo-carousel.scss';

export interface ProductPhotoCarouselProps {
  galleryLength: number;
  pageName: string;
  children: React.ReactNode;
}

type Props = Readonly<ProductPhotoCarouselProps>;

type ProductPhotoCarouselState = {
  offset: number;
};

const PHOTO_WIDTH = 200;

export default class ProductPhotoCarousel extends Component<Props, ProductPhotoCarouselState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  chooseNextPhoto(): void {
    if (this.state.offset > PHOTO_WIDTH * (this.props.galleryLength - 1) * -1) {
      this.setState((prevState) => ({
        offset: prevState.offset - PHOTO_WIDTH,
      }));
    }
  }

  choosePrevPhoto(): void {
    if (this.state.offset < 0) {
      this.setState((prevState) => ({
        offset: prevState.offset + PHOTO_WIDTH,
      }));
    }
  }

  render() {
    const { galleryLength, pageName, children } = this.props;

    return (
      <div className="carousel">
        <div className="carousel-window">
          <div
            className="photo-carousel-container"
            style={{ transform: `translateX(${this.state.offset}px)` }}
          >
            {children}
          </div>
        </div>
        {pageName === 'cart-page' && galleryLength > 1 && (
          <div className="photo-slider-buttons">
            <button className="button-prev" onClick={() => this.choosePrevPhoto()} />
            <button className="button-next" onClick={() => this.chooseNextPhoto()} />
          </div>
        )}
      </div>
    );
  }
}
