import React, { Children, cloneElement, Component } from 'react';
import './product-photo-carousel.scss';

export interface ProductPhotoCarouselProps {
  galleryLength: number;
  pageName: string;
  children: JSX.Element[];
  infinite: boolean;
}

type Props = Readonly<ProductPhotoCarouselProps>;

type ProductPhotoCarouselState = {
  photoWidth: number;
  offset: number;
  carouselImages: JSX.Element[];
  clonesCount: {
    head: number;
    tail: number;
  };
  transitionDuration: number;
  timeoutIds: NodeJS.Timeout[];
};

const TRANSITION_DURATION = 300;

export default class ProductPhotoCarousel extends Component<Props, ProductPhotoCarouselState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      photoWidth: this.props.pageName === 'cart-modal-page' ? 121 : 200,
      offset: 0,
      carouselImages: [],
      clonesCount: {
        head: 0,
        tail: 0,
      },
      transitionDuration: TRANSITION_DURATION,
      timeoutIds: [],
    };
  }

  cloneElements(children: JSX.Element[]) {
    if (this.props.infinite) {
      const newCarouselImages = [
        cloneElement(children[Children.count(children) - 1]),
        ...children,
        cloneElement(children[0]),
      ];
      this.setState({
        carouselImages: newCarouselImages.map((el: JSX.Element, index: number) => {
          return { ...el, key: index.toString() };
        }),
      });
      this.setState({
        clonesCount: {
          head: 1,
          tail: 1,
        },
      });
    }
  }

  componentDidMount() {
    if (this.props.infinite) {
      this.cloneElements(this.props.children);
      return;
    }
    this.setState({ carouselImages: [...this.props.children] });
  }

  componentDidUpdate(prevProps: Props, prevState: ProductPhotoCarouselState) {
    if (prevState.clonesCount !== this.state.clonesCount) {
      this.setState({ offset: -(this.state.clonesCount.head * this.state.photoWidth) });
    }
    if (prevState.offset !== this.state.offset) {
      if (this.state.offset === 0) {
        const timerId: NodeJS.Timeout = setTimeout(() => {
          this.setState({
            offset: -(
              this.state.photoWidth *
              (this.state.carouselImages.length - 1 - this.state.clonesCount.tail)
            ),
          });
          this.setState({ transitionDuration: 0 });
        }, TRANSITION_DURATION);

        this.setState((state) => ({
          timeoutIds: [...state.timeoutIds, timerId],
        }));
        return;
      }

      if (this.state.offset === -(this.state.photoWidth * (this.state.carouselImages.length - 1))) {
        const timerId: NodeJS.Timeout = setTimeout(() => {
          this.setState({
            offset: -(this.state.clonesCount.head * this.state.photoWidth),
          });
          this.setState({ transitionDuration: 0 });
        }, TRANSITION_DURATION);

        this.setState((state) => ({
          timeoutIds: [...state.timeoutIds, timerId],
        }));
        return;
      }
    }

    if (prevState.transitionDuration !== this.state.transitionDuration) {
      if (this.state.transitionDuration === 0) {
        const timerId: NodeJS.Timeout = setTimeout(() => {
          this.setState({ transitionDuration: TRANSITION_DURATION });
        }, TRANSITION_DURATION);

        this.setState((state) => ({
          timeoutIds: [...state.timeoutIds, timerId],
        }));
        return;
      }
    }
  }

  componentWillUnmount() {
    this.state.timeoutIds.forEach((el: NodeJS.Timeout) => {
      clearTimeout(el);
    });
  }

  chooseNextPhoto(): void {
    this.setState((prevState) => ({
      offset: prevState.offset - this.state.photoWidth,
    }));
  }

  choosePrevPhoto(): void {
    this.setState((prevState) => ({
      offset: prevState.offset + this.state.photoWidth,
    }));
  }

  render() {
    const { carouselImages } = this.state;
    const { galleryLength, pageName } = this.props;

    return (
      <div className="carousel">
        <div className="carousel-window">
          <div
            className="photo-carousel-container"
            style={{
              transform: `translateX(${this.state.offset}px)`,
              transitionDuration: `${this.state.transitionDuration}ms`,
            }}
          >
            {carouselImages}
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
