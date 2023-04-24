/**
 * @description
 *  <div class="example example-1">
 *       <div class="example-text">
 *           <p>
 *               This first example shows a simple slider that can move in two dimensions.
 *           </p>
 *       </div>
 *       <div class="slider-right-container">
 *           <div id="slider-2D-1">
 *               <div id="grapple-point-11"></div>
 *           </div>
 *           <div class="slider-right-spacer">
 *           </div>
 *       </div>
 *   </div>
 *
 *   <div class=stats>
 *       <div><span class="handle-1 horizontal">Horizontal&nbsp: </span><span class="value"></span></div>
 *       <div><span class="handle-1 vertical">Vertical&nbsp&nbsp&nbsp: </span><span class="value"></span></div>
 *   </div>
 * @name 1: Simple 2D slider
 * @example
 * 

const E1GP1 = new S2D({
    point: document.querySelector('.example-1 #grapple-point-11'),
    moveTo: {
        x: 50,
        y: 50
    },
});
const E1GP1Horizontal = document.querySelector('.example-1 + .stats .handle-1.horizontal + .value');
const E1GP1Vertical = document.querySelector('.example-1 + .stats .handle-1.vertical + .value');
E1GP1.setOnMoveFunction(function() {
    const values = E1GP1.getValues();
    E1GP1Horizontal.innerHTML = values.h+values.hSuffix;
    E1GP1Vertical.innerHTML = values.v+values.vSuffix;
}, true);

 */
const E1GP1 = new S2D({
    point: document.querySelector('.example-1 #grapple-point-11'),
    moveTo: {
        x: 50,
        y: 50
    },
});
const E1GP1Horizontal = document.querySelector('.example-1 + .stats .handle-1.horizontal + .value');
const E1GP1Vertical = document.querySelector('.example-1 + .stats .handle-1.vertical + .value');
E1GP1.setOnMoveFunction(function() {
    const values = E1GP1.getValues();
    E1GP1Horizontal.innerHTML = values.h+values.hSuffix;
    E1GP1Vertical.innerHTML = values.v+values.vSuffix;
}, true);

/**
 * @description
 *   <div class="example example-2">
 *      <div class="example-text">
 *          <p>
 *              This second example shows how to create a horizontal slider.
 *          </p>
 *      </div>
 *      <div class="slider-right-container">
 *          <div id="slider-2D-2">
 *              <div id="grapple-point-21"></div>
 *          </div>
 *           <div class="slider-right-spacer">
 *           </div>
 *       </div>
 *   </div>
 *
 *   <div class=stats>
 *       <div><span class="handle-1 horizontal">Horizontal&nbsp: </span><span class="value"></span></div>
 *   </div>
 * 
 * 
 * @name 2: Horizontal slider
 * @example

const E2GP1 = new S2D({
    point: document.querySelector('.example-2 #grapple-point-21'),
    moveTo: {
        x: 50,
        y: 0
    },
    setMaskHandles: "rhl",
});
const E2GP1Horizontal = document.querySelector('.example-2 + .stats .handle-1.horizontal + .value');
E2GP1.setOnMoveFunction(function() {
    const values = E2GP1.getValues();
    E2GP1Horizontal.innerHTML = values.h+values.hSuffix;
}, true);

 */
const E2GP1 = new S2D({
    point: document.querySelector('.example-2 #grapple-point-21'),
    moveTo: {
        x: 50,
        y: 0
    },
    setMaskHandles: "rhl",
});
const E2GP1Horizontal = document.querySelector('.example-2 + .stats .handle-1.horizontal + .value');
E2GP1.setOnMoveFunction(function() {
    const values = E2GP1.getValues();
    E2GP1Horizontal.innerHTML = values.h+values.hSuffix;
}, true);

/**
 * @description
 * <div class="example example-3">
 *       <div class="example-text">
 *           <p>
 *               This third example shows how to create a vertical slider.
 *           </p>
 *       </div>
 * 
 *      <div class="slider-right-container">    
 *          <div id="slider-2D-3">
 *              <div id="grapple-point-31"></div>
 *          </div>
 *          <div class="slider-right-spacer">
 *          </div>
 *       </div>
 *   </div>
 *
 *   <div class=stats>
 *       <div><span class="handle-1 vertical">Vertical&nbsp&nbsp&nbsp: </span><span class="value"></span></div>
 *   </div>
 * 
 * 
 * @name 3: Vertical slider
 * @example

const E3GP1 = new S2D({
    point: document.querySelector('.example-3 #grapple-point-31'),
    moveTo: {
        x: 0,
        y: 50
    },
    setMaskHandles: "thb",
});
const E3GP1Vertical = document.querySelector('.example-3 + .stats .handle-1.vertical + .value');
E3GP1.setOnMoveFunction(function() {
    const values = E3GP1.getValues();
    E3GP1Vertical.innerHTML = values.v+values.vSuffix;
}, true);

 */
