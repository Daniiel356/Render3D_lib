export class AtlasPacker {
    constructor(maxWidth = 2048, maxHeight = 2048) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.padding = 2; // Espacio de 2px entre imágenes para evitar que los bordes se mezclen (Texture Bleeding)
    }

    async generateAtlas(imageElements) {
        // 1. Clonar y ordenar las imágenes de MAYOR a MENOR (por altura, luego por ancho)
        const sortedImages = [...imageElements].sort((a, b) => {
            if (b.height !== a.height) return b.height - a.height;
            return b.width - a.width;
        });

        // MOD: gasts el menor espscio posible (o eso espero XD)
        let atlasWidth = sortedImages[0].width+this.padding;
        let atlasHeight = sortedImages[0].height+this.padding;
        
        let root = { x: 0, y: 0, w: atlasWidth, h: atlasHeight, used: false };

        // Función recursiva para buscar espacio en el árbol
        function findNode(node, w, h) {
            if (node.used) {
                return findNode(node.right, w, h) || findNode(node.down, w, h);
            } else if ((w <= node.w) && (h <= node.h)) {
                return node;
            }
            return null;
        }

        // Función para "cortar" el espacio libre al meter una imagen
        function splitNode(node, w, h) {
            node.used = true;
            node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
            node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h           };
            return node;
        }

        // Función para agrandar el canvas si las imágenes no caben
        function growAtlas(w, h) {
            const canGrowRight = (atlasWidth + w <= this.maxWidth);
            const canGrowDown  = (atlasHeight + h <= this.maxHeight);
            
            // Intentar crecer hacia el lado que mantenga el canvas lo más cuadrado posible
            const shouldGrowRight = canGrowRight && (atlasWidth <= atlasHeight);
            const shouldGrowDown  = canGrowDown && (atlasHeight <= atlasWidth);

            if (shouldGrowRight) {
                const oldRoot = root;
                root = { x: 0, y: 0, w: atlasWidth + w, h: atlasHeight, used: true, down: oldRoot, right: { x: atlasWidth, y: 0, w: w, h: atlasHeight } };
                atlasWidth += w;
            } else if (shouldGrowDown) {
                const oldRoot = root;
                root = { x: 0, y: 0, w: atlasWidth, h: atlasHeight + h, used: true, down: { x: 0, y: atlasHeight, w: atlasWidth, h: h }, right: oldRoot };
                atlasHeight += h;
            } else {
                throw new Error("¡El Atlas superó el tamaño máximo permitido por la GPU!");
            }
        }

        const packedImages = [];

        // 3. Posicionar cada imagen en el árbol
        for (const img of sortedImages) {
            const w = img.width + this.padding;
            const h = img.height + this.padding;
            let node = findNode(root, w, h);

            if (!node) {
                growAtlas.call(this, w, h);
                node = findNode(root, w, h);
            }

            if (node) {
                splitNode(node, w, h);
                packedImages.push({
                    img: img,
                    x: node.x,
                    y: node.y,
                    w: img.width,
                    h: img.height
                });
            }
        }

        // 4. Dibujar el resultado en un Canvas 2D real
        const canvas = document.createElement('canvas');
        canvas.width = atlasWidth;
        canvas.height = atlasHeight;
        const ctx = canvas.getContext('2d');

        const uvs = [];

        packedImages.forEach(item => {
            ctx.drawImage(item.img, item.x, item.y);

            // 5. Calcular las coordenadas UV mapeadas de 0.0 a 1.0 para WebGL2
            // Guardamos: [X_inicio, Y_inicio, Ancho_proporcional, Alto_proporcional]
            uvs.push({id: item.img.identiefer,
                data:[
                item.x / atlasWidth,
                item.y / atlasHeight,
                item.w / atlasWidth,
                item.h / atlasHeight
            ]});
        });

        return [canvas, uvs];
    }
}
