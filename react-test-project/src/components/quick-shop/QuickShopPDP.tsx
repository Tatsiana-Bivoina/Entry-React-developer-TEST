import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { AiFillCloseCircle } from 'react-icons/ai';
import './quick-shop.scss';

export type Props = Readonly<PropsFromRedux>;

type QuickShopState = {
  inputName: string;
  inputPhone: string;
  inputNameError: string;
  inputPhoneError: string;
  isInputNameValid: boolean;
  isInputPhoneValid: boolean;
  isInputNameDirty: boolean;
  isInputPhoneDirty: boolean;
  isOrder: boolean;
};

export class QuickShopPDP extends Component<Props, QuickShopState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputName: '',
      inputPhone: '',
      inputNameError: 'Required field',
      inputPhoneError: 'Required field',
      isInputNameValid: true,
      isInputPhoneValid: true,
      isInputNameDirty: false,
      isInputPhoneDirty: false,
      isOrder: false,
    };
  }

  closeQuickShopModal(): void {
    this.props.toggleQuickShopPDPModal(false);
    document.body.classList.toggle('scroll-hidden', !this.props.isQuickShopPDPModalOpen);
  }

  checkInputNameValidation(value: string): void {
    const regExp = /([А-ЯЁA-Z]{1})([а-яёa-z]{1,15})/g;
    if (regExp.test(value)) {
      this.setState({ isInputNameValid: true });
      this.setState({ inputNameError: '' });
    } else {
      this.setState({ isInputNameValid: false });
      this.setState({ inputNameError: 'Incorrect name' });
    }
  }

  checkInputPhoneValidation(value: string): void {
    const regExp = /([+]{0,1}[\d]{3,18})/g;
    if (regExp.test(value)) {
      this.setState({ isInputPhoneValid: true });
      this.setState({ inputPhoneError: '' });
    } else {
      this.setState({ isInputPhoneValid: false });
      this.setState({ inputPhoneError: 'Incorrect phone' });
    }
  }

  handleSubmit(event: React.SyntheticEvent): void {
    event?.preventDefault();
    if (this.state.inputName === '' || this.state.inputPhone === '') {
      if (this.state.inputName === '') {
        this.setState({ isInputNameValid: false });
        this.setState({ isInputNameDirty: true });
      }
      if (this.state.inputPhone === '') {
        this.setState({ isInputPhoneValid: false });
        this.setState({ isInputPhoneDirty: true });
      }
    } else {
      this.setState({ isOrder: true });
    }
  }

  render() {
    const {
      inputName,
      inputPhone,
      inputNameError,
      inputPhoneError,
      isInputNameValid,
      isInputPhoneValid,
      isInputNameDirty,
      isInputPhoneDirty,
    } = this.state;

    return (
      <section
        className="overlay-modal-section quick-shop-overlay"
        onClick={() => {
          this.closeQuickShopModal();
        }}
      >
        <div className="quick-shop-container pdp" onClick={(event) => event.stopPropagation()}>
          <AiFillCloseCircle
            className="icon-close"
            onClick={() => {
              this.closeQuickShopModal();
            }}
          />
          <h3 className="quick-shop-title">Buy in 1 click</h3>
          {!this.state.isOrder && (
            <form className="quick-shop-form">
              <div className="input-container">
                <input
                  type="text"
                  className={isInputNameDirty ? (isInputNameValid ? 'valid' : 'invalid') : ''}
                  name="name"
                  placeholder="Name"
                  value={inputName}
                  onFocus={(event) => {
                    this.setState({ isInputNameDirty: true });
                    this.checkInputNameValidation(event.target.value);
                  }}
                  onChange={(event) => {
                    this.setState({ inputName: event.target.value });
                    this.checkInputNameValidation(event.target.value);
                  }}
                />
                {isInputNameDirty && inputNameError && <span>{inputNameError}</span>}
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone"
                  className={isInputPhoneDirty ? (isInputPhoneValid ? 'valid' : 'invalid') : ''}
                  placeholder="Phone"
                  value={inputPhone}
                  onFocus={(event) => {
                    this.setState({ isInputPhoneDirty: true });
                    this.checkInputPhoneValidation(event.target.value);
                  }}
                  onChange={(event) => {
                    this.setState({ inputPhone: event.target.value });
                    this.checkInputPhoneValidation(event.target.value);
                  }}
                />
                {isInputPhoneDirty && inputPhoneError && <span>{inputPhoneError}</span>}
              </div>
              <p className="comment">
                Click the &quot;Order&quot; button and the manager will contact you
              </p>
              <button
                type="submit"
                disabled={isInputPhoneValid && isInputNameValid ? false : true}
                className={
                  isInputPhoneValid && isInputNameValid ? 'btn-green' : 'btn-green disabled'
                }
                onClick={(event) => this.handleSubmit(event)}
              >
                Order
              </button>
            </form>
          )}
          {this.state.isOrder && <h4>Your order has been processed</h4>}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isQuickShopPDPModalOpen: state.quickShopReducer.isQuickShopPDPModalOpen,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    toggleQuickShopPDPModal: (isOpen: boolean) =>
      dispatch({ type: 'TOGGLE_QUICK_SHOP_PDP_MODAL', payload: isOpen }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(QuickShopPDP);
