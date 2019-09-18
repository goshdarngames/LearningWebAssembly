#include <emscripten.h>
#include <stdint.h>
#include <stdlib.h>

/****************************************************************************
 * RGB BUFFER
 ***************************************************************************/

const int SIZE = 800;

uint8_t rgb_buffer [ SIZE*800*3 ];

EMSCRIPTEN_KEEPALIVE
uint8_t * get_rgb_buffer_ptr ()
{
    return rgb_buffer;
}

/****************************************************************************
 * SIMULATION
 ***************************************************************************/

unsigned char sim_buffer_1 [ SIZE ];
unsigned char sim_buffer_2 [ SIZE ];

unsigned char * curr_sim_buffer = sim_buffer_1;
unsigned char * next_sim_buffer = sim_buffer_2;

enum SimState { Start, Running, Restart };

enum SimState sim_state = Start;

EMSCRIPTEN_KEEPALIVE
void sim_update ()
{
}

EMSCRIPTEN_KEEPALIVE
void sim_write_rgb_buffer ()
{
}
