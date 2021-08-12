// Игра Виселица
// __________________________________________________

let sentence = "Кант Хроника Зал Галера Балл Вес Кафель  Знак Фильтр Башня Кондитер Омар Чан Пламя  Банк Тетерев Муж Камбала Груз Кино Лаваш Калач Геолог Бальзам Бревно Жердь Борец Самовар Карабин Подлокотник Барак Мотор Шарж Сустав Амфитеатр Скворечник Подлодка Затычка Ресница Спичка Кабан Муфта Синоптик Характер Мафиози Фундамент Бумажник Библиофил Дрожжи Казино Конечность Пробор Дуст Комбинация Мешковина Процессор Крышка Сфинкс Пассатижи Фунт Кружево Агитатор Формуляр  Прокол Абзац Караван Леденец Кашпо Баркас Кардан Вращение Заливное Метрдотель Клавиатура Радиатор Сегмент Обещание Магнитофон Кордебалет Заварушка " 
let words = sentence
            .split(' ')
            .filter(word => word.length > 3)
            .map(word => word.toLowerCase())
            .map(word => {
              if (word.includes(',') || word.includes('.')) {
                // 
                return word = word.split('').splice(0,word.length - 1).join('')               
              } else {
                return word
              }
            })
let word = words[Math.floor(Math.random() * words.length)]
let answerArr = []
for (let i = 0; i < word.length; i++) {
  answerArr.push('_')
}
let answer = answerArr.join(' ')
let remainingLength = word.length
let input =  document.getElementById('inputSymbol')
let button = $('#button-addon2')
let isHit = false
let motion = 9
let pastLetters = []
let canvas = $('#canvas')[0]
let ctx = canvas.getContext('2d')
ctx.strokeStyle = 'rgb('+(150 - Math.random() * 80)+','+(150 - Math.random() * 50)+','+(150 - Math.random() * 50)+')'
ctx.lineWidth = 6

$('.answerArea')[0].innerText = answer
// $('.resultText')[2].innerText = word


function clear() {
  setTimeout(() => {
    input.value = ''
  }, 900);
}

function answerStyles(bgColor) {
  $('.answerArea')[0].style.padding = "0 10px"
  $('.answerArea')[0].style.backgroundColor = bgColor
  $('.answerArea')[0].style.color = "#FFFFFF"
}

function winning() {
  setTimeout(() => {
    if (remainingLength === 0) { 
      $('.resultText')[0].innerText = 'Вы победили!';
      pastLetters = []
      aliveMan()
      answerStyles('#63A80A')
    }
    
  }, 900); 
}

function losing() {
  if (!isHit) {
    motion--
    if(motion == 8) {
      ctx.beginPath()
      ctx.moveTo(100,370)
      ctx.lineTo(100,20)
      ctx.stroke()
    }
    if(motion == 7) {
      ctx.beginPath()
      ctx.moveTo(100,20)
      ctx.lineTo(300,20)
      ctx.stroke()
    }
    if(motion === 6) {
      ctx.beginPath()
      ctx.moveTo(250,20)
      ctx.lineTo(250,70)
      ctx.stroke()
    }
    if(motion === 5) {
      ctx.beginPath()
      ctx.arc(251,90,20,Math.PI * 1.5,Math.PI * 3.5,false)
      ctx.stroke()
    }
    if(motion === 4) {
      ctx.beginPath()
      ctx.moveTo(251,110)
      ctx.lineTo(251,200)
      ctx.stroke()
    }
    if(motion === 3) {
      ctx.beginPath()
      ctx.moveTo(251,110)
      ctx.lineTo(231,150)
      ctx.stroke()
    }
    if(motion === 2) {
      ctx.beginPath()
      ctx.moveTo(251,110)
      ctx.lineTo(270,150)
      ctx.stroke()
    }
    if(motion === 1) {
      ctx.beginPath()
      ctx.moveTo(251,200)
      ctx.lineTo(231,240)
      ctx.stroke()  
    }
    if(motion === 0) {
      ctx.beginPath()
      ctx.moveTo(251,200)
      ctx.lineTo(271,240)
      ctx.stroke()
      ctx.beginPath()
      ctx.fillStyle = '#DC3545'
      moveTo(250,70)
      ctx.arc(251,90,20,Math.PI * 1.5,Math.PI * 3.5,false)
      ctx.fill()
      $('.resultText')[0].innerText = `Вы проиграли`
      $('.answerArea')[0].innerText = word.split('').join(' ')
      pastLetters = []
      answerStyles('#DC3545')
    }
    $('.resultText')[0].innerText = `Ошибка! Осталось ${motion} попыток`
  }
}

