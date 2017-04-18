import { handleErrors } from './utils'

var apiURL = ''

export function init (url) {
  apiURL = url

  validate()

  document.querySelector('#login form').addEventListener('submit', submit)
}

function validate () {
  let token = window.localStorage.getItem('token')

  fetch(`${apiURL}/tokens/validate`, {
    method: 'POST',
    mode: 'cors',
    headers: new window.Headers({
      'Authorization': `Bearer ${token}`
    })
  }).then(handleErrors)
    .then(function (response) {
      document.getElementById('login').style.display = 'none'
    }).catch(function (error) {
      console.log(error)
    })
}

function submit (event) {
  event.preventDefault()

  fetch(`${apiURL}/tokens/get`, {
    method: 'POST',
    mode: 'cors',
    body: new window.FormData(event.currentTarget)
  }).then(handleErrors)
    .then(function (res) { return res.json() })
    .then(function (response) {
      window.localStorage.setItem('token', response['Content'])
      window.location.reload()
    }).catch(function (error) {
      console.log(error)
    })
}
