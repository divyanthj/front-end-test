import React from 'react'
import { shallow } from 'enzyme'
import {expect} from 'code'
import sinon from 'sinon'
import App from '../../src/components/App'

const overrideProps = (props) => {
    return {
        ...props
    }
}

const renderComponent = (ComponentToBeRendered, props = overrideProps()) => {
    return shallow(<ComponentToBeRendered {...props} />)
}

describe('App', () => {
    let component
    beforeEach(() => {
        component = shallow(<App />)
    })

    it('Component exists', () => {
        expect(component.exists()).to.be.true()
    })

    it('State exists', () => {
        expect(component.state()).to.exist()
    })

    it('Sort method works correctly', () => {
      let that = component.instance();
      that.setState({
        displayedPizzas : ["Bar", "Foo"]
      });
      that.sortDescending(that);
      expect(that.state.displayedPizzas[0]).to.equal("Foo");
    })

    it('Filter method works correctly', () => {
      let that = component.instance();
      that.setState({
        pizzas : ["Bar", "Foo"]
      });
      that.activateFilter({
        target : {
          value : "f"
        }
      });
      expect(that.state.displayedPizzas[0]).to.equal("Foo");
    })




})
