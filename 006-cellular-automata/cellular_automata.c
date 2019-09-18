#include <emscripten.h>
#include <stdint.h>
#include <stdlib.h>

/****************************************************************************
 * RGB BUFFER
 ***************************************************************************/

const int SIZE = 800*800*3;

uint8_t rgb_buffer [ SIZE ];

EMSCRIPTEN_KEEPALIVE
uint8_t * get_rgb_buffer_ptr ()
{
    return rgb_buffer;
}

/****************************************************************************
 * SIMULATION
 ***************************************************************************/

EMSCRIPTEN_KEEPALIVE
void sim_update ()
{
    for ( int i = 0; i < 800; i ++ )
    {
        for ( int j = 0; j < 800; j ++ )
        {
            int grid_idx = ( i % 800 ) * 3 + ( j * 800 ) * 3;

            rgb_buffer [ grid_idx     ] = rand () % 256;
            rgb_buffer [ grid_idx + 1 ] = rand () % 256;
            rgb_buffer [ grid_idx + 2 ] = rand () % 256;

            if ( i == 399 || i == 400 || j == 399 || j == 400 )
            {
                rgb_buffer [ grid_idx ] = 255;
            }

        }
    }
}

EMSCRIPTEN_KEEPALIVE
void sim_write_rgb_buffer ()
{
}
