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
            for ( i = 0; i < p.canvasSize[0]; i++ )
            {
                for ( j = 0; j < p.canvasSize[0]; j++ )
                {
                    if ( window.mandelbrot ( 0, 0, 0, 0, 0, i, j ) == 1 )
                    {
                        p.set ( i, j, p.color ( 0 ) );
                    }
                }
            }

            p.updatePixels ();
        }
    };
} ( window.p5js_sketch = window.p5js_sketch || {} ))
