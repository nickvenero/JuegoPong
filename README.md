# 🎮 Juego de Pong

Un juego clásico de Pong implementado con **HTML5**, **CSS3** y **JavaScript vanilla**, con interfaz moderna y controles intuitivos para dos jugadores.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Cómo Jugar](#cómo-jugar)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación Adicional](#documentación-adicional)
- [Licencia](#licencia)

## ✨ Características

- ✅ **Juego multijugador** - Dos jugadores simultáneamente
- ✅ **Controles personalizables** - Teclas de flecha y A/Z
- ✅ **Sistema de puntuación** - Seguimiento en tiempo real
- ✅ **Reinicio automático** - Después de cada punto
- ✅ **Física realista** - Colisiones y rebotes precisos
- ✅ **Efecto spin** - La velocidad de la pelota depende de tu movimiento
- ✅ **Interfaz atractiva** - Diseño moderno con efectos visuales
- ✅ **Código bien documentado** - Fácil de mantener y modificar

## 🛠 Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de dependencias externas

## 📦 Instalación

1. **Descarga o clona el proyecto:**
   ```bash
   git clone <tu-repositorio>
   cd JuegoPong
   ```

2. **Abre el archivo `index.html` en tu navegador:**
   - Doble clic en `index.html`
   - O arrastra el archivo a tu navegador
   - O haz clic derecho → Abrir con → Navegador

3. **¡A jugar!**

## 🎮 Cómo Jugar

### Objetivo
Evita que la pelota pase tu paleta. El primero en llegar a **5 puntos** gana.

### Controles

| Jugador | Arriba | Abajo |
|---------|--------|-------|
| **Jugador 1** (Derecha) | ↑ | ↓ |
| **Jugador 2** (Izquierda) | **A** | **Z** |

### Mecánicas
- **Rebotes:** La pelota rebota en las paredes superior e inferior
- **Velocidad:** Aumenta cada vez que golpeas la pelota
- **Spin:** Si te mueves al golpear, la pelota cambia de ángulo
- **Límite:** El primero en 5 puntos gana

## 📂 Estructura del Proyecto

```
JuegoPong/
├── index.html          # Estructura HTML del juego
├── styles.css          # Estilos y diseño visual
├── game.js             # Lógica del juego
├── README.md           # Este archivo (descripción general)
├── ANALISIS.md         # Análisis detallado del código
├── ARQUITECTURA.md     # Descripción de la arquitectura
└── GUIA_RAPIDA.md      # Guía rápida de uso
```

## 📚 Documentación Adicional

- **[GUIA_RAPIDA.md](GUIA_RAPIDA.md)** - Comienza aquí para entender rápidamente cómo usar el juego
- **[ARQUITECTURA.md](ARQUITECTURA.md)** - Comprende la estructura interna y cómo funciona el código
- **[ANALISIS.md](ANALISIS.md)** - Análisis detallado del código y mejoras implementadas

## 🔧 Personalización

### Cambiar el número de puntos para ganar
En `game.js`, línea ~230, busca:
```javascript
const winningScore = 5;
```
Cambia el número 5 por el valor que desees.

### Modificar velocidades
En `game.js`, objeto `ball`:
```javascript
const ball = {
    maxSpeed: 10  // Velocidad máxima de la pelota
};
```

En `game.js`, objeto `player1` y `player2`:
```javascript
speed: 7  // Velocidad de movimiento de las paletas
```

### Cambiar colores
En `styles.css` busca la sección `/* Canva del juego */` y modifica los colores.

En `game.js`, función `drawPaddles()`:
```javascript
drawPaddle(player1, '#00ff00');  // Verde para Jugador 1
drawPaddle(player2, '#ff00ff');  // Magenta para Jugador 2
```

## 🚀 Mejoras Futuras

- [ ] Modos de juego (Fácil, Normal, Difícil)
- [ ] IA para jugar contra la computadora
- [ ] Efectos de sonido
- [ ] Historial de partidas
- [ ] Temas oscuro/claro
- [ ] Controles táctiles para móviles
- [ ] Versión multijugador en línea

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

Creado por [Tu Nombre]

## 📞 Contacto

- 📧 Email: tu.email@example.com
- 💼 LinkedIn: [Tu perfil]
- 🐙 GitHub: [Tu perfil]

---

¡Diviértete jugando Pong! Si encuentras bugs o tienes sugerencias, no dudes en crear un issue. 🎮✨
