( function ( p5js_sketch, undefined )
{
    p5js_sketch.grid_p5 = ( p ) =>
    {
        let sketch_data = 
        {
            numIter  : 100,
            targetX  : 0,
            targetY  : 0,
            range    : 2,
            gridSize : [ 400, 400 ]
        };

        p.setup = function ()
        {
            p.createCanvas ( sketch_data.gridSize [ 0 ],
                             sketch_data.gridSize [ 1 ] );
        }

        p.draw = function ()
        {
            for ( i = 0; i < sketch_data.gridSize[0]; i++ )
            {
                for ( j = 0; j < sketch_data.gridSize[1]; j++ )
                {
                    let n = window.mandelbrot ( 
                        sketch_data.numIter, 
                        sketch_data.targetX,
                        sketch_data.targetY,
                        sketch_data.range,
                        sketch_data.gridSize[0],
                        i, j                  );

                    if ( n == 0 )
                    {
                        p.set ( i, j, p.color ( 0 ) );
                    }
                }
            }

            p.updatePixels ();
        }
    };
} ( window.p5js_sketch = window.p5js_sketch || {} ))
