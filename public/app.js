const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = CreateUser.querySelector('.title').value
  // const password = CreateUser.querySelector('.password').value
  // console.log(title);
  post('/createBookInfo', {title})
})
function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}