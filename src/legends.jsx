import React from 'react';
import * as R from 'ramda';
import { TickDumbSet, BarRects } from '@jadesrochers/histograminteract';
import { format } from 'd3-format'
import styles from "./legends.module.css"

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
// legsvgwidth arg is the width of the svg grid
// legsvgheight arg is height of the svg grid
// To configure size (height/width) of the svg element, no its internal grid
// use cssStyles argument.
const BarScale = (props) => {
    if(! props.data || ! props.datadisplay ){ return null }
    const ticks = props.ticknum ? props.ticknum : 5
    let thresholds
    // Different scales have different break points, so I check around
    // for some of the most likely ones.
    if(typeof props.datadisplay.quantiles === "function"){
        thresholds = props.datadisplay.quantiles()
    }else if(typeof props.datadisplay.nice === "function"){
        thresholds = props.datadisplay.nice().ticks(ticks)
    }else if( typeof props.datadisplay.domain === "function"){
        // This is specifically for threshold scales
        thresholds = props.datadisplay.domain()
    }
    // Intention here was to make barscale adapt to a variety of scales
    /* let thresholds = props.datadisplay.quantiles() || props.datadisplay.thresholds() || props.datadisplay.ticks() */
    let formatter = props.formatter ? props.formatter : pickformatter(props.data)
    let dispwidth = props.legsvgwidth ? (props.legsvgwidth) : 400
    let svgwidth = props.legsvgwidth ? (props.legsvgwidth + 40) : 440

    let tickmarks = R.pipe(
        R.append(Math.max(...props.datadisplay.domain())),
        R.prepend(Math.min(...props.datadisplay.domain())),
        R.uniq,
    )(thresholds)

    const fillarr = R.zipWith((x,x2) => (props.datadisplay((x+x2)/2)))(R.init(tickmarks), R.drop(1, tickmarks))
    // These are the bar heights and widths within the svg
    const width = roundtenth( dispwidth/tickmarks.length )
    const height = roundtenth( width/5 )
    const svgheight = props.legsvgheight ? props.legsvgheight : (dispwidth/15)
    const classnames = props.classnames ? props.classnames.join(' ') : styles.sizing

    return (
        <svg 
        className={classnames}
        viewBox={`0 0 ${svgwidth} ${svgheight}`} 
        // css={[ { width: '75%' }, props.cssStyles ? props.cssStyles : undefined ] }
        >
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
