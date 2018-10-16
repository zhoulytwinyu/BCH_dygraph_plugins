/**
 * @license
 * Copyright 2018 Lingyu Zhou (zhouly@bu.edu, zhoulytwin@gmail.com)
 * GNU Lesser General Public License v3.0
 */

/*global Dygraph:false */
Dygraph.Plugins.RSTLegend = (function() {
  "use strict";

  /**
   * Creates the RST legend in the given div
   * Options: data.
   * - data format: [{'RST',*RSVs,'ECMO_Score'} ...]
   * @constructor
   */
  var rstlegend = function(options) {
    console.log({rstlegend:options});
    // Get options
    this.divId_ = options.divId;
    this.buttonDivId_ = options.buttonDivId;
    this.data_ = options.data || [];
    // Other variables
    this.show_=true;
    this.button_ = document.createElement("input");
    this.div_ = document.createElement("div");
    // Styling
    this.div_.style.fontSize="12px";
    this.div_.style.overflow="hidden";
    this.div_.style.opacity = 1;
    this.div_.style.transition = "opacity 0.5s";
    this.button_.type="image";
    this.button_.alt="rstlegend";
    this.button_.style.width="30px";
    this.button_.src="data:image/png;base64,"+
`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
`; 
  };

  /**
   * Removes DOM & clear variables
   */
  //TODO
  rstlegend.prototype.destroy = function() {
    this.divId_ = null;
    this.data_ = null;
    this.div_.remove();
    this.div_ = null;
  };

  /**
   * Class variables
   */
  rstlegend.prototype.RSVToDisplay = {
    "RA":[],
    "NC":["NC_Flow","FiO2","iNO_Set"],
    "MASK":["MASK_Flow","FiO2"],
    "BB":["NC_Flow","FiO2"],
    "HFNC":["HFNC_Flow","FiO2","iNO_Set"],
    "CPAP":["CPAP_PEEP_comb","FiO2"],
    "BIPAP":["BIPAP_IPAP","BIPAP_EPAP","BIPAP_Rate","FiO2"],
    "PSV":["PEEP","PS","FiO2","iNO_Set","duration"],
    "PCV":["VT_set_norm","PIP_comb","PEEP","PS","VR","FiO2","iNO_Set","duration"],
    "VCV":["VT_set_norm","PEEP","PS","VR","FiO2","iNO_Set"],
    "HFOV":["HFOV_MPAW","HFOV_Amplitude","HFOV_Frequency","FiO2","iNO_Set"],
    "HFJV":["FiO2","HFJV_PEEP","HFJV_PIP","HFJV_Rate","iNO_Set"],
    "ECMO":["ECMO_Flow_norm"]
  };

  rstlegend.prototype.RSVDisplayFormat = {
    FiO2: (x,self=null) => x ? `<p style="margin:0px"> <b>FiO2</b> <span class="pull-right">${x}</span> </p>` : "",
    NC_Flow: (x,self=null) => x ? `<p style="margin:0px"> <b>&#8203;</b> <span class="pull-right">${x} LPM</span> </p>` : "",
    HFNC_Flow: (x,self=null) => x ? `<p style="margin:0px"> <b>&#8203;</b> <span class="pull-right">${x} LPM</span> </p>` : "",
    CPAP_PEEP_comb: (x,self=null) => x ? `<p style="margin:0px"> <b>CPAP</b> <span class="pull-right">${x}</span> </p>` : "",
    BIPAP_EPAP: (x,self=null) => x ? `<p style="margin:0px"> <b>CPAP</b> <span class="pull-right">${x}</span> </p>` : "",
    BIPAP_IPAP: (x,self=null) => x ? `<p style="margin:0px"> <b>IPAP</b> <span class="pull-right">${x}</span> </p>` : "",
    BIPAP_Rate: (x,self=null) => x ? `<p style="margin:0px"> <b>Rate</b> <span class="pull-right">${x}</span> </p>` : "",
    PEEP: (x,self=null) => x ? `<p style="margin:0px"> <b>PEEP</b> <span class="pull-right">${x}</span> </p>` : "",
    PIP_comb: (x,self=null) => x ? `<p style="margin:0px"> <b>PIP</b> <span class="pull-right">${x}</span> </p>` : "",
    PS: (x,self=null) => x ? `<p style="margin:0px"> <b>PS</b> <span class="pull-right">${x}</span> </p>` : "",
    VR: (x,self=null) => x ? `<p style="margin:0px"> <b>Rate</b> <span class="pull-right">${x}</span> </p>` : "",
    VT_set_norm: (x,self=null) => x ? `<p style="margin:0px"> <b>Tv</b> <span class="pull-right">${x} mL/kg</span> </p>` : "",
    HFJV_PEEP: (x,self=null) => x ? `<p style="margin:0px"> <b>HFJV PEEP</b> <span class="pull-right">${x}</span> </p>` : "",
    HFJV_PIP: (x,self=null) => x ? `<p style="margin:0px"> <b>HFJV PIP</b> <span class="pull-right">${x}</span> </p>` : "",
    HFJV_Rate: (x,self=null) => x ? `<p style="margin:0px"> <b>HFJV Rate</b> <span class="pull-right">${x}</span> </p>` : "",
    HFOV_Amplitude: (x,self=null) => x ? `<p style="margin:0px"> <b>Amplitude</b> <span class="pull-right">${x}</span> </p>` : "",
    HFOV_Frequency: (x,self=null) => x ? `<p style="margin:0px"> <b>Frequency</b> <span class="pull-right">${x} Hz</span> </p>` : "",
    HFOV_MPAW: (x,self=null) => x ? `<p style="margin:0px"> <b>MAP</b> <span class="pull-right">${x}</span> </p>` : "",
    ECMO_Flow_norm: (x,self=null) => x ? `<p style="margin:0px"> <b>ECMO Flow</b> <span class="pull-right">${x}</span> </p>` : "",
    MASK_Flow: (x,self=null) => x ? `<p style="margin:0px"> <b>&#8203;</b> <span class="pull-right">${x} LPM</span> </p>` : "",
    iNO_Set: (x,self=null) => x ? `<p style="margin:0px"> <b>iNO</b> <span class="pull-right">${x} PPM</span> </p>` : "",
    duration: (x,self) => (x && self) ? `<p style="margin:0px"> <b>Duration</b> <span class="pull-right">${self.prettyInterval(1000)}</span> </p>` : "",
  };

  rstlegend.prototype.RSTTitleFormat = function(record, date_obj){
    let ret = null;
    let sign = `<span class="glyphicon glyphicon-exclamation-sign" style="color:red" aria-hidden="true"></span>`;
    let ECMO_Flow_line = record.ECMO_Flow_norm ?
      `
      <p>${sign}ECMO Flow<span class="pull-right">${record.ECMO_Flow_norm}</span></p>
      ` : "";
    switch(record.RST) {
      case "RA":
      case "NC":
      case "MASK":
      case "BB":
        ret = `
          <div style="border-radius:3px; font-size:14px; background-color: ${this.boston_meadow};">
            <p style="padding:0px;margin:0px;"><b>${record.RST}</b> <span class="pull-right" style="font-size:10px">${date_obj.toLocaleString()}</span></p>
            ${ECMO_Flow_line}
          </div>`;
        break;
      case "HFNC":
      case "CPAP":
      case "BIPAP":
        ret = `
          <div style="border-radius:3px; font-size:14px; background-color: ${this.boston_sky};">
            <p style="padding:0px;margin:0px;"><b>${record.RST}</b> <span class="pull-right" style="font-size:10px">${date_obj.toLocaleString()}</span></p>
            ${ECMO_Flow_line}
          </div>`;
        break;
      case "PSV":
      case "PCV":
      case "VCV":
        ret = `
          <div style="border-radius:3px; font-size:14px; background-color: ${this.boston_morning};">
            <p style="padding:0px;margin:0px;"><b>${record.RST}</b> <span class="pull-right" style="font-size:10px">${date_obj.toLocaleString()}</span></p>
            ${ECMO_Flow_line}
          </div>`;
        break;
      case "HFOV":
      case "HFJV":
        ret = `
          <div style="border-radius:3px; font-size:14px; background-color: ${this.boston_pink};">
            <p style="padding:0px;margin:0px;"><b>${record.RST}</b> <span class="pull-right" style="font-size:10px">${date_obj.toLocaleString()}</span></p>
            ${ECMO_Flow_line}
          </div>`;
        break;
      case "ECMO":
        ret = `
          <div style="border-radius:3px; font-size:14px; background-color: ${this.boston_red};">
            <p style="padding:0px;margin:0px;"><b>${record.RST}</b> <span class="pull-right" style="font-size:10px">${date_obj.toLocaleString()}</span></p>
         </div>`;
        break;
      default:
        // Not supposed to reach here.
        break;
    }
    return ret;
  };

  rstlegend.prototype.boston_meadow="#A4D65E";
  rstlegend.prototype.boston_sky="#41B6E6";
  rstlegend.prototype.boston_morning="#FBDB65";
  rstlegend.prototype.boston_pink="#C6579A";
  rstlegend.prototype.boston_red="#F6323E";
  
  rstlegend.prototype.toString = function() {
    return "RSTLegend Plugin";
  };

  rstlegend.prototype.select = function(e) {
    let idx = e.dygraph.selPoints_[0].idx;
    let content = "";

    // Title
    let record=this.data_[idx];
    let rst = record["RST"];
    let time = new Date(record["time"]*1000);
    content += this.RSTTitleFormat(record,time);
    
    // Individual RSV scores
    let self=this;
    this.RSVToDisplay[rst].forEach(function(rsv){
      content+=self.RSVDisplayFormat[rsv](self.data_[idx][rsv],self);
    });
    // Write to div
    this.div_.innerHTML=content;
    this.div_.style.display="block";
  };
  
  rstlegend.prototype.deselect = function(e) {
    this.div_.innerHTML="";
    this.div_.style.display="none";
  };

  rstlegend.prototype.activateCustomEventHandler = function() {
    let self = this;
    this.button_.addEventListener("click",function(ev){
      if (self.show_){
        self.show_ = false;
        self.button_.style.opacity = 0.2;
        self.div_.style.height = "0px";
        self.div_.style.opacity = 0;
      }
      else {
        self.show_ = true;
        self.button_.style.opacity=1;
        self.div_.style.height="";
        self.div_.style.opacity = 1;
      }
    });
  };
  
  /**
   * @param {Dygraph} g Graph instance.
   * @return {object.<string, function(ev)>} Mapping of event names to callbacks.
   */
  rstlegend.prototype.activate = function(g) {
    let parentDiv = document.getElementById(this.divId_);
    if (!parentDiv){
      return null;
    }
    parentDiv.appendChild(this.div_);
    // Add button
    let buttonParentDiv = document.getElementById(this.buttonDivId_);
    if (buttonParentDiv) {
      buttonParentDiv.appendChild(this.button_);
    }
    this.activateCustomEventHandler();
    return {
      select: this.select,
      deselect: this.deselect
    };
  };


  rstlegend.prototype.interval_units = [ ["year",365*24*60*60],
                                        ["month",30*24*60*60],
                                        ["day",24*60*60],
                                        ["hour",60*60],
                                        ["min",60],
                                        ["sec",1]
                                        ];
  rstlegend.prototype.prettyInterval = function(unix_sec,precision=2){
    let output = "0 sec";
    let prepend = '';
    let tmpSec = unix_sec;
    if (tmpSec<0){
      tmpSec = -tmpSec;
      prepend = '-';
    }
    
    for (let i=0,p=precision; i<this.interval_units.length; i++){
      let unit = this.interval_units[i][0];
      let value = this.interval_units[i][1];
      let num = Math.floor(tmpSec/value);
      if (p==precision && num==0){
        continue;
      }
      else if (p == precision){
        output=num+" "+unit;
        tmpSec-=num*value;
        p-=1;
      }
      else {
        output+=","+num+" "+unit;
        tmpSec-=num*value;
        p-=1;
      }
      if (p==0){
        break;
      }
    }
    return prepend+output;
  };

  return rstlegend;
})();