function aliveMan() {
  ctx.fillStyle = '#d1d0d0'
  ctx.fillRect(200,65,100,200)
  ctx.beginPath()
  // ctx.cleatRect(250,70,100,200)
  ctx.strokeStyle = '#63A80A'
  ctx.moveTo(280,370)
  ctx.lineTo(300,330)
  ctx.lineTo(320,370)
  ctx.moveTo(300,330)
  ctx.lineTo(300,240)
  ctx.moveTo(300,240)
  ctx.lineTo(280,300)
  ctx.moveTo(300,245)
  ctx.lineTo(330,240)
  ctx.lineTo(340,200)
  ctx.moveTo(320,220)
  ctx.arc(300,220,20,0,Math.PI * 2, false)
  ctx.stroke()
}


function noDigits(event) {
  if ("1234567890`~!@#$%^&*()_+=-\\/., ".indexOf(event.key) != -1)
    event.preventDefault();
}
$('.resultText')[0].innerText = `Осталось ${motion} попыток`
function game() {
  if(motion > 0) {
    if(input.value.split('').length > 1 || input.value.split('').length === 0 || typeof(input.value) != 'string') {
      $('.resultText')[0].innerText = `введите 1 букву!`
    } 
    isHit = false
    if(input.value.split('').length == 1 && typeof(input.value) === 'string') {
      if (pastLetters.includes(input.value)) {
        $('.resultText')[0].innerText = 'такую букву уже вводили!'
      } else {
        $('.resultText')[0].innerText = 'проверяем..'
        setTimeout(() => {
          pastLetters.push(input.value)
          for (let i = 0; i < word.length; i++) {
            if ( word[i] === input.value.toLowerCase()) {
              $('.resultText')[0].innerText = 'есть такая буква!'
              answer = answer.split(' ')
              answer[i] = input.value.toLowerCase()
              answer = answer.join(' ')
              $('.answerArea')[0].innerText = answer
              remainingLength--
              isHit = true
            } 
          }
        }, 500); 
        setTimeout(() => {
          losing()
        }, 900);
      }
    }
  } else {
    $('.resultText')[0].innerText = 'не осталось попыток!'
  }
  
}

button.click(() => {
  game()
  clear() 
  winning()
})

$(document).ready( () => {
  $('#inputSymbol').keydown((e) => {
    if (e.keyCode === 13) {
      game()
      clear() 
      winning()
    }
  })
})




// Игра Найди клад
// __________________________________________________


let mapRezult = $('.map-rezult')[0]
let map =$('.map')
let mapWidth = Math.floor(map.width())
let mapHeight = Math.floor(map.height())

let trove = {
  x: Math.floor(Math.random() * mapWidth * 0.98) + 10,
  y: Math.floor(Math.random() * mapHeight * 0.98) + 10
}

let rezulColors = (node, bgColor, textColor)  => {
  node.style.backgroundColor = bgColor
  node.style.color = textColor
}

