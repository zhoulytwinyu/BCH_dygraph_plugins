/**
 * @license
 * Copyright 2018 Lingyu Zhou (zhouly@bu.edu, zhoulytwin@gmail.com)
 * GNU Lesser General Public License v3.0
 */

/*global Dygraph:false */
Dygraph.Plugins.UtilDiv = (function() {
  "use strict";

  /**
   * Create divs on upper, right, and hover position with specified ids.
   * The divs, if specified, will show when mouse hovers on the graph.
   * Options: upper, right, hover
   * - option format: id of div to be created, with no "#" prepended
   * @constructor
   */
  var utildiv = function(options) {
    console.log({utildiv:options});
    // Get options
    this.upper_ = (options.upper ) ? document.createElement("div") : null;
    this.right_ = (options.right ) ? document.createElement("div") : null;
    this.hover_ = (options.hover ) ? document.createElement("div") : null;
    // Other variables
    this.g = null;
    this.divOpacity_ = 0;
    this.shownDivs_ = [];
    this.animation_ = null;
    // Styling
    if (this.upper_ !== null) {
      this.shownDivs_.push(this.upper_);
      this.upper_.id=options.upper;
      this.upper_.style.height="30px";
      this.upper_.style.position="absolute";
      this.upper_.style.zIndex=999;
      this.upper_.style.top="-30px";
      this.upper_.style.backgroundColor=this.divBG;
      this.upper_.style.borderTopLeftRadius="2px";
      this.upper_.style.borderTopRightRadius="2px";
      this.upper_.style.visibility="hidden";
      this.upper_.style.opacity=0;
    }
    if (this.right_ !== null) {
      this.shownDivs_.push(this.right_);
      this.right_.id=options.right;
      this.right_.style.width="30px";
      this.right_.style.position="absolute";
      this.right_.style.zIndex=999;
      this.right_.style.backgroundColor=this.divBG;
      this.right_.style.borderTopRightRadius="2px";
      this.right_.style.borderBottomRightRadius="2px";
      this.right_.style.visibility="hidden";
      this.right_.style.opacity=0;
    }
    if (this.hover_ !== null) {
      this.shownDivs_.push(this.hover_);
      this.hover_.id=options.hover;
      this.hover_.style.cursor="default";
      this.hover_.style.width="150px";
      this.hover_.style.overflow="hidden";
      this.hover_.style.position="fixed";
      this.hover_.style.zIndex=999;
      this.hover_.style.backgroundColor=this.divBG;
      this.hover_.style.borderRadius="5px";
      this.hover_.style.visibility="hidden";
      this.hover_.style.opacity=0;
    }
  };
  utildiv.prototype.divBG = "#C5B9AC"; //boston_warm_gray
  utildiv.prototype.maxOpacity = 0.8;
  
  /**
   * Removes DOM, clear variables
   */
  utildiv.prototype.destroy = function (){
    if (this.upper_)
      this.upper_.remove();
    if (this.right_)
      this.right_.remove();
    if (this.hover_)
      this.hover_.remove();
    this.upper_ = null;
    this.right_ = null;
    this.hover_ = null;
    this.g = null;
    this.divOpacity_ = null;
    this.shownDivs_ = null;
    this.animation_ = null;
  };
  
  /**
   * For debug
   */
  utildiv.prototype.toString = function() {
    return "UtilDiv Plugin";
  };
  
  /**
   * Show divs on mouseover
   */
  utildiv.prototype.mouseover = function(ev) {
    let self=this;
    this.shownDivs_.forEach(function(div) {
      div.style.transition = "visibility 0s, opacity 0.3s";
      div.style.visibility = "visible";
      div.style.opacity = self.maxOpacity;
    });
  };
  
  /**
   * Hide divs on mouseout
   */
  utildiv.prototype.mouseout = function(ev) {
    this.shownDivs_.forEach(function(div) {
      div.style.transition = "visibility 0s linear 1s, opacity 0.3s";
      div.style.visibility = "hidden";
      div.style.opacity = 0;
    });
  };

  /**
   * Update hover div position on mousemove
   */
  utildiv.prototype.mousemove = function(ev) {
    if (this.hover_){
      let x = ev.clientX+10;
      if (x+this.hover_.clientWidth > window.innerWidth) {
        x = x-this.hover_.clientWidth-20;
      }
      let y = ev.clientY-100;
      this.hover_.style.top=y+"px";
      this.hover_.style.left=x+"px";
    }
  };
  
  /**
   * Add listener for custom events
   */
  utildiv.prototype.activateCustomEventHandler = function(){
    let self = this;
    if (this.shownDivs_.length !== 0) {
      this.g.graphDiv.addEventListener("mouseover", function(ev){
        self.mouseover(ev);
      });
      this.g.graphDiv.addEventListener("mouseout", function(ev){
        self.mouseout(ev);
      });
    }
    if (this.hover_) {
      this.g.graphDiv.addEventListener("mousemove", function(ev){
        self.mousemove(ev);
      });
    }
  };

  /**
   * We have to adjust the right div position when chart is redrawn
   * (e.g. upon resize)
   */
  utildiv.prototype.didDrawChart = function(e){
    if (this.right_) {
      this.right_.style.left=this.g.width_+"px";
    }
  }

  /**
   * @param {Dygraph} g Graph instance.
   * @return {object.<string, function(ev)>} Mapping of event names to callbacks.
   */
  utildiv.prototype.activate = function(g) {
    this.g=g;
    this.shownDivs_.forEach(function(div){
      g.graphDiv.appendChild(div);
    });
    this.activateCustomEventHandler();
    return {
      didDrawChart: this.didDrawChart
    };
  };

  return utildiv;
})();
