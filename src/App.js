import React, { Component } from 'react';
import Viewer from './Viewer';
import './App.css'

const chapters = [
    'Introduction',
    'Chapter 1: The Origin of the Concept of Ālayavijñāna',
    'Chapter 2: Ālayavijñāna in the Cheng Weishi Lun: A Buddhist Theory of the Subliminal Mind',
    'Chapter 3: The Unconscious: Freud and Jung',
    'Chapter 4: Three Paradigms of the Subliminal Mind: Xuan Zang, Freud, and Jung',
    'Chapter 5: Accessibility of the Subliminal Mind: Transcendence versus Immanence',
    'Conclusion: An Emerging New World as a New Context',
    'Notes'
]

export default class App extends Component {
    state = {
        chapter: undefined
    }

    updateChapter = (idx) => {
        console.log(idx)
        this.setState({chapter: idx})
    }

    createChapterElements = () => 
        <ul>
            {chapters.map((chapter, idx) => 
                <li key={chapter}
                    className='chapter-list'
                    onClick={this.updateChapter.bind(this, idx)}
                >
                    {chapter}
                </li>
            )}
        </ul>

    render() {
        const { chapter } = this.state
        return (
            chapter >= 0 ?
                <Viewer chapter={chapter}/>
            :
                this.createChapterElements()
        )
    }
}