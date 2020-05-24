import userReducer from './user.reducer';
import { SET_USER } from '../../actions/set-user/set-user.action';

describe('user reducer', () => {
  it('returns default initial state of false when no action is passed', () => {
    const newState = userReducer(null, {});
    expect(newState).toBe(null);
  });
  it('returns state of true upon receiving an action of type `SET_USER`', () => {
    const newState = userReducer(true, { SET_USER });
    expect(newState).toBe(true);
  });
});
