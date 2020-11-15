import React, { Component } from 'react';
import { Necessity } from '../../../api';

import './NecessityUpdateModal.css';

interface Props {
  necessity: Necessity;
  updateNecessityHouse: (
    houseId: number,
    necessityId: number,
    description: string,
    price?: number) => any;
  restoreUpdateModal: () => void;
}

interface State {
  description: string;
  price?: number;
}

class NecessityUpdateModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      description: props.necessity.description,
      price: props.necessity.price,
    };
  }

  render() {
    const update = () => {
      this.props.updateNecessityHouse(
        this.props.necessity.house_id,
        this.props.necessity.id,
        this.state.description,
        this.state.price,
      );
    };
    return (
      <div
        className="necessity-update-modal"
        style={{ display: 'block' }}
      >
        <form>
          <button
            className="necessity-update-close"
            type="submit"
            title="Close Modal"
            style={{ background: 'none', border: 'none' }}
            onClick={() => this.props.restoreUpdateModal}
          >
            &times;
          </button>
        </form>

        <form className="necessity-update-modal-content">
          <div className="necessity-update-container">
            <p>
              {this.props.necessity.name}
              의 설명 또는 가격을 수정해주세요.
            </p>
            <hr />

            <label htmlFor="name">
              <b>생필품 (Necessity)</b>
            </label>
            <input
              type="text"
              value={this.props.necessity.name}
              disabled
            />

            <label htmlFor="option">
              <b>옵션 (Option)</b>
            </label>
            <input
              type="text"
              value={this.props.necessity.option}
              disabled
            />

            <label htmlFor="description">
              <b>설명 (Description)</b>
            </label>
            <input
              type="text"
              placeholder={this.props.necessity.description}
              required
              onChange={(e) => this.setState({ description: e.target.value })}
            />

            <label htmlFor="price">
              <b>가격 (Price)</b>
            </label>
            <input
              type="number"
              placeholder={String(this.props.necessity.price)}
              required
              onChange={(e) => this.setState({
                price: (parseFloat(e.target.value) === parseInt(e.target.value, 10))
                  ? parseFloat(e.target.value) : NaN,
              })}
            />

            <div className="necessity-update-clearfix">
              <button
                type="button"
                className="necessity-update-createbtn"
                onClick={update}
              >
                생필품 수정
              </button>
            </div>
          </div>
        </form>

      </div>
    );
  }
}

export default NecessityUpdateModal;
