import React, { Component } from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

class App extends Component {
    state = {
        data: null,
        chapter: 1,
        scale: 1.5
    }

    componentDidMount () {
        // const basename = `data:application/pdf;base64,JVBERi0xLj`
        const basename = `JVBERi0xLj`
        fetch(`https://freud-viewer.herokuapp.com/freud/${this.state.chapter}`)
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

    base64ToArrayBuffer = (base64) => {
        const raw =  window.atob(base64);
        const rawLength = raw.length;
        const array = new Uint8Array(new ArrayBuffer(rawLength));
        for (let i = 0; i < rawLength; i++){
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    render() {
        const {data, scale} = this.state
        return (
            data &&
            <React.Fragment>
                <ButtonGroup style={{position: "fixed"}}>
                    <Button type="default">
                        <Icon type="left"/>Previous
                    </Button>
                    <Button type="default">
                        Next<Icon type="right" />
                    </Button>
                </ButtonGroup>
                <PDFViewer 
                    document={{
                        binary: data
                    }}
                    scale={scale}
                    navigation={{
                        css: {
                            // previousPageBtn: 'previous-button', // CSS Class for the previous page button
                            // nextPageBtn: 'next-button', // CSS Class for the next page button
                            pages: 'page-num', // CSS Class for the pages indicator
                            wrapper: 'control-panel' // CSS Class for the navigation wrapper
                        },
                        // elements: {
                        //     previousPageBtn: Any, // previous page button React element
                        //     nextPageBtn: Any, // next page button React element
                        //     pages: Any// pages indicator React Element
                        // }
                    }}
                />
            </React.Fragment>
        );
    }
}

// function Control (props) {
//     return (
//         <div>

//         </div>
//     )
// }

export default App;
