(function () {
  function prepare () {
    const imgTask = (img, src) => {
      return new Promise(function (resolve, reject) {
        img.onload = resolve
        img.onerror = reject
        img.src = src
      })
    }
    const context = document.getElementById('content').getContext('2d')
    const heroImg = new Image()
    const allSpriteImg = new Image()

    const allresourceTask = Promise.all([
      imgTask(heroImg, './assets/hero.png'),
      imgTask(allSpriteImg, './assets/all.jpg'),
    ])

    let loaded = false
    return {
      /**
       * @param {Function} [callback] - callback func when prepared
       */
      getResource (callback) {
        if (loaded) {
          callback && callback(context, heroImg, allSpriteImg)
        }
        allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg)
         loaded = true
				});
      }
    }
  }

  function drawCharacter (context, heroImg, allSpriteImg) {
    const container = {
      width: 500,
      height: 300
    }
    const draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				)
    }

    const bgContext = document.getElementById('background').getContext('2d')
    let bg = {
			img: allSpriteImg,
			context: bgContext,
			imgPos: {
				x: 0,
				y: 264,
				width: 100,
				height: 100
			},
      draw,
    }

    for(let row = 0; row < container.height / 100; row++) {
      for(let column = 0; column < container.width / 100; column++) {
        bg.rect = {
          x: column * 100,
          y: row * 100,
          width: 100,
          height: 100
        }
        bg.draw()
      }
    }

    const inRange = (num, min, max) => num >= min && num <=max
    const notInArea = (item, area) => {
      const { x, y, width, height } = item
      const areaX = area.x
      const areaY = area.y
      const areaWidth = area.width
      const areaHeight = area.height
      const xNotInArea = (x >= areaX + areaWidth) || (x + width) <= areaX
      const yNotInArea = (y >= areaY + areaHeight) || (y + height) <= areaY
      return xNotInArea || yNotInArea
    }

    function action (actionName, blockedAreas = []) {
      const { step, rect, imgPos } = this
      let { x, y } = rect

      switch (actionName) {
        case 'left':
          if (inRange(x, step, container.width)) {
            x -= step
          }
          break
        case 'right':
          if (inRange(x, 0, container.width - imgPos.width - step)) {
            x += step
          }
          break
        case 'top':
          if (inRange(y, step, container.height)) {
            y -= step
          }
          break
        case 'down':
          if (inRange(y, 0, container.height - imgPos.height - step)) {
            y += step
          }
          break
      }
      const shouldMove = blockedAreas.reduce((result, area) => {
        return notInArea({ ...this.rect, x, y }, area) && result
      }, true)
      if (shouldMove) {
        this.rect = { ...this.rect, x, y }
      }
    }
    let hero = {
			img: heroImg,
			context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},
			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},
      draw,
      step: 10,
      action
    }

    const monster = {
			img: allSpriteImg,
			context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},
			rect: {
				x: 100,
				y: 100,
				width: 30,
				height: 30
			},
      draw
    }

    hero.draw()
    monster.draw()

    // Control role behavior: Top, Right, Down, Left
    window.addEventListener('keydown', evt => {
      const KEY_ACTION_MAPPER = {
        37: 'left',
        38: 'top',
        39: 'right',
        40: 'down'
      }
      const actionName = KEY_ACTION_MAPPER[evt.keyCode]
      if (actionName) {
        context.clearRect(hero.rect.x, hero.rect.y, hero.rect.height, hero.rect.width)
        hero.action(actionName, [monster.rect])
        hero.draw()
      }
    })
  }
  const resourceManager = prepare()
  resourceManager.getResource(function (context, heroImg, allSpriteImg) {
    drawCharacter(context, heroImg, allSpriteImg)
  })
})()
