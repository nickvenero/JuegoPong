# ⚡ Guía Rápida - Juego de Pong

Una guía concisa para empezar a usar y modificar el juego rápidamente.

## 🚀 Comenzar en 30 segundos

### 1. Abrir el juego
```
✅ Doble clic en index.html
o
✅ Arrastra index.html al navegador
```

### 2. Jugar
| Jugador | Mover Arriba | Mover Abajo |
|---------|--------------|------------|
| 1 (Derecha) | Flecha ↑ | Flecha ↓ |
| 2 (Izquierda) | Tecla A | Tecla Z |

### 3. Ganar
- Primer jugador en 5 puntos gana
- Click en "Reiniciar Juego" para nueva partida

## 📁 Estructura de Archivos

```
3 archivos principales:
├── index.html   ← Abre esto en el navegador
├── styles.css   ← Cambia colores y estilos aquí
└── game.js      ← Cambia lógica del juego aquí
```

## 🎨 Cambios Rápidos

### Cambiar colores de las paletas

**En `game.js`, busca la función `drawPaddles()` (línea ~350):**

```javascript
// Encontrarás esto:
function drawPaddles() {
    drawPaddle(player1, '#00ff00');  // Verde
    drawPaddle(player2, '#ff00ff');  // Magenta
}

// Cambia los códigos de color:
// Rojo: #ff0000
// Azul: #0000ff
// Amarillo: #ffff00
// Cian: #00ffff
// Blanco: #ffffff
```

### Cambiar el color del fondo del canvas

**En `styles.css`, busca `canvas` (línea ~40):**

```css
canvas {
    border: 3px solid #00ffff;
    background-color: #000;      /* Aquí cambia el color */
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    display: block;
    cursor: none;
}
```

### Cambiar la velocidad de las paletas

**En `game.js`, busca `const player1` (línea ~30):**

```javascript
const player1 = {
    x: canvas.width - 15,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    speed: 7,        // ← Cambiar este número (más grande = más rápido)
    dy: 0,
    score: 0
};
```

**Valores recomendados:**
- `speed: 3` - Muy lento
- `speed: 7` - Normal (default)
- `speed: 12` - Muy rápido

### Cambiar la velocidad de la pelota

**En `game.js`, busca `const ball` (línea ~20):**

```javascript
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speedX: 5,       // ← Velocidad inicial horizontal
    speedY: 5,       // ← Velocidad inicial vertical
    maxSpeed: 10     // ← Velocidad máxima que puede alcanzar
};
```

**Valores recomendados:**
- Velocidad inicial: 3-7
- Velocidad máxima: 8-12

### Cambiar el tamaño de las paletas

**En `game.js`, busca `const player1` (línea ~30):**

```javascript
const player1 = {
    x: canvas.width - 15,
    y: canvas.height / 2 - 50,
    width: 10,       // ← Ancho (0-50)
    height: 100,     // ← Alto (50-200)
    speed: 7,
    dy: 0,
    score: 0
};
```

### Cambiar puntos para ganar

**En `game.js`, busca `checkGameOver()` (línea ~230):**

```javascript
function checkGameOver() {
    const winningScore = 5;  // ← Cambiar este número

    if (player1.score >= winningScore) {
        // Jugador 1 gana
    } else if (player2.score >= winningScore) {
        // Jugador 2 gana
    }
}
```

### Cambiar tamaño de la pelota

**En `game.js`, busca `const ball` (línea ~20):**

```javascript
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,       // ← Cambiar este número (píxeles)
    speedX: 5,
    speedY: 5,
    maxSpeed: 10
};
```

## 💡 Modificaciones Comunes

### Hacer que la pelota no aumente de velocidad

**En `game.js`, busca `checkCollisions()` (línea ~180):**

```javascript
// Encontrarás esto:
if (Math.abs(ball.speedX) < ball.maxSpeed) {
    ball.speedX *= 1.05;  // Aumenta 5%
}

// Cámbialo a:
if (Math.abs(ball.speedX) < ball.maxSpeed) {
    // ball.speedX *= 1.05;  // Descomenta para desactivar aumento
}
```

