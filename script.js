const button = document.querySelector('.registration__button');
const step1 = document.querySelector('.js_step_1');
const step2 = document.querySelector('.js_step_2');
const buttonBack = document.querySelector('.button-back');
const form = document.querySelector('.registration');
const game = document.querySelector('.game');

const player1 = {
    size: null, //Получаем значение обработчиком клика
    spead: null, //Получаем значение обработчиком клика
    left: 0,
    top: 0,
    keyUp: 'KeyW',
    keyDown: 'KeyS',
    keyRight: 'KeyD',
    keyLeft: 'KeyA',
    keyShoot: 'KeyF',
    key: null,
    shoot: null,
    inputSize: document.getElementById(`id-size-player1`),
    inputSpead: document.getElementById(`id-spead-player1`),
    tank: document.querySelector('.tank-1'),
};

const player2 = {
    size: null, //Получаем значение обработчиком клика
    spead: null, //Получаем значение обработчиком клика
    right: 0,
    bottom: 0,
    keyUp: '38',
    keyDown: '40',
    keyRight: '39',
    keyLeft: '37',
    keyShoot: 'KeyP',
    key: null,
    shoot: null,
    inputSize: document.getElementById(`id-size-player2`),
    inputSpead: document.getElementById(`id-spead-player2`),
    tank: document.querySelector('.tank-2'),
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    startWindowGame();
    createPlayer(player1, 'top', 'left');
    createPlayer(player2, 'bottom', 'right');
})

buttonBack.addEventListener('click', function () {
    returnWindowLogin();
})

document.addEventListener('keyup', function (event) {
    //Перемещение 1-го танка
    if (event.code == player1.keyUp) {
        player1.key = null;
    }
    if (event.code == player1.keyDown) {
        player1.key = null;
    }
    if (event.code == player1.keyRight) {
        player1.key = null;
    }
    if (event.code == player1.keyLeft) {
        player1.key = null;
    }

    //Перемещение 2-го танка
    if (event.keyCode == player2.keyUp) {
        player2.key = null;
    }
    if (event.keyCode == player2.keyDown) {
        player2.key = null;
    }
    if (event.keyCode == player2.keyRight) {
        player2.key = null;
    }
    if (event.keyCode == player2.keyLeft) {
        player2.key = null;
    }

    //Пуля
    if (event.code == player1.keyShoot) {
        player1.shoot = null;
    }
    if (event.code == player2.keyShoot) {
        player2.shoot = null;
    }
})

