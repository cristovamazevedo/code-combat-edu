// Motor Gráfico 2D Avançado e Interpretador Dinâmico estilo CodeCombat
// Suporta: comandos simples, comandos com repetição numérica heroi.moverDireita(3), laços repetir(N) { ... } e funções funcao nome() { ... }
class DungeonEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.currentLevel = null;
        this.mapState = [];
        
        // Estado do Herói
        this.hero = { 
            x: 0, y: 0, 
            px: 0, py: 0, 
            dir: 'right', 
            animFrame: 0, 
            action: 'idle',
            walkCycle: 0,
            attackFrame: 0
        };
        
        this.running = false;
        this.stepDelay = 230;
        this.particles = [];
        this.torchFlicker = 0;
        this.showDidacticOverlay = true;
        this.bridgeActive = false;
        this.goblinAlive = true;
        this.altarActive = false;
        this.steppedOnTrap = false;
        
        this.portalPos = { x: -1, y: -1 };
        this.leverPos = { x: -1, y: -1 };
        this.altarPos = { x: -1, y: -1 };
        
        this.startRenderLoop();
    }

    startRenderLoop() {
        let lastTimestamp = 0;
        const loop = (timestamp) => {
            const dt = (timestamp - lastTimestamp) / 1000 || 0.016;
            lastTimestamp = timestamp;
            this.update(dt, timestamp);
            this.render(timestamp);
            this.animReq = requestAnimationFrame(loop);
        };
        this.animReq = requestAnimationFrame(loop);
    }

    loadLevel(level) {
        this.currentLevel = JSON.parse(JSON.stringify(level));
        this.mapState = this.currentLevel.grade.mapa.map(row => [...row]);
        this.hero.x = this.currentLevel.heroiInicio.x;
        this.hero.y = this.currentLevel.heroiInicio.y;
        this.hero.px = this.hero.x;
        this.hero.py = this.hero.y;
        this.hero.dir = 'right';
        this.hero.action = 'idle';
        this.hero.walkCycle = 0;
        this.hero.attackFrame = 0;
        
        this.bridgeActive = false;
        this.goblinAlive = true;
        this.altarActive = false;
        this.steppedOnTrap = false;
        this.particles = [];
        this.running = false;
        this.executionQueue = [];

        this.portalPos = { x: -1, y: -1 };
        this.leverPos = { x: -1, y: -1 };
        this.altarPos = { x: -1, y: -1 };

        for (let r = 0; r < this.currentLevel.grade.altura; r++) {
            for (let c = 0; c < this.currentLevel.grade.largura; c++) {
                const cell = this.mapState[r][c];
                if (cell === 3) this.portalPos = { x: c, y: r };
                if (cell === 5) this.leverPos = { x: c, y: r };
                if (cell === 9) this.altarPos = { x: c, y: r };
            }
        }

        this.currentLevel.objetivos.forEach(o => o.atingido = false);
        this.resizeCanvas();
    }

    resizeCanvas() {
        if (!this.currentLevel) return;
        const cols = this.currentLevel.grade.largura;
        const rows = this.currentLevel.grade.altura;
        
        const container = this.canvas.parentElement;
        const maxWidth = Math.max(480, (container.clientWidth || 600) - 16);
        const maxHeight = Math.max(340, (container.clientHeight || 420) - 16);
        
        const tsW = Math.floor(maxWidth / cols);
        const tsH = Math.floor(maxHeight / rows);
        this.tileSize = Math.max(42, Math.min(74, Math.min(tsW, tsH)));
        
        this.canvas.width = cols * this.tileSize;
        this.canvas.height = rows * this.tileSize;
    }

    update(dt, timestamp) {
        const speed = 0.28;
        this.hero.px += (this.hero.x - this.hero.px) * speed;
        this.hero.py += (this.hero.y - this.hero.py) * speed;

        const isMoving = Math.abs(this.hero.x - this.hero.px) > 0.02 || Math.abs(this.hero.y - this.hero.py) > 0.02;
        if (isMoving) {
            this.hero.walkCycle += 0.28;
            if (Math.random() < 0.25) {
                this.spawnDust(this.hero.px, this.hero.py);
            }
        } else {
            this.hero.walkCycle *= 0.8;
            if (this.hero.action === 'walk') this.hero.action = 'idle';
        }

        if (this.hero.action === 'attack') {
            this.hero.attackFrame += 0.18;
            if (this.hero.attackFrame > 1) {
                this.hero.attackFrame = 0;
                this.hero.action = 'idle';
            }
        }

        this.torchFlicker = Math.sin(timestamp * 0.007) * 0.15 + Math.cos(timestamp * 0.012) * 0.08;

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.03;
            if (p.size) p.size *= 0.97;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    spawnDust(x, y) {
        const ts = this.tileSize;
        this.particles.push({
            x: (x + 0.5) * ts + (Math.random() - 0.5) * 14,
            y: (y + 0.85) * ts,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -Math.random() * 0.8,
            color: 'rgba(160, 150, 140, 0.45)',
            size: 2.5 + Math.random() * 3,
            life: 0.55
        });
    }

    spawnParticles(x, y, color, count = 16) {
        const px = (x + 0.5) * this.tileSize;
        const py = (y + 0.5) * this.tileSize;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.2 + Math.random() * 3.5;
            this.particles.push({
                x: px,
                y: py,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: color,
                size: 3 + Math.random() * 3,
                life: 1.0
            });
        }
    }

    render(timestamp) {
        if (!this.currentLevel) return;
        const ctx = this.ctx;
        const ts = this.tileSize;
        const cols = this.currentLevel.grade.largura;
        const rows = this.currentLevel.grade.altura;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 1. Renderizar Chão e Objetos
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = this.mapState[r][c];
                const x = c * ts;
                const y = r * ts;

                this.drawFloorTile(ctx, x, y, ts, (r * cols + c) % 5);

                if (cell === 1) {
                    this.drawWallTile(ctx, x, y, ts, r, c);
                } else if (cell === 2) {
                    const heroOnIt = (this.hero.x === c && this.hero.y === r);
                    this.drawCrystal(ctx, x + ts / 2, y + ts / 2, ts, timestamp, heroOnIt);
                } else if (cell === 3) {
                    this.drawMagicPortal(ctx, x + ts / 2, y + ts / 2, ts, timestamp);
                } else if (cell === 4) {
                    this.drawSpikeTrap(ctx, x, y, ts);
                } else if (cell === 5) {
                    this.drawLever(ctx, x, y, ts, this.bridgeActive);
                } else if (cell === 6) {
                    if (this.goblinAlive) {
                        this.drawGoblinSentinel(ctx, x + ts / 2, y + ts / 2, ts, timestamp);
                    }
                } else if (cell === 7) {
                    this.drawBridge(ctx, x, y, ts, this.bridgeActive);
                } else if (cell === 8) {
                    this.drawElementalChamber(ctx, x + ts / 2, y + ts / 2, ts, timestamp);
                } else if (cell === 9) {
                    this.drawMysticAltar(ctx, x + ts / 2, y + ts / 2, ts, this.altarActive, timestamp);
                }
            }
        }

        // 2. Overlays Didáticos
        if (this.showDidacticOverlay) {
            this.renderDidacticOverlays(ctx, ts, timestamp);
        }

        // 3. Renderizar Partículas
        this.particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size || 3, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1.0;

        // 4. Renderizar o Herói Cavaleiro Realista
        this.drawRealisticKnight(ctx, ts, timestamp);
    }

    drawFloorTile(ctx, x, y, ts, variant) {
        const baseColors = ['#182030', '#161d2c', '#1a2334', '#151c2a', '#192232'];
        ctx.fillStyle = baseColors[variant];
        ctx.fillRect(x, y, ts, ts);

        ctx.strokeStyle = '#0d131e';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, ts - 1, ts - 1);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 2, y + ts - 2);
        ctx.lineTo(x + 2, y + 2);
        ctx.lineTo(x + ts - 2, y + 2);
        ctx.stroke();
    }

    drawWallTile(ctx, x, y, ts, r, c) {
        const grad = ctx.createLinearGradient(x, y, x, y + ts);
        grad.addColorStop(0, '#3a4658');
        grad.addColorStop(0.3, '#2a3443');
        grad.addColorStop(1, '#18202b');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, ts, ts);

        ctx.strokeStyle = '#121822';
        ctx.lineWidth = 1.5;
        const midY = y + ts * 0.5;
        ctx.beginPath();
        ctx.moveTo(x, midY);
        ctx.lineTo(x + ts, midY);

        if (r % 2 === 0) {
            ctx.moveTo(x + ts * 0.5, y);
            ctx.lineTo(x + ts * 0.5, midY);
        } else {
            ctx.moveTo(x + ts * 0.5, midY);
            ctx.lineTo(x + ts * 0.5, y + ts);
        }
        ctx.stroke();

        if ((r + c * 3) % 6 === 0) {
            this.drawWallTorch(ctx, x + ts * 0.5, y + ts * 0.42, ts);
        }
    }

    drawWallTorch(ctx, tx, ty, ts) {
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(tx - 2, ty, 4, 10);
        const radius = 8 + this.torchFlicker * 3;
        const glow = ctx.createRadialGradient(tx, ty - 3, 1, tx, ty - 3, radius * 2);
        glow.addColorStop(0, 'rgba(255, 177, 66, 0.4)');
        glow.addColorStop(1, 'rgba(255, 121, 63, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(tx, ty - 3, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fffa65';
        ctx.beginPath();
        ctx.ellipse(tx, ty - 3, 2.5, 5 + this.torchFlicker * 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    drawCrystal(ctx, cx, cy, ts, timestamp, heroOnIt = false) {
        const size = ts * 0.30;
        const bob = Math.sin(timestamp * 0.005) * 3;
        const y = cy + bob;

        ctx.save();
        const glowRadius = heroOnIt ? size * 2.8 : size * 2.0;
        const glow = ctx.createRadialGradient(cx, y, 2, cx, y, glowRadius);
        glow.addColorStop(0, heroOnIt ? 'rgba(56, 239, 125, 0.85)' : 'rgba(56, 239, 125, 0.45)');
        glow.addColorStop(1, 'rgba(56, 239, 125, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.moveTo(cx, y - size);
        ctx.lineTo(cx - size * 0.8, y);
        ctx.lineTo(cx, y + size * 0.9);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#38ef7d';
        ctx.beginPath();
        ctx.moveTo(cx, y - size);
        ctx.lineTo(cx + size * 0.8, y);
        ctx.lineTo(cx, y + size * 0.9);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#a8ff78';
        ctx.beginPath();
        ctx.moveTo(cx, y - size);
        ctx.lineTo(cx + size * 0.35, y - size * 0.2);
        ctx.lineTo(cx, y + size * 0.2);
        ctx.lineTo(cx - size * 0.35, y - size * 0.2);
        ctx.closePath();
        ctx.fill();

        if (heroOnIt) {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.shadowColor = '#000';
            ctx.shadowBlur = 4;
            ctx.fillText('💎 COLETAR!', cx, cy - ts * 0.55);
        }

        ctx.restore();
    }

    drawMagicPortal(ctx, cx, cy, ts, timestamp) {
        const radius = ts * 0.40;
        const angle = timestamp * 0.003;

        ctx.save();
        ctx.strokeStyle = '#3a4a5e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        const aura = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.3);
        aura.addColorStop(0, '#00f2fe');
        aura.addColorStop(0.5, 'rgba(79, 172, 254, 0.4)');
        aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 3; i++) {
            const rot = angle + (i * Math.PI * 2 / 3);
            ctx.strokeStyle = i % 2 === 0 ? '#38ef7d' : '#00d2ff';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(cx, cy, radius * (0.4 + i * 0.22), rot, rot + Math.PI * 1.2);
            ctx.stroke();
        }

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    drawSpikeTrap(ctx, x, y, ts) {
        ctx.fillStyle = '#1e2430';
        ctx.fillRect(x + 3, y + 3, ts - 6, ts - 6);
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x + 3, y + 3, ts - 6, ts - 6);

        const coords = [
            [x + ts * 0.3, y + ts * 0.3],
            [x + ts * 0.7, y + ts * 0.3],
            [x + ts * 0.3, y + ts * 0.7],
            [x + ts * 0.7, y + ts * 0.7]
        ];
        coords.forEach(([sx, sy]) => {
            ctx.fillStyle = '#7f8c8d';
            ctx.beginPath();
            ctx.moveTo(sx, sy - 7);
            ctx.lineTo(sx + 5, sy + 5);
            ctx.lineTo(sx - 5, sy + 5);
            ctx.closePath();
            ctx.fill();
        });
    }

    drawLever(ctx, x, y, ts, active) {
        const cx = x + ts * 0.5;
        const cy = y + ts * 0.6;

        ctx.fillStyle = '#4a5568';
        ctx.fillRect(cx - ts * 0.25, cy - 5, ts * 0.5, 14);
        ctx.strokeStyle = '#2d3748';
        ctx.strokeRect(cx - ts * 0.25, cy - 5, ts * 0.5, 14);

        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#a0aec0';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        if (active) {
            ctx.lineTo(cx + ts * 0.25, cy - ts * 0.28);
            ctx.stroke();
            ctx.fillStyle = '#2ecc71';
            ctx.beginPath();
            ctx.arc(cx + ts * 0.25, cy - ts * 0.28, 6, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.lineTo(cx - ts * 0.25, cy - ts * 0.28);
            ctx.stroke();
            ctx.fillStyle = '#e74c3c';
            ctx.beginPath();
            ctx.arc(cx - ts * 0.25, cy - ts * 0.28, 6, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawGoblinSentinel(ctx, cx, cy, ts, timestamp) {
        const breathe = Math.sin(timestamp * 0.005) * 2;
        const r = ts * 0.34;

        ctx.save();
        ctx.translate(cx, cy + breathe);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.beginPath();
        ctx.ellipse(0, r * 0.85, r * 0.9, r * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#3a5035';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#4a443a';
        ctx.fillRect(-r * 0.45, -r * 0.1, r * 0.9, r * 0.6);

        ctx.fillStyle = '#44bd32';
        ctx.beginPath();
        ctx.arc(0, -r * 0.35, r * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#718096';
        ctx.beginPath();
        ctx.arc(0, -r * 0.45, r * 0.42, Math.PI, 0, false);
        ctx.fill();

        ctx.fillStyle = '#ff3838';
        ctx.fillRect(-r * 0.25, -r * 0.35, 4, 3);
        ctx.fillRect(r * 0.12, -r * 0.35, 4, 3);

        ctx.strokeStyle = '#8c7b64';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(r * 0.4, -r * 0.2);
        ctx.lineTo(r * 0.85, r * 0.6);
        ctx.stroke();
        ctx.fillStyle = '#a4b0be';
        ctx.beginPath();
        ctx.arc(r * 0.75, -r * 0.2, 9, -Math.PI * 0.5, Math.PI * 0.5, false);
        ctx.fill();

        ctx.restore();
    }

    drawBridge(ctx, x, y, ts, active) {
        if (active) {
            ctx.fillStyle = '#8b5a2b';
            ctx.fillRect(x + 2, y + 2, ts - 4, ts - 4);
            ctx.strokeStyle = '#4a2f15';
            ctx.lineWidth = 2;
            for (let i = 1; i <= 3; i++) {
                ctx.beginPath();
                ctx.moveTo(x + 2, y + i * ts / 4);
                ctx.lineTo(x + ts - 2, y + i * ts / 4);
                ctx.stroke();
            }
        } else {
            ctx.fillStyle = '#05080e';
            ctx.fillRect(x, y, ts, ts);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.strokeRect(x + 3, y + 3, ts - 6, ts - 6);
            ctx.setLineDash([]);
            
            ctx.fillStyle = '#38bdf8';
            ctx.font = '9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('ABISMO', x + ts * 0.5, y + ts * 0.55);
        }
    }

    drawMysticAltar(ctx, cx, cy, ts, active, timestamp) {
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(cx - ts * 0.35, cy - ts * 0.35, ts * 0.7, ts * 0.7);
        ctx.strokeStyle = active ? '#f59e0b' : '#4a5568';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(cx - ts * 0.35, cy - ts * 0.35, ts * 0.7, ts * 0.7);

        ctx.fillStyle = active ? '#fbbf24' : '#718096';
        ctx.beginPath();
        ctx.arc(cx, cy, ts * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✧', cx, cy + 4);
    }

    drawElementalChamber(ctx, cx, cy, ts, timestamp) {
        ctx.save();
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(cx - ts * 0.38, cy - ts * 0.38, ts * 0.76, ts * 0.76);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
        ctx.fillRect(cx - ts * 0.38, cy - ts * 0.38, ts * 0.76, ts * 0.76);
        ctx.fillStyle = '#e9d5ff';
        ctx.font = `${Math.round(ts * 0.30)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('⚡', cx, cy + ts * 0.1);
        ctx.restore();
    }

    drawRealisticKnight(ctx, ts, timestamp) {
        const cx = (this.hero.px + 0.5) * ts;
        const cy = (this.hero.py + 0.5) * ts;
        const r = ts * 0.38;
        const dir = this.hero.dir === 'left' ? -1 : 1;
        const bob = Math.sin(this.hero.walkCycle) * 2.5;

        ctx.save();
        ctx.translate(cx, cy + bob);
        ctx.scale(dir, 1);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.beginPath();
        ctx.ellipse(0, r * 0.85, r * 0.85, r * 0.32, 0, 0, Math.PI * 2);
        ctx.fill();

        const capeWave = Math.sin(timestamp * 0.008 + this.hero.walkCycle) * 3.5;
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.moveTo(-r * 0.35, -r * 0.2);
        ctx.lineTo(r * 0.35, -r * 0.2);
        ctx.lineTo(-r * 0.75 + capeWave, r * 0.9);
        ctx.lineTo(-r * 0.95 - capeWave, r * 0.85);
        ctx.closePath();
        ctx.fill();

        const legOffset = Math.sin(this.hero.walkCycle) * 3;
        ctx.fillStyle = '#374151';
        ctx.fillRect(-r * 0.3, r * 0.4 + legOffset, r * 0.25, r * 0.4);
        ctx.fillRect(r * 0.05, r * 0.4 - legOffset, r * 0.25, r * 0.4);

        const armorGrad = ctx.createLinearGradient(-r * 0.5, 0, r * 0.5, 0);
        armorGrad.addColorStop(0, '#9ca3af');
        armorGrad.addColorStop(0.5, '#e5e7eb');
        armorGrad.addColorStop(1, '#6b7280');
        ctx.fillStyle = armorGrad;
        ctx.beginPath();
        ctx.arc(0, r * 0.05, r * 0.52, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#9ca3af';
        ctx.beginPath();
        ctx.arc(0, -r * 0.35, r * 0.38, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#4b5563';
        ctx.stroke();

        ctx.fillStyle = '#111827';
        ctx.fillRect(-r * 0.05, -r * 0.38, r * 0.38, 5);
        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(r * 0.08, -r * 0.37, 7, 3);

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(-r * 0.3, -r * 0.65);
        ctx.quadraticCurveTo(0, -r * 0.95, r * 0.25, -r * 0.65);
        ctx.lineTo(r * 0.1, -r * 0.5);
        ctx.lineTo(-r * 0.25, -r * 0.5);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#1e3a8a';
        ctx.beginPath();
        ctx.moveTo(-r * 0.65, -r * 0.1);
        ctx.lineTo(-r * 0.15, -r * 0.1);
        ctx.lineTo(-r * 0.25, r * 0.45);
        ctx.lineTo(-r * 0.4, r * 0.6);
        ctx.lineTo(-r * 0.55, r * 0.45);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.save();
        if (this.hero.action === 'attack') {
            const slashAngle = (this.hero.attackFrame - 0.5) * Math.PI * 0.9;
            ctx.rotate(slashAngle);
            ctx.strokeStyle = '#f8fafc';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(r * 0.3, 0);
            ctx.lineTo(r * 1.3, -r * 0.4);
            ctx.stroke();
        } else {
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(r * 0.35, -r * 0.15);
            ctx.lineTo(r * 0.65, r * 0.35);
            ctx.stroke();
            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(r * 0.28, -r * 0.18, 9, 4);
        }
        ctx.restore();

        ctx.restore();
    }

    renderDidacticOverlays(ctx, ts, timestamp) {
        const lvl = this.currentLevel;
        if (!lvl) return;
        ctx.save();

        if (lvl.id === 5) {
            const markers = [
                { x: 2, y: 1, label: 'Subproblema A: Alavanca', color: '#38bdf8' },
                { x: 4, y: 2, label: 'Subproblema B: Altar', color: '#10b981' }
            ];
            markers.forEach(m => {
                const px = (m.x + 0.5) * ts;
                ctx.strokeStyle = m.color;
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(m.x * ts + 2, m.y * ts + 2, ts - 4, ts - 4);
                ctx.fillStyle = m.color;
                ctx.font = 'bold 9px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(m.label, px, m.y * ts - 4);
            });
            ctx.setLineDash([]);
        } else if (lvl.id === 6) {
            const markers = [
                { x: 3, y: 1, label: 'Subproblema A: Runa', color: '#38bdf8' },
                { x: 3, y: 5, label: 'Subproblema B: Desarmar', color: '#f59e0b' },
                { x: 4, y: 3, label: 'Subproblema C: Altar', color: '#10b981' }
            ];
            markers.forEach(m => {
                const px = (m.x + 0.5) * ts;
                ctx.strokeStyle = m.color;
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(m.x * ts + 2, m.y * ts + 2, ts - 4, ts - 4);
                ctx.fillStyle = m.color;
                ctx.font = 'bold 9px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(m.label, px, m.y * ts - 4);
            });
            ctx.setLineDash([]);
        } else if (lvl.id === 7) {
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            for (let i = 0; i < 3; i++) {
                const sx = (2 + i) * ts + 2;
                ctx.strokeRect(sx, 1 * ts + 2, ts - 4, ts - 4);
            }
            ctx.fillStyle = '#c084fc';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('repetir(3) ou moverDireita(3)', 3.5 * ts, 1 * ts - 4);
            ctx.setLineDash([]);
        } else if (lvl.id === 8) {
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 4]);
            for (let i = 0; i < 4; i++) {
                const startX = (1 + i * 2) * ts + 2;
                ctx.strokeRect(startX, 1 * ts + 2, 2 * ts - 4, ts - 4);
                ctx.fillStyle = '#c084fc';
                ctx.font = 'bold 9px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`Ciclo ${i + 1}`, startX + ts, 1 * ts - 4);
            }
            ctx.setLineDash([]);
        }

        ctx.restore();
    }

    // Interpretador inteligente: suporta comandos simples, repetição com argumento numérico ex: heroi.moverDireita(3),
    // laço estruturado repetir(N) { ... } e funções reutilizáveis funcao nome() { ... }
    parseStudentCode(code) {
        const rawLines = code.split('\n');
        const lines = [];
        for (let i = 0; i < rawLines.length; i++) {
            let clean = rawLines[i].replace(/\/\/.*$/, '').replace(/#.*$/, '').trim();
            if (!clean) continue;
            if (clean.includes('{') || clean.includes('}')) {
                lines.push({ text: clean, lineNum: i + 1 });
            } else {
                const parts = clean.split(';').map(p => p.trim()).filter(p => p.length > 0);
                if (parts.length > 0) {
                    parts.forEach(p => lines.push({ text: p + ';', lineNum: i + 1 }));
                } else {
                    lines.push({ text: clean, lineNum: i + 1 });
                }
            }
        }

        const commands = [];
        let inRepeat = false;
        let repeatCount = 0;
        let repeatBlock = [];
        let inFunc = false;
        let funcName = '';
        let funcBlock = [];
        const functions = {};

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].text.trim();
            const origLine = lines[i].lineNum;
            if (!line) continue;

            // 1. Laço Estruturado: repetir(N) {
            const repeatMatch = line.match(/^repetir\s*\(\s*(\d+)\s*\)\s*\{?/i);
            if (repeatMatch) {
                inRepeat = true;
                repeatCount = parseInt(repeatMatch[1], 10);
                repeatBlock = [];
                continue;
            }

            // 2. Declaração de Função: funcao nome() { ou function / def
            const funcMatch = line.match(/^(?:funcao|function|def)\s+([a-zA-Z0-9_]+)\s*\(\s*\)\s*\{?:?/i);
            if (funcMatch) {
                inFunc = true;
                funcName = funcMatch[1];
                funcBlock = [];
                continue;
            }

            // Fechamento de bloco }
            if (line === '}' || line.startsWith('}')) {
                if (inRepeat) {
                    inRepeat = false;
                    for (let r = 0; r < repeatCount; r++) {
                        repeatBlock.forEach(cmd => commands.push({ ...cmd, isLoop: true }));
                    }
                } else if (inFunc) {
                    inFunc = false;
                    functions[funcName] = [...funcBlock];
                }
                continue;
            }

            // 3. Comandos com Número dentro do Parêntese: heroi.moverDireita(3), heroi.moverBaixo(2), etc.
            const paramMatch = line.match(/^([a-zA-Z0-9_\.]+)\s*\(\s*(\d+)\s*\)\s*;?/);
            if (paramMatch && !line.startsWith('repetir') && !line.startsWith('funcao') && !line.startsWith('function') && !line.startsWith('def')) {
                const baseCmd = paramMatch[1];
                const count = parseInt(paramMatch[2], 10);
                for (let k = 0; k < count; k++) {
                    const item = { line: origLine, raw: `${baseCmd}()`, isParamLoop: true };
                    if (inRepeat) {
                        repeatBlock.push(item);
                    } else if (inFunc) {
                        funcBlock.push(item);
                    } else {
                        commands.push(item);
                    }
                }
                continue;
            }

            // 4. Invocação de Função já declarada: nomeFuncao();
            const callMatch = line.match(/^([a-zA-Z0-9_]+)\s*\(\s*\)\s*;?/);
            if (callMatch && functions[callMatch[1]]) {
                functions[callMatch[1]].forEach(cmd => commands.push({ ...cmd, isFunc: true }));
                continue;
            }

            // 5. Comando Padrão sem argumento numérico
            const item = { line: origLine, raw: line };
            if (inRepeat) {
                repeatBlock.push(item);
            } else if (inFunc) {
                funcBlock.push(item);
            } else {
                commands.push(item);
            }
        }

        return commands;
    }

    executeAction(cmd) {
        const text = cmd.raw.toLowerCase();
        let success = true;
        let msg = '';
        this.hero.action = 'walk';

        const cols = this.currentLevel.grade.largura;
        const rows = this.currentLevel.grade.altura;

        const canMoveTo = (nx, ny) => {
            if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) return { ok: false, msg: 'O herói bateu nos limites da masmorra!' };
            const cell = this.mapState[ny][nx];
            if (cell === 1) return { ok: false, msg: 'O herói colidiu com a parede de pedra antiga!' };
            if (cell === 7 && !this.bridgeActive) return { ok: false, msg: 'A ponte levadiça está levantada sobre o abismo! Acione a alavanca primeiro!' };
            if (cell === 6 && this.goblinAlive) return { ok: false, msg: 'O Sentinela Orc bloqueou sua passagem! Use heroi.atacar()!' };
            if (cell === 4) {
                this.steppedOnTrap = true;
                return { ok: false, msg: 'Você pisou nos espinhos! Desvie pelo caminho seguro!' };
            }
            return { ok: true, cell: cell };
        };

        if (text.includes('moverdireita')) {
            this.hero.dir = 'right';
            const check = canMoveTo(this.hero.x + 1, this.hero.y);
            if (check.ok) {
                this.hero.x += 1;
                window.gameAudio.playStep();
            } else {
                success = false;
                msg = check.msg;
            }
        } else if (text.includes('moveresquerda')) {
            this.hero.dir = 'left';
            const check = canMoveTo(this.hero.x - 1, this.hero.y);
            if (check.ok) {
                this.hero.x -= 1;
                window.gameAudio.playStep();
            } else {
                success = false;
                msg = check.msg;
            }
        } else if (text.includes('moverbaixo')) {
            this.hero.dir = 'down';
            const check = canMoveTo(this.hero.x, this.hero.y + 1);
            if (check.ok) {
                this.hero.y += 1;
                window.gameAudio.playStep();
            } else {
                success = false;
                msg = check.msg;
            }
        } else if (text.includes('movercima')) {
            this.hero.dir = 'up';
            const check = canMoveTo(this.hero.x, this.hero.y - 1);
            if (check.ok) {
                this.hero.y -= 1;
                window.gameAudio.playStep();
            } else {
                success = false;
                msg = check.msg;
            }
        } else if (text.includes('coletar')) {
            const curCell = this.mapState[this.hero.y][this.hero.x];
            if (curCell === 2) {
                this.mapState[this.hero.y][this.hero.x] = 0;
                this.spawnParticles(this.hero.x, this.hero.y, '#38ef7d', 22);
                window.gameAudio.playCollect();
                msg = '✨ Cristal mágico coletado!';
            } else {
                msg = 'Nenhum cristal sob seus pés para coletar.';
            }
        } else if (text.includes('ativaralavanca')) {
            let found = false;
            const dirs = [[0,0], [1,0], [-1,0], [0,1], [0,-1]];
            for (let [dx, dy] of dirs) {
                const cx = this.hero.x + dx;
                const cy = this.hero.y + dy;
                if (this.mapState[cy] && this.mapState[cy][cx] === 5) {
                    this.bridgeActive = true;
                    this.spawnParticles(cx, cy, '#2ed573', 20);
                    window.gameAudio.playAction();
                    found = true;
                    break;
                }
            }
            if (found) {
                msg = '🕹️ Alavanca acionada! A ponte sobre o abismo desceu.';
            } else {
                msg = 'Nenhuma alavanca ao seu alcance!';
            }
        } else if (text.includes('atacar')) {
            this.hero.action = 'attack';
            window.gameAudio.playHit();
            const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
            let hit = false;
            for (let [dx, dy] of dirs) {
                const cx = this.hero.x + dx;
                const cy = this.hero.y + dy;
                if (this.mapState[cy] && this.mapState[cy][cx] === 6 && this.goblinAlive) {
                    this.goblinAlive = false;
                    this.mapState[cy][cx] = 0;
                    this.spawnParticles(cx, cy, '#ff4757', 25);
                    hit = true;
                    break;
                }
            }
            if (hit) {
                msg = '⚔️ Sentinela Orc derrotado com um golpe certeiro!';
            } else {
                msg = 'Golpe no ar (nenhum inimigo por perto).';
            }
        } else if (text.includes('desarmar')) {
            const dirs = [[0,0], [1,0], [-1,0], [0,1], [0,-1]];
            let disarmed = false;
            for (let [dx, dy] of dirs) {
                const cx = this.hero.x + dx;
                const cy = this.hero.y + dy;
                if (this.mapState[cy] && this.mapState[cy][cx] === 4) {
                    this.mapState[cy][cx] = 0;
                    this.spawnParticles(cx, cy, '#ffa502', 18);
                    window.gameAudio.playAction();
                    disarmed = true;
                    break;
                }
            }
            msg = disarmed ? '🛡️ Armadilha desarmada com sucesso!' : 'Nenhuma armadilha detectada.';
        } else if (text.includes('ativaraltar')) {
            this.altarActive = true;
            this.spawnParticles(this.hero.x, this.hero.y, '#fed330', 25);
            window.gameAudio.playAction();
            msg = '✨ Altar místico ativado!';
        } else if (text.includes('purificar')) {
            let foundChamber = false;
            const dirs = [[0,0], [1,0], [-1,0], [0,1], [0,-1]];
            for (let [dx, dy] of dirs) {
                const cx = this.hero.x + dx;
                const cy = this.hero.y + dy;
                if (this.mapState[cy] && this.mapState[cy][cx] === 8) {
                    this.mapState[cy][cx] = 0;
                    foundChamber = true;
                    break;
                }
            }
            this.spawnParticles(this.hero.x, this.hero.y, '#a55eea', 25);
            window.gameAudio.playAction();
            msg = foundChamber ? '🔮 Câmara Elemental purificada com ritual arcano!' : '🔮 Ritual de purificação executado!';
        }

        return { success, msg };
    }

    async runCode(code, onStep, onFinish) {
        if (this.running) return;
        this.running = true;
        this.onStepCallback = onStep;
        this.onFinishCallback = onFinish;

        const commands = this.parseStudentCode(code);
        let errorOccurred = false;
        let errorMessage = '';

        for (let i = 0; i < commands.length; i++) {
            if (!this.running) break;
            const cmd = commands[i];

            if (this.onStepCallback) {
                this.onStepCallback(cmd.line, cmd.raw);
            }

            const res = this.executeAction(cmd);
            if (!res.success) {
                errorOccurred = true;
                errorMessage = res.msg;
                window.gameAudio.playError();
                break;
            }

            await new Promise(r => setTimeout(r, this.stepDelay));
        }

        this.running = false;
        this.hero.action = 'idle';

        const evalResult = this.evaluateLevelObjectives(code, errorOccurred, errorMessage);
        if (this.onFinishCallback) {
            this.onFinishCallback(evalResult);
        }
    }

    stop() {
        this.running = false;
    }

    evaluateLevelObjectives(code, errorOccurred, errorMessage) {
        if (errorOccurred) {
            return {
                sucesso: false,
                mensagem: errorMessage || 'O herói não conseguiu completar a rota.',
                atingidos: 0,
                total: this.currentLevel.objetivos.length
            };
        }

        const lvl = this.currentLevel;
        let atingidos = 0;

        let gemasRestantes = 0;
        let armadilhasRestantes = 0;
        this.mapState.forEach(row => row.forEach(c => { 
            if (c === 2) gemasRestantes++; 
            if (c === 4) armadilhasRestantes++;
        }));

        const noPortal = (this.hero.x === this.portalPos.x && this.hero.y === this.portalPos.y);

        if (lvl.id === 1) {
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[1].atingido = true; atingidos++; }
        } else if (lvl.id === 2) {
            if (!this.steppedOnTrap) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (gemasRestantes === 0) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 3) {
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[1].atingido = true; atingidos++; }
        } else if (lvl.id === 4) {
            if (armadilhasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (gemasRestantes === 0) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 5) {
            if (this.bridgeActive) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[1].atingido = true; atingidos++; }
        } else if (lvl.id === 6) {
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (!this.goblinAlive) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 7) {
            if (this.bridgeActive) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (gemasRestantes === 0) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 8) {
            if (!this.goblinAlive) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (gemasRestantes === 0) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (this.altarActive && noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 9) {
            if (this.bridgeActive) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (gemasRestantes === 0 && this.altarActive) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 10) {
            if (armadilhasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (!this.goblinAlive) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (gemasRestantes === 0 && this.altarActive && noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 11) {
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (this.altarActive && noPortal) { lvl.objetivos[1].atingido = true; atingidos++; }
        } else if (lvl.id === 12) {
            if (this.bridgeActive) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (!this.goblinAlive && armadilhasRestantes === 0) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (gemasRestantes === 0) { lvl.objetivos[2].atingido = true; atingidos++; }
            if (this.altarActive && noPortal) { lvl.objetivos[3].atingido = true; atingidos++; }
        } else if (lvl.id === 13) {
            const usouLoop = /repetir\s*\(/i.test(code) || /for\s+/i.test(code) || /\.\w+\s*\(\s*\d+\s*\)/.test(code);
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (usouLoop) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (this.bridgeActive && noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 14) {
            const usouLoop = /repetir\s*\(/i.test(code) || /for\s+/i.test(code) || /\.\w+\s*\(\s*\d+\s*\)/.test(code);
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (usouLoop) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (!this.goblinAlive && noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 15) {
            const usouLoop = /repetir\s*\(/i.test(code) || /for\s+/i.test(code) || /\.\w+\s*\(\s*\d+\s*\)/.test(code);
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (usouLoop) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 16) {
            const usouLoop = /repetir\s*\(/i.test(code) || /for\s+/i.test(code) || /\.\w+\s*\(\s*\d+\s*\)/.test(code);
            if (armadilhasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (gemasRestantes === 0) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (usouLoop) { lvl.objetivos[2].atingido = true; atingidos++; }
            if (noPortal) { lvl.objetivos[3].atingido = true; atingidos++; }
        } else if (lvl.id === 17) {
            const usouFuncao = /(?:funcao|function|def)\s+[a-zA-Z0-9_]+/i.test(code);
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (usouFuncao) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (this.altarActive && noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 18) {
            const usouFuncao = /(?:funcao|function|def)\s+[a-zA-Z0-9_]+/i.test(code);
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (usouFuncao) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (this.altarActive && noPortal) { lvl.objetivos[2].atingido = true; atingidos++; }
        } else if (lvl.id === 19) {
            const usouFuncao = /(?:funcao|function|def)\s+[a-zA-Z0-9_]+/i.test(code);
            if (!this.goblinAlive) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (gemasRestantes === 0) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (usouFuncao) { lvl.objetivos[2].atingido = true; atingidos++; }
            if (this.altarActive && noPortal) { lvl.objetivos[3].atingido = true; atingidos++; }
        } else if (lvl.id === 20) {
            const usouFuncao = /(?:funcao|function|def)\s+[a-zA-Z0-9_]+/i.test(code);
            if (gemasRestantes === 0) { lvl.objetivos[0].atingido = true; atingidos++; }
            if (usouFuncao) { lvl.objetivos[1].atingido = true; atingidos++; }
            if (!this.goblinAlive) { lvl.objetivos[2].atingido = true; atingidos++; }
            if (this.altarActive && noPortal) { lvl.objetivos[3].atingido = true; atingidos++; }
        }

        const passou = atingidos >= lvl.objetivos.length;
        if (passou) {
            window.gameAudio.playVictory();
        } else {
            window.gameAudio.playError();
        }

        return {
            sucesso: passou,
            mensagem: passou ? '🎉 Fase concluída com sucesso!' : 'Revise seus comandos para cumprir todos os objetivos.',
            atingidos,
            total: lvl.objetivos.length
        };
    }
}

window.DungeonEngine = DungeonEngine;
