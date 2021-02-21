function init() {
  // * Global Variables
  const grid = document.querySelector('.grid')
  

  // * Grid variables
  const width = 20
  const cellCount = width * width
  const cells = []
  let cell 
  const mazeClass = 'maze-wall'
  const mazeArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,29,30,39,40,42,43,45,46,47,49,50,52,53,54,56,57,59,60,62,63,65,66,67,69,70,72,73,74,76,77,79,80,87,89,90,92,99,100,102,103,105,114,116,117,119,120,122,123,125,126,128,131,133,134,136,137,139,140,148,151,159,160,161,162,163,164,165,166,168,169,170,171,173,174,175,176,177,178,179,200,201,202,203,204,206,208,209,210,211,213,215,216,217,218,219,220,226,233,239,240,242,243,244,246,247,248,249,250,251,252,253,255,256,257,259,260,262,277,279,280,284,286,288,289,290,291,293,295,279,299,300,302,303,304,306,313,315,316,317,319,320,326,327,328,329,330,331,332,333,339,340,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,359,360,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399] 
  const ghostHomeArray = [129,130,149,150]
  const ghostHomeClass = 'ghost-home'
  const playerTrack = mazeArray.concat(ghostHomeArray)

  const pelletClass = 'pellet'
  const superPelletClass = 'super-pellet'
  const pelletEatenClass = 'pellet-eaten'
  const pellets = []
  const pelletsEaten = []



  // * Player Variables
  const playerClass = 'player'
  const playerStartPosition = 369
  let playerCurrentPosition = 369
  let playerDirection = 'right'

  // * Game state/logic variables
  const score = 0
  // let lives = 3
  // let scoreArray = 0
  

  // * Ghosts
  // ? four ghosts as individual objects, each with uniq behaviours stored as methods that can be called back with conditoinal logic based on player movement.
  const char = {
    name: 'Char',
    className: 'char',
    startingPosition: 21,
    currentPosition: 21,
    targetPosition: 229,
    chase() {
      // targets a target tile is clculated everytime before a decsiion to move is made
      // each ghost has uniqe behaviour/target tile based on player position
    },
    scatter() {
      // targets specific tile in the corner of maze, never changes
    }, 
    frightened() {
      // instead fo minimising ditance they will pick an eldigible direction at random using output from a random number generator

      // if player eats frightened ghost, they will endter eaten mode
    }, 
    eaten() {
      // ghost targets ghost home/starting position
      // once home they revert to scatter or chase mode
    },
    add() {

    },
    remove() {

    }
  }

  // * Make Grid
  function createGrid(playerStartPosition) {
    for (let i = 0; i < cellCount; i++) {
      cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cell.id = i
      //cell.classList.add('grid-item')
      cells.push(cell)
      
      renderMaze(cell)
      renderGhostHome(cell)
      renderPellets(cell)
    }
    //console.log(cells)
    addPlayer(playerStartPosition)
    // will add ghosts initial position here too
  }
  
  
  function renderMaze(gridIndex) {
    if (mazeArray.includes(Number(gridIndex.id))) {
      gridIndex.classList.add(mazeClass)
    }
  }

  function renderGhostHome(gridIndex) {
    if (ghostHomeArray.includes(Number(gridIndex.id))) {
      gridIndex.classList.add(ghostHomeClass)
    }
  }

  function renderPellets(gridIndex) {
    if (!playerTrack.includes(Number(gridIndex.id))) {
      pellets.push(gridIndex)
      addPellets()
    }
  }
  
  // * add pellets and super pellets to grid
  function addPellets() {
    pellets.forEach(pellet => {
      if (pellet.id % 28 === 0) {
        pellet.classList.add(superPelletClass)
      } else {
        pellet.classList.add(pelletClass)
      }
    })
  }

  // * Add player to grid on move
  function addPlayer(position) {
    cells[position].classList.add(playerClass)
  }
  
  // * Remove player from grid on move
  function removePlayer(position) {
    cells[position].classList.remove(playerClass)
  }

  // * Remove pellet, and output pelletsEaten array
  function removePellet(playerPosition) {
    pellets.forEach(pellet => {
      if (playerPosition === Number(pellet.id)) {
        if (pellet.id % 28 === 0) {
          pellet.classList.remove(superPelletClass)
          pellet.classList.add(pelletEatenClass)
          pellet.setAttribute('data-score', 50)
          //pellet.removeAttribute('data-score')
        } else {
          pellet.classList.remove(pelletClass)
          pellet.classList.add(pelletEatenClass)
          pellet.setAttribute('data-score', 10)
          //pellet.removeAttribute('data-score')
        }
        // * create array for pelets eaten and contain score in attrbute
        pelletsEaten.push(pellet)
      }
    })
  }




  // ! handle Score WIP


  function handleScore(total) {
    // create array of pellets eated. then get data-value of each and sum together for total score.
    const eatenPellets = document.getElementsByClassName(pelletEatenClass)
    console.log('eaten ellets ->', eatenPellets)
    const pelletValue = eatenPellets[0].getAttribute('data-score')
  

    console.log('pellet value ->', pelletValue)

    total += Number(pelletValue)
    console.log('total', total)
    return total 
  }
  
  function handleKeyUp(event) {
    const key = event.keyCode

    // * player movement logic
    if (key === 39) {
      playerDirection = 'right'
      console.log('player pressed right')
    } else if (key === 37) {
      playerDirection = 'left'
      console.log('player pressed left')
    } else if (key === 38) {
      playerDirection = 'up'
      console.log('player pressed up')
    } else if (key === 40) {
      playerDirection = 'down'
      console.log('player pressed down')
    } else {
      console.log('invalid key')
    }
  }

  function movePlayer() {
    const playerRelativePositionLeft = playerCurrentPosition - 1
    const playerRelativePositionRight = playerCurrentPosition + 1
    const playerRelativePositionUp = playerCurrentPosition - width
    const playerRelativePositionDown = playerCurrentPosition + width

    const portalLeft = 180
    const portalRight = 199

    removePlayer(playerCurrentPosition)
    // ! add char

    if (playerDirection === 'right' && playerCurrentPosition % width !== width - 1 && !playerTrack.includes(playerRelativePositionRight)) {
      playerCurrentPosition++
      console.log('Moving right')
    } else if (playerDirection === 'left' && playerCurrentPosition % width !== 0 && !playerTrack.includes(playerRelativePositionLeft)) {
      playerCurrentPosition--
      console.log('Moving left')
    } else if (playerDirection === 'up' && playerCurrentPosition >= width && !playerTrack.includes(playerRelativePositionUp)) {
      playerCurrentPosition -= width
      console.log('Moving up')
    } else if (playerDirection === 'down' && playerCurrentPosition + width <= width * width - 1 && !playerTrack.includes(playerRelativePositionDown)) {
      playerCurrentPosition += width
      console.log('Moving down')
    } else {
      console.log('Ouch! Wall!')
    }

    // * Gateway logic
    if (playerCurrentPosition === portalRight) {
      playerCurrentPosition = portalLeft
      console.log('Player traveled through portal')
    } else if (playerCurrentPosition === portalLeft) {
      playerCurrentPosition = portalRight
      console.log('Player traveled through portal')
    }

    console.log('playerPosition ->', playerCurrentPosition)

    addPlayer(playerCurrentPosition)
    removePellet(playerCurrentPosition)
    handleScore(score)
    // ! remove char
    
  }
  
  

  // * Call functions
  createGrid(playerStartPosition) 

  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)

  // * Start timers
  const playerDirectionState = setInterval(movePlayer, 300)
}

window.addEventListener('DOMContentLoaded', init)