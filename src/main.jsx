import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { linkedinColors } from './utils/colors.js'
import App from './App.jsx'

document.documentElement.style.cssText = 'margin:0;padding:0;height:100%'
document.body.style.cssText = `margin:0;padding:0;width:100%;height:100%;background-color:${linkedinColors.background.page}`

const root = document.getElementById('root')
root.style.cssText = 'width:100%;min-height:100dvh;display:flex;flex-direction:column'

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
