
document.addEventListener('DOMContentLoaded', () => {
    async function getGsap() {
        await $.getScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.0/gsap.min.js");
        
        function myScript() {
            const body = document.querySelector('body');
        
            cx = window.innerWidth / 2;
            cy = window.innerHeight / 2;
        
            body.addEventListener('mousemove', e => {
                clientX = e.pageX;
                clientY = e.pageY;
                // console.log(e.pageX + '/' + e.pageY);
                request = requestAnimationFrame(updateME);
        
        
            });
        
            function updateME() {
                dx     = clientX - cx
                dy     = clientY - cy
                tiltx  = - dy / cy
                tilty  = dx / cx
                radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2))
                degree = radius * 20
                gsap.to('.content', 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` })
            }

            gsap.to('.card', { zoom: .98 })
            gsap.to('.l_main', { opacity: 1, duration: .1 })
            gsap.to('.l2_main', { opacity: 1, left: -10, top: 10, duration: .25, delay: .25 })
            gsap.to('.l3_main', { opacity: 1, left: -20, top: 20, duration: .25, delay: .25 })
            gsap.to('.card-russia', { opacity: .07, duration: .1 })
            gsap.to('.card-logo_w', { opacity: 1, duration: .225 })
            gsap.to('.card-chip', { opacity: 1, duration: .225 })
            gsap.to('.card-valid', { opacity: 1, zoom: 1, duration: .1, delay: .25 })
            gsap.to('.card-number-holder', { opacity: 1, zoom: 1, duration: .1, delay: .25 })
        }
    
         myScript()
    
    
    }
    getGsap()
})







// задача 1

const input1 = [61,24,20,58,95,53,17,32,45,85,70,20,83,62,35,89,5,95,12,86,58,77,30,64,46,13,5,92,67,40,20,38,31,18,89,85,7,30,67,34,62,35,47,98,3,41,53,26,66,40,54,44,57,46,70,60,4,63,82,42,65,59,17,98,29,72,1,96,82,66,98,6,92,31,43,81,88,60,10,55,66,82,0,79,11,81,61];
const input2 = [5,25,4,39,57,49,93,79,7,8,49,89,2,7,73,88,45,15,34,92,84,38,85,34,16,6,99,0,2,36,68,52,73,50,77,44,61,48,61];
[5,4,57,79,7,89,88,45,34,92,38,85,6,0,77,44,61,61]
[5,4,57,79,7,89,7,88,45,34,92,38,85,34,6,0,77,44,61,61]
// const input1 = [1,3,5,6,7,9]
// const input2 = [2,3,5,6,9]


// 1-й способ - мой (не очень правильный, т.к. я испортил/правил исходные массивы)
// let intersect = function (nums1, nums2) {
//     let sameNums = [],
//         arrIndex = []
//     nums1.forEach(el => {
//         if (nums2.includes(el)) {
//             if (!arrIndex.includes(nums2.indexOf(el))) {
//                 arrIndex.push(nums2.indexOf(el))
//                 sameNums.push(el)
//             }
//             delete nums2[nums2.indexOf(el)]        
//         }
//     });
//     return sameNums
// }


// 2-й способ 
let intersect = function (nums1, nums2) {
    let result = []
    let map = nums1.reduce((acc, i) => {
        acc[i] = acc[i] ? acc[i] + 1 : 1
        return acc
    }, {});
    for (let i = 0; i < nums2.length; i++) {
        let current = nums2[i];
        if ( map[current] && map[current] > 0) {
            result.push(current)
            map[current]--
        }
    }
    return result
}

// console.log(intersect(input1,input2))




// _________________
// Задача №2

const input3 = 'ksgsdfkaf';
const input4 = 'asdfsdfsdf';
const input5 = 'svcvavaaasv';

// 1 способ - мой
// let firstUniqChar = function (s) {
//     let arrS = s.split('')
//     let uniqueCh = []
//         let map = arrS.reduce((acc, i) => {
//         acc[i] = acc[i] ? acc[i] + 1 : 1
//         return acc
//     }, {});
//     for (let i = 0; i < arrS.length; i++) {
//         if (!uniqueCh.length) {
//             if(map[`${arrS[i]}`] === 1) {
//                 uniqueCh.push(arrS[i])
//                 // console.log(map[`${arrS[i]}`]);
//                 console.log(arrS[i]);
//                 console.log(i);
//             }
//         }
//     }
//   };

// 2 способ 
let firstUniqChar = function (s) {
    let map = new Map()
    for (let i = 0; i < s.length; i++) {
        let current = s[i]

        if (map.has(current)) {
            map.set(current, map.get(current) + 1)
        } else {
            map.set(current, 1)
        }
    }
    for (let i = 0; i < s.length; i++) {
        if (map.get(s[i]) === 1) {
            return i
        }      
    }
    return -1  
  };
// console.log(firstUniqChar(input5));




// ________________
// Задача №3

let grid1 = [
    ['1','1','0','1','0'],
    ['1','1','0','1','0'],
    ['1','1','0','0','1'],
    ['0','0','0','1','1']
];


let numIslands = (grid) => {
    let rowsL = grid.length
    let colsL = grid[0].length
    let counter = 0
    if (rowsL === 0) return 0

    function markNeighbour(grid,R,C) {
        grid[R][C] = '5';
        if (grid[R][C - 1] === '1')  { markNeighbour(grid, R, C - 1) }
        if (grid[R][C + 1] === '1')  { markNeighbour(grid, R, C + 1) }
        if (grid[R - 1] && grid[R - 1][C] === '1')  { markNeighbour(grid, R - 1, C) }
        if (grid[R + 1]  && grid[R + 1][C] === '1')  { markNeighbour(grid, R + 1, C) }
    }

    for (let R = 0; R < rowsL; R++) {
        for (let C = 0; C < colsL; C++) {
            if (grid[R][C] === '1') {
                counter++
                markNeighbour(grid, R, C)
            }
        }
    }
    return counter
}
// console.log(numIslands(grid1));





//______________________________
// Задача №4
let nums = [4,5,6,7,0,1,2];

// console.log(nums.indexOf(3));
let searchIndex = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor ((left + right) / 2) 
        if (nums[mid] === target) { return mid }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target <= nums[mid]) {
                right = mid - 1
            } else {
                left = mid + 1
            }
        } else {
            if (nums[mid] <= target && target <= nums[right]) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
    }
    return -1
}
// console.log(searchIndex(nums, 1));






// const fetchUrl = fetch('../Против_вакцинации.json')
// console.log(fetchUrl.length);

// let loadJson =  function (url) {
//     console.log($.getJSON(url));
//     // console.log(JSON.parse($.getJSON(url).responseText));
// }
// loadJson('https://www.rusprofile.ru/ajax.php?&query=3327848813&action=search')

// let url = 'https://www.binance.com/api/v1/klines?symbol=BTCUSDT&interval=15m'

// async function getResponce(a) {
//     let response = await fetch(a)
//     console.log(response.json())

// }
// Price = getResponce(url).then (
    // console.log(Price)
// )
    // .then((data) => {
    //     console.log(data);  
    // })
// async function getResponse(url) {
//      = await fetch(url)
//     let content =  response.json()
//     let priceArr = []
//     let priceFloor = []
//     for (let i = 0; i < content.length; i++) {
//         priceArr.push(content[i][1])
//     }
//     priceArr.forEach(el => {
//         priceFloor.push(el.slice(0,5))
//     });
//     priceArr = priceFloor
//     console.log(priceArr);
//     }
    
// Price = getResponse(url)
// console.log(Price);
// Price.then (
//     console.log(priceArr)
//     )




// ___________________________________________________
// Игра виселица

let words = "произведение писателя, в которое он вложил все философские и эстетические идеи, которые разрабатывал в течение жизни. Автор размышляет о путях эволюции и исторического процесса, утверждая, что история подобна лезвию бритвы, когда отклонения от некой узкой магистральной линии являются катастрофическими".split(' ')

for (let key in words) {
    if (words[key].length < 4) { words.splice(key,1) }
    if (words[key].includes(',') || words[key].includes('.')) {
        words[key] = words[key].split('').splice(0,words[key].length - 1).join('')
    }
}
let pickRandomWord = (arr) => arr[Math.floor(Math.random() * arr.length)]

let word = pickRandomWord(words)
let currenWord = []
let remainingLetters = word.length
for (let i = 0; i < word.length; i++) {
    currenWord[i] = '_'
}
// var ifConfirm = confirm(`Вы готовы?`)
// if (ifConfirm) { 
//     while (remainingLetters > 0) {
//         alert(`Оставшиеся буквы: ${currenWord.join(' ')}`)
//         let letter = prompt(`Введите Вашу буквы:`)
//         ifConfirm
//         if      (!ifConfirm)              { break } 
//         else if ( letter.length !== 1 ) { 
//             alert(`Введите корректный вариант:`) 
//             letter = prompt(`Введите Вашу буквы:`)
//             for (let i = 0; i < word.length; i++) {
//                 if(word[i] === letter) {
//                     currenWord[i] = letter
//                     remainingLetters--
//                 }  
//             }
//         } 
//         else { 
//             for (let i = 0; i < word.length; i++) {
//                 if(word[i] === letter) {
//                     currenWord[i] = letter
//                     remainingLetters--
//                 }  
//             }
//          }
//     }
//     if (remainingLetters === 0) { alert('Вы победили!!!') }
//  } 
// else { 
//     alert(`вернитесь, когда будете готовы!`) 
// }


// ______________________________________________________________
// изучения jQuery
let leftOffset = 120
let topOffset = 120
let moveToLeft = () => {
    leftOffset += 5
    $('#mainName').offset({
        left: leftOffset
    })
}
let moveToTop = () => {
    topOffset += 5
    $('#mainName').offset({
        top: topOffset
    })
}
let moveBackLeft = () => {
    leftOffset -= 5
    $('#mainName').offset({
        left: leftOffset
    })
}
let moveBackTop = () => {
    topOffset -= 5
    $('#mainName').offset({
        top: topOffset
    })
}
let checkPos = () => {
    if (leftOffset == 120 && topOffset == 120) { moveToLeft() }
    else if (leftOffset == 125 && topOffset == 120) { moveToTop() }
    else if (leftOffset == 125 && topOffset == 125) { moveBackLeft() }
    else { moveBackTop() }
}
    
setInterval(() => {
    checkPos()
}, 50);


$('#mainName').hide().fadeIn(2800)

$('p').hide().slideDown(1800)
let mouses = $('.mouse')
console.log(mouses.length);
for (let i = 0; i < mouses.length; i++) {
    $('body').mousemove(event => {
        setTimeout(() => {
            $(`.circle${+1+i}`).offset({
                left: event.pageX,
                top: event.pageY
            })
        }, i * 30);
    })
}





// _______________________________________________________
// Игра тпело/холодно



$('#toGame').append('<span class="someText">Some text</span>')
let someText = $('.someText')
someText[0].style.marginLeft = '25px'
let getRandomNumber = () => {
    let ranX = Math.floor(Math.random() * 458)
    let ranY = Math.floor(Math.random() * 258)
    // return ranX, ranY
    console.log(ranX, ranY);
}
getRandomNumber()
let clickPos = function (event) {
    console.log(event.pageX, event.pageY);
}



// // Мячик в квадрате
// // _________________________________________________________

// let Ball = function() {
//     this.x = 100;
//     this.y = 100;
//     this.xSpeed = -4;
//     this.ySpeed = 6;
// };
// var circle = function(x, y, radius, fillCircle) {
//     ctx.fillStyle = 'red';
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2, false)
//     if(fillCircle) {
//         ctx.fill()
//     } else {
//         ctx.stroke()
//     }
// };
// Ball.prototype.draw = function() {
//     circle(this.x, this.y, 3, true)
// };
// Ball.prototype.move = function() {
//     this.x += this.xSpeed;
//     this.y += this.ySpeed;
// };
// Ball.prototype.checkCollision = function() {
//     if(this.x < 0 || this.x > 200) {
//         this.xSpeed = -this.xSpeed
//     }
//     if(this.y < 0 || this.y > 200) {
//         this.ySpeed = -this.ySpeed
//     }
// };

// let canvas1 = $('#canvas')[0]
// let  ctx = canvas1.getContext('2d')

// var ball = new Ball();
// setInterval(() => {
//     ctx.clearRect(0,0,220,220)

//     ball.draw()
//     ball.move()
//     ball.checkCollision()

//     ctx.strokeRect(0,0,200,200)
// }, 10);

