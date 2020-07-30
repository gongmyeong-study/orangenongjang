import React, { useState, Dispatch } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { necessityStatus } from '../../constants/constants';
import { necessityActions } from '../../store/actions';
import { connect } from 'react-redux';

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

const InsertFormPositioner = styled.div`
	width: 100%;
	bottom: 0;
	left: 0;
	position: absolute;
`;

const InsertForm = styled.form`
	background: #f8f9fa;
	padding-left: 32px;
	padding-top: 32px;
	padding-right: 32px;
	padding-bottom: 72px;

	border-bottom-left-radius: 16px;
	border-bottom-right-radius: 16px;
	border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
	padding: 12px;
	border-radius: 4px;
	border: 1px solid #dee2e6;
	width: 100%;
	outline: none;
	font-size: 18px;
	box-sizing: border-box;
`;

export interface INecessity {
    id: number;
    text: string;
    done: boolean;
};

interface IProps {
    onCreateNecessity: (text: string) => any;
    createStatus: string;
    necessities: any;
}

function NecessityCreate(props: IProps) {
    const [open, setOpen] = useState(false);
    const [value, setValue ] = useState('');

    const onToggle = () => setOpen(!open);
    const onChange = (e: any) => setValue(e.target.value);
    const onSubmit = (e: any) => {

    	e.preventDefault();
    	props.onCreateNecessity(value)
    	.then(() => {
        	if (props.createStatus === necessityStatus.SUCCESS) {
        		console.log("CREATED!")
      		}
      		else  {
        		console.log("FAILED TO CREATE!")
      		}
    	});
    setValue('');
    setOpen(false);
    };

	return (
    <>
    {open && (
		<InsertFormPositioner>
        	<InsertForm>
            	<Input 
            	onChange={onChange}
            	onClick={onSubmit} autoFocus placeholder="구매할 생필품을 입력 후, Enter 를 누르세요" />
            </InsertForm>
        </InsertFormPositioner>
      )}
        <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
        </CircleButton>
    </>
    );
}

const mapStateToProps = (state: any) => ({
    loginStatus: state.user.loginStatus,
    createStatus: state.necessity.createStatus,
    necessities: state.necessity.necessities,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    onCreateNecessity: (text: string) => dispatch(necessityActions.createNecessity(text)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NecessityCreate);
