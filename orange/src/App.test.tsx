import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from './App';
import { getMockStore, history } from './tests/mocks';

const mockStore = getMockStore({
  user: {
    me: {},
  },
  necessity: {
    necessities: [],
  },
});

test('renders app with mock store', () => {
  const app = render(
    <Provider store={mockStore}>
      <App history={history} />
    </Provider>,
  );
  expect(app.container.firstChild).toHaveClass('App');
});
