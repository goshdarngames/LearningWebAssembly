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

int sim_get_neighbour_idx ( int idx, int n, int width, int height, int size )
{
    int n_idx = idx;

    int row_adj, col_adj;

    switch ( n )
    {
        case 0 : row_adj = -1; col_adj = -1; break;
        case 1 : row_adj = -1; col_adj =  0; break;
        case 2 : row_adj = -1; col_adj =  1; break;
        case 3 : row_adj =  0; col_adj = -1; break;
        case 4 : row_adj =  0; col_adj =  1; break;
        case 5 : row_adj =  1; col_adj = -1; break;
        case 6 : row_adj =  1; col_adj =  0; break;
        case 7 : row_adj =  1; col_adj =  1; break;
    }

    n_idx += row_adj * width;

    if ( n_idx < 0 || n_idx > size ) 
    {
        return -1;
    }

    if ( ( n_idx % width ) + col_adj < 0      || 
         ( n_idx % width ) + col_adj >= width )
    {
        return -1;
    }
    else
    {
        n_idx += col_adj;
    }

    return n_idx;
}

void ca_update ()
{
    for ( int i = 0; i < SIZE; i++ )
    {
        next_sim_buffer [ i ] = rand () % 3;
    }

    flip_sim_buffers ();
}

void write_cell_rgb ( int idx, uint8_t cell_value, uint8_t * rgb_buffer )
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
        write_cell_rgb ( i, curr_sim_buffer [ i ], rgb_buffer );
    }
}