let rezult = (distance) => {
  if (distance < 30) { 
    rezulColors(mapRezult,'#4A653E','#fff')
    return 'Вы победили!' 
  }
  if (distance > 30 && distance <= 50) {
    rezulColors(mapRezult,'#871E1E','#fff')
    return 'Горячее!!!'
  }
  if (distance > 50 && distance <= 125) {
    rezulColors(mapRezult,'#D0A342','#fff')
    return 'Горячо!'
  }
  if (distance > 125 && distance <= 200) {
    rezulColors(mapRezult,'#DCDCAA','#000')
    return 'Тепло'
  }
  if (distance > 200 && distance <= 250) {
    rezulColors(mapRezult,'#009687','#fff')
    return 'Прохладно :('
  }
  if (distance > 250 && distance <= 350) {
    rezulColors(mapRezult,'#007ACC','#fff')
    return 'Холодно!'
  }
  if (distance > 350) {
    rezulColors(mapRezult,'#294A6E','#fff')
    return 'Дубэо!!!'
  }
}
let drawCircle = (event) => {
    $('<div class="cursor">')
      .css({
        top: event.pageY- 55,
        left: event.pageX - 15
      })
      .appendTo($('.map-img'))
      .on('animationend webkitAnimationEnd', function (event) {
        $(this).remove();
      });
}
 
let getDistance = (e, target) => {
  let distanceX = e.offsetX - target.x
  let distanceY = e.offsetY - target.y
  return Math.round(Math.sqrt(distanceX ** 2 + distanceY ** 2))
}
map.click((e) => {
  $('.map-text').fadeIn(200).fadeOut(500)
  drawCircle(e)
  let distance = getDistance(e, trove)
  let rezultText = rezult(distance)
  mapRezult.innerText = rezultText
})


// Конструкторы
// __________________________________________________

let Car = function(x,y)  {
  this.x = x;
  this.y = y
}



Car.prototype.draw = function() {
  let carHtml = `<img src="https://ih1.redbubble.net/image.738209654.7447/st,small,507x507-pad,600x600,f8f8f8.u5.jpg">`

  this.carElement = $(carHtml)

  this.carElement.css({
    position: "relative",
    left: this.x,
    top: this.y,
    width: "100px"
  })

  $(".drawCar").append(this.carElement)
}

let tesla = new Car(150,10)
tesla.draw()












// _________________________________________
// Рисуем снеговика

const snowManCanvas = document.querySelector('#snowman')
let snm = snowManCanvas.getContext('2d')
snm.strokeStyle = '#0e4af0'
snm.fillStyle = '#DC3545'
snm.lineWidth = 0.33
// snm.beginPath()
// snm.moveTo(100,5)
// snm.lineTo(100,20)
// snm.stroke()
  
const drawSnowman = (pageX, pageY) => {
  const strokeCircle = function (x,y, radius) {
    snm.beginPath()
    snm.arc(x, y, radius, 0, Math.PI * 2, false)
    snm.stroke()
  }
  const fillCircle = function (x,y, radius) {
    snm.beginPath()
    snm.arc(x, y, radius, 0, Math.PI * 2, false)
    snm.fill()
  }
  strokeCircle(pageX, pageY, 15)
  strokeCircle(pageX, pageY+40, 25)
  strokeCircle(pageX-5, pageY-5, 3)
  strokeCircle(pageX+5, pageY-5, 3)
  fillCircle(pageX, pageY+3, 3)
  strokeCircle(pageX, pageY+28, 3)
  strokeCircle(pageX, pageY+40, 3)
  strokeCircle(pageX, pageY+53, 3)
}

  snowManCanvas.addEventListener('mousemove', event => {
    if (event.offsetX % 1.5 === 0) {
      setTimeout(() => {
        drawSnowman(event.offsetX, event.offsetY)
      }, 300);
    }
  })



  // ____________________________________________________
  // рисуем по массиву

const pointsArr = document.querySelector('#points')
let pnts = pointsArr.getContext('2d')
pnts.lineWidth = 1
pnts.strokeStyle = '#1E1E1E'
let mysteryPoints = [[]]

