/*
* @Author = Francisco Barretto
* @email = icon@ufba.br
* @brief = Simple ICON frontpage interaction

* @Ported to P5JS by Eduardo Monteiro
*/

import { useEffect, useRef } from 'react';

export const useP5Background = () => {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    if (p5InstanceRef.current) {
      return;
    }

    if (window.p5) {
      initP5();
      return;
    }

    if (!scriptRef.current) {
      scriptRef.current = document.createElement('script');
      scriptRef.current.src =
        'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
      scriptRef.current.onload = () => {
        const checkP5 = () => {
          if (window.p5) {
            initP5();
          } else {
            setTimeout(checkP5, 100);
          }
        };
        checkP5();
      };
      document.head.appendChild(scriptRef.current);
    }

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  const initP5 = () => {
    if (p5InstanceRef.current) {
      return;
    }

    let MAX_UNITS;
    let units = [];

    const sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(
          canvasRef.current.offsetWidth,
          canvasRef.current.offsetHeight,
          p.WEBGL,
        );
        canvas.parent(canvasRef.current);

        p.strokeWeight(1);
        p.stroke(100);
        p.noFill();
        p.frameRate(30);
        p.background(27, 22, 20);
      };

      p.draw = () => {
        MAX_UNITS = p.width / 10;

        p.fill(27, 22, 20, 65);
        // p.rect(-1, -1, p.width + 1, p.height + 1);
        p.noStroke();
        p.rect(-p.width / 2 - 1, -p.height / 2 - 1, p.width + 1, p.height + 1);
        p.stroke(100);

        updateUnits();
        renderUnits();
      };

      p.windowResized = () => {
        p.resizeCanvas(
          canvasRef.current.offsetWidth,
          canvasRef.current.offsetHeight,
        );
      };

      function updateUnits() {
        let mouse = p.createVector(
          p.mouseX - p.width / 2,
          p.mouseY - p.height / 2,
        );

        for (let i = units.length - 1; i >= 0; i--) {
          if (units[i].update(mouse)) {
            units.splice(i, 1);
          }
        }

        while (units.length < MAX_UNITS && p.random(1) < 0.8) {
          units.push(new Unit());
        }
      }

      function renderUnits() {
        for (let i = 0; i < units.length; i++) {
          let u1 = units[i];
          for (let j = 0; j < units.length; j++) {
            let u2 = units[j];
            let d = p.dist(u1.pos.x, u1.pos.y, u2.pos.x, u2.pos.y);
            if (d > 80 && d < 150) {
              p.line(u1.pos.x, u1.pos.y, u2.pos.x, u2.pos.y);
            }
          }
        }
      }

      class Unit {
        constructor() {
          this.pos = p.createVector(
            p.random(-p.width / 2, p.width / 2),
            p.random(-p.height / 2, p.height / 2),
          );
          this.speed = p.createVector(0, p.random(1) + 0.5);
          this.xoff = p.random(10);
          this.yoff = p.random(10);
        }

        update(mouse) {
          this.pos.x += p.noise(this.xoff) * 2 - 1;
          this.pos.y += p.noise(this.yoff) * 2 - 1;

          this.xoff += 0.01;
          this.yoff += 0.01;

          let diff = p.constructor.Vector.sub(this.pos.copy(), mouse);
          if (diff.mag() < p.width / 10.0) {
            let displace = p.constructor.Vector.fromAngle(diff.heading());
            displace.mult(p.width / 200.0);
            this.pos.add(displace);
          }

          return (
            this.pos.y > p.height / 2 + 1 ||
            this.pos.y < -p.height / 2 - 1 ||
            this.pos.x < -p.width / 2 - 1 ||
            this.pos.x > p.width / 2 + 1
          );
        }

        render() {
          p.point(this.pos.x, this.pos.y);
        }
      }
    };

    p5InstanceRef.current = new window.p5(sketch);
  };

  return canvasRef;
};
