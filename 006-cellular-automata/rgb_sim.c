//This file defines the functions that are made accessible to the web
//page through emscripten keep-alive.  Note: in future try embind

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

EMSCRIPTEN_KEEPALIVE
void set_state ( int s )
{
    switch ( s )
    {
        case 0 : sim_set_state ( Start   ); break;
        case 1 : sim_set_state ( Running ); break;
        case 2 : sim_set_state ( Paused  ); break;
    }
}

EMSCRIPTEN_KEEPALIVE
int get_state ()
{
    switch ( sim_get_state () )
    {
        case Start   : return 0; break;
        case Running : return 1; break;
        case Paused  : return 2; break;
    }

    return -1;
}

