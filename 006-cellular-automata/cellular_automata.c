#include <stdint.h>
#include <stdlib.h>

#include "cellular_automata.h"

/****************************************************************************
 * SIMULATION - DATA
 ***************************************************************************/

uint8_t sim_buffer_1 [ SIZE ];
uint8_t sim_buffer_2 [ SIZE ];

uint8_t * curr_sim_buffer = sim_buffer_1;
uint8_t * next_sim_buffer = sim_buffer_2;


enum SimState sim_state = Start;

int sim_spont = PROB_MAX/2;

/****************************************************************************
 * SIMULATION - JS DATA ACCESSOR FUNCTIONS
 ***************************************************************************/

float sim_get_spont_normalized ()
{
    return sim_spont/PROB_MAX;
}

void sim_set_spont_normalized ( float n )
{
    sim_spont = PROB_MAX*n;
}

void sim_set_state ( enum SimState s )
{
    sim_state = s;
}

enum SimState sim_get_state ()
{
    return sim_state;
}

/****************************************************************************
 * SIMULATION - UTILITY FUNCTIONS
 ***************************************************************************/

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

/****************************************************************************
 * SIMULATION - STATES
 ***************************************************************************/

void ca_update_start ()
{
    for ( int i = 0; i < SIZE; i++ )
    {
        next_sim_buffer [ i ] = rand () % 3;
    }

    sim_state = Running;
}

void ca_update_running ()
{
    for ( int i = 0; i < SIZE; i++ )
    {
        int r_count = 0;
        int g_count = 0;
        int b_count = 0;
                    
        next_sim_buffer [ i ] = curr_sim_buffer [ i ];

        for ( int j = 0; j < 8; j++ )
        {
            int n_idx = sim_get_neighbour_idx ( i, j, WIDTH, HEIGHT, SIZE );

            switch ( curr_sim_buffer [ n_idx ] )
            {
                case 0 : r_count += 1; break;
                case 1 : g_count += 1; break;
                case 2 : b_count += 1; break;
            }
        }


        switch ( curr_sim_buffer [ i ] )
        {
            case 0 : 
            {
                if ( g_count > 3 )
                {
                    next_sim_buffer [ i ] = 1;
                }
                break;
            }
            case 1 : 
            {
                if ( b_count > 3 )
                {
                    next_sim_buffer [ i ] = 2;
                }
                break;
            }
            case 2 : 
            {
                if ( r_count > 3 )
                {
                    next_sim_buffer [ i ] = 0;
                }
                break;
            }
        }

        if ( sim_spont > 0 &&
             rand () % ( PROB_MAX - sim_spont + PROB_MIN ) == 0 )
        {
            next_sim_buffer [ i ] = ( curr_sim_buffer [ i ] + 1 ) % 3;
        }
    }
}

void ca_update ()
{
    switch ( sim_state )
    {
        case Start : ca_update_start (); break;

        case Running : ca_update_running (); break;

        case Paused :  break;
    }

    flip_sim_buffers ();
}

/****************************************************************************
 * WRITE RGB BUFFER
 ***************************************************************************/

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
