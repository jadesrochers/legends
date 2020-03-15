import React from "react";
import * as R from "ramda";
import { format } from 'd3-format';
import { scaleQuantile, scalePow, scaleLog } from 'd3-scale';
import { BarScale } from 'legends';

const GnYlRd73 = [  '#005a32', '#238443', '#41ab5d', '#78c679', '#addd8e', '#d9f0a3', '#ffffcc', '#ffeda0', '#feb24c', '#f03b20']
const GnYlRd7 = [ '#1a9850', '#91cf60', '#d9ef8b', '#ffffbf', '#fee08b', '#fc8d59', '#d73027' ]
const GnYlRd9 = [ '#1a9850', '#66bd63', '#a6d96a', '#d9ef8b', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d73027' ]
const YlOrRd7 = [  '#ffffb2',  '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026' ]

const quantile = R.curry((outputRange, data) => scaleQuantile().domain(R.values(data)).range(outputRange))
const power = R.curry((pow, outputRange, data) => scalePow().exponent(pow).domain(R.values(data)).range(outputRange))
const log = R.curry((outputRange, data) => scaleLog().domain(R.values(data)).range(outputRange))

const LegendHoriz1 = () => {
  const data = [0,1,2,3,4,5,6,7]
  const datadecorate = quantile(YlOrRd7)(data)
  return (
    <BarScale data={data} datadisplay={datadecorate}
      formatter={format('.3s')} svgwidth={500}
     />
  );
};

const LegendHoriz2 = () => {
  const data = Array.from({length: 100}, () => Math.random() * 10000)
  const datadecorate = log(GnYlRd9)(data)
  return (
    <BarScale data={data} datadisplay={datadecorate}
      formatter={format('.2s')} svgwidth={500} ticknum={2}
     />
  );
};

const LegendHoriz3 = () => {
  const data = Array.from({length: 100}, () => Math.random() * 10000)
  const datadecorate = power(3/5, GnYlRd7, data)
  return (
    <BarScale data={data} datadisplay={datadecorate}
      formatter={format('.2s')} svgwidth={500} elemwidth={'800px'} ticknum={6}
     />
  );
};

const LegendHoriz4 = () => {
  const data = Array.from({length: 50}, () => Math.random() * 300)
  const datadecorate = quantile(GnYlRd73)(data)
  return (
    <BarScale data={data} datadisplay={datadecorate}
      formatter={format('.3s')} svgwidth={500} elemwidth={'90%'}
     />
  );
};

const LegendBars = () => {
  return (
     <div  style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        Size: '1.3rem',
        textAlign: 'center',
      }} >
       <h3 style={{ fontSize: '1.4rem' }} >Barscale Examples</h3>
       <p style={{ fontSize: '1.1rem' }} >
         Each bar uses different data inputs, <br />
         with other options applied to try them out.
       </p>
       <LegendHoriz1 />
       <LegendHoriz2 />
       <LegendHoriz3 />
       <LegendHoriz4 />
     </div>
  );
};

export { LegendBars };
