#include <emscripten.h>

/****************************************************************************
 * Complex Numbers
 *---------------------------------------------------------------------------
 * Complex numbers are numbers that consist of a pair of values rather than
 * a single value.
 ***************************************************************************/

struct Complex
{
    float real;
    float imag;
};

struct Complex mult ( struct Complex c1, struct Complex c2 )
{
    struct Complex r = { 0, 0 };

    return r;
}

struct Complex add ( struct Complex c1, struct Complex c2 )
{
    struct Complex r = { 0, 0 };

    return r;
}

/****************************************************************************
 * Exported function
 * - This function will be availabled in the Javascript code.
 ***************************************************************************/

EMSCRIPTEN_KEEPALIVE
int mandelbrot ( int numIter, float targetX, float targetY, float range,
                 int gridSize, int x, int y )
{
    int n = numIter;

    struct Complex z = { 0, 0 };

    //The value of C is calculated as an offset from the target coord
    //by a fraction of the total 'range' of values within the grid
    float cReal = targetX-(range/2)+(range/gridSize)*x;
    float cImag = targetY-(range/2)+(range/gridSize)*y;

    struct Complex c = { cReal, cImag };

    while ( n > 0 )
    {
        n--;            
    }

    return n;

}

