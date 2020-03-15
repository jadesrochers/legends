/** @jsx jsx */
import * as R from 'ramda';
import { jsx } from '@emotion/core'
import { TickDumbSet, BarRects } from '@jadesrochers/histograminteract';
import { format } from 'd3-format'

const roundtenth = (n) => Math.round(n*10)/10

const pickformatter = (data) => {
  const max = Math.abs(R.reduce(R.max, 0, R.values(data)))
  let formatter 
  if(max >= 10000){
   formatter = format('.3s')
  }else if(max >= 1000){
   formatter = format('.3s')
  }else{
   formatter = format('.3~r')
  }
  return formatter
}

// Takes ticknum as number of ticks for non-quantile scales
// The datadisplay argument is the d3-scale function
// svgwidth arg is the width of the svg grid
// elemwidth is the width of the svg element
const BarScale = (props) => {
  if(! props.data || ! props.datadisplay ){ return null }
  const ticks = props.ticknum ? props.ticknum : 5
  let thresholds
  if(typeof props.datadisplay.quantiles === "function"){
    thresholds = props.datadisplay.quantiles()
  }else if(typeof props.datadisplay.nice === "function"){
    thresholds = props.datadisplay.nice().ticks(ticks)
  }
  // Intention here was to make barscale adapt to a variety of scales
  /* let thresholds = props.datadisplay.quantiles() || props.datadisplay.thresholds() || props.datadisplay.ticks() */
  let formatter = props.formatter ? props.formatter : pickformatter(props.data)
  let dispwidth = props.svgwidth ? (props.svgwidth) : 400
  let totalwidth = props.svgwidth ? (props.svgwidth + 40) : 440
  const elemwidth = props.elemwidth ? props.elemwidth : '75%' 

  let tickmarks = R.pipe(
    R.append(Math.max(...props.datadisplay.domain())),
    R.prepend(Math.min(...props.datadisplay.domain())),
    R.uniq,
  )(thresholds)

  const fillarr = R.zipWith((x,x2) => (props.datadisplay((x+x2)/2)))(R.init(tickmarks), R.drop(1, tickmarks))
  const width = roundtenth( dispwidth/tickmarks.length )
  const height = roundtenth( width/5 )
  const barheight = props.barheight ? props.barheight : (dispwidth/8)

  return (
    <svg viewBox={`0 0 ${totalwidth} ${barheight}`} width={elemwidth}
      css={[props.cssStyles ? props.cssStyles : undefined ] }  >
    <g >

     useMemo(() => (
        <BarRects fill={fillarr} 
          height={height} 
          width={width}
        />

        <TickDumbSet 
          width={width}
          format={formatter}
          ticks={tickmarks}
          line={{ y2: (height + 2) }}
          text={{ style: {textAnchor: 'middle'},
            y: (height + 4),
            dy: '0.7em' }}
        />
       )
     ),[props.data])
     </g>
    </svg>
  )
}



export { BarScale }