### Hacer que la pelota vaya más rápida desde el inicio

**En `game.js`, busca `const ball` (línea ~20):**

```javascript
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speedX: 5,       // ← Aumenta este valor (5 → 8)
    speedY: 5,       // ← Aumenta este valor
    maxSpeed: 10
};
```

### Cambiar instrucciones del juego

**En `index.html`, busca la sección `.instructions`:**

```html
<div class="instructions">
    <h3>📋 Instrucciones del Juego</h3>
    <p><strong>Objetivo:</strong> Evita que la pelota pase tu paleta. ¡El primero en llegar a 5 puntos gana!</p>
    
    <!-- Edita aquí los controles y texto -->
    <div class="player-controls">
        <div class="controls-left">
            <h4>Jugador 1 (Derecha)</h4>
            <p>↑ Arriba<br>↓ Abajo</p>
        </div>
        ...
    </div>
</div>
```

## 🐛 Solución de Problemas

### El juego no se abre
✅ Solución: Asegúrate que `index.html`, `styles.css` y `game.js` están en la misma carpeta

### Las paletas no se mueven
✅ Solución: 
- Verifica que presiones las teclas correctas (↑↓ para Jugador 1, A/Z para Jugador 2)
- Abre la consola (F12) para ver si hay errores

### El juego va muy lento
✅ Solución:
- Cierra otras pestañas del navegador
- Aumenta `speedX` y `speedY` en `const ball`

### El juego va muy rápido
✅ Solución:
- Disminuye `speedX` y `speedY` en `const ball`
- Disminuye `speed` en `const player1` y `const player2`

### Ver errores en el navegador
```
1. Presiona F12 (o Ctrl+Shift+I)
2. Ve a la pestaña "Console"
3. Busca mensajes en rojo
```

## 📚 Documentación Completa

Para más información:

- **[README.md](README.md)** - Descripción general del proyecto
- **[ARQUITECTURA.md](ARQUITECTURA.md)** - Cómo está organizado el código
- **[ANALISIS.md](ANALISIS.md)** - Análisis detallado del código

## 🔥 Tips Avanzados

### Crear dificultades diferentes

**En `game.js`, después de `function resetGame()`:**

```javascript
function setDifficulty(level) {
    if (level === 'fácil') {
        ball.maxSpeed = 8;
        player1.speed = 5;
        player2.speed = 5;
    } else if (level === 'normal') {
        ball.maxSpeed = 10;
        player1.speed = 7;
        player2.speed = 7;
    } else if (level === 'difícil') {
        ball.maxSpeed = 15;
        player1.speed = 10;
        player2.speed = 10;
    }
}

// Luego llama: setDifficulty('difícil');
```

### Agregar puntos de bonificación

**En `game.js`, función `updateBall()`, después de `player1.score++`:**

```javascript
if (ball.x < 0) {
    player1.score += 1;  // Cambiar a '+= 2' para 2 puntos
    // ... resto del código
}
```

### Cambiar mensaje de victoria

**En `game.js`, función `checkGameOver()`:**

```javascript
if (player1.score >= winningScore) {
    gameOver = true;
    winner = 'Jugador 1';
    updateGameStatus(`¡${winner} HA GANADO! 🎉`);  // Edita aquí
}
```

## ✅ Checklist para Personalizar

- [ ] Cambié los colores de las paletas
- [ ] Cambié la velocidad del juego
- [ ] Ajusté la dificultad
- [ ] Leí la documentación completa
- [ ] Probé todos los cambios
- [ ] Juego funciona correctamente

## 🎮 Ideas para Expandir el Juego

1. **Agregar IA** - Computadora como jugador 2
2. **Agregar powerups** - Bolas más grandes, paletas más largas
3. **Agregar sonidos** - Audio al golpear, anotar, ganar
4. **Agregar efectos** - Partículas, animaciones
5. **Agregar niveles** - Dificultad progresiva
6. **Agregar temas** - Cambiar colores (Dark mode, etc)
7. **Agregar estadísticas** - Historial de partidas
8. **Agregar multijugador online** - WebSockets

---

**¡Ahora estás listo para personalizarciones y expandir el juego!** 🚀
