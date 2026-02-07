/* ============================================
   LÓGICA DEL JUEGO DE PONG
   ============================================
   Este archivo contiene toda la lógica del juego,
   separado del HTML y CSS para mejor mantenimiento
   y escalabilidad.
   ============================================ */

// ============================================
// CONFIGURACIÓN INICIAL DEL JUEGO
// ============================================

// Obtener el canvas y el contexto de dibujo
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// ============================================
// DEFINICIÓN DE OBJETOS DEL JUEGO
// ============================================

/**
 * Objeto que representa la pelota
 * @property {number} x - Posición horizontal
 * @property {number} y - Posición vertical
 * @property {number} radius - Radio de la pelota
 * @property {number} speedX - Velocidad en X
 * @property {number} speedY - Velocidad en Y
 * @property {number} maxSpeed - Velocidad máxima permitida
 */
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speedX: 5,
    speedY: 5,
    maxSpeed: 10
};

/**
 * Objeto que representa al Jugador 1 (lado derecho)
 * Controles: Teclas de flecha ↑↓
 * @property {number} x - Posición horizontal
 * @property {number} y - Posición vertical
 * @property {number} width - Ancho de la paleta
 * @property {number} height - Alto de la paleta
 * @property {number} speed - Velocidad de movimiento
 * @property {number} dy - Cambio en Y (actualizado por teclas)
 * @property {number} score - Puntuación del jugador
 */
const player1 = {
    x: canvas.width - 15,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 7,
    dy: 0,
    score: 0
};

/**
 * Objeto que representa al Jugador 2 (lado izquierdo)
 * Controles: Teclas A (arriba) y Z (abajo)
 * @property {number} x - Posición horizontal
 * @property {number} y - Posición vertical
 * @property {number} width - Ancho de la paleta
 * @property {number} height - Alto de la paleta
 * @property {number} speed - Velocidad de movimiento
 * @property {number} dy - Cambio en Y (actualizado por teclas)
 * @property {number} score - Puntuación del jugador
 */
const player2 = {
    x: 5,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 7,
    dy: 0,
    score: 0
};

// Variables de estado del juego
let gameOver = false;
let winner = '';

// Objeto para almacenar qué teclas están presionadas
const keys = {};

// ============================================
// GESTIÓN DE CONTROLES (TECLADO)
// ============================================

/**
 * Evento cuando se presiona una tecla
 * Almacena el estado de la tecla y evita comportamientos por defecto
 */
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;

    // Evitar el comportamiento por defecto de las teclas de flecha
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
    }
});

/**
 * Evento cuando se suelta una tecla
 * Actualiza el estado de la tecla
 */
document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// ============================================
// FUNCIONES DE ACTUALIZACIÓN DEL JUEGO
// ============================================

/**
 * Actualiza la posición del Jugador 1
 * Utiliza las teclas de flecha (↑ para arriba, ↓ para abajo)
 */
function updatePlayer1() {
    player1.dy = 0;

    if (keys['arrowup']) {
        player1.dy = -player1.speed;
    }
    if (keys['arrowdown']) {
        player1.dy = player1.speed;
    }

    player1.y += player1.dy;

    // Limitar movimiento dentro del canvas
    if (player1.y < 0) {
        player1.y = 0;
    }
    if (player1.y + player1.height > canvas.height) {
        player1.y = canvas.height - player1.height;
    }
}

/**
 * Actualiza la posición del Jugador 2
 * Utiliza las teclas 'A' (arriba) y 'Z' (abajo)
 */
function updatePlayer2() {
    player2.dy = 0;

    if (keys['a']) {
        player2.dy = -player2.speed;
    }
    if (keys['z']) {
        player2.dy = player2.speed;
    }

    player2.y += player2.dy;

    // Limitar movimiento dentro del canvas
    if (player2.y < 0) {
        player2.y = 0;
    }
    if (player2.y + player2.height > canvas.height) {
        player2.y = canvas.height - player2.height;
    }
}

/**
 * Actualiza la posición de la pelota
 * Maneja los rebotes con las paredes y detecta puntuación
 */
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Rebote con la pared superior
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.speedY = -ball.speedY;
    }

    // Rebote con la pared inferior
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.speedY = -ball.speedY;
    }

    // Si la pelota sale por la izquierda, Jugador 1 anota
    if (ball.x < 0) {
        player1.score++;
        updateScoreDisplay();
        checkGameOver();
        if (!gameOver) {
            resetBall();
        }
    }

    // Si la pelota sale por la derecha, Jugador 2 anota
    if (ball.x > canvas.width) {
        player2.score++;
        updateScoreDisplay();
        checkGameOver();
        if (!gameOver) {
            resetBall();
        }
    }
}

/**
 * Detecta colisiones entre la pelota y las paletas
 * Invierte la dirección y aumenta la velocidad gradualmente
 */
