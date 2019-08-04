(function () {
  function prepare () {
    const context = document.getElementById('content').getContext('2d')
    const heroImg = new Image()
    let loaded = false
    return {
      /**
       * @param {Function} [callback] - callback func when prepared
       */
      getResource (callback) {
        if (loaded) {
          callback && callback(context, heroImg)
        }
        heroImg.onload = function () {
          callback && callback(context, heroImg)
          loaded = true
        }
        heroImg.src = './assets/hero.png'
      }
    }
  }

  function drawHero (context, heroImg, { initX, initY }) {
    console.log(context, heroImg)
      const imgPos = {
        x: 0,
        y: 0,
        width: 32,
        height: 32
      }

      var rect = {
        x: initX,
        y: initY,
        width: 40,
        height: 40
      }

      context
        .drawImage(
          heroImg,
          imgPos.x,
          imgPos.y,
          imgPos.width,
          imgPos.height,
          rect.x,
          rect.y,
          rect.width,
          rect.height
        )
    }
  const resourceManager = prepare()
  resourceManager.getResource((context, heroImg) => drawHero(context, heroImg, { initX: 0, initY: 0 }))

})()