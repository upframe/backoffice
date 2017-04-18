'use strict'

import * as tokens from './tokens'

const apiURL = (() => {
  if (window.location.hostname !== 'upframe.co') {
    return `http://${window.location.hostname}:3002`
  }

  return 'https://api.upframe.co'
})()
tokens.init(apiURL)

document.addEventListener('DOMContentLoaded', () => {
})
