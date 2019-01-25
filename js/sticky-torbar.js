window.addEventListener('scroll', function () {
  if (window.scrollY > 0) {
    topBar.classList.add('sticky')
  } else {
    topBar.classList.remove('sticky')
  }
})
