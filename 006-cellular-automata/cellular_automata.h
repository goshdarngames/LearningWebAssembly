
#include <stdint.h>

#define WIDTH 800
#define HEIGHT 800

#define SIZE 640000

#define PROB_MAX 6000
#define PROB_MIN 50

enum SimState { Start, Running, Paused };

void ca_update ();
void ca_write_rgb_buffer ( uint8_t * rgb_buffer );
int sim_get_neighbour_idx ( int, int, int, int, int );

float sim_get_spont_normalized ();
void sim_set_spont_normalized ( float n );
void sim_set_state ( enum SimState s );
enum SimState sim_get_state ();
