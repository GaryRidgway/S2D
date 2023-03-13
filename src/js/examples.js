/**
 * 
 * <div class="example example-1">
        <div class="example-text">
            <p>
                This first example shows a simple slider that can move in two dimensions.
            </p>
            <div><span class="handle-0 horizontal">Horizontal: </span><span class="value"></span></div>
            <div><span class="handle-0 vertical">Vertical: </span><span class="value"></span></div>
        </div>
        <div id="slider-2D-1">
            <div id="grapple-point-1"></div>
        </div>
    </div>
 * @name Example 1, Grapple point 1
 * 
 * @example
const E1GP = new S2D({
    point: document.getElementById('grapple-point-1'),
    moveTo: {
        x: 50,
        y: 50
    }
});

const E1Horizontal = document.querySelector('.handle-0.horizontal + .value');
const E1Vertical = document.querySelector('.handle-0.vertical + .value');
E1GP.setOnMoveFunction(function() {
    const values = E1GP.getValues();
    E1Horizontal.innerHTML = values.h+values.hSuffix;
    E1Vertical.innerHTML = values.v+values.vSuffix;
}, true);
 */
const E1GP = new S2D({
    point: document.getElementById('grapple-point-1'),
    moveTo: {
        x: 50,
        y: 50
    }
});

const E1Horizontal = document.querySelector('.handle-0.horizontal + .value');
const E1Vertical = document.querySelector('.handle-0.vertical + .value');
E1GP.setOnMoveFunction(function() {
    const values = E1GP.getValues();
    E1Horizontal.innerHTML = values.h+values.hSuffix;
    E1Vertical.innerHTML = values.v+values.vSuffix;
}, true);