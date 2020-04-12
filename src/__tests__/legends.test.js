import React from 'react';
import { scaleQuantile, scalePow, scaleLog, scaleThreshold } from 'd3-scale';
import { mount } from '../enzyme';
import { BarScale } from '../legends';
import { format } from 'd3-format';
import * as R from 'ramda';

const GnYlRd73 = [  '#005a32', '#238443', '#41ab5d', '#78c679', '#addd8e', '#d9f0a3', '#ffffcc', '#ffeda0', '#feb24c', '#f03b20']
const GnYlRd7 = [ '#1a9850', '#91cf60', '#d9ef8b', '#ffffbf', '#fee08b', '#fc8d59', '#d73027' ]
const GnYlRd9 = [ '#1a9850', '#66bd63', '#a6d96a', '#d9ef8b', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d73027' ]
const YlOrRd7 = [  '#ffffb2',  '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026' ]

const quantile = R.curry((outputRange, data) => scaleQuantile().domain(R.values(data)).range(outputRange))
const power = R.curry((pow, outputRange, data) => scalePow().exponent(pow).domain(R.values(data)).range(outputRange))
const log = R.curry((outputRange, data) => scaleLog().domain(R.values(data)).range(outputRange))
const threshold = R.curry((outputRange, data) => {
  return scaleThreshold() 
   .domain([ 5, 10, 20, 40, 80, 200, 400, 1000 ])
   .range(outputRange)
});

describe('Barscale tests', () => {
  const data = [0,1,2,3,4,5,6,7]
  const datapow = [1,100,1000,2000,3000,4000,5000,6000,7000]
  const datalog = [1,2,3,4,5,10,15,50,100,200,400,500,1000,5000,6000,10000,50000,100000,500000,1000000,5000000,10000000]
  const datathresh = [1,5,10,20,30,50,90,200,300,500,700,1000,10000]

  const quantilebar = quantile(YlOrRd7)(data)
  const powerbar = power(1/2,GnYlRd7,datapow)
  const logbar = log(GnYlRd7,datalog)
  const threshbar = threshold(GnYlRd7,datathresh)


  test('Render a quantile bar', () => {
    const wrapper = mount(<BarScale data={data} datadisplay={quantilebar}
     formatter={format('.2~f')} maxwidth={80} 
    />) 
    /* console.log('QuantileBar debug: ',wrapper.debug()) */
    expect(wrapper.find('rect').length).toEqual(7)
    expect(wrapper.find('line').length).toEqual(8)
    
    let numgs = wrapper.find('g').length
    expect(wrapper.find('g').get(numgs - 4).props.transform).toEqual('translate(250,0)')
    expect(wrapper.find('g').get(numgs - 1).props.transform).toEqual('translate(400,0)')

    expect(wrapper.containsAllMatchingElements([
     <rect width={50} height={10} />,
     <text > 0 </text>,
     <text > 1 </text>,
     <text > 2 </text>,
     <text > 3 </text>,
     <text > 4 </text>,
     <text > 5 </text>,
     <text > 6 </text>,
     <text > 7 </text>,
     ])).toBeTruthy()
  });

  test('Render a log bar', () => {
    let wrapper = mount(<BarScale data={data} datadisplay={logbar}
     formatter={format('.2~f')} maxwidth={80}
    />) 
    /* console.log('LogBar debug: ',wrapper.debug()) */
    expect(wrapper.find('rect').length).toEqual(7)
    expect(wrapper.find('line').length).toEqual(8)
    
    let numgs = wrapper.find('g').length
    expect(wrapper.find('g').get(numgs - 4).props.transform).toEqual('translate(250,0)')
    expect(wrapper.find('g').get(numgs - 1).props.transform).toEqual('translate(400,0)')

    expect(wrapper.containsAllMatchingElements([
     <rect width={50} height={10} />,
     <text > 1 </text>,
     <text > 10 </text>,
     <text > 100 </text>,
     <text > 1000 </text>,
     <text > 10000 </text>,
     <text > 100000 </text>,
     <text > 1000000 </text>,
     <text > 10000000 </text>,
     ])).toBeTruthy()
  });

  test('Render a power bar', () => {
    let wrapper = mount(<BarScale data={data} datadisplay={powerbar}
     formatter={format('.2~f')} maxwidth={80} ticks={8}
    />) 
    /* console.log('Power Bar debug: ',wrapper.debug()) */
    expect(wrapper.find('rect').length).toEqual(7)
    expect(wrapper.find('line').length).toEqual(8)
    
    let numgs = wrapper.find('g').length
    expect(wrapper.find('g').get(numgs - 4).props.transform).toEqual('translate(250,0)')
    expect(wrapper.find('g').get(numgs - 1).props.transform).toEqual('translate(400,0)')

    expect(wrapper.containsAllMatchingElements([
     <rect width={50} height={10} />,
     <text > 0 </text>,
     <text > 1000 </text>,
     <text > 2000 </text>,
     <text > 3000 </text>,
     <text > 4000 </text>,
     <text > 5000 </text>,
     <text > 6000 </text>,
     <text > 7000 </text>,
     ])).toBeTruthy()
  });

  test('Render a threshold bar', () => {
    let wrapper = mount(<BarScale data={data} datadisplay={threshbar}
     formatter={format('.2~f')} maxwidth={80} ticks={8}
    />) 
    /* console.log('Power Bar debug: ',wrapper.debug()) */
    expect(wrapper.find('rect').length).toEqual(7)
    expect(wrapper.find('line').length).toEqual(8)
    
    let numgs = wrapper.find('g').length
    expect(wrapper.find('g').get(numgs - 4).props.transform).toEqual('translate(250,0)')
    expect(wrapper.find('g').get(numgs - 1).props.transform).toEqual('translate(400,0)')

    expect(wrapper.containsAllMatchingElements([
     <rect width={50} height={10} />,
     <text > 5 </text>,
     <text > 10 </text>,
     <text > 20 </text>,
     <text > 40 </text>,
     <text > 80 </text>,
     <text > 200 </text>,
     <text > 400 </text>,
     <text > 1000 </text>,
     ])).toBeTruthy()
  });

})