function onlyDigits(event) {
  if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiop[]asdfghjkl{}|\":;'zxcvbnm`~<>?!@#$%^&*()_+=-\\/., ".indexOf(event.key) != -1)
    event.preventDefault();
}
  

addEventListener('click', (event) => {
  const inputX = document.getElementById(`pointX`)
  const inputY = document.getElementById(`pointY`)
  const btn = event.target.dataset.btn
  const labelPoint = document.querySelector('#poinatLabel')
  const i = mysteryPoints.length - 1

  if (btn === 'render' && mysteryPoints[i][0] == inputX.value && mysteryPoints[i][1] == inputY.value) {
    labelPoint.innerText = "Введите новые координаты1"
  } else if(btn === 'render'  && inputX.value && inputY.value) {
    labelPoint.innerText = ' '
    pnts.beginPath()
    pnts.moveTo(mysteryPoints[i][0], mysteryPoints[i][1])
    pnts.lineTo(+inputX.value, +inputY.value)
    pnts.stroke()   
    mysteryPoints.push([+inputX.value, +inputY.value])
    inputX.value = ' '
    inputY.value = ' '
  } else if (btn === 'render' && (!inputX.value || inputY.value)) {
    labelPoint.innerText = 'Заполните поля!'
  } 
  
  if (btn === 'clear') {
    pnts.clearRect(0,0,500,300)
  }
})
  

pnts.textBaseline = 'bottom'
pnts.font = '50px FuturaLightC'
pnts.fillStyle = '#b9b8b8'
pnts.fillText('Даша, ', 20, 70)
pnts.fillText('у тебя', 20, 130)
pnts.font = '50px Futura New Medium'
pnts.fillText(' всё', 140, 130)
pnts.font = '50px FuturaLightC'
pnts.fillText('получится!', 20, 190)



// ____________________________________________________
// отскакивающий мячик


let Ball = function(num) {
  this.x = 100;
  this.y = 100;
  this.xSpeed = -4;
  this.ySpeed = 4;
  this.radius = num
}

let circle = function(area, x,y, radius, fillCircle) {
  area.beginPath();
  area.fillStyle = '#DC3545';
  area.strokeStyle = '#DC3545';
  area.arc(x,y, radius, 0, 2 * Math.PI, false)
  if(fillCircle) {
    area.fill()
  } else {
    area.stroke()
  }
}

Ball.prototype.draw = function(area) {
  circle(area, this.x, this.y, this.radius, true)
}

Ball.prototype.move = function() {
  this.x += this.xSpeed;
  this.y += this.ySpeed
}


Ball.prototype.checkCollision = function() {
  if(this.x - this.radius < 0 || this.x + this.radius > 400) {
    this.xSpeed = -this.xSpeed
  }
  if(this.y - this.radius < 0 || this.y + this.radius > 200) {
    this.ySpeed = -this.ySpeed
  }
}

Ball.prototype.control = function (button) {
  if (button === 'up' && this.ySpeed > -15) {
    this.ySpeed = -Math.abs(this.ySpeed)
  } else  if (button === 'down' && this.ySpeed < 15) {
    this.ySpeed = Math.abs(this.ySpeed)
  }
  if (button === 'left' && this.xSpeed > -15) {
    this.xSpeed = -Math.abs(this.xSpeed)
  } else if (button === 'right' && this.xSpeed < 15) {
    this.xSpeed = Math.abs(this.xSpeed)
  }
  if (button === 'zoomIn') {
    this.radius += 1
  } else if (button === 'zoomOut') {
    this.radius -= 1
  }
  if (button === 'speedDown') {
    this.xSpeed > 0 ? this.xSpeed -= 1 : this.xSpeed += 1
    this.ySpeed > 0 ? this.ySpeed -= 1 : this.ySpeed += 1
  } else if (button === 'speedUp') {
    this.xSpeed >= 0 ? this.xSpeed += 1 : this.xSpeed -= 1
    this.ySpeed >= 0 ? this.ySpeed += 1 : this.ySpeed -= 1
  }
}

