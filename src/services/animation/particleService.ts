// ================================
// src/services/animation/particleService.ts
// ================================

'use client';

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life?: number;
  maxLife?: number;
}

export interface ParticleSystemConfig {
  particleCount: number;
  colors: string[];
  minSize: number;
  maxSize: number;
  speed: number;
  opacity: number;
  enableMouse: boolean;
  mouseRadius: number;
}

export class ParticleService {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private mousePosition = { x: 0, y: 0 };
  private config: ParticleSystemConfig;

  constructor(config: Partial<ParticleSystemConfig> = {}) {
    this.config = {
      particleCount: 50,
      colors: ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981'],
      minSize: 1,
      maxSize: 3,
      speed: 0.5,
      opacity: 0.6,
      enableMouse: true,
      mouseRadius: 100,
      ...config
    };
  }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    if (!this.ctx) {
      throw new Error('Unable to get canvas context');
    }

    this.setupCanvas();
    this.createParticles();
    this.setupMouseTracking();
    this.animate();
  }

  private setupCanvas(): void {
    if (!this.canvas) return;
    
    const updateCanvasSize = () => {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
  }

  private createParticles(): void {
    this.particles = [];
    
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        id: `particle-${i}`,
        x: Math.random() * (this.canvas?.width || window.innerWidth),
        y: Math.random() * (this.canvas?.height || window.innerHeight),
        vx: (Math.random() - 0.5) * this.config.speed,
        vy: (Math.random() - 0.5) * this.config.speed,
        size: Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize,
        opacity: Math.random() * this.config.opacity,
        color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)]
      });
    }
  }

  private setupMouseTracking(): void {
    if (!this.config.enableMouse) return;

    const handleMouseMove = (event: MouseEvent) => {
      this.mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
  }

  private updateParticles(): void {
    if (!this.canvas) return;

    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Mouse interaction
      if (this.config.enableMouse) {
        const dx = this.mousePosition.x - particle.x;
        const dy = this.mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.mouseRadius) {
          const force = (this.config.mouseRadius - distance) / this.config.mouseRadius;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }
      }

      // Boundary collision
      if (!this.canvas) return; // Early return if canvas is null
      
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      }
      
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      }

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
    });
  }

  private drawParticles(): void {
    if (!this.ctx || !this.canvas) return;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw particles
    this.particles.forEach(particle => {
      if (!this.ctx) return;
      
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw connections
    this.drawConnections();
  }

  private drawConnections(): void {
    if (!this.ctx) return;

    this.particles.forEach((particleA, i) => {
      this.particles.slice(i + 1).forEach(particleB => {
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          if (!this.ctx) return;
          this.ctx.save();
          this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
          this.ctx.strokeStyle = '#06b6d4';
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(particleA.x, particleA.y);
          this.ctx.lineTo(particleB.x, particleB.y);
          this.ctx.stroke();
          this.ctx.restore();
        }
      });
    });
  }

  private animate = (): void => {
    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(this.animate);
  };

  updateConfig(newConfig: Partial<ParticleSystemConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.createParticles(); // Recreate particles with new config
  }

  destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.setupCanvas);
    window.removeEventListener('mousemove', this.setupMouseTracking);
  }

  resize(): void {
    this.setupCanvas();
  }
}