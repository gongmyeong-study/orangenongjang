import React from 'react';

import { HouseList } from '../../components/index';

interface Props {
  history: any;
}

function HousePage(props: Props) {
  return (
    <HouseList history={props.history} />
  );
}

export default HousePage;
