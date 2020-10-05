import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import PageDecks from './PageDecks';
import { findByTestAttr } from '../../../tests/testUtils';

const defaultArgs = {
  userId: {},
  decks: [],
};

describe('PageDecks', () => {
  const setup = (args = {}) => {
    const { userId } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({ user: { uid: userId } });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PageDecks />
        </MemoryRouter>
      </Provider>,
    );

    return { wrapper };
  };

  it('should render without error', () => {
    const { wrapper } = setup();
    const component = findByTestAttr(wrapper, 'p-decks');

    expect(component.length).toBe(1);
  });

  describe('Getting decks', () => {
    xit('', () => {

    });

    // it('should display the returned deck', async () => {
    //   const decks = [deckMock()];
    //
    //   const { wrapper } = await setup({ decks });
    //   wrapper.update();
    //   const deck = findByTestAttr(wrapper, 'p-decks__deck');
    //
    //   expect(deck.length).toBe(1);
    // });

    // it('should display two returned decks', async () => {
    //   const decks = [deckMock(), deckMock()];
    //
    //   const { wrapper } = await setup({ decks });
    //   wrapper.update();
    //   const deck = findByTestAttr(wrapper, 'p-decks__deck');
    //
    //   expect(deck.length).toBe(2);
    // });
  });
});
