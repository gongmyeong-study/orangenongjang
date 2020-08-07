import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import styled, { css } from 'styled-components';
import { necessityActions } from "../../store/actions";
import { necessityStatus } from "../../constants/constants";
import "./NecessityCreateModal.css";

interface ICircleButtonProps {
    transition? : any;
    open?: any;
}

const CircleButton = styled.button<ICircleButtonProps>`
  	background: #38d9a9;
  	&:hover {
  	 	 background: #63e6be;
  	}
  	&:active {
   		 background: #20c997;
  	}

  	z-index: 5;
  	cursor: pointer;
  	width: 80px;
 	height: 80px;
  	display: block;
  	align-items: center;
  	justify-content: center;
  	font-size: 60px;
  	position: absolute;
  	left: 50%;
  	bottom: 0px;
  	transform: translate(-50%, 50%);
	color: white;
	border-radius: 50%;
	border: none;
	outline: none;
	display: flex;
	align-items: center;
	justify-content: center;

	transition: 0.125s all ease-in;
	${props =>
		props.open &&
		css`
		background: #ff6b6b;
		&:hover {
			background: #ff8787;
		}
		&:active {
			background: #fa5252;
		}
		transform: translate(-50%, 50%) rotate(45deg);
    `}
`;


interface Props {
    history: any;
    create: (name: string, option: string, description: string, price: string) => any; // for redux dispatch
    me: any;
    createStatus: string;
}

interface State {
    appearing: Boolean; // for modal appearing
    name: string, 
    option: string, 
    description: string, 
    price: string,
}

class NecessityCreateModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        appearing: true,
        name: '',
        option: '',
        description: '',
        price: '',
    };
}

    create = () => {
        this.props.create(this.state.name, this.state.option, this.state.description, this.state.price)
            .then(() => {
                if (this.props.createStatus === necessityStatus.SUCCESS) {
                    window.alert("입력 완료!");
                    this.setState({ appearing: false });
                    this.props.history.push('/main');
                }
                else if (this.props.createStatus === necessityStatus.FAILURE) {
                    window.alert("이미 존재하는 생필품입니다.");
                }
            else {
                window.alert("실패!");
            }
        })
};

    render() {
        return (
            <div
                className="modal"
                style={this.state.appearing ? { display: "block" } : { display: "none" }}
            >
            <form>
                <button
                    type="submit"
                    className="close"
                    title="Close Modal"
                    style={{ background: "none", border: "none" }}
                >
                &times;
                </button>
            </form>

            <form className="modal-content">
            <div className="container">
                <p>생필품 정보를 입력해주세요.</p>
                <hr />
                <label htmlFor="name">
                    <b>생필품 (Necessity)</b>
                </label>
                <input
                    type="text"
                    placeholder="모나리자 티슈"
                    required
                    onChange={(e) => this.setState({ name: e.target.value })}
                />

                <label htmlFor="option">
                    <b>옵션 (Option)</b>
                </label>
                <input
                    type="text"
                    placeholder="200매"
                    required
                    onChange={(e) => this.setState({ option: e.target.value })}
                />

                <label htmlFor="description">
                    <b>설명 (Description))</b>
                </label>
                <input
                    type="text"
                    placeholder="책상 비치용"
                    required
                    onChange={(e) => this.setState({ description: e.target.value })}
                />

                <label htmlFor="price">
                    <b>가격 (Price)</b>
                </label>
                <input
                    type="number"
                    placeholder="1300"
                    required
                    onChange={(e) => this.setState({ price: e.target.value })}
                />

                <div className="clearfix">
                <CircleButton
                    type="button"
                    className="createbtn"
                    disabled={this.state.name==="" || this.state.option==="" || this.state.description==="" || this.state.price===""}
                    onClick={this.create}
                >
                    생필품 입력
                </CircleButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  create: (name: string, option: string, description: string, price: string) =>
    dispatch(necessityActions.createNecessity(name)),
});

const mapStateToProps = (state: any) => ({
  necessityStatus: state.necessity.necessityStatus,
  me: state.user.me,
});

export default connect(mapStateToProps, mapDispatchToProps)(NecessityCreateModal);
