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
				x: 100,
				y: 364,
				width: 100,
				height: 100
			},
      draw,
    }

    for(let row = 0; row < container.height / bg.imgPos.height; row++) {
      for(let column = 0; column < container.width / bg.imgPos.width; column++) {
        bg.rect = {
          x: column * bg.imgPos.height,
          y: row * bg.imgPos.width,
          width: bg.imgPos.height,
          height: bg.imgPos.height
        }
        bg.draw()
      }
    }
    /**
     * Check if a number is between a given range
     * @param {Number} num Number need evaluation
     * @param {Number} min Minimum value of the range
     * @param {Number} max Maximum value of the range 
     * @returns {Boolean} check if num is in range
     */ 
    const inRange = (num, min, max) => num >= min && num <=max
    
    /**
     * Check if 2 area is overlapped. if they are not overlapped, return true, otherwise, return false
     * @param {Object} area1 should contain x, y, width and height properties
     * @param {Object} area2 same as area1
     * @returns {Boolean}
     */
    const isOverlapped = (area1, area2) => {
      const { x, y, width, height } = area1
      const areaX = area2.x
      const areaY = area2.y
      const areaWidth = area2.width
      const areaHeight = area2.height
      const xNotOverlapped = (x >= areaX + areaWidth) || (x + width) <= areaX
      const yNotOverlapped = (y >= areaY + areaHeight) || (y + height) <= areaY
      return !(xNotOverlapped || yNotOverlapped)
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
        return !isOverlapped({ ...this.rect, x, y }, area) && result
      }, true)
      if (shouldMove) {
        this.rect = { ...this.rect, x, y }
      }
    }

    class Hero {
      constructor (img, context, rect) {
        this.img = img
        this.context = context
        this.rect = rect
        this.step = 10
        this.imgPos = {
          x: 0,
          y: 0,
          width: 32,
          height: 32
        }
      }
    }

    Hero.prototype.draw = draw
    Hero.prototype.action = action

    class Monster {
      constructor ({ context, initPos, imgPos }) {
        this.img = allSpriteImg
        this.context = context
        this.rect = {
          x: initPos.x,
          y: initPos.y,
          width: 30,
          height: 30
        }
        this.imgPos = {
          x: imgPos.x,
          y: imgPos.y,
          width: 32,
          height: 32
        }
      }
    }
    Monster.prototype.draw = draw

    const monster1 = new Monster({
      context, 
      initPos: {
        x: 100,
        y: 100
      },
      imgPos: {
        x: 858,
        y: 529
      }
    })
    const monster2 = new Monster({
      context, 
      initPos: {
        x: 200,
        y: 200
      },
      imgPos: {
        x: 858,
        y: 529
      }
    })
    const redMonster = new Monster({
      context, 
      initPos: {
        x: 200,
        y: 250
      },
      imgPos: {
        x: 858,
        y: 497,
        width: 32,
        height: 32
      }
    })

    const hero = new Hero(heroImg, context, {
      x: 0,
      y: 0,
      width: 32,
      height: 32
    })
    hero.draw()
    monster1.draw()
    monster2.draw()
    redMonster.draw()

    // Control hero behavior: Top, Right, Down, Left
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
        hero.action(actionName, [monster1.rect, monster2.rect, redMonster.rect])
        hero.draw()
      }
    })
  }

  const resourceManager = prepare()
  resourceManager.getResource(function (context, heroImg, allSpriteImg) {
    drawCharacter(context, heroImg, allSpriteImg)
  })
})()
