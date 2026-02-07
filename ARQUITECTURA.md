# 🏗️ Arquitectura del Proyecto Pong

Documentación detallada de la arquitectura y estructura del proyecto.

## Tabla de Contenidos

- [Visión General](#visión-general)
- [Estructura de Directorios](#estructura-de-directorios)
- [Arquitectura en Capas](#arquitectura-en-capas)
- [Flujo de Datos](#flujo-de-datos)
- [Componentes del Juego](#componentes-del-juego)
- [Interacciones entre Módulos](#interacciones-entre-módulos)
- [Patrones de Diseño](#patrones-de-diseño)
- [Dependencias](#dependencias)

## Visión General

El proyecto utiliza una **arquitectura modular de 3 capas** con separación clara entre:
- **Presentación** (HTML + CSS)
- **Lógica** (JavaScript)
- **Datos** (Objetos de juego)

```
┌─────────────────────────────────────────┐
│         CAPA DE PRESENTACIÓN            │
│        (HTML + CSS)                     │
├─────────────────────────────────────────┤
│         CAPA DE APLICACIÓN              │
│    (Lógica de Juego - JavaScript)      │
├─────────────────────────────────────────┤
│         CAPA DE DATOS                   │
│    (Objetos: Ball, Player1, Player2)   │
└─────────────────────────────────────────┘
```

## Estructura de Directorios

```
JuegoPong/
│
├── 📄 index.html              # Presentación (Capa 1)
│   └── Estructura HTML5
│       ├── Canvas para el juego
│       ├── UI de puntuación
│       ├── Instrucciones
│       └── Referencias a CSS y JS
│
├── 🎨 styles.css              # Estilos (Capa 1)
│   ├── Body y contenedor
│   ├── Canvas
│   ├── Score board
│   ├── Instrucciones
│   └── Botones
│
├── ⚙️ game.js                 # Lógica (Capas 2 y 3)
│   ├── Configuración
│   ├── Objetos de juego
│   ├── Event listeners
│   ├── Update functions
│   ├── Collision detection
│   ├── Rendering functions
│   └── Game loop
│
└── 📚 Documentación
    ├── README.md              # Descripción general
    ├── ANALISIS.md            # Análisis técnico
    ├── ARQUITECTURA.md        # Este archivo
    └── GUIA_RAPIDA.md         # Guía de uso
```

## Arquitectura en Capas

### Capa 1: Presentación

#### `index.html`
**Responsabilidad:** Definir la estructura HTML

```
<html>
  <head>
    <title>Juego de Pong</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <div class="container">
      <h1>Juego de Pong</h1>
      <canvas id="pongCanvas" width="800" height="400"></canvas>
      <div class="score-board">
        <div class="player-score">
          <h2>Jugador 1</h2>
          <div class="score-number" id="score1">0</div>
        </div>
        ...
      </div>
    </div>
    <script src="game.js"></script>
  </body>
</html>
```

**Elementos:**
- 1 Canvas (arena del juego)
- 2 Divs para puntuación
- 1 Div para instrucciones
- 1 Botón para reinicio

#### `styles.css`
**Responsabilidad:** Definir la presentación visual

```css
/* Variables globales */
* { margin: 0; padding: 0; }

/* Temas y colores */
body { background: gradient; }
canvas { border: 3px cyan; }

/* Componentes */
.container { ... }
.score-board { ... }
.instructions { ... }
button { ... }
```

**Separación:**
- Estilos globales
- Estilos por componente
- Estados (hover, active)

### Capa 2: Lógica de Aplicación

#### `game.js` - Módulos Funcionales

```
game.js
├── Configuración
│   └── const canvas, const ctx
│
├── Datos de Juego (Capa 3)
│   ├── const ball { x, y, radius, speedX, speedY, maxSpeed }
│   ├── const player1 { x, y, width, height, speed, dy, score }
│   └── const player2 { x, y, width, height, speed, dy, score }
│
├── Módulo de Input
│   ├── document.addEventListener('keydown', ...)
│   └── document.addEventListener('keyup', ...)
│
├── Módulo de Physics
│   ├── updatePlayer1()
│   ├── updatePlayer2()
│   ├── updateBall()
│   └── checkCollisions()
│
├── Módulo de Rendering
│   ├── drawBackground()
│   ├── drawCenterLine()
│   ├── drawBall()
│   └── drawPaddles()
│
├── Módulo de Game State
│   ├── checkGameOver()
│   ├── resetBall()
│   └── resetGame()
│
├── Módulo de UI
│   ├── updateScoreDisplay()
│   └── updateGameStatus()
│
└── Game Loop
    └── gameLoop()
```

### Capa 3: Datos

```javascript
// Entidades de Juego
const ball = {
    x: number,          // Posición X
    y: number,          // Posición Y
    radius: number,     // Tamaño
    speedX: number,     // Velocidad X
    speedY: number,     // Velocidad Y
    maxSpeed: number    // Límite de velocidad
};

const player1 = {
    x: number,          // Posición X
    y: number,          // Posición Y
    width: number,      // Ancho
    height: number,     // Alto
    speed: number,      // Velocidad de movimiento
    dy: number,         // Delta Y (cambio)
    score: number       // Puntuación
};

const player2 = { ... };  // Mismo que player1

// Estado Global
let gameOver: boolean;
let winner: string;
const keys: object;
```

## Flujo de Datos

### Diagrama de Flujo General

```
START
  ↓
gameLoop() es llamado por requestAnimationFrame
  ↓
IF NOT gameOver:
  ├─→ updatePlayer1() → modifica player1.y
  ├─→ updatePlayer2() → modifica player2.y
  ├─→ updateBall() → modifica ball.x, ball.y, ball.speedX, ball.speedY
  └─→ checkCollisions() → modifica ball.velocity
  ↓
Rendering:
  ├─→ drawBackground()
  ├─→ drawCenterLine()
  ├─→ drawBall()
  └─→ drawPaddles()
  ↓
requestAnimationFrame(gameLoop) → siguiente frame
  ↓
END (cuando se cierre la pestaña)
```

### Input → Update → Render

```
┌─ ENTRADA ─────────────────┐
│ Usuario presiona tecla    │
│ (keydown event)           │
└──────────┬────────────────┘
           ↓
┌─ ACTUALIZACIÓN ───────────┐
│ keys['arrowup'] = true    │
│ updatePlayer1()           │
│ player1.y -= 7            │
└──────────┬────────────────┘
           ↓
┌─ RENDERIZADO ─────────────┐
│ drawPaddles()             │
│ ctx.fillRect(...)         │
└───────────────────────────┘
           ↓
┌─ SALIDA ──────────────────┐
│ Canvas actualizado        │
│ Paleta se mueve visualmente
└───────────────────────────┘
```

## Componentes del Juego

### 1. Componente: Ball (Pelota)

**Datos:**
```javascript
const ball = {
    x: number,      // Posición horizontal
    y: number,      // Posición vertical
    radius: 8,      // Radio del círculo
    speedX: 5,      // Velocidad X
    speedY: 5,      // Velocidad Y
    maxSpeed: 10    // Velocidad máxima
};
```

**Funciones que lo usan:**
- `updateBall()` - Actualiza posición
- `checkCollisions()` - Detecta colisiones
- `drawBall()` - Renderiza
- `resetBall()` - Reinicia

**Estado:**
- Se mueve continuamente
- Cambia velocidad al colisionar
- Aumenta velocidad progresivamente
- Se reinicia cuando alguien anota

### 2. Componente: Player1 / Player2 (Jugadores)

**Datos:**
```javascript
const player1 = {
    x: number,      // Posición X (fija)
    y: number,      // Posición Y (varía)
    width: 10,      // Ancho fijo
    height: 100,    // Alto fijo
    speed: 7,       // Velocidad de movimiento
    dy: number,     // Delta Y (cambio por frame)
    score: number   // Puntuación
};
```

**Funciones que lo usan:**
- `updatePlayer1()` / `updatePlayer2()` - Actualiza Y según input
- `checkCollisions()` - Detecta colisiones con pelota
- `drawPaddles()` - Renderiza
- `resetGame()` - Reinicia posición

**Estado:**
- Solo se mueve verticalmente
- Limitado entre 0 y canvas.height
- Aumenta puntuación cuando anota
- Se reinicia al hacer reset

### 3. Componente: Canvas

**HTML:**
```html
<canvas id="pongCanvas" width="800" height="400"></canvas>
```

**JavaScript:**
```javascript
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
```

**Funcionalidad:**
- Área de juego
- 800x400 píxeles
- Contexto 2D para dibujar

## Interacciones entre Módulos

### Flujo de Control

```
gameLoop()
├── [CHECK] if not gameOver
│   ├── updatePlayer1()
│   │   └── Lee: keys, canvas.height
│   │   └── Modifica: player1.y, player1.dy
│   │
│   ├── updatePlayer2()
│   │   └── Lee: keys, canvas.height
│   │   └── Modifica: player2.y, player2.dy
│   │
│   ├── updateBall()
│   │   └── Lee: canvas.width, canvas.height, ball.x, ball.y
│   │   └── Modifica: ball.x, ball.y, ball.speedX, ball.speedY
│   │   └── Llama: resetBall(), updateScoreDisplay(), checkGameOver()
│   │
│   └── checkCollisions()
│       └── Lee: ball, player1, player2
│       └── Modifica: ball.speedX, ball.speedY
│
├── drawBackground()
├── drawCenterLine()
├── drawBall()
└── drawPaddles()
```

### Comunicación de Eventos

```
Eventos de Teclado
├── keydown
│   └── keys[key] = true
│
└── keyup
    └── keys[key] = false
        ↓
        Se leen en updatePlayer1() y updatePlayer2()
```

### Actualización de UI

```
Cambios en datos
├── player1.score++ / player2.score++
│   └── updateScoreDisplay()
│       └── document.getElementById('score1').textContent = ...
│
└── gameOver = true
    └── updateGameStatus()
        └── document.getElementById('gameStatus').textContent = ...
```

## Patrones de Diseño

### 1. **Object Literal Pattern**
```javascript
const ball = { x, y, radius, ... };
const player1 = { x, y, width, ... };
```
- Agrupa datos relacionados
- Fácil de pasar como parámetro
- Preparado para convertir a clase

### 2. **Separation of Concerns**
```
Update → Collision → Render → Score
```
- Cada función tiene una responsabilidad clara
- Fácil de testear individualmente

### 3. **Game Loop Pattern**
```javascript
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}
```
- Patrón estándar en game development
- Sincronizado con pantalla (60 FPS)

### 4. **State Management**
```javascript
let gameOver = false;
let winner = '';
```
- Estado global simplificado
- Potencial para expandir con patrón Redux

### 5. **Event Delegation**
```javascript
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);
```
- Un objeto para todos los inputs
- Eficiente y escalable

## Dependencias

### Dependencias Externas
**Ninguna** - El proyecto es vanilla JavaScript

### Dependencias Internas

```
game.js
├── Necesita: index.html
│   └── <canvas id="pongCanvas">
│   └── <div id="score1">
│   └── <div id="score2">
│   └── <div id="gameStatus">
│   └── onclick="resetGame()"
│
└── Necesita: styles.css
    └── (No hay dependencia funcional, solo visual)

index.html
├── Necesita: styles.css (link rel)
└── Necesita: game.js (script src)

styles.css
└── No necesita otros archivos
```

### Orden de Carga

```
1. HTML se carga
2. styles.css se carga (asincrónico)
3. DOM está completo
4. game.js se ejecuta
   ├── Obtiene referencias al canvas
   ├── Obtiene referencias al DOM (score, status)
   ├── Agrega event listeners
   └── Inicia gameLoop()
```

## Escalabilidad Futura

### Estructura Preparada Para:

#### 1. **Convertir a Clases (OOP)**
```javascript
class Ball {
    constructor(x, y, radius) { ... }
    update() { ... }
    draw(ctx) { ... }
}

class Player {
    constructor(x, y, width, height) { ... }
    update(keys) { ... }
    draw(ctx) { ... }
}

class Game {
    constructor() { ... }
    run() { ... }
}
```

#### 2. **Agregar Sistema de Eventos**
```javascript
class EventEmitter {
    on(event, handler) { ... }
    emit(event, data) { ... }
}

ball.on('collision', updateScore);
```

#### 3. **Agregar Gestor de Recursos**
```javascript
class ResourceManager {
    loadImage(name) { ... }
    loadSound(name) { ... }
    getResource(name) { ... }
}
```

#### 4. **Agregar Configuración**
```javascript
const CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 400,
    WINNING_SCORE: 5,
    MAX_BALL_SPEED: 10,
    PLAYER_SPEED: 7
};
```

---

Esta arquitectura es **simple, escalable y mantenible**, perfecta para un proyecto educativo que puede crecer.
