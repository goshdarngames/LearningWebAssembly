( function ( p5js_sketch, undefined )
{

    p5js_sketch.grid_p5 = ( p ) =>
    {
        p.canvasSize = [ 400, 400 ]
        
        p.setup = function ()
        {
            p.createCanvas ( p.canvasSize [ 0 ], p.canvasSize [ 1 ] );
        }

        p.draw = function ()
        {
            let numIter = 10;
            let targetX = 0;
            let targetY = 0;
            let range = 2;
            let gridSize = p.canvasSize [ 0 ];

            for ( i = 0; i < p.canvasSize[0]; i++ )
            {
                for ( j = 0; j < p.canvasSize[1]; j++ )
                {
                    let n = window.mandelbrot ( numIter, 
                                                targetX,
                                                targetY,
                                                range,
                                                gridSize,
                                                i, j       );

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
