import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { AiFillCloseCircle } from 'react-icons/ai';
import './quick-shop.scss';
import ProductPage from '../product-page/ProductPage';

export type Props = Readonly<PropsFromRedux>;

export class QuickShopPLP extends Component<Props> {
  closeQuickShopModal(): void {
    this.props.toggleQuickShopPLPModal(false);
    document.body.classList.toggle('scroll-hidden', !this.props.isQuickShopPLPModalOpen);
  }

  render() {
    return (
      <section
        className="overlay-modal-section quick-shop-overlay"
        onClick={() => {
          this.closeQuickShopModal();
        }}
      >
        <div className="quick-shop-container plp" onClick={(event) => event.stopPropagation()}>
          <AiFillCloseCircle
            className="icon-close"
            onClick={() => {
              this.closeQuickShopModal();
            }}
          />
          <ProductPage fromPage={'quickShopPLP'} />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isQuickShopPLPModalOpen: state.quickShopReducer.isQuickShopPLPModalOpen,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    toggleQuickShopPLPModal: (isOpen: boolean) =>
      dispatch({ type: 'TOGGLE_QUICK_SHOP_PLP_MODAL', payload: isOpen }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(QuickShopPLP);