Ball.prototype.startStop = function(button) {
  if(this.x - this.radius <= 1 || this.x + this.radius >= 399 || this.y - this.radius <= 1 || this.y + this.radius > 199) {
    return
  }
  if (button === 'stop') {
    this.xSpeed = 0;
    this.ySpeed = 0
  } 
  if (button === 'start') {
    this.xSpeed = Math.floor(Math.random() * 6);
    this.ySpeed = - Math.floor(Math.random() * 4)
  }
}




// ____________________________________________________
// отскакивающий мячик

let ballArea = document.getElementById('ball')
let bll = ballArea.getContext('2d')




const ball = new Ball(5)



setInterval(() => {
  bll.clearRect(0,0,400,200)
  
  ball.draw(bll)
  ball.move()
  ball.checkCollision()
  
}, 30);

$('body').keydown(function(event) {
  if (Object.keys(keyActions).includes(event.keyCode + '')) {
    event.preventDefault()
  }
  let button = keyActions[event.keyCode]
  ball.startStop(button)
})



// ____________________________________________________
// отскакивающий мячик с управлением

let gameBallArea = document.getElementById('gameBall')
let gbll = gameBallArea.getContext('2d')

const gameBall = new Ball(12)

const keyActions = {
  17: 'start',
  32: 'stop',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  97: 'zoomIn',
  96: 'zoomOut',
  98: 'speedDown',
  99: 'speedUp'
}

$('body').keydown(function(event) {
  if (Object.keys(keyActions).includes(event.keyCode + '')) {
    event.preventDefault()
  }
  let button = keyActions[event.keyCode]
  gameBall.control(button)
  gameBall.startStop(button)
})

setInterval(() => {
  gbll.clearRect(0,0,400,200)

  gameBall.draw(gbll)
  gameBall.move()
  gameBall.checkCollision()

}, 30);













// __________________________________________________________________
// Змейка

let snakeArea = document.querySelector('#snake-area')
const snk = snakeArea.getContext('2d')


const widthAreaS = snakeArea.width // 5 строк размеров
const heightAreaS = snakeArea.height
const blockSize = 10
const widthInBlocks = widthAreaS / blockSize
const heightInBlocks = heightAreaS / blockSize

let score = 0 //устанавливаем счет игры


const drawBorder = function() { //функция, чтобы наирсовать рамку
  snk.fillStyle = 'Gray'
  snk.fillRect(0, 0, widthAreaS, blockSize)
  snk.fillRect(0, heightAreaS - blockSize, widthAreaS, blockSize)
  snk.fillRect(0,0, blockSize, heightAreaS)
   snk.fillRect(widthAreaS - blockSize, 0, blockSize, heightAreaS)
}

const drawScore = function(color) {  //функция, чтобы вывести счет игры
  snk.font = '40px Futura New'
  snk.fillStyle = color || '#DC3545'
  snk.textAlign = 'left'
  snk.textBaseline = 'top'
  snk.fillText(`Счет: ${score}`,15,15)

}

const gameOver = function() {  //функция, чтобы остановить игру при проигрыше
  clearTimeout(timeoutId)
  snk.fillStyle = 'rgba(0,0,0,0.3)'
  snk.fillRect(0,0,800,800)
  snk.font = '120px Futura New'
  snk.textAlign = 'center'
  snk.fillStyle = '#DC3545'
  snk.textBaseline = 'middle'
  snk.fillText(`Вы проиграли`, widthAreaS / 2, heightAreaS / 2)
  drawScore('rgba(1,1,1,0.8)')

  $('body').keydown(function(event) {
    let newDirection = directions[event.keyCode]
    if(newDirection !== undefined) {
      snake.setDirection(newDirection)
    }
  })
}

