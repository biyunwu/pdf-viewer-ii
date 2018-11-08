import React from 'react';
import Pdf from './components/Pdf'
import Navbar from './components/Navbar'

const chapters = [
    "Introduction",
    "Chapter 1: The Origin of the Concept of Ālayavijñāna",
    "chapter 2: Ālayavijñāna in the Cheng Weishi Lun: A Buddhist Theory of the Subliminal Mind",
    "chapter 3: The Unconscious: Freud and Jung",
    "chapter 4: Three Paradigms of the Subliminal Mind: Xuan Zang, Freud, and Jung",
    "chapter 5: Accessibility of the Subliminal Mind: Transcendence versus Immanence",
    "conclusion: An Emerging New World as a New Context",
    "Notes and Index"
]
const title = 'Contexts and Dialogue: Yogācāra Buddhism and Modern Psychology on the Subliminal Mind'

export default class App extends React.Component {
    state = {
        isSidebarOpen: true,
        chapter: undefined,
        data: null
        // currChapterData: null
    }

    componentDidMount () {
        fetch(`https://freud-viewer.herokuapp.com/freud`)
            .then(
                    (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                        return;
                    }
                    // Examine the text in the response
                    response.json().then((data) => {
                        const decodedData = [];
                        const basename = `JVBERi0xLj`
                        chapters.forEach((c, idx) => {
                            const base64 = basename + data[idx].content
                            decodedData.push(this.base64ToArrayBuffer(base64))
                        });
                        // console.log(data);
                        this.setState({data: decodedData})
                    })}
            ).catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    updateSidebarStatus = () => {
        this.setState(prevState => ({isSidebarOpen: !prevState.isSidebarOpen}))
    }

    handleChapterChange = (chapter) => {
        this.setState({ chapter })
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
        const { isSidebarOpen, chapter, data } = this.state
        console.log(chapter)
        return (
            <React.Fragment>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    title={title}
                    chapters={chapters}
                    updateSidebarStatus={this.updateSidebarStatus}
                    handleChapterChange={this.handleChapterChange}
                />
                {data && chapter>=0 && <Pdf data={data[chapter]} />}
            </React.Fragment>
        )
    }
}