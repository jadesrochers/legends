## legends 

#### Just a barscale  
It is a horizontal barscale.   

#### Using it requires passing data  
It takes the data, formatter, styling and tries to put together a decent  
looking bar legend.  
I was going to use d3 built in but found like a lot of parts it does not work  
with react readily.  
```javascript
  <BarScale key='legend' 
    cssStyles={ props.legendstyle }
    data={ props.geodata } 
    formatter={ howtoformatlabelfcn }
    legendstyle={props.legendstyle}  
    offset="20%" {...pass}
  />
```

#### Could add vertical setup  
Right now it is only a horizontal scale, but the underlying elements would  
easily support a vertical scale.  
