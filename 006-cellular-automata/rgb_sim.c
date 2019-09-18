#include <emscripten.h>

#include "cellular_automata.h"

const int G_SIZE = 800 * 800;

/****************************************************************************
 * RGB BUFFER
 ***************************************************************************/

uint8_t rgb_buffer [ G_SIZE*3 ];

EMSCRIPTEN_KEEPALIVE
uint8_t * get_rgb_buffer_ptr ()
{
    return rgb_buffer;
}

EMSCRIPTEN_KEEPALIVE
void sim_update ()
{
    ca_update ();
}

EMSCRIPTEN_KEEPALIVE
void sim_write_rgb_buffer ()
{
    ca_write_rgb_buffer ( rgb_buffer );
}
