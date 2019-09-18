#include <emscripten.h>
#include <stdint.h>
#include <stdlib.h>

const int SIZE = 800*800*3;

uint8_t grid_data [ SIZE ];

EMSCRIPTEN_KEEPALIVE
void grid_noise ()
{
    for ( int i = 0; i < 800; i ++ )
    {
        for ( int j = 0; j < 800; j ++ )
        {
            int grid_idx = ( i % 800 ) * 3 + ( j * 800 ) * 3;

            grid_data [ grid_idx     ] = rand () % 256;
            grid_data [ grid_idx + 1 ] = rand () % 256;
            grid_data [ grid_idx + 2 ] = rand () % 256;

            if ( i == 399 || i == 400 || j == 399 || j == 400 )
            {
                grid_data [ grid_idx ] = 255;
            }

        }
    }
}

EMSCRIPTEN_KEEPALIVE
uint8_t * get_grid_data ()
{
    return grid_data;
}