document.addEventListener('keydown', function (event) {
    //Перемещение 1-го танка
    if (event.code == player1.keyUp) {
        player1.key = player1.keyUp;
    }
    if (player1.key == player1.keyUp) {
        player1.top -= 5;
        player1.tank.src = 'img/tank1-up.png';
    }
    if (event.code == player1.keyDown) {
        player1.key = player1.keyDown;
    }
    if (player1.key == player1.keyDown) {
        player1.top += 5;
        player1.tank.src = 'img/tank1-down.png';
    }
    if (event.code == player1.keyRight) {
        player1.key = player1.keyRight;
    }
    if (player1.key == player1.keyRight) {
        player1.left += 5;
        player1.tank.src = 'img/tank1-right.png';
    }
    if (event.code == player1.keyLeft) {
        player1.key = player1.keyLeft;
    }
    if (player1.key == player1.keyLeft) {
        player1.left -= 5;
        player1.tank.src = 'img/tank1-left.png';
    }

    //Перемещение 2-го танка
    if (event.keyCode == player2.keyUp) {
        event.preventDefault();
        player2.key = player2.keyUp;
    }
    if (player2.key == player2.keyUp) {
        player2.bottom += 5;
        player2.tank.src = 'img/tank2-up.png';
    }
    if (event.keyCode == player2.keyDown) {
        event.preventDefault();
        player2.key = player2.keyDown;
    }
    if (player2.key == player2.keyDown) {
        player2.bottom -= 5;
        player2.tank.src = 'img/tank2-down.png';
    }
    if (event.keyCode == player2.keyRight) {
        player2.key = player2.keyRight;
    }
    if (player2.key == player2.keyRight) {
        player2.right -= 5;
        player2.tank.src = 'img/tank2-right.png';
    }
    if (event.keyCode == player2.keyLeft) {
        player2.key = player2.keyLeft;
    }
    if (player2.key == player2.keyLeft) {
        player2.right += 5;
        player2.tank.src = 'img/tank2-left.png';
    }

    //Стили координат 1 танка
    player1.tank.style.top = player1.top + 'px';
    player1.tank.style.left = player1.left + 'px';

    //Стили координат 2 танка
    player2.tank.style.right = player2.right + 'px';
    player2.tank.style.bottom = player2.bottom + 'px';

    //Получаем горизонтальные и вертикальные координаты без символов PX
    const styleTank1 = getComputedStyle(player1.tank);
    const styleTank2 = getComputedStyle(player2.tank);

    const styleTank1Left = styleTank1.left.slice(0, styleTank1.left.length - 2);
    const styleTank2Left = styleTank2.left.slice(0, styleTank2.left.length - 2);
    const styleTank1Right = styleTank1.right.slice(0, styleTank1.right.length - 2);
    const styleTank2Right = styleTank2.right.slice(0, styleTank2.right.length - 2);
    const styleTank1Top = styleTank1.top.slice(0, styleTank1.top.length - 2);
    const styleTank2Top = styleTank2.top.slice(0, styleTank2.top.length - 2);
    const styleTank1Bottom = styleTank1.bottom.slice(0, styleTank1.bottom.length - 2);
    const styleTank2Bottom = styleTank2.bottom.slice(0, styleTank2.bottom.length - 2);

    //Находим размер большого танка
    let maxSize;

    if (player1.size > player2.size) {
        maxSize = player1.size;
    } else {
        maxSize = player2.size;
    }

    /*Условия для наезда друг на друга
    -----------------------------------------------------------
    Левая и правая координата маленького танка лежат в множестве точек большого танка.
    Верхняя и нижняя координата маленького танка лежат в множестве точек большого танка */

    if ((Math.abs(styleTank2Left - styleTank1Left) < maxSize) &&
        (Math.abs(styleTank2Right - styleTank1Right) < maxSize) &&
        (Math.abs(styleTank2Top - styleTank1Top) < maxSize) &&
        (Math.abs(styleTank2Bottom - styleTank1Bottom) < maxSize)) {
        if (player1.size > player2.size) {
            player2.tank.src = 'img/fire.png';
            setTimeout(() => alert('Победил игрок #1'), 30);
            setTimeout(returnWindowLogin, 30);
        }
        if (player2.size > player1.size) {
            player1.tank.src = 'img/fire.png';
            setTimeout(() => alert('Победил игрок #2'), 30);
            setTimeout(returnWindowLogin, 30);
        }
        if (player1.size == player2.size) {
            player1.tank.src = 'img/fire.png';
            player2.tank.src = 'img/fire.png';
            setTimeout(() => alert('Победила дружба!'), 30);
            setTimeout(returnWindowLogin, 30);
        };
    };

    //Условия для наезда на границу танков
    if (styleTank1Left < 0 || styleTank1Right < 0 || styleTank1Top < 0 || styleTank1Bottom < 0) {
        alert('Игрок #1 проиграл!');
        returnWindowLogin()
    }

    if (styleTank2Left < 0 || styleTank2Right < 0 || styleTank2Top < 0 || styleTank2Bottom < 0) {
        alert('Игрок #2 проиграл!');
        returnWindowLogin()
    }

    //Стреляем пробелом 1 танк
    if (event.code == player1.keyShoot) {
        player1.shoot = player1.keyShoot;
    }
    if (player1.shoot == player1.keyShoot) {

        const bullet = document.querySelector('.bullet1');
        const imgTankLeft = player1.tank.src.indexOf('img/tank1-left.png');
        const imgTankRight = player1.tank.src.indexOf('img/tank1-right.png');
        const imgTankTop = player1.tank.src.indexOf('img/tank1-up.png');
        const imgTankBottom = player1.tank.src.indexOf('img/tank1-down.png');

        if (!bullet && imgTankLeft != -1) {
            const bullet = createBulletTank1('top', 'right', 0.5, 1);
            bullet.style.transform = 'translateY(-50%)';
            game.append(bullet);
            const timer = setInterval(function () {
                const bullet = document.querySelector('.bullet1');
                const styleBullet = getComputedStyle(bullet);
                const styleBulletLeft = styleBullet.left.slice(0, styleBullet.left.length - 2);
                const styleBulletTop = styleBullet.top.slice(0, styleBullet.top.length - 2);
                const styleBulletBottom = styleBullet.bottom.slice(0, styleBullet.bottom.length - 2);
                const styleTank2Top = styleTank2.top.slice(0, styleTank2.top.length - 2);
                const styleTank2Left = styleTank2.left.slice(0, styleTank2.left.length - 2);
                const styleTank2Right = styleTank2.right.slice(0, styleTank2.right.length - 2);
                const styleTank2Bottom = styleTank2.bottom.slice(0, styleTank2.bottom.length - 2);               

                bullet.style.left = `${+styleBulletLeft - 30}px`;

                if (styleBulletLeft < 0 || styleBulletLeft > 600) {
                    bullet.remove();
                    clearInterval(timer);
                    return;
                }

                if (styleBulletLeft <= +styleTank2Left + +player2.size &&
                    styleBulletTop >= +styleTank2Top - 5 && //Только только касается
                    styleBulletBottom >= styleTank2Bottom - 30) { //Только только касается
                    bullet.remove();
                    player2.tank.src = 'img/fire.png';
                    clearInterval(timer);
                    setTimeout(() => alert('Победил игрок #1'), 30);
                    setTimeout(returnWindowLogin, 30);
                    return;
                }                
            }, 100);
        }
        if (!bullet && imgTankRight != -1) {
            const bullet = createBulletTank1('top', 'left', 0.5, 1);
            bullet.style.transform = 'translateY(-50%)';
            game.append(bullet);
            const timer = setInterval(function () {
                const bullet = document.querySelector('.bullet1');
                const styleBullet = getComputedStyle(bullet);
                const styleBulletLeft = styleBullet.left.slice(0, styleBullet.left.length - 2);
                const styleBulletRight = styleBullet.right.slice(0, styleBullet.right.length - 2);
                const styleBulletTop = styleBullet.top.slice(0, styleBullet.top.length - 2);
                const styleBulletBottom = styleBullet.bottom.slice(0, styleBullet.bottom.length - 2);
                const styleTank2Top = styleTank2.top.slice(0, styleTank2.top.length - 2);
                const styleTank2Left = styleTank2.left.slice(0, styleTank2.left.length - 2);
                const styleTank2Right = styleTank2.right.slice(0, styleTank2.right.length - 2);
                const styleTank2Bottom = styleTank2.bottom.slice(0, styleTank2.bottom.length - 2); 

                bullet.style.left = `${+styleBulletLeft + 30}px`;

                if (styleBulletLeft < 0 || styleBulletLeft > 600) {
                    bullet.remove();
                    clearInterval(timer);
                    return;
                }

                if (styleBulletRight <= +styleTank2Right + +player2.size &&
                    styleBulletTop >= +styleTank2Top - 5 && //Только только касается
                    styleBulletBottom >= styleTank2Bottom - 30) { //Только только касается
                    bullet.remove();
                    player2.tank.src = 'img/fire.png';
                    clearInterval(timer);
                    setTimeout(() => alert('Победил игрок #1'), 30);
                    setTimeout(returnWindowLogin, 30);
                    return;
                }
            }, 100);
        }
        if (!bullet && imgTankTop != -1) {
            const bullet = createBulletTank1('bottom', 'left', 1, 0.5);
            bullet.style.transform = 'translateX(-50%)';
            game.append(bullet);
            const timer = setInterval(function () {
                const bullet = document.querySelector('.bullet1');
                const styleBullet = getComputedStyle(bullet);
                const styleBulletTop = styleBullet.top.slice(0, styleBullet.top.length - 2);
                const styleBulletLeft = styleBullet.left.slice(0, styleBullet.left.length - 2);
                const styleBulletRight = styleBullet.right.slice(0, styleBullet.right.length - 2);
                const styleBulletBottom = styleBullet.bottom.slice(0, styleBullet.bottom.length - 2);
                const styleTank2Top = styleTank2.top.slice(0, styleTank2.top.length - 2);
                const styleTank2Left = styleTank2.left.slice(0, styleTank2.left.length - 2);
                const styleTank2Right = styleTank2.right.slice(0, styleTank2.right.length - 2);
                const styleTank2Bottom = styleTank2.bottom.slice(0, styleTank2.bottom.length - 2); 

                bullet.style.top = `${+styleBulletTop - 30}px`;

                if (styleBulletTop < 0 || styleBulletTop > 600) {
                    bullet.remove();
                    clearInterval(timer);
                    return;
                }

                if (styleBulletTop <= +styleTank2Top + +player2.size &&
                    styleBulletLeft >= +styleTank2Left - 5 && //Только только касается
                    styleBulletRight >= styleTank2Right - 30) { //Только только касается
                    bullet.remove();
                    player2.tank.src = 'img/fire.png';
                    clearInterval(timer);
                    setTimeout(() => alert('Победил игрок #1'), 30);
                    setTimeout(returnWindowLogin, 30);
                    return;
                }
            }, 100);
        }
        if (!bullet && imgTankBottom != -1) {
            const bullet = createBulletTank1('top', 'left', 1, 0.5);
            bullet.style.transform = 'translateX(-50%)';
            game.append(bullet);
            const timer = setInterval(function () {
                const bullet = document.querySelector('.bullet1');
                const styleBullet = getComputedStyle(bullet);
                const styleBulletTop = styleBullet.top.slice(0, styleBullet.top.length - 2);
                const styleBulletLeft = styleBullet.left.slice(0, styleBullet.left.length - 2);
                const styleBulletRight = styleBullet.right.slice(0, styleBullet.right.length - 2);
                const styleBulletBottom = styleBullet.bottom.slice(0, styleBullet.bottom.length - 2);
                const styleTank2Top = styleTank2.top.slice(0, styleTank2.top.length - 2);
                const styleTank2Left = styleTank2.left.slice(0, styleTank2.left.length - 2);
                const styleTank2Right = styleTank2.right.slice(0, styleTank2.right.length - 2);
                const styleTank2Bottom = styleTank2.bottom.slice(0, styleTank2.bottom.length - 2); 

                bullet.style.top = `${+styleBulletTop + 30}px`;

                if (styleBulletTop < 0 || styleBulletTop > 600) {
                    bullet.remove();
                    clearInterval(timer);
                    return;
                }
                if (styleBulletBottom <= +styleTank2Bottom + +player2.size &&
                    styleBulletLeft >= +styleTank2Left - 5 && //Только только касается
                    styleBulletRight >= styleTank2Right - 30) { //Только только касается
                    bullet.remove();
                    player2.tank.src = 'img/fire.png';
                    clearInterval(timer);
                    setTimeout(() => alert('Победил игрок #1'), 30);
                    setTimeout(returnWindowLogin, 30);
                    return;
                }
            }, 100);
        }
    }

    //Стреляем пробелом 2 танк
    if (event.code == player2.keyShoot) {
        player2.shoot = player2.keyShoot;
    }
    if (player2.shoot == player2.keyShoot) {

        const bullet = document.querySelector('.bullet2');
        const imgTankLeft = player2.tank.src.indexOf('img/tank2-left.png');
        const imgTankRight = player2.tank.src.indexOf('img/tank2-right.png');
        const imgTankTop = player2.tank.src.indexOf('img/tank2-up.png');
        const imgTankBottom = player2.tank.src.indexOf('img/tank2-down.png');

        if (!bullet && imgTankLeft != -1) {
            const bullet = createBulletTank2('top', 'right', 0.5, 1);
            bullet.style.transform = 'translateY(-50%)';
            game.append(bullet);
            const timer = setInterval(function () {
                const bullet = document.querySelector('.bullet2');
                const styleBullet = getComputedStyle(bullet);
                const styleBulletLeft = styleBullet.left.slice(0, styleBullet.left.length - 2);
                const styleBulletTop = styleBullet.top.slice(0, styleBullet.top.length - 2);
                const styleBulletBottom = styleBullet.bottom.slice(0, styleBullet.bottom.length - 2);
                const styleTank1Top = styleTank1.top.slice(0, styleTank1.top.length - 2);
                const styleTank1Left = styleTank1.left.slice(0, styleTank1.left.length - 2);
                const styleTank1Right = styleTank1.right.slice(0, styleTank1.right.length - 2);
                const styleTank1Bottom = styleTank1.bottom.slice(0, styleTank1.bottom.length - 2);

                bullet.style.left = `${+styleBulletLeft - 30}px`;

                if (styleBulletLeft < 0 || styleBulletLeft > 600) {
                    bullet.remove();
                    clearInterval(timer);
                    return;
                }

                if (styleBulletLeft <= +styleTank1Left + +player1.size &&
                    styleBulletTop >= +styleTank1Top - 5 && //Только только касается
                    styleBulletBottom >= styleTank1Bottom - 30) { //Только только касается
                    bullet.remove();
                    player1.tank.src = 'img/fire.png';
                    clearInterval(timer);
                    setTimeout(() => alert('Победил игрок #2'), 30);
                    setTimeout(returnWindowLogin, 30);
                    return;
                }
            }, 100);
        }
        if (!bullet && imgTankRight != -1) {
            const bullet = createBulletTank2('top', 'left', 0.5, 1);
            bullet.style.transform = 'translateY(-50%)';
            game.append(bullet);
            const timer = setInterval(function () {
                const bullet = document.querySelector('.bullet2');
                const styleBullet = getComputedStyle(bullet);
                const styleBulletLeft = styleBullet.left.slice(0, styleBullet.left.length - 2);
                const styleBulletRight = styleBullet.right.slice(0, styleBullet.right.length - 2);
                const styleBulletTop = styleBullet.top.slice(0, styleBullet.top.length - 2);
                const styleBulletBottom = styleBullet.bottom.slice(0, styleBullet.bottom.length - 2);
                const styleTank1Top = styleTank1.top.slice(0, styleTank1.top.length - 2);
                const styleTank1Left = styleTank1.left.slice(0, styleTank1.left.length - 2);
                const styleTank1Right = styleTank1.right.slice(0, styleTank1.right.length - 2);
                const styleTank1Bottom = styleTank1.bottom.slice(0, styleTank1.bottom.length - 2);

                bullet.style.left = `${+styleBulletLeft + 30}px`;

                if (styleBulletLeft < 0 || styleBulletLeft > 600) {
                    bullet.remove();
                    clearInterval(timer);
                    return;
                }

                if (styleBulletRight <= +styleTank1Right + +player1.size &&
                    styleBulletTop >= +styleTank1Top - 5 && //Только только касается
                    styleBulletBottom >= styleTank1Bottom - 30) { //Только только касается
                    bullet.remove();
                    player1.tank.src = 'img/fire.png';
                    clearInterval(timer);
                    setTimeout(() => alert('Победил игрок #2'), 30);
                    setTimeout(returnWindowLogin, 30);
                    return;
                }
            }, 100);
        }
        if (!bullet && imgTankTop != -1) {
            const bullet = createBulletTank2('bottom', 'left', 1, 0.5);
            bullet.style.transform = 'translateX(-50%)';
            game.append(bullet);
            const timer = setInterval(function () {
                const bullet = document.querySelector('.bullet2');
                const styleBullet = getComputedStyle(bullet);
                const styleBulletTop = styleBullet.top.slice(0, styleBullet.top.length - 2);
                const styleBulletLeft = styleBullet.left.slice(0, styleBullet.left.length - 2);
                const styleBulletRight = styleBullet.right.slice(0, styleBullet.right.length - 2);
                const styleBulletBottom = styleBullet.bottom.slice(0, styleBullet.bottom.length - 2);
                const styleTank1Top = styleTank1.top.slice(0, styleTank1.top.length - 2);
                const styleTank1Left = styleTank1.left.slice(0, styleTank1.left.length - 2);
                const styleTank1Right = styleTank1.right.slice(0, styleTank1.right.length - 2);
                const styleTank1Bottom = styleTank1.bottom.slice(0, styleTank1.bottom.length - 2);

                bullet.style.top = `${+styleBulletTop - 30}px`;

                if (styleBulletTop < 0 || styleBulletTop > 600) {
                    bullet.remove();
                    clearInterval(timer);
                    return;
                }

                if (styleBulletTop <= +styleTank1Top + +player1.size &&
                    styleBulletLeft >= +styleTank1Left - 5 && //Только только касается
                    styleBulletRight >= styleTank1Right - 30) { //Только только касается
                    bullet.remove();
                    player1.tank.src = 'img/fire.png';
                    clearInterval(timer);
                    setTimeout(() => alert('Победил игрок #2'), 30);
                    setTimeout(returnWindowLogin, 30);
                    return;
                }
            }, 100);
        }
        if (!bullet && imgTankBottom != -1) {
            const bullet = createBulletTank2('top', 'left', 1, 0.5);
            bullet.style.transform = 'translateX(-50%)';
            game.append(bullet);
            const timer = setInterval(function () {
                const bullet = document.querySelector('.bullet2');
                const styleBullet = getComputedStyle(bullet);
                const styleBulletTop = styleBullet.top.slice(0, styleBullet.top.length - 2);
                const styleBulletLeft = styleBullet.left.slice(0, styleBullet.left.length - 2);
                const styleBulletRight = styleBullet.right.slice(0, styleBullet.right.length - 2);
                const styleBulletBottom = styleBullet.bottom.slice(0, styleBullet.bottom.length - 2);
                const styleTank1Top = styleTank1.top.slice(0, styleTank1.top.length - 2);
                const styleTank1Left = styleTank1.left.slice(0, styleTank1.left.length - 2);
                const styleTank1Right = styleTank1.right.slice(0, styleTank1.right.length - 2);
                const styleTank1Bottom = styleTank1.bottom.slice(0, styleTank1.bottom.length - 2);

                bullet.style.top = `${+styleBulletTop + 30}px`;

                if (styleBulletTop < 0 || styleBulletTop > 600) {
                    bullet.remove();
                    clearInterval(timer);
                    return;
                }
                if (styleBulletBottom <= +styleTank1Bottom + +player1.size &&
                    styleBulletLeft >= +styleTank1Left - 5 && //Только только касается
                    styleBulletRight >= styleTank1Right - 30) { //Только только касается
                    bullet.remove();
                    player1.tank.src = 'img/fire.png';
                    clearInterval(timer);
                    setTimeout(() => alert('Победил игрок #2'), 30);
                    setTimeout(returnWindowLogin, 30);
                    return;
                }
            }, 100);
        }
    }

    function createBulletTank1(y, x, vertical, horizontal) {
        const bullet = document.createElement('div');

        bullet.classList.add('bullet1')
        bullet.style.width = '25px';
        bullet.style.height = '25px';
        bullet.style.backgroundColor = 'red';
        bullet.style.borderRadius = '50%';
        bullet.style.position = 'absolute';

        bullet.style[y] = +styleTank1[y].slice(0, styleTank1[y].length - 2) + [vertical] * player1.size + 'px';
        bullet.style[x] = +styleTank1[x].slice(0, styleTank1[x].length - 2) + [horizontal] * player1.size + 'px';

        return bullet;
    }
    function createBulletTank2(y, x, vertical, horizontal) {
        const bullet = document.createElement('div');

        bullet.classList.add('bullet2')
        bullet.style.width = '25px';
        bullet.style.height = '25px';
        bullet.style.backgroundColor = 'red';
        bullet.style.borderRadius = '50%';
        bullet.style.position = 'absolute';

        bullet.style[y] = +styleTank2[y].slice(0, styleTank2[y].length - 2) + [vertical] * player2.size + 'px';
        bullet.style[x] = +styleTank2[x].slice(0, styleTank2[x].length - 2) + [horizontal] * player2.size + 'px';

        return bullet;
    }
})


function createPlayer(player, y, x) {
    player.size = player.inputSize.value;
    player.spead = player.inputSpead.value;
    player.tank.style.width = player.size + 'px';
    player.tank.style[y] = 0 + 'px';
    player.tank.style[x] = 0 + 'px';
}

function startWindowGame() {
    step1.classList.remove('js_display_block');
    step2.classList.add('js_display_block');
}

function returnWindowLogin() {
    step2.classList.remove('js_display_block');
    step1.classList.add('js_display_block');
    window.location.reload();
}

/* Проверка координат и модулей при движении
console.log('Левая координата 1 танка: ' + styleTank1Left);
console.log('Левая координата 2 танка: ' + styleTank2Left);
console.log('Правая координата 1 танка: ' + styleTank1Right);
console.log('Правая координата 2 танка: ' + styleTank2Right);
console.log('Модуль левый: ' + (Math.abs(styleTank2Left - styleTank1Left)));
console.log('Модуль правый: ' + (Math.abs(styleTank2Right - styleTank1Right)));
*/