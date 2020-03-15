import React from 'react';
import { scaleQuantile } from 'd3-scale';
import { mount } from '../enzyme';
import { BarScale } from '../legends';
import { format } from 'd3-format';
import * as R from 'ramda';

const GnYlRd73 = [  '#005a32', '#238443', '#41ab5d', '#78c679', '#addd8e', '#d9f0a3', '#ffffcc', '#ffeda0', '#feb24c', '#f03b20']
const GnYlRd7 = [ '#1a9850', '#91cf60', '#d9ef8b', '#ffffbf', '#fee08b', '#fc8d59', '#d73027' ]
const GnYlRd9 = [ '#1a9850', '#66bd63', '#a6d96a', '#d9ef8b', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d73027' ]
const YlOrRd7 = [  '#ffffb2',  '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026' ]

const quantile = R.curry((outputRange, data) => scaleQuantile().domain(R.values(data)).range(outputRange))

describe('Barscale tests', () => {
  let data = [0,1,2,3,4,5,6,7]
  let datadecorate = quantile(YlOrRd7)(data)
  test('Render a quantile bar', () => {
    let wrapper = mount(<BarScale data={data} datadisplay={datadecorate}
     formatter={format('.2~f')} maxwidth={80}
    />) 
    /* console.log('BarScale debug: ',wrapper.debug()) */
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

})


