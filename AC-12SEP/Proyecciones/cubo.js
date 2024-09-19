// Clase Linea
class Linea {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar(ctx, color = 'black') {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}

// Clase Cuadrado
class Cuadrado {
    constructor(x, y, lado) {
        this.x = x;
        this.y = y;
        this.lado = lado;
    }

    // Obtener las líneas del cuadrado
    obtenerLineas() {
        const lineas = [];
        lineas.push(new Linea(this.x, this.y, this.x + this.lado, this.y));
        lineas.push(new Linea(this.x + this.lado, this.y, this.x + this.lado, this.y + this.lado));
        lineas.push(new Linea(this.x + this.lado, this.y + this.lado, this.x, this.y + this.lado));
        lineas.push(new Linea(this.x, this.y + this.lado, this.x, this.y));
        return lineas;
    }

    dibujar(ctx, color = 'black') {
        const lineas = this.obtenerLineas();
        lineas.forEach(linea => linea.dibujar(ctx, color));
    }
}

// Clase Cubo
class Cubo {
    constructor(x, y, lado) {
        this.frente = new Cuadrado(x, y, lado);
        this.lado = lado;
    }

    // Método para dibujar en perspectiva
    dibujar_perspectiva(ctx, factorReduccion = 0.5) {
        const desplazamientoX = 60;
        const desplazamientoY = 50;
        const trasera = new Cuadrado(this.frente.x + desplazamientoX, this.frente.y - desplazamientoY, this.lado * factorReduccion);

        // Dibujar las caras del cubo
        this.frente.dibujar(ctx, 'blue');
        trasera.dibujar(ctx, 'blue');

        // Dibujar las líneas que conectan los vértices
        const verticesFrente = this.frente.obtenerLineas();
        const verticesTrasera = trasera.obtenerLineas();

        for (let i = 0; i < 4; i++) {
            const lineaConectora = new Linea(
                verticesFrente[i].x1, verticesFrente[i].y1,
                verticesTrasera[i].x1, verticesTrasera[i].y1
            );
            lineaConectora.dibujar(ctx, 'blue');
        }
    }

    // Método para dibujar en proyección ortográfica
    dibujar_ortografica(ctx) {
        const desplazamiento = 30;
        const trasera = new Cuadrado(this.frente.x + desplazamiento, this.frente.y - desplazamiento, this.lado);

        this.frente.dibujar(ctx, 'green');
        trasera.dibujar(ctx, 'green');

        // Conectar las esquinas
        const verticesFrente = this.frente.obtenerLineas();
        const verticesTrasera = trasera.obtenerLineas();

        for (let i = 0; i < 4; i++) {
            const lineaConectora = new Linea(
                verticesFrente[i].x1, verticesFrente[i].y1,
                verticesTrasera[i].x1, verticesTrasera[i].y1
            );
            lineaConectora.dibujar(ctx, 'green');
        }
    }

    // Método para dibujar en proyección isométrica
    dibujar_isometrica(ctx) {
        const puntos = [
            { x: 150, y: 100 }, { x: 200, y: 125 }, { x: 150, y: 150 }, { x: 100, y: 125 }, // Superior
            { x: 150, y: 150 }, { x: 200, y: 175 }, { x: 150, y: 200 }, { x: 100, y: 175 }  // Inferior
        ];

        // Dibujar la parte superior
        for (let i = 0; i < 3; i++) {
            new Linea(puntos[i].x, puntos[i].y, puntos[i + 1].x, puntos[i + 1].y).dibujar(ctx, 'red');
        }
        new Linea(puntos[3].x, puntos[3].y, puntos[0].x, puntos[0].y).dibujar(ctx, 'red');

        // Dibujar la parte inferior
        for (let i = 4; i < 7; i++) {
            new Linea(puntos[i].x, puntos[i].y, puntos[i + 1].x, puntos[i + 1].y).dibujar(ctx, 'red');
        }
        new Linea(puntos[7].x, puntos[7].y, puntos[4].x, puntos[4].y).dibujar(ctx, 'red');

        // Conectar superior e inferior
        for (let i = 0; i < 4; i++) {
            new Linea(puntos[i].x, puntos[i].y, puntos[i + 4].x, puntos[i + 4].y).dibujar(ctx, 'red');
        }
    }
}

// Inicializar los canvas
const perspectivaCanvas = document.getElementById('perspectiva');
const ortograficoCanvas = document.getElementById('ortografico');
const isometricoCanvas = document.getElementById('isometrico');
const perspectivaCtx = perspectivaCanvas.getContext('2d');
const ortograficoCtx = ortograficoCanvas.getContext('2d');
const isometricoCtx = isometricoCanvas.getContext('2d');

// Crear un cubo y dibujarlo en las diferentes proyecciones
const cubo = new Cubo(100, 100, 100);
cubo.dibujar_perspectiva(perspectivaCtx, 0.5);
cubo.dibujar_ortografica(ortograficoCtx);
cubo.dibujar_isometrica(isometricoCtx);