function checkCollisions() {
    // Colisión con Jugador 1 (lado derecho)
    if (
        ball.x + ball.radius > player1.x &&
        ball.y > player1.y &&
        ball.y < player1.y + player1.height
    ) {
        ball.x = player1.x - ball.radius;
        ball.speedX = -ball.speedX;

        // Aumentar velocidad gradualmente
        if (Math.abs(ball.speedX) < ball.maxSpeed) {
            ball.speedX *= 1.05;
        }
        if (Math.abs(ball.speedY) < ball.maxSpeed) {
            ball.speedY *= 1.05;
        }

        // Efecto spin: la pelota sale en el ángulo de movimiento del jugador
        ball.speedY += player1.dy * 0.2;
    }

    // Colisión con Jugador 2 (lado izquierdo)
    if (
        ball.x - ball.radius < player2.x + player2.width &&
        ball.y > player2.y &&
        ball.y < player2.y + player2.height
    ) {
        ball.x = player2.x + player2.width + ball.radius;
        ball.speedX = -ball.speedX;

        // Aumentar velocidad gradualmente
        if (Math.abs(ball.speedX) < ball.maxSpeed) {
            ball.speedX *= 1.05;
        }
        if (Math.abs(ball.speedY) < ball.maxSpeed) {
            ball.speedY *= 1.05;
        }

        // Efecto spin: la pelota sale en el ángulo de movimiento del jugador
        ball.speedY += player2.dy * 0.2;
    }
}

/**
 * Reinicia la posición y velocidad de la pelota al centro
 * Se llama después de que alguien anota un punto
 */
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.speedY = (Math.random() > 0.5 ? 1 : -1) * 5;
}

/**
 * Verifica si el juego ha terminado
 * El ganador es quien llegue a 5 puntos
 */
function checkGameOver() {
    const winningScore = 5;

    if (player1.score >= winningScore) {
        gameOver = true;
        winner = 'Jugador 1';
        updateGameStatus(`¡${winner} HA GANADO! 🎉`);
    } else if (player2.score >= winningScore) {
        gameOver = true;
        winner = 'Jugador 2';
        updateGameStatus(`¡${winner} HA GANADO! 🎉`);
    }
}

// ============================================
// FUNCIONES DE ACTUALIZACIÓN DE UI
// ============================================

/**
 * Actualiza la visualización de la puntuación en la página
 */
function updateScoreDisplay() {
    document.getElementById('score1').textContent = player1.score;
    document.getElementById('score2').textContent = player2.score;
}

/**
 * Actualiza el mensaje de estado del juego
 * @param {string} message - Mensaje a mostrar
 */
function updateGameStatus(message) {
    document.getElementById('gameStatus').textContent = message;
}

// ============================================
// FUNCIONES DE DIBUJO (RENDERIZADO)
// ============================================

/**
 * Dibuja el fondo del canvas
 */
function drawBackground() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Dibuja la línea punteada del centro del canvas
 */
function drawCenterLine() {
    ctx.strokeStyle = '#00ffff';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

/**
 * Dibuja la pelota (círculo)
 */
function drawBall() {
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Efecto de brillo
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
}

/**
 * Dibuja una paleta
 * @param {object} player - Objeto del jugador
 * @param {string} color - Color de la paleta
 */
function drawPaddle(player, color) {
    ctx.fillStyle = color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Efecto de brillo
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

/**
 * Dibuja ambas paletas
 */
function drawPaddles() {
    drawPaddle(player1, '#00ff00');  // Verde para Jugador 1
    drawPaddle(player2, '#ff00ff');  // Magenta para Jugador 2
}

// ============================================
// BUCLE PRINCIPAL DEL JUEGO
// ============================================

/**
 * Función principal que se ejecuta continuamente
 * Actualiza la lógica y redibuja la pantalla
 */
function gameLoop() {
    // Solo ejecutar si el juego no ha terminado
    if (!gameOver) {
        updatePlayer1();
        updatePlayer2();
        updateBall();
        checkCollisions();
    }

    // Dibujar en el canvas
    drawBackground();
    drawCenterLine();
    drawBall();
    drawPaddles();

    // Continuar con el siguiente fotograma
    requestAnimationFrame(gameLoop);
}

// ============================================
// FUNCIONES DE REINICIO
// ============================================

/**
 * Reinicia completamente el juego
 * Se llama cuando el usuario hace clic en "Reiniciar Juego"
 */
function resetGame() {
    // Reiniciar puntuaciones
    player1.score = 0;
    player2.score = 0;
    updateScoreDisplay();

    // Reiniciar estado
    gameOver = false;
    winner = '';
    updateGameStatus('');

    // Reiniciar posiciones
    player1.y = canvas.height / 2 - 50;
    player2.y = canvas.height / 2 - 50;
    resetBall();

    // Limpiar teclas presionadas
    for (let key in keys) {
        keys[key] = false;
    }
}

// ============================================
// INICIO DEL JUEGO
// ============================================

// Iniciar el bucle del juego
gameLoop();

// Mostrar mensaje inicial
updateGameStatus('¡Que comience el juego! 🎮');
