/** @jsx jsx */
import * as R from 'ramda';
import { jsx } from '@emotion/core'
import { TickDumbSet, BarRects } from '@jadesrochers/histograminteract';
import { roundtenth, pickformatter } from '@jadesrochers/reacthelpers'

const BarScale = (props) => {
  if(! props.data || ! props.datadisplay ){ return null }
  let thresholds
  if(typeof props.datadisplay.quantiles === "function"){
    thresholds = props.datadisplay.quantiles()
  }else{
    return null
  }
  // Intention here was to make barscale adapt to a variety of scales
  /* let thresholds = props.datadisplay.quantiles() || props.datadisplay.thresholds() || props.datadisplay.ticks() */
  let formatter = props.formatter ? props.formatter : pickformatter(props.data)
  let totalwidth = props.maxwidth ? props.maxwidth : 400

  let tickmarks = R.pipe(
    R.append(Math.max(...props.datadisplay.domain())),
    R.prepend(Math.min(...props.datadisplay.domain())),
    R.uniq,
  )(thresholds)

  let fillarr = R.zipWith((x,x2) => (props.datadisplay((x+x2)/2)))(R.init(tickmarks), R.drop(1, tickmarks))
  let width = roundtenth( totalwidth/tickmarks.length )
  let height = roundtenth( width/5 )

  return (
    <svg viewBox='0 0 440 20' 
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
