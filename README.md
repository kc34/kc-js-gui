# kc-js-gui
This project is a demo for the Panel, a recursive GUI-element.

The file of interest is js/view/panel.js. It contains the class definition for Panel. The Panel contains a width, height, and background color. It also contains information regarding where it is drawn relative to its parent Panel, as well as references to its sub-Panels.

Recursive algorithms drive the Panel. The given clickHandler(), when ran, will check the clickEvent against the border of each of its sub-Panels. If the Panel detects that the click was intended for one of its sub-Panels, it will call the sub-Panel's clickHandler() function with a clickEvent relative to the sub-Panel's top-left corner. This was the only implemented Handler, but a similar Handler could be created for other events.

The draw() function draws the Panel, and then calls the draw() function for its sub-Panels. The given draw() function is modular and can be easily modified.
