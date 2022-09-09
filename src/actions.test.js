import * as actions from './actions';
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
   } from './constants';

import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
// import nock, { disableNetConnect } from 'nock';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mockStore = configureStore([thunkMiddleware]);
const mock = new MockAdapter(axios);

const getResponse = async (url) => {
    const res = await axios.get(url);

    return res;
 }

it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction = {
        type: CHANGE_SEARCHFIELD,
        payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction);
})

it('handles requesting robots API', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING 
    }
    expect(action[0]).toEqual(expectedAction);
})

it('handles requesting robots API success', () => {
    mock.onGet('https://jsonplaceholder.typicode.com/users')
    .reply(200, { response: [{ item: 'item1' }, { item: 'item2' }] })

    const store = mockStore();
    const expectedAction = {
        type: REQUEST_ROBOTS_SUCCESS 
    }
    store.dispatch(actions.requestRobots()).then(() => {
        const action = store.getActions();
        expect(action.slice(-1)[0].type).toEqual(expectedAction.type)
    });
    
});

it('handles requesting robots API failure', () => {
    mock.onGet('https://jsonplaceholder.typicode.com/users')
    .reply(400, { response: 'Failed' })

    const store = mockStore();
    const expectedAction = {
        type: REQUEST_ROBOTS_FAILED 
    }
    store.dispatch(actions.requestRobots()).then(() => {
        const action = store.getActions();
        expect(action.slice(-1)[0].type).toEqual(expectedAction.type)
    });
    
});