// let circle = function(area, x,y, radius, fillCircle) { //функция, чтобы наирсовать круг
//   area.beginPath();
//   area.fillStyle = '#DC3545';
//   area.strokeStyle = '#DC3545';
//   area.arc(x,y, radius, 0, 2 * Math.PI, false)
//   if(fillCircle) {
//     area.fill()
//   } else {
//     area.stroke()
//   }
// }
// эта функция была написана в предыдущих играх (здесь лишь копия)


// --------------------------------------------
// Создаем блок (будем использовать этот конструктор для других конструкторов)
let Block = function(col, row)  {
  this.col = col;
  this.row = row
}

Block.prototype.drawSquare = function(color) {
  let x = this.col * blockSize;
  let y = this.row * blockSize;
  snk.fillStyle = color;
  snk.fillRect(x, y, blockSize, blockSize)
}

Block.prototype.drawRound = function(color) {
  let centerX = this.col * blockSize + blockSize / 2;
  let centerY = this.row * blockSize + blockSize / 2;
  snk.fillStyle = color;
  circle(snk, centerX, centerY, blockSize / 2, true)
}

Block.prototype.equal = function(otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row
}


// Создаем змейку--------------------------------------------
let Snake = function () {
  this.segments = [
    new Block(11, 11),
    new Block(10, 11),
    new Block(9, 11)
  ];

  this.direction = 'right';
  this.nextDirection = 'right'
}

Snake.prototype.draw = function() {
  for (let i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare('#63A80A')
    
  }
}

Snake.prototype.move = function() {
  let head = this.segments[0];
  let newHead;

  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row)
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1)
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row)
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1)
  }

  if (this.checkCollision(newHead)) {
    gameOver();
    return
  }

  this.segments.unshift(newHead) 

  if(newHead.equal(apple.position)) {
    score++ 
    animationTime -=2
    apple.move() //двигаем яблоко куда-то
  } else {
    this.segments.pop() //если не нашли яблоко удаляем с конца 1 элемент,т.к. в начале доабвили
  }
}

Snake.prototype.checkCollision = function(head) {
  let leftCollision = (head.col === 0);
  let topCollision = (head.row === 0);
  let rightCollision = (head.col === widthInBlocks - 1);
  let bottomCollision = (head.row === heightInBlocks - 1);

  let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision
  let selfCollision = false
  
  for (let i = 1; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
    
      
      selfCollision = true
    }
  }
  return wallCollision || selfCollision
}

Snake.prototype.setDirection = function(newDirection) {
  if(this.direction === 'up' && newDirection === 'down') {
    return
  }
  if(this.direction === 'right' && newDirection === 'left') {
    return
  }
  if(this.direction === 'down' && newDirection === 'up') {
    return
  }
  if(this.direction === 'left' && newDirection === 'right') {
    return
  }

  this.nextDirection = newDirection
}


// Создаем яблоко--------------------------------------------
let Apple = function () {
  this.position = new Block(15,15)
}

Apple.prototype.draw = function() {
  this.position.drawRound('green')
}
Apple.prototype.move = function() {
  let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1
  this.position = new Block(randomCol, randomRow)
}


let snake = new Snake() //создаем исходную змею
let apple = new Apple() //создаем первое яблоко

let timeoutId

let animationTime = 100
const gameLoop = function() {
  snk.clearRect(0, 0, widthAreaS, heightAreaS)
  drawScore()
  snake.move() //запускаем движ змеи
  snake.draw() //рисуем ее по новой
  apple.draw() //рисуем созданное яблоко
  drawBorder()
  let timeoutId = setTimeout(gameLoop, animationTime);
}

gameLoop()

// const intervalId = setInterval(() => {
  
// }, 50);


const directions = {  //клавиши для управления
  65: 'left',
  87: 'up',
  68: 'right',
  83: 'down',
}



$('body').keydown(function(event) {
  let newDirection = directions[event.keyCode]
  if(newDirection !== undefined) {
    snake.setDirection(newDirection)
  }
})
