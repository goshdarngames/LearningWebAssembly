let canvasSize = [ 400, 400 ]

function setup ()
{
    createCanvas ( canvasSize [ 0 ], canvasSize [ 1 ] );
}

function draw ()
{
    for ( i = 0; i < canvasSize[0]; i++ )
    {
        for ( j = 0; j < canvasSize[0]; j++ )
        {
            if ( gridF ( i, j ) == 1 )
            {
                set ( i, j, color ( 0 ) );
            }
        }
    }

    updatePixels ();
}
