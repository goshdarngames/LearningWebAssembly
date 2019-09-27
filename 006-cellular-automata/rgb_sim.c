#include <emscripten.h>

#include "cellular_automata.h"

/****************************************************************************
 * RGB BUFFER
 ***************************************************************************/

uint8_t rgb_buffer [ SIZE*3 ];

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

EMSCRIPTEN_KEEPALIVE
uint8_t * get_rgb_buffer_ptr ()
{
    return rgb_buffer;
}

EMSCRIPTEN_KEEPALIVE
float get_spont ()
{
    return sim_get_spont_normalized ();
}

EMSCRIPTEN_KEEPALIVE
void set_spont ( float n )
{
    sim_set_spont_normalized ( n );
}

