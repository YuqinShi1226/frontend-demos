(function () {

  function prepare () {
    const context = document.getElementById('content').getContext('2d')

    const imgTask = (img, src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = src
      })
    }
    const heroImg = new Image()
    const allSpriteImg = new Image()

    const allresourceTask = Promise.all([
      imgTask(heroImg, './hero.png'),
      imgTask(allSpriteImg, './all.jpg'),
    ]);

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
					callback && callback(context, heroImg, allSpriteImg);
				});
      }
    }
  }

  function drawCharacter (context, heroImg, allSpriteImg) {
    const container = {
      height: 400,
      width: 400
    }

    const hero = {

    }
    const imgPos = {
      hero: {
        x: 0,
        y: 0,
        width: 32,
        height: 32
      },
      monster: {
        x: container.height / 2,
        y: container.width / 2,
        width: ,
        height: container.height / 2
      }
    }

    const containerPos = {

    }
    const rect = {
      x: 0,
      y: 0,
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
  resourceManager.getResource((context, heroImg, allSpriteImg) => draw(context, heroImg, allSpriteImg))
})()