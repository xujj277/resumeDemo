!function () {
  var view = document.querySelector('nav.menu')
  var controller = {
    view: null,
    aTags: null,
    init: function (view) {
      this.view = view
      this.initAnimation()
      this.bindEvents()
    },
    initAnimation: function () {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    },
    scrollToElement: function () {
      let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop
      let currentTop = window.scrollY
      let targetTop = top - 80
      let s = targetTop - currentTop
      if (s > 500) {
        s = 500
      }
      let t = Math.abs((s/100)*200)

      var coords = { y: currentTop };
      var tween = new TWEEN.Tween(coords)
        .to({ y: targetTop }, t)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function() {
          window.scrollTo(0, coords.y)
        })
        .start();
    },
    bindEvents: function () {
      this.aTags = document.querySelectorAll('nav.menu > ul > li > a')
      for (let i=0; i<this.aTags.length; i++) {
        this.aTags[i].onclick = function (x) {
          x.preventDefault();
          this.scrollToElement()
        }
      }
    }
  }
  controller.init(view)
}.call()
