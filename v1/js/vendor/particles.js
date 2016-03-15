/*
 Copyright (c) 2015 by GreenSock (http://codepen.io/GreenSock/pen/zrmiG)
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 Modified by Kevin Yao 2/21/2015
 */
var Particles = function (container) {
  this.speed = 1;
  this.start = function () {
    var width = document.getElementsByTagName(container)[0].offsetWidth;
    var winHeight = window.innerHeight;
    return {
      yMin: winHeight + 50,
      yMax: winHeight + 50,
      xMin: width/6,
      xMax: width/4,
      opacityMin: 0.2,
      opacityMax: 0.4
    }
  };
  this.mid = function () {
    var width = document.getElementsByTagName(container)[0].offsetWidth;
    var winHeight = window.innerHeight;
    return {
      yMin: winHeight * 0.3,
      yMax: winHeight * 0.5,
      xMin: width/4,
      xMax: width/2,
      opacityMin: 0.4,
      opacityMax: 1
    }
  };
  this.end = function () {
    var width = document.getElementsByTagName(container)[0].offsetWidth;
    return {
      yMin: -180,
      yMax: -180,
      xMin: width/4,
      xMax: width,
      opacityMin: 0.2,
      opacityMax: 0.7
    }
  };
};

Particles.prototype = {
  range: function (map, prop) {
    var min = map()[prop + "Min"],
      max = map()[prop + "Max"];
    return min + (max - min) * Math.random();
  },

  spawn: function (particle) {
    var wholeDuration = (10 / this.speed) * (0.7 + Math.random() * 0.4),
      delay = wholeDuration * Math.random(),
      partialDuration = (wholeDuration + 1) * (0.3 + Math.random() * 0.4);

    //set the starting values
    TweenLite.set(particle, {
      y: this.range(this.start, "y"),
      x: this.range(this.start, "x"),
      opacity: this.range(this.start, "opacity"),
      visibility: "hidden",
      color: "#ffffff",
      scale: Math.random() + 1
    });

    //the y tween should be continuous and smooth the whole duration
    TweenLite.to(particle, wholeDuration, {delay: delay, y: this.range(this.end, "y"), ease: Linear.easeNone});

    //now tween the x independently so that it looks more randomized (rather than linking it with scale/opacity changes too)
    TweenLite.to(particle, partialDuration, {delay: delay, x: this.range(this.mid, "x"), ease: Power1.easeOut});
    TweenLite.to(particle, wholeDuration - partialDuration, {
      delay: partialDuration + delay,
      x: this.range(this.end, "x"),
      ease: Power1.easeIn
    });

    //now create some random opacity changes
    partialDuration = wholeDuration * (0.5 + Math.random() * 0.3);
    var that = this;
    TweenLite.to(particle, partialDuration, {
      delay: delay,
      autoAlpha: this.range(this.mid, "opacity"),
      ease: Linear.easeNone
    });
    TweenLite.to(particle, wholeDuration - partialDuration, {
      delay: partialDuration + delay,
      autoAlpha: this.range(this.end, "opacity"),
      ease: Linear.easeNone,
      onComplete: function () {
        that.spawn(particle)
      }
    });
  }
};