#include "unity.h"

#include "cellular_automata.h"

void setUp ( void )
{
}

void tearDown ( void )
{
}

void test_sim_get_neighbour_idx ()
{
    TEST_ASSERT ( sim_get_neighbour_idx (  0,  0, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx (  0,  1, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx (  0,  2, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx (  0,  3, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx (  0,  4, 10, 10, 100 ) ==  1 );
    TEST_ASSERT ( sim_get_neighbour_idx (  0,  5, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx (  0,  6, 10, 10, 100 ) == 10 );
    TEST_ASSERT ( sim_get_neighbour_idx (  0,  7, 10, 10, 100 ) == 11 );

    TEST_ASSERT ( sim_get_neighbour_idx ( 11,  0, 10, 10, 100 ) ==  0 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 11,  1, 10, 10, 100 ) ==  1 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 11,  2, 10, 10, 100 ) ==  2 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 11,  3, 10, 10, 100 ) == 10 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 11,  4, 10, 10, 100 ) == 12 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 11,  5, 10, 10, 100 ) == 20 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 11,  6, 10, 10, 100 ) == 21 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 11,  7, 10, 10, 100 ) == 22 );

    TEST_ASSERT ( sim_get_neighbour_idx ( 99,  0, 10, 10, 100 ) == 88 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 99,  1, 10, 10, 100 ) == 89 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 99,  2, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 99,  3, 10, 10, 100 ) == 98 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 99,  4, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 99,  5, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 99,  6, 10, 10, 100 ) == -1 );
    TEST_ASSERT ( sim_get_neighbour_idx ( 99,  7, 10, 10, 100 ) == -1 );

};
