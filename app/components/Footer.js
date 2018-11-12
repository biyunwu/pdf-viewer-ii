import React, { Component } from 'react'

export default class Header extends Component {
    render () {
        const establishYear = 2018
        const currYear = (new Date()).getFullYear()
        const year = establishYear < currYear ? `${establishYear} - ${currYear}` : currYear.toString()
        const copyright = <p className='footer-text'>© {year} Tao Jiang</p>

        return (
            <footer className='footer'>
                    
                    <a href='mailto:tjiang@rutgers.edu'>
                        Email
                    </a>
                    <span className='icon-gap'></span>
                    <a href='https://rccs.rutgers.edu/people/director' target='_blank' rel='noopener noreferrer'>
                        Rutgers
                    </a>
                    <span className='icon-gap'></span>
                    <a href='https://www.linkedin.com/in/tao-jiang-bb80b837/' target='_blank' rel='noopener noreferrer'>
                        LinkedIn
                    </a>

                    {copyright}
                    <p className='footer-text'>Created by <a id='developer' href='https://biyunwu.com' target='_blank' rel="noopener noreferrer">Biyun Wu</a></p>
            </footer>
        )
    }
}