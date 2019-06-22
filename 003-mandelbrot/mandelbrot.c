#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int mandelbrot ( int numIter, float targetX, float targetY, float range,
                 int gridSize, int x, int y )
{
    int n = numIter;

    float minX = targetX-(range/2);
    float minY = targetY-(range/2);

    float z[] = { 0, 0 };

    while ( n > 0 )
    {
        n--;            
    }

    return n;

}

