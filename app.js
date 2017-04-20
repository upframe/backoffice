'use strict'

var apiURL = (() => {
  if (window.location.hostname !== 'backoffice.upframe.co') {
    return `http://${window.location.hostname}:3002`
  }

  return 'https://api.upframe.co'
})()

function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#login form').addEventListener('submit', submit)
  validate()

  document.getElementById('logout').addEventListener('click', event => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  })

  document.getElementById('email').addEventListener('submit', event => {
    event.preventDefault()

    let token = window.localStorage.getItem('token')

    fetch(`${apiURL}/emails`, {
      method: 'POST',
      mode: 'cors',
      body: new window.FormData(event.currentTarget),
      headers: new window.Headers({
        'Authorization': `Bearer ${token}`
      })
    }).then(handleErrors)
      .then(function (response) {
        window.alert('Success')
      }).catch(function (error) {
        window.alert('Error:' + error)
      })
  })
})
