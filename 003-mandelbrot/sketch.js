( function ( p5js_sketch, undefined )
{
    
    //Javascript % is the remainder function so it is no use for 
    //circular lists
    const mod = (x, n) => (x % n + n) % n;

    //Used when converting mouse clicks to the 'target' 
    p5js_sketch.canvasCoordToComplex = function (
        canvasCoord, currentTarget, range, gridSize    ) 
    {
        return currentTarget - ( range/2 ) + 
               range * ( canvasCoord / gridSize );
    };

    //The difference between each colour is computed at the start of each
    //render and used to create the smooth shading
    p5js_sketch.computeColorDiffs = function ( colors, p )
    {
        return colors.map ( ( curr, idx, arr ) =>
        {
            let next = arr [ ( idx + 1 ) % arr.length ];

            c0 = p.color ( curr );
            c1 = p.color ( next );

            let diffs = 
            {
                r : p.red   ( c1 ) - p.red   ( c0 ),
                g : p.green ( c1 ) - p.green ( c0 ),
                b : p.blue  ( c1 ) - p.blue  ( c0 )
            }

            return diffs;
        });
    };

    //Takes a value from 0..1 and returns an index from the color table
    let normColor = function ( n, numColors )
    {
        return Math.floor ( n*numColors );
    };

    p5js_sketch.computeColor = function ( 
        n, escape, colors, colorDiffs, p )
    {
        let norm = n/escape;

        let cycles = 10000;

        let normColor = 
             ( norm * colors.length * cycles ) % colors.length;

        let band = Math.floor ( normColor );
        let adj = 1-( normColor % 1 );

        let r = p.red   ( p.color ( colors [ band ] ) );
        let g = p.green ( p.color ( colors [ band ] ) );
        let b = p.blue  ( p.color ( colors [ band ] ) );

        r += adj * colorDiffs [ band ].r;
        g += adj * colorDiffs [ band ].g;
        b += adj * colorDiffs [ band ].b;

        return p.color ( r, g, b );
    };

    p5js_sketch.grid_p5 = ( p ) =>
    {
        //These variables hold data that is relevent during the render
        //process
        let imageBuffer = undefined;

        let drawing       = true;
        let drawPos       = undefined;

        let maxDelta = 16;

        let colorDiffs = undefined;

        //This function is used during the render process to load the
        //parameter values that the user can change
        let get_render_data =  function ()
        {
            //load render data into this struct
            let r_data = {};
            
            //copy across the 'value' fields from each SketchParam
            Object.keys ( p5js_sketch.params ).forEach (
                ( key ) => 
                {
                    r_data [ key ] = p5js_sketch.params [ key ].value;
                }
            );
            
            return r_data;
        }
        
        let get_mandelbrot = function ( x, y )
        {
            let r_data = get_render_data ();

            return  window.mandelbrot ( 
                r_data.numIter, 
                r_data.target [ 0 ],
                r_data.target [ 1 ],
                r_data.range,
                r_data.escape,
                r_data.gridSize,
                x, y                  );

        };

        p.draw = function ()
        {
            let r_data = get_render_data ();

            if ( drawing )
            {
                let drawStartTime = window.performance.now ();
                
                //This is the first draw iteration so we need to
                //initialize the private render variables
                if ( drawPos == undefined )
                {
                    drawPos = 0;
                    colorDiffs =
                        p5js_sketch.computeColorDiffs ( r_data.colors, p );
                }
                
                let delta = () => window.performance.now () - drawStartTime;

                while ( delta () < maxDelta )
                {
                    let x = drawPos % r_data.gridSize;
                    let y = Math.floor ( drawPos / r_data.gridSize );

                    let n = get_mandelbrot ( x, y );

                    if ( n == 0 )
                    {
                        imageBuffer.set ( x, y, p.color ( 0 ) );
                    }
                    else
                    {
                        let pixelColor =
                             p5js_sketch.computeColor ( 
                                   n, r_data.escape,
                                   r_data.colors, colorDiffs, p
                            );

                        imageBuffer.set ( x, y, pixelColor );
                    }
                    
                    drawPos += 1;

                    if ( drawPos > Math.pow ( r_data.gridSize, 2 ) )
                    {
                        drawing       = false;
                        drawStartTime = undefined;
                        drawPos       = undefined;
                    }
                }

                imageBuffer.updatePixels ();
            }

            p.image ( imageBuffer, 0, 0 );
        };

        p5js_sketch.renderMandelbrot = function ()
        {
            drawing = true;
            drawPos = undefined;
        };

        p.setup = function ()
        {
            let r_data = get_render_data ();

            let canvas = p.createCanvas ( r_data.gridSize,
                                          r_data.gridSize );

            canvas.parent ( 'canvasDiv' );

            imageBuffer = p.createImage ( r_data.gridSize, 
                                          r_data.gridSize );

            p5js_sketch.renderMandelbrot ();
        };

        p.mouseClicked = function ()
        {
            if ( p.mouseX < 0       || p.mouseY < 0
              || p.mouseX > p.width || p.mouseY > p.height )
            {
                return;
            }

            let r_data = get_render_data ();

            new_target = [
                p5js_sketch.canvasCoordToComplex ( 
                    p.mouseX, r_data.target [ 0 ],
                    r_data.range, r_data.gridSize ),

                p5js_sketch.canvasCoordToComplex ( 
                    p.mouseY, r_data.target [ 1 ], 
                    r_data.range, r_data.gridSize )
            ];

            p5js_sketch.params.target.value = new_target;

            //update the form value to refelct the new target
            p5js_sketch.params.target.update ( "target" );
        };
    };

} ( window.p5js_sketch = window.p5js_sketch || {} ))
