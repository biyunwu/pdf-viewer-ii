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
    }

    updateSidebarStatus = () => {
        this.setState(prevState => ({isSidebarOpen: !prevState.isSidebarOpen}))
    }

    handleChapterChange = (chapter) => {
        this.setState({ data: this.getData(chapter)})
    }

    getData = (chapter) => {
        // if (this.props.chapter !== this.state.chapter){
        //     this.setState({chapter: this.props.chapter})
        // }
        // const chapter = this.state.chapter
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
                {/* {chapters.map((chapterText, idx) => 
                    chapter === idx && <Pdf key={idx} chapter={chapter}/>
                )} */}
                {data && <Pdf data={data} />}
            </React.Fragment>
        )
    }
}