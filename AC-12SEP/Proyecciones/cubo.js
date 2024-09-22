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

