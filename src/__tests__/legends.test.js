import React from 'react';
import { mount } from '../enzyme';
import { BarScale } from '../legends';
import { format } from 'd3-format';
import { quantile, YlOrRd7 } from '../stylehelpers'

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
    expect(wrapper.find('g').get(numgs - 4).props.transform).toEqual('translate(50,0)')
    expect(wrapper.find('g').get(numgs - 1).props.transform).toEqual('translate(80,0)')

    expect(wrapper.containsAllMatchingElements([
     <rect width={10} height={2} />,
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


