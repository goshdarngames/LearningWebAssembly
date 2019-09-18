#include <stdint.h>
#include <stdlib.h>

#include "cellular_automata.h"

/****************************************************************************
 * SIMULATION
 ***************************************************************************/

uint8_t sim_buffer_1 [ SIZE ];
uint8_t sim_buffer_2 [ SIZE ];

uint8_t * curr_sim_buffer = sim_buffer_1;
uint8_t * next_sim_buffer = sim_buffer_2;

enum SimState { Start, Running, Restart };

enum SimState sim_state = Start;

void flip_sim_buffers ()
{
    uint8_t * tmp = next_sim_buffer;

    next_sim_buffer = curr_sim_buffer;
    
    curr_sim_buffer = tmp;
}

void ca_update ()
{
    for ( int i = 0; i < SIZE; i++ )
    {
        next_sim_buffer [ i ] = rand () % 3;
    }

    flip_sim_buffers ();
}

void sim_write_cell_rgb ( int idx, uint8_t cell_value, uint8_t * rgb_buffer )
{
    //determine appropriate rgb values for cell_value
    
    uint8_t r = 0;
    uint8_t g = 0;
    uint8_t b = 0;

    switch ( cell_value )
    {
        case 0 : r = 255; break;
        case 1 : g = 255; break;
        case 2 : b = 255; break;
    }

    //translate sim index to rgb buffer index

    rgb_buffer [ idx * 3     ] = r;
    rgb_buffer [ idx * 3 + 1 ] = g;
    rgb_buffer [ idx * 3 + 2 ] = b;
}

void ca_write_rgb_buffer ( uint8_t * rgb_buffer )
{
    for ( int i = 0; i < SIZE; i++ )
    {
        sim_write_cell_rgb ( i, curr_sim_buffer [ i ], rgb_buffer );
    }
}
