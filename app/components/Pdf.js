import React, { Component } from 'react';
import { Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';

export default class Pdf extends Component {
    state = {
        scale: 1.5,
        numPages: null,
        // pageNumber: 1,
        chapter: 1,
        data: null
    }

    componentDidMount () {
        const chapter = this.state.chapter
        if (chapter >= 0 ) {
            const basename = `JVBERi0xLj`
            fetch(`https://freud-viewer.herokuapp.com/freud/${chapter}`)
            .then(
                    (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                        return;
                    }
                    // Examine the text in the response
                    response.json().then((data) => {
                        const base64 = basename + data.content;
                        // console.log(data);
                        this.setState({data: this.base64ToArrayBuffer(base64)})
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
        }
    }

    base64ToArrayBuffer = (base64) => {
        const raw =  window.atob(base64);
        const rawLength = raw.length;
        const array = new Uint8Array(new ArrayBuffer(rawLength));
        for (let i = 0; i < rawLength; i++){
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    getAllPageComponents = (numPages) => {
        const pages = []
        for (let i=1; i<=numPages; i++) {
            pages.push(<Page pageNumber={i} />)
        }
        return pages
    }

    render() {
        const { scale, numPages, data } = this.state;
        console.log(this.state)
        return ( 
            data &&
            <div>
                <Document
                    file={{data: data}}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    loading='Loading... Please wait.'
                >
                    {/* Convert numPages to array which has elements from 1 to numPages */
                        Array.apply(null, Array(numPages)).map(function (_, i) {return i+1}).map(num => 
                        <Page
                            key={num}
                            pageNumber={num}
                            scale={scale}
                        />)
                    }
                </Document>
            </div>
        )
    }
}