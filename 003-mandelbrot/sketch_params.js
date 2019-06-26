( function ( p5js_sketch, undefined )
{
    let SketchParam = function ( display_name,
                                 value )
    {
        this.display_name = display_name;
        this.value = value;
    };

    p5js_sketch.params =
    {
        numIter  : new SketchParam ( "name", 300 ),
        targetX  : new SketchParam ( "name", -0.7436 ),
        targetY  : new SketchParam ( "name", 0.1102 ),
        range    : new SketchParam ( "name", 3.5 ),
        escape   : new SketchParam ( "name", 300 ),
        gridSize : new SketchParam ( "name", [ 1080, 1080 ] ),
        colors   : new SketchParam ( "name", [ '#ff0000',
                                               '#ffff00',
                                               '#00ff00',
                                               '#00ffff',
                                               '#0000ff' ] )
    };
} ( window.p5js_sketch = window.p5js_sketch || {} ))
