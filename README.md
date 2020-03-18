## legends 

#### Just a barscale  
It is a horizontal barscale.   

#### Using it requires passing data  
It takes the data, formatter, styling and tries to put together a decent  
looking bar legend.  
I was going to use d3 built in but found a lot of parts do not work  
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
### The built in demos demonstrate several variations
If you download the github repo you can use:  
```bash
npm start
```
To start up a demo site accessible at 127.0.0.1 and check out several variations of how the barscale can be used with different formatting and scaling. The code for these is available in the /demo directory in the repo.

#### Could add vertical setup  
Right now it is only a horizontal scale, but the underlying elements would  
easily support a vertical scale.  
