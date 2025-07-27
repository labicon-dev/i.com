/*
* @Author = Francisco Barretto
* @email = icon@ufba.br
* @brief = Simple ICON frontpage interaction

* @Ported to P5JS by Eduardo Monteiro
*/

function sketch(p5) {
  let MAX_UNITS;
  let units = [];
  let w, h;

  p5.updateWithProps = (props) => {
    w = props.width;
    h = props.height;
  };

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL);
    p5.strokeWeight(1);
    p5.stroke(100);
    p5.noFill();

    p5.frameRate(30);
    // p5.background(27, 22, 20);
    p5.background(255, 0, 0);
  };

  p5.draw = () => {
    MAX_UNITS = w / 10;

    p5.fill(27, 22, 20, 50);

    p5.rect(-1, -1, w + 1, h + 1);

    updateUnits();
    renderUnits();
  };

  function updateUnits() {
    let mouse = p5.createVector(p5.mouseX, p5.mouseY);

    for (let i = units.length - 1; i >= 0; i--) {
      if (units[i].update(mouse)) {
        units.splice(i, 1);
      }
    }

    while (units.length < MAX_UNITS && p5.random(1) < 0.8) {
      units.push(new Unit());
    }
  }

  function renderUnits() {
    for (let i = 0; i < units.length; i++) {
      let u1 = units[i];
      for (let j = 0; j < units.length; j++) {
        let u2 = units[j];
        let d = p5.dist(u1.pos.x, u1.pos.y, u2.pos.x, u2.pos.y);
        if (d > 80 && d < 150) {
          p5.line(u1.pos.x, u1.pos.y, u2.pos.x, u2.pos.y);
        }
      }
    }
  }

  class Unit {
    constructor() {
      this.pos = p5.createVector(p5.random(0, w), p5.random(0, h));
      this.speed = p5.createVector(0, p5.random(1) + 0.5);
      this.xoff = p5.random(10);
      this.yoff = p5.random(10);
    }

    update(mouse) {
      this.pos.x += p5.noise(this.xoff) * 2 - 1;
      this.pos.y += p5.noise(this.yoff) * 2 - 1;

      this.xoff += 0.01;
      this.yoff += 0.01;

      let diff = p5.constructor.Vector.sub(this.pos.copy(), mouse);
      if (diff.mag() < w / 10.0) {
        let displace = p5.constructor.Vector.fromAngle(diff.heading());
        displace.mult(w / 200.0);
        this.pos.add(displace);
      }

      return (
        this.pos.y > h + 1 ||
        this.pos.y < -1 ||
        this.pos.x < -1 ||
        this.pos.x > w + 1
      );
    }

    render() {
      p5.point(this.pos.x, this.pos.y);
    }
  }
}

export default sketch;
