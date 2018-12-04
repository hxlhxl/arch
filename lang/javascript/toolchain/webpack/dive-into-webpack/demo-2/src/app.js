import React from 'react';
import { hot } from 'react-hot-loader'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    getJs() {
        import('./get');
    }

    render() {
        return (
            <div>
                <div>demo-2</div><br />
                <button onClick={this.getJs}>get_js</button>
            </div>
        )
    }
}

export default hot(module)(App);
