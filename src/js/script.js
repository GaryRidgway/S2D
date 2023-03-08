// Run external code.
// https://javascript.info/mouse-drag-and-drop.
const grapples = [];

const point0 = document.getElementById("grapple-point-0");
const point1 = document.getElementById("grapple-point-1");
const point2 = document.getElementById("grapple-point-2");

// Initializing from a config object.
const point0S2D = new S2D({
  point: point0,
  setMaskHandles: "rh",
  setRanges: {
    h: {
      low: 0,
      high: 5,
      suffix: "rem"
    },
    v: {
      low: 0,
      high: 4000,
      suffix: "px"
    }
  },
  moveTo: {
    x: 20.6,
    y: 30
  },
  setLinks: "r-1"
});
grapples.push(point0S2D);

// Initializing with functions.
const point1S2D = new S2D({
  point: point1
});
point1S2D.setMaskHandles("lr");
point1S2D.setRanges(0, 100, "percent", 0, 100, "percent");
point1S2D.moveTo({ x: 50.4, y: 60 });
point1S2D.setLinks("l-0 r-2");
grapples.push(point1S2D);

// Initializing with mixed object and function usage.
const point2S2D = new S2D({
  point: point2,
  setMaskHandles: "lh"
});
point2S2D.moveTo({ x: 75, y: 60 });
point2S2D.setLinks("l-1");
grapples.push(point2S2D);

point0S2D.setOnMoveFunction(function () {
  display(point0S2D.getValues(), point0S2D.handleIndex);
});

point1S2D.setOnMoveFunction(function () {
  display(point1S2D.getValues(), point1S2D.handleIndex);
});
point1S2D.setHandleInnerHTML("t", '<div class="extra-handle"></div>');

point2S2D.setOnMoveFunction(function () {
  display(point2S2D.getValues(), point2S2D.handleIndex);
});
point2S2D.setHandleInnerHTML("r", '<div class="extra-handle"></div>');

function getSliderValues() {
  const values = {};
  grapples.forEach(function (point) {
    let index = point.handleIndex;
    values[index] = point.getValues();
  });

  console.log(JSON.stringify(values, null, "  "));
  Swal.fire({
    title: "nice",
    html:
      "<pre><code>" +
      hljs.highlight(JSON.stringify(values, null, "  "), {
        language: "json"
      }).value +
      "</code></pre>",
    confirmButtonText: "close"
  });
}

function display(position, explicitIndex) {
  let index = explicitIndex;
  const display = document.querySelector(".display");
  const horizontal = position.h;
  const vertical = position.v;
  const horizontalSuffix = position.hSuffix;
  const verticalSuffix = position.vSuffix;
  const exists = !!display.querySelector("#display-" + index);
  !exists
    ? (display.innerHTML =
        '<div id="display-' + index + '"></div>' + display.innerHTML)
    : "";

  display.querySelector("#display-" + index).innerHTML =
    "<h4>Handle " +
    index +
    "</h4>" +
    '<div class="value-line">Horizontal&nbsp:&nbsp' +
    grapples[index].fswep(horizontal) +
    '<span class="suffix">' +
    horizontalSuffix +
    "</span>" +
    "</div>" +
    '<div class="value-line">Vertical&nbsp&nbsp&nbsp:&nbsp' +
    grapples[index].fswep(vertical) +
    '<span class="suffix">' +
    verticalSuffix +
    "</span>" +
    "</div>";
}
