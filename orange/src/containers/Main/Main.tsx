import React, { useState } from 'react';
import NecessityList from '../../components/Necessity/NecessityList'
import { createGlobalStyle } from 'styled-components';
import NecessityTemplate from '../../components/Necessity/NecessityTemplate';
import NecessityHead from '../../components/Necessity/NecessityHead';
import { NecessityCreateModal } from "../../components/index";

import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';

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
		opacity: 0.2;
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
`;


const GlobalStyle = createGlobalStyle`
 	body {
    	background: #e9ecef;
  	}
`;

interface Props {
 	history: any;
}


function Main(props: Props) {
	const [showNecessityCreateModal, setShowNecessityCreateModal] = useState(false);
	const showModal = () => setShowNecessityCreateModal(true);

	return (
		<React.Fragment>
		<GlobalStyle />
		<h1>Main page</h1>
			<NecessityTemplate>
				<NecessityHead />
				<NecessityList />
				<CircleButton onClick={showModal}>
					<MdAdd />
				</CircleButton>
				{showNecessityCreateModal ? [<NecessityCreateModal history={props.history} />, <CircleButton />] : null}
			</NecessityTemplate>
		</React.Fragment>
	)
}

export default Main;
