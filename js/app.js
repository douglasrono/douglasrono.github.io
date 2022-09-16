
(function() {
  const select = (domEl, elems = false) => {
    if (elems) {
      return [...document.querySelectorAll(domEl)]
    } else {
      return document.querySelector(domEl)
    }
  }

  const on = (type, domEl, eventListener, elems = false) => {
    let selectEl = select(domEl, elems)
    if (selectEl) {
      if (elems) {
        selectEl.forEach(e => e.addEventListener(type, eventListener))
      } else {
        selectEl.addEventListener(type, eventListener)
      }
    }
  }
  const onscroll = (domEl, eventListener) => {
    domEl.addEventListener('scroll', eventListener)
  }

  let navLinks = select('#navbar .scrollto', true)
  const activeLink = () => {
    let position = window.scrollY + 200
    navLinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', activeLink)
  onscroll(document, activeLink)
  const scrollto = (domEl) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(domEl).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  let scroll_up = select('.scrollUp')
  if (scroll_up) {
    const togglescroll_up = () => {
      if (window.scrollY > 100) {
        scroll_up.classList.add('active')
      } else {
        scroll_up.classList.remove('active')
      }
    }
    window.addEventListener('load', togglescroll_up)
    onscroll(document, togglescroll_up)
  }
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)
  
});
console.log(select)





