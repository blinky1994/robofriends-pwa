import { shallow, mount } from 'enzyme'; 
import MainPage from './MainPage'
import React from 'react'

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending : false
    }
    wrapper = shallow(<MainPage {...mockProps} /> )
})

it ('renders MainPage without crashing', () => {
    expect(wrapper).toMatchSnapshot();
})

it ('filters robots correctly', () => {
    const mockProps2 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }],
        searchField: 'a',
        isPending : false
    }
    
    const wrapper2 = shallow(<MainPage {...mockProps2} /> )
    expect(wrapper2.instance().filteredRobots()).toEqual([]);
    expect(wrapper2.instance().filteredRobots()).toEqual([]);
})

it ('filters robots correctly 2', () => {
    const mockProps3 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }],
        searchField: 'a',
        isPending : false
    }
    
    const filteredRobots = [];
    const wrapper3 = shallow(<MainPage {...mockProps3} /> )
    expect(wrapper3.instance().filteredRobots()).toEqual(filteredRobots);
})

it('Checking pending is correct', () => {
    const mockProps4 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }],
        searchField: 'a',
        isPending : false
    }
    const wrapper4 = mount(<MainPage {...mockProps4} /> )
    expect(wrapper4.props().isPending).toEqual(false);

})