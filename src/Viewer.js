import React, { Component } from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';
import { Spin } from 'antd';
// const ButtonGroup = Button.Group;

class Viewer extends Component {
    state = {
        data: null,
        scale: 1.5,
    }

    componentDidMount () {
        const chapter = this.props.chapter
        if (chapter >= 0 ) {
            // const basename = `data:application/pdf;base64,JVBERi0xLj`
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

    // handleNextPage = () => {
    //     this.setState({page: this.state.page + 1})
    // }

    render() {
        const {data, scale} = this.state
        
        return (
            data ?
                <PDFViewer 
                    document={{
                        binary: data
                    }}
                    scale={scale}
                />
            :
                <Loading />
        );
    }
}

const Loading = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    return (
        <div style={style}>
            <Spin size="large" style={{display: 'inline-block'}}/>
            <p style={{display: 'inline-block', marginLeft: '10px'}}>Loading...</p>
        </div>
    )
}

export default Viewer;
