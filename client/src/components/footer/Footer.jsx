import React from 'react'
import './footer.css'; 

const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-container'>
            <p>&copy; {new Date().getFullYear()} Smith Scraper IMDb Ranking Tracker. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer