import React from 'react';
import Pdf from './components/Pdf'
import Navbar from './components/Navbar'

const chapters = [
    "introduction",
    "Chapter 1: The Origin of the Concept of Ālayavijñāna",
    "chapter 2: Ālayavijñāna in the Cheng Weishi Lun: A Buddhist Theory of the Subliminal Mind",
    "chapter 3: The Unconscious: Freud and Jung",
    "chapter 4: Three Paradigms of the Subliminal Mind: Xuan Zang, Freud, and Jung",
    "chapter 5: Accessibility of the Subliminal Mind: Transcendence versus Immanence",
    "conclusion: An Emerging New World as a New Context",
    "Notes and Index"
]
export default class App extends React.Component {
    state = {
        isSidebarOpen: true,
        chapter: null
    }

    updateSidebarStatus = () => {
        this.setState(prevState => ({isSidebarOpen: !prevState.isSidebarOpen}))
    }

    handleChapterChange = (chapter) => {
        this.setState({chapter})
    }

    render() {
        const { isSidebarOpen, chapter } = this.state
        console.log(this.state.chapter)
        return (
            <React.Fragment>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    chapters={chapters}
                    updateSidebarStatus={this.updateSidebarStatus}
                    handleChapterChange={this.handleChapterChange}
                />
                {chapters.map((chapterText, idx) => 
                    chapter === idx && <Pdf key={idx} chapter={chapter}/>
                )}
            </React.Fragment>
        )
    }
}