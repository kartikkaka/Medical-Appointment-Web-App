import React from 'react'
import styles from './Footer.module.css'

const SocialIcon = ({ name }) => {
  const props = { width: 14, height: 14, fill: 'currentColor', 'aria-hidden': true }
  if (name === 'facebook') return <svg {...props} viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8.5v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z"/></svg>
  if (name === 'twitter') return <svg {...props} viewBox="0 0 24 24"><path d="M22 5.9c-.6.3-1.3.5-2 .6.7-.4 1.2-1 1.4-1.7-.7.4-1.5.7-2.3.9C18.3 5 17.3 4.6 16.2 4.6c-1.8 0-3.2 1.6-2.8 3.3-2.4-.1-4.6-1.3-6-3.1-.8 1.3-.4 3 .9 3.9-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.4 3.1 3.8-.5.1-1 .2-1.5.1.4 1.3 1.7 2.2 3.2 2.2-1.2 1-2.7 1.6-4.3 1.6-.3 0-.7 0-1-.1 1.5 1 3.4 1.6 5.3 1.6 6.4 0 9.9-5.3 9.9-9.9v-.5c.7-.5 1.3-1.2 1.8-1.9-.6.3-1.3.5-2 .6z"/></svg>
  return <svg {...props} viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.5c0-1.31-.02-3-1.83-3-1.84 0-2.12 1.44-2.12 2.92v5.58H7.57V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.54v6.2zM5.34 7.5a2.07 2.07 0 11.01-4.14 2.07 2.07 0 01-.01 4.14zM7.11 20.45H3.57V9H7.11v11.45z"/></svg>
}

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.logo} aria-hidden>🩺</div>
          <div className={styles.brand}>
            <div className={styles.name}>MediPortal</div>
            <div className={styles.tag}>Patient-friendly healthcare</div>
          </div>
        </div>

       
        <div className={styles.contact}>
          <a href="mailto:help@mediportal.demo">help@mediportal.demo</a>
          <span className={styles.sep}>•</span>
          <a href="tel:+1234567890">+1 234 567 890</a>
        </div>

        <div className={styles.right}>
          <div className={styles.social} aria-label="Social links">
            <a href="#" aria-label="Facebook" className={styles.socialBtn}><SocialIcon name="facebook"/></a>
            <a href="#" aria-label="Twitter" className={styles.socialBtn}><SocialIcon name="twitter"/></a>
            <a href="#" aria-label="LinkedIn" className={styles.socialBtn}><SocialIcon name="linkedin"/></a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>© {year} MediPortal — All rights reserved</div>
    </footer>
  )
}

export default Footer
