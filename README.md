# BCH_dygraph_plugins
Highly customized and targeted dygraphs.js plugins developed for BCH. Runs with dygraphs v1.1.1 in R Shiny

Under construction.

##Basic usage:
1. Source the R file, e.g. `source("BCH_dygraph_plugins/rstlegend.r")`
2. Apply respective function on a dygraph:
  `dygraph_obj %>% dyRSTLegend(data)`

## rstlegend
* R source: rstlegend.r
* R function: dyRSTLegend
* Arguments:
  * divid: id of a html container, e.g. `#rst_info` for `<div id="rst_info"> </div>`.
  * data: a R data.frame containing RSV columns, a "Score" column a "time" column.
  * Optional arguments: (TODO)
![rstlegend_screenshot](rstlegend.png)

## timediff
* R source: timediff.r
* R function: dyTimediff
* Arguments:
  * data: a R data.frame with columns: "label" and "time".
  * Optional arguments: (TODO)
![timediff_screenshot](timediff.png)

## locations (banner)
* R source: locations.r
* R function: dyLocations
* Arguments:
  * data: a R data.frame with columns: "label", "start" and "end".
  * Optional arguments: (TODO)
![locations_screenshot](locations.png)
