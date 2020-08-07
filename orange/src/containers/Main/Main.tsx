import React, { useState } from 'react';
import NecessityList from '../../components/Necessity/NecessityList'
import { createGlobalStyle } from 'styled-components';
import NecessityTemplate from '../../components/Necessity/NecessityTemplate';
import NecessityHead from '../../components/Necessity/NecessityHead';
import NecessityCreate from '../../components/Necessity/NecessityCreate';
import { NecessityCreateModal } from "../../components/index";


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
			<button onClick={showModal}>생필품 등록 </button>
			{showNecessityCreateModal ? <NecessityCreateModal history={props.history} /> : null}
			<NecessityCreate />
			</NecessityTemplate>
		</React.Fragment>
	)
}

export default Main;
