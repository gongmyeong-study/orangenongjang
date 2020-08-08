import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import { necessityActions } from "../../store/actions";
import { necessityStatus } from "../../constants/constants";
import "./NecessityCreateModal.css";

interface Props {
    history?: any;
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
                className="necessity-create-modal"
                style={this.state.appearing ? { display: "block" } : { display: "none" }}
            >
                <form>
                    <button
                        type="submit"
                        className="necessity-create-close"
                        title="Close Modal"
                        style={{ background: "none", border: "none" }}
                    >
                    &times;
                    </button>
                </form>

                <form className="necessity-create-modal-content">
                    <div className="necessity-create-container">
                        <p>생필품 정보를 입력해주세요.</p>
                        <hr />
                        <label htmlFor="name">
                            <b>생필품 (Necessity)</b>
                        </label>
                        <input
                            type="text"
                            placeholder="오렌지"
                            required
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />

                        <label htmlFor="option">
                            <b>옵션 (Option)</b>
                        </label>
                        <input
                            type="text"
                            placeholder="발렌시아 품종"
                            required
                            onChange={(e) => this.setState({ option: e.target.value })}
                        />

                        <label htmlFor="description">
                            <b>설명 (Description)</b>
                        </label>
                        <input
                            type="text"
                            placeholder="식후 비타민 C 섭취용"
                            required
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />

                        <label htmlFor="price">
                            <b>가격 (Price)</b>
                        </label>
                        <input
                            type="number"
                            placeholder="2900"
                            required
                            onChange={(e) => this.setState({ price: e.target.value })}
                        />

                        <div className="necessity-create-clearfix">
                        <button
                            type="button"
                            className="necessity-create-createbtn"
                            disabled={this.state.name===""}
                            onClick={this.create}
                        >
                            생필품 등록
                        </button>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    create: (name: string, option: string, description: string, price: string) => 
        dispatch(necessityActions.createNecessity(name, option, description, price)),
});

const mapStateToProps = (state: any) => ({
    createStatus: state.necessity.createStatus,
    me: state.user.me,
});

export default connect(mapStateToProps, mapDispatchToProps)(NecessityCreateModal);