const E3GP1 = new S2D({
    point: document.querySelector('.example-3 #grapple-point-31'),
    moveTo: {
        x: 0,
        y: 50
    },
    setMaskHandles: "thb",
});
const E3GP1Vertical = document.querySelector('.example-3 + .stats .handle-1.vertical + .value');
E3GP1.setOnMoveFunction(function() {
    const values = E3GP1.getValues();
    E3GP1Vertical.innerHTML = values.v+values.vSuffix;
}, true);

/**
 * @description
 * <div class="example example-4">
 *       <div class="example-text">
 *           <p>
 *               This fourth example shows that you can link handles and have them become bounds of each other, disallowing either to go higher or lower than their bound partner.
 *           </p>
 *       </div>
 * 
 *      <div class="slider-right-container">
 *          <div id="slider-2D-4">
 *              <div id="grapple-point-41"></div>
 *              <div id="grapple-point-42"></div>
 *          </div>
 *          <div class="slider-right-spacer">
 *          </div>
 *       </div>
 *   </div>
 *
 *   <div class=stats>
 *      <div><span class="handle-1 horizontal">Horizontal 1&nbsp: </span><span class="value"></span></div>
 *      <div><span class="handle-1 vertical">Vertical 1&nbsp&nbsp&nbsp: </span><span class="value"></span></div>
 * 
 *      <div><span class="handle-2 horizontal">Horizontal 2&nbsp: </span><span class="value"></span></div>
 *      <div><span class="handle-2 vertical">Vertical 2&nbsp&nbsp&nbsp: </span><span class="value"></span></div>
 *   </div>
 * 
 * 
 * @name 4: Linked handles
 * @example

const E4GP1 = new S2D({
     point: document.querySelector('.example-4 #grapple-point-41'),
     moveTo: {
         x: 25,
         y: 25
     },
     setMaskHandles: "r",
     setLinks: "r-42"
 });
 const E4GP2 = new S2D({
     point: document.querySelector('.example-4 #grapple-point-42'),
     moveTo: {
         x: 75,
         y: 75
     },
     setMaskHandles: "l",
     setLinks: "l-41"
 });
 const E4GP1Horizontal = document.querySelector('.example-4 + .stats .handle-1.horizontal + .value');
 const E4GP1Vertical = document.querySelector('.example-4 + .stats .handle-1.vertical + .value');
 const E4GP2Horizontal = document.querySelector('.example-4 + .stats .handle-2.horizontal + .value');
 const E4GP2Vertical = document.querySelector('.example-4 + .stats .handle-2.vertical + .value');
 E4GP1.setOnMoveFunction(function() {
     const values = E4GP1.getValues();
     E4GP1Horizontal.innerHTML = values.h+values.hSuffix;
     E4GP1Vertical.innerHTML = values.v+values.vSuffix;
 }, true);
 E4GP2.setOnMoveFunction(function() {
     const values = E4GP2.getValues();
     E4GP2Horizontal.innerHTML = values.h+values.hSuffix;
     E4GP2Vertical.innerHTML = values.v+values.vSuffix;
 }, true);
 
 */
const E4GP1 = new S2D({
     point: document.querySelector('.example-4 #grapple-point-41'),
     moveTo: {
         x: 25,
         y: 25
     },
     setMaskHandles: "r",
     setLinks: "r-42"
 });
 const E4GP2 = new S2D({
     point: document.querySelector('.example-4 #grapple-point-42'),
     moveTo: {
         x: 75,
         y: 75
     },
     setMaskHandles: "l",
     setLinks: "l-41"
 });
 const E4GP1Horizontal = document.querySelector('.example-4 + .stats .handle-1.horizontal + .value');
 const E4GP1Vertical = document.querySelector('.example-4 + .stats .handle-1.vertical + .value');
 const E4GP2Horizontal = document.querySelector('.example-4 + .stats .handle-2.horizontal + .value');
 const E4GP2Vertical = document.querySelector('.example-4 + .stats .handle-2.vertical + .value');
 E4GP1.setOnMoveFunction(function() {
     const values = E4GP1.getValues();
     E4GP1Horizontal.innerHTML = values.h+values.hSuffix;
     E4GP1Vertical.innerHTML = values.v+values.vSuffix;
 }, true);
 E4GP2.setOnMoveFunction(function() {
     const values = E4GP2.getValues();
     E4GP2Horizontal.innerHTML = values.h+values.hSuffix;
     E4GP2Vertical.innerHTML = values.v+values.vSuffix;
 }, true);