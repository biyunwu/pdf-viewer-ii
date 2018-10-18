import React from 'react';
import Pdf from './components/Pdf'
import Navbar from './components/Navbar'

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Pdf />
            </React.Fragment>
        )
    }
}