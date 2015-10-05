# RandomizedColors
A random utility which allows to create random color variations

#Why you could need this

It might occur to that you you want tol use subtle color variations,
Checking the rgb, rgba or (even worse) the hex values of html colors is a cumbersome task.
So the idea is that you pass a known color and receive random variations that you can calibrate with a randomness parameter.
If you set the randomness parameter to 0, just may use it as a color converter tool too. 
There might be moments when this could produce nice aesthetic effects, since you are regulating affinties.



#Installation

```javascript
	npm install randomized-colors
```

#Usage

First you require the library:

```javascript
	var randomized = require("randomized_colors");
```


Invoking is straightforward: You just write: 
 
```javascript
	var output = randomized("gold", 0.2);
```

The seconed parameter stands for the randomness of the result: 1 is total randomness, 0 no randomness at all.


You may also use a third parameter, which stands for the format. 
Valid formats are **rgb**, **rgba**, **hex**, **array**, **object**

You would invoke it like this:


```javascript
	var output = randomized("gold", 0.2, "rgba");
```

Since the function is overloaded it supports a variety of input formats.
You may write:



```javascript
	
	var output = randomized("rgb(32,32,32)", 0,0.2, "object");
	
	// or

	var output = randomized("rgb(32,32,32)", 0,0.2, "array");	
	
```


