( function ( p5js_sketch, undefined )
{
    p5js_sketch.grid_p5 = ( p ) =>
    {
        let sketch_data = 
        {
            numIter  : 300,
            targetX  : -0.7436,
            targetY  : 0.1102,
            range    : 0.005,
            gridSize : [ 800, 800 ],
            image    : undefined
        };

        let renderMandelbrot = function ()
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
                        sketch_data.image.set ( i, j, p.color ( 0 ) );
                    }
                    else
                    {
                        sketch_data.image.set ( i, j, p.color ( 255 ) );
                    }

                }
            }

            sketch_data.image.updatePixels ();
        };

        p.setup = function ()
        {
            let canvas = p.createCanvas ( sketch_data.gridSize [ 0 ],
                                          sketch_data.gridSize [ 1 ] );

            canvas.parent ( 'canvasDiv' );

            sketch_data.image = p.createImage ( sketch_data.gridSize [ 0 ],
                                                sketch_data.gridSize [ 1 ] );
            renderMandelbrot ();
        }

        p.draw = function ()
        {
            p.image ( sketch_data.image, 0, 0 );
        }

        
    };
} ( window.p5js_sketch = window.p5js_sketch || {} ))
