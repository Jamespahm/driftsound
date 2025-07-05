import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// CSS thuần
import './styles/globalstyle.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/soundcard.css'
import './styles/soundlibrary.css'
import './styles/playcontrols.css'
import './styles/timer.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
