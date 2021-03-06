import '../../../tests/mocks/firebase-mocks';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { v4 } from 'uuid';
import { act } from 'react-dom/test-utils';
import firebase from '../../../firebase/firebase';
import { findByTestAttr } from '../../../tests/testUtils';
import PageCards from './PageCards';
import { cardMock } from '../../../utils/mocks';

describe('PageCards Component', () => {
  const defaultArgs = {
    userId: '1234',
    cards: [],
  };

  const setup = async (args = {}) => {
    const { userId, cards } = {
      ...defaultArgs,
      ...args,
    };

    const mockStore = configureMockStore([]);
    const store = mockStore({
      user: {
        uid: userId,
      },
      type: 'Character',
    });

    const spyCollection = jest.spyOn(firebase.db, 'collection');

    const spyGet = jest.fn();
    const cardsAsData = cards.map((card) => ({
      data: () => card,
      id: v4(),
    }));
    spyGet.mockReturnValue(Promise.resolve({ docs: cardsAsData }));

    const spyWhere = jest.fn();
    spyWhere.mockReturnValue({
      get: spyGet,
    });

    spyCollection.mockReturnValue({
      where: spyWhere,
    });

    let wrapper;
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter>
            <PageCards />
          </MemoryRouter>
        </Provider>,
      );
    });

    return {
      wrapper,
      spyCollection,
      spyWhere,
      spyGet,
    };
  };

  it('should render the component', async () => {
    const { wrapper } = await setup();
    const component = findByTestAttr(wrapper, 'p-cards');

    expect(component.length).toBe(1);
  });

  describe('Getting cards', () => {
    it('should call the collection with the expected arguments', async () => {
      const { spyCollection } = await setup();

      expect(spyCollection).toBeCalledWith('cards');
    });

    it('should call where with the expected arguments', async () => {
      const userId = '2312';

      const { spyWhere } = await setup({ userId });

      expect(spyWhere).toBeCalledWith('createdBy', '==', userId);
    });

    it('should display the returned character card', async () => {
      const cards = [cardMock()];
      cards[0].type = 'Character';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const card = findByTestAttr(wrapper, 'p-cards__card');

      expect(card.length).toBe(1);
    });

    it('should display two returned character cards', async () => {
      const cards = [cardMock(), cardMock()];
      cards[0].type = 'Character';
      cards[1].type = 'Character';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardsEl = findByTestAttr(wrapper, 'p-cards__card');

      expect(cardsEl.length).toBe(2);
    });

    it('should display the returned circumstance card', async () => {
      const cards = [cardMock()];
      cards[0].type = 'Circumstance';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const card = findByTestAttr(wrapper, 'p-cards__card');

      expect(card.length).toBe(1);
    });

    it('should display two returned circumstance cards', async () => {
      const cards = [cardMock(), cardMock()];
      cards[0].type = 'Circumstance';
      cards[1].type = 'Circumstance';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardsEl = findByTestAttr(wrapper, 'p-cards__card');

      expect(cardsEl.length).toBe(2);
    });

    it('should display the returned conflict card', async () => {
      const cards = [cardMock()];
      cards[0].type = 'Conflict';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const card = findByTestAttr(wrapper, 'p-cards__card');

      expect(card.length).toBe(1);
    });

    it('should display two returned conflict cards', async () => {
      const cards = [cardMock(), cardMock()];
      cards[0].type = 'Conflict';
      cards[1].type = 'Conflict';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardsEl = findByTestAttr(wrapper, 'p-cards__card');

      expect(cardsEl.length).toBe(2);
    });
  });

  describe('handle delete function', () => {
    it('should render the delete button when there are cards', async () => {
      const cards = [cardMock()];
      cards[0].type = 'Character';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const deleteBtn = findByTestAttr(wrapper, 'p-cards__delete-card');

      expect(deleteBtn.length).toBe(1);
    });

    describe('Firebase call to delete by ID when clicked', () => {
      it('should delete by ID when clicked', async () => {
        const { spyCollection } = await setup();

        expect(spyCollection).toBeCalledWith('cards');
      });
    });
  });

  describe('Displaying card props', () => {
    it('should show the card title', async () => {
      const title = 'This is a Title';
      const cards = [cardMock()];
      cards[0].cardTitle = title;
      cards[0].type = 'Character';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardTitle = findByTestAttr(wrapper, 'p-cards__title');

      expect(cardTitle.text()).toBe(title);
    });

    it('should show the card side one', async () => {
      const sideOne = 'Alpha';
      const cards = [cardMock()];
      cards[0].side1 = sideOne;
      cards[0].type = 'Character';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardSideOne = findByTestAttr(wrapper, 'p-cards__side-one');

      expect(cardSideOne.text()).toBe(sideOne);
    });

    it('should show the card side two', async () => {
      const sideTwo = 'Beta';
      const cards = [cardMock()];
      cards[0].side2 = sideTwo;
      cards[0].type = 'Character';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardSideTwo = findByTestAttr(wrapper, 'p-cards__side-two');

      expect(cardSideTwo.text()).toBe(sideTwo);
    });

    it('should show the card side three', async () => {
      const sideThree = 'Gamma';
      const cards = [cardMock()];
      cards[0].side3 = sideThree;
      cards[0].type = 'Character';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardSideThree = findByTestAttr(wrapper, 'p-cards__side-three');

      expect(cardSideThree.text()).toBe(sideThree);
    });

    it('should show the card side four', async () => {
      const sideFour = 'Omega';
      const cards = [cardMock()];
      cards[0].side4 = sideFour;
      cards[0].type = 'Character';

      const { wrapper } = await setup({ cards });
      wrapper.update();
      const cardSideFour = findByTestAttr(wrapper, 'p-cards__side-four');

      expect(cardSideFour.text()).toBe(sideFour);
    });
  });

  it('should display alternate message when no cards are returned', async () => {
    const cards = [];

    const { wrapper } = await setup({ cards });
    wrapper.update();
    const noCardsMessage = findByTestAttr(wrapper, 'p-cards__alt-message');

    expect(noCardsMessage.length).not.toBe(0);
  });
});
