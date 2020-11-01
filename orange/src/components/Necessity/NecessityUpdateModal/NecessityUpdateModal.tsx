import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { necessityActions } from '../../../store/actions';
import { necessityStatus } from '../../../constants/constants';
import './NecessityUpdateModal.css';

interface Props {
  houseId: number;
  necessityId: number;
  name: string;
  option: string;
  description: string;
  price: number;
  me: any;
  onUpdateNecessityHouse: (
    houseId: number, necessityId: number, name: string,
    option: string, description: string, price: number) => any;
  updateStatus: string;
  restoreUpdateModal: any;
}

interface State {
  appearing: boolean;
  houseId: number;
  necessityId: number;
  name: string;
  option: string;
  description: string;
  price: number;
}

class NecessityUpdateModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appearing: true,
      houseId: props.houseId,
      necessityId: props.necessityId,
      name: props.name,
      option: props.option,
      description: props.description,
      price: props.price,
    };
  }

  onUpdateNecessityHouse = (): void => {
    this.props.onUpdateNecessityHouse(
      this.state.houseId,
      this.state.necessityId,
      this.state.name,
      this.state.option,
      this.state.description,
      this.state.price,
    );

    if (this.props.updateStatus === necessityStatus.SUCCESS) {
      window.alert('수정되었습니다!');
      window.location.reload();
      this.props.restoreUpdateModal();
    } else if (this.props.updateStatus === necessityStatus.FAILURE) {
      window.alert('변동사항이 없습니다.');
    }
  };

  render() {
    return (
      <div
        className="necessity-update-modal"
        style={this.state.appearing ? { display: 'block' } : { display: 'none' }}
      >
        <form>
          <button
            className="necessity-update-close"
            onClick={() => this.props.restoreUpdateModal}
            type="submit"
            title="Close Modal"
            style={{ background: 'none', border: 'none' }}
          >
            &times;
          </button>
        </form>

        <form className="necessity-update-modal-content">
          <div className="necessity-update-container">
            <p>
              {this.props.name}
              의 정보를 수정해주세요.
            </p>
            {console.log('123123132123')}
            <hr />

            <label htmlFor="option">
              <b>옵션 (Option)</b>
            </label>
            <input
              type="text"
              placeholder={this.props.option}
              required
              onChange={(e) => this.setState({ option: e.target.value })}
            />

            <label htmlFor="description">
              <b>설명 (Description)</b>
            </label>
            <input
              type="text"
              placeholder={this.props.description}
              required
              onChange={(e) => this.setState({ description: e.target.value })}
            />

            <label htmlFor="price">
              <b>가격 (Price)</b>
            </label>
            <input
              type="number"
              placeholder={String(this.props.price)}
              required
              onChange={(e) => this.setState({ price: parseInt(e.target.value, 10) })}
            />

            <div className="necessity-update-clearfix">
              <button
                type="button"
                className="necessity-update-createbtn"
                onClick={this.onUpdateNecessityHouse}
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onUpdateNecessityHouse: (
    houseId: number, necessityId: number, name: string,
    option: string, description: string, price: number,
  ): void => dispatch(
    necessityActions.updateNecessityHouse(houseId, necessityId, name, option, description, price),
  ),
});

const mapStateToProps = (state: any) => ({
  updateStatus: state.necessity.updateStatus,
  me: state.user.me,
});

export default connect(mapStateToProps, mapDispatchToProps)(NecessityUpdateModal);
