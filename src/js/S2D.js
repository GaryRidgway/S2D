// TODO: Comment functions.

function S2D(S2Dpoint) {
    //---VARIABLE INITIALIZATION---///
    const isConfigObject =
      typeof S2Dpoint.point !== "undefined" ? !!S2Dpoint.point : false;
  
    this.point = S2Dpoint;
    if (isConfigObject) {
      this.point = S2Dpoint.point;
    }
  
    let point = this.point;
    let horizontalSliderTop = null;
    let horizontalSliderBottom = null;
    let verticalSliderLeft = null;
    let verticalSliderRight = null;
  
    initializeHandleHTML();
  
    this.handle = point.querySelector(".grapple-handle");
    const handle = this.handle;
  
    maskHandles();
  
    this.sliderContainer = point.parentElement;
    const sliderContainer = this.sliderContainer;
    this.handleIndex = point.id.replace("grapple-point-", "");
  
    let onMoveFn = function () {};
    const handleIndex = this.handleIndex;
  
    this.horizontalRange = { low: null, high: null, suffix: null };
    this.verticalRange = { low: null, high: null, suffix: null };
  
    point.onmousedown = function (event) {
      doMouseDown(event);
    };
  
    //---PUBLIC FUNCTIONS---///
  
    this.clearHandleHTML = function (handleIdentifier) {
      this.setHandleInnerHTML(handleIdentifier, "");
    };
  
    this.fswep = function (float, places = 3) {
      return fswep(float, places);
    };
  
    this.getRanges = function () {
      if (
        typeof this.horizontalRange.low !== "object" &&
        typeof this.horizontalRange.high !== "object" &&
        typeof this.verticalRange.low !== "object" &&
        typeof this.verticalRange.high !== "object"
      ) {
        return {
          h: this.horizontalRange,
          v: this.verticalRange
        };
      } else {
        return {
          h: null,
          v: null
        };
      }
    };
  
    this.getValues = function (percent = false) {
      const ranges = this.getRanges();
      const slider = point.parentElement;
      let preliminaryVals;
  
      // The user has not defined a set of ranges.
      if ((ranges.h === null && ranges.v === null) || percent) {
        preliminaryVals = {
          h: parseFloat(slider.getAttribute("horizontal-" + handleIndex)),
          hSuffix: "%",
          v: parseFloat(slider.getAttribute("vertical-" + handleIndex)),
          vSuffix: "%"
        };
      }
  
      // The user has defined a set of ranges.
      else {
        const xPercent = parseFloat(
          slider.getAttribute("horizontal-" + handleIndex)
        );
        const yPercent = parseFloat(
          slider.getAttribute("vertical-" + handleIndex)
        );
  
        preliminaryVals = {
          h: scaleMap(xPercent, 0, 100, ranges.h.low, ranges.h.high),
          hSuffix: ranges.h.suffix,
          v: scaleMap(yPercent, 0, 100, ranges.v.low, ranges.v.high),
          vSuffix: ranges.v.suffix
        };
      }
  
      return {
        h: rtp(preliminaryVals.h),
        hSuffix: preliminaryVals.hSuffix,
        v: rtp(preliminaryVals.v),
        vSuffix: preliminaryVals.vSuffix
      };
    };
  
    this.moveTo = function (position) {
      doMouseDown(null, null, position);
    };
  
    this.rtp = function (float, places = 3) {
      rtp(float, places);
    };
  
    this.setHandleInnerHTML = function (handleIdentifier, newHTML) {
      handlesSwitch(handleIdentifier, "", function (element) {
        element.innerHTML = newHTML;
      });
      initTransformstyles();
    };
  
    this.setHorizontalRange = function (low, high, suffix) {
      this.horizontalRange = {
        low: low,
        high: high,
        suffix: suffix
      };
    };
  
    this.setLinks = function (linksInput) {
      setLinks(linksInput);
    };
  
    this.setMaskHandles = function (handlesInput = null) {
      maskHandles(handlesInput);
    };
  
    this.setOnMoveFunction = function (newMoveFunction, runOnce = true) {
      onMoveFn = newMoveFunction;
  
      runOnce ? onMoveFn() : "";
    };
  
    this.setVerticalRange = function (low, high, suffix) {
      this.verticalRange = {
        low: low,
        high: high,
        suffix: suffix
      };
    };
  
    /*
     * This function sets the vertical and horizontal ranges of the slider.
     * It can take One, Two, or Six arguments.
     *
     *
     * One argument:
     *    This must be an entire object that defines
     *    the high, low, and suffixes for both the horizontal
     *    and the vertical ranges.
     *
     *    Ex:
     *      ONE:
     *        {
     *          h: {
     *            low: NUMBER,
     *            high: NUMBER,
     *            suffix: STRING
     *          },
     *          v: {
     *            low: NUMBER,
     *            high: NUMBER,
     *            suffix: STRING
     *          },
     *        }
     *
     *      Example call:
     *        S2DInstance.seRanges(ONE);
     *
     *
     * Two arguments:
     *    This must be two objects that define the
     *    horizontal and vertical ranges with suffixes.
     *
     *    Ex:
     *      ONE: // The Horizontal range.
     *        {
     *          low: NUMBER,
     *          high: NUMBER,
     *          suffix: STRING
     *        }
     *      TWO: // The Vertical range.
     *        {
     *          low: NUMBER,
     *          high: NUMBER,
     *          suffix: STRING
     *        }
     *
     *      Example call:
     *        S2DInstance.seRanges(ONE, TWO);
     *
     *
     * Four arguments:
     *    This must be the low and high values of the
     *    horizontal and vertical ranges respectively.
     *
     *    Ex:
     *      ONE:   // The Horizontal low.
     *        NUMBER
     *      TWO:   // The Horizontal high.
     *        NUMBER
     *      THREE: // The Horizontal suffix.
     *        NUMBER
     *      FOUR:  // The Vertical low.
     *        NUMBER
     *      FIVE:  // The Vertical high.
     *        NUMBER
     *      SIX:   // The Vertical suffix.
     *        NUMBER
     *
     *      Example call:
     *        S2DInstance.seRanges(ONE, TWO, THREE, FOUR, FIVE, SIX);
     */
    this.setRanges = function () {
      switch (arguments.length) {
        case 1:
          this.setHorizontalRange(
            arguments[0].h.low,
            arguments[0].h.high,
            arguments[0].h.suffix
          );
          this.setVerticalRange(
            arguments[0].v.low,
            arguments[0].v.high,
            arguments[0].v.suffix
          );
          break;
  
        case 2:
          this.setHorizontalRange(
            arguments[0].low,
            arguments[0].high,
            arguments[0].suffix
          );
          this.setVerticalRange(
            arguments[1].low,
            arguments[1].high,
            arguments[1].suffix
          );
          break;
  
        case 6:
          this.setHorizontalRange(arguments[0], arguments[1], arguments[2]);
          this.setVerticalRange(arguments[3], arguments[4], arguments[5]);
          break;
  
        default:
          console.error("Wrong number of arguments!");
      }
    };
  
    //---PRIVATE FUNCTIONS---///
  
    function displayHandlesSwitch(handleIdentifier, displayString) {
      handlesSwitch(
        handleIdentifier,
        "",
        function (slider) {
          slider.style.display = displayString;
        },
        function () {
          let opacity = 0;
          let pointerEvents = "none";
          const handle = point.querySelector(".grapple-handle");
          if (displayString !== "none") {
            opacity = 1;
            pointerEvents = "all";
          }
  
          handle.style.opacity = opacity;
          handle.style.pointerEvents = pointerEvents;
        }
      );
    }
  
    function doMouseDown(event, init = null, explicitPosition = null) {
      init !== null
        ? ""
        : explicitPosition === null
        ? event.preventDefault()
        : "";
  
      const target =
        init !== null
          ? document
              .getElementById("grapple-point-" + init)
              .querySelector(".grapple-handle")
          : explicitPosition === null
          ? event.target
          : handle;
      const targetPositioner = target.closest('[id*="grapple-point-"]');
      const sliderArea = targetPositioner.parentNode;
  
      const handleBounds = {
        x: handle.getBoundingClientRect().width,
        y: handle.getBoundingClientRect().height
      };
  
      // Setup the initial transform styles
      initTransformstyles(handleBounds);
  
      const cursorPosition =
        init !== null
          ? pxToPercent(getElementPosRelativeToElement(handle, sliderArea))
          : explicitPosition !== null
          ? explicitPosition
          : pxToPercent(
              getPosRelativeToElement(event, sliderArea, {
                x: handleBounds.x / 2,
                y: handleBounds.y / 2
              })
            );
  
      const handlePosition = pxToPercent(
        getElementPosRelativeToElement(handle, sliderArea)
      );
      const handleOffset = {
        x: cursorPosition.x - handlePosition.x,
        y: cursorPosition.y - handlePosition.y
      };
  
      const lockHorizontal =
        target.closest(".grapple-point-vertical-slider") != null;
      const lockVertical =
        target.closest(".grapple-point-horizontal-slider") != null;
  
      const isLinked = !!targetPositioner.getAttribute("link");
      const bounds = {
        l: 0,
        r: 100,
        t: 0,
        b: 100
      };
      if (isLinked) {
        const links = targetPositioner.getAttribute("link").split(" ");
  
        links.forEach(function (link) {
          const linkAttrs = link.split("-");
          const linkDir = linkAttrs[0];
          const linkedHandleIndex = linkAttrs[1];
          const linkedHandleInitialized = !!sliderArea.getAttribute(
            "horizontal-" + linkedHandleIndex
          );
          if (linkedHandleInitialized) {
            if (linkDir === "l" || linkDir === "r") {
              bounds[linkDir] = parseFloat(
                sliderArea.getAttribute("horizontal-" + linkedHandleIndex)
              );
            }
            if (linkDir === "t" || linkDir === "b") {
              bounds[linkDir] = parseFloat(
                sliderArea.getAttribute("vertical-" + linkedHandleIndex)
              );
            }
          } else {
            const linkedElement = sliderContainer.getElementById(
              "grapple-point-" + linkedHandleIndex
            );
            const linkedElementBounds = linkedElement
              .getAttribute("initial-position")
              .split(",");
            if (linkDir === "l" || linkDir === "r") {
              bounds[linkDir] = parseFloat(linkedElementBounds[0]);
            }
            if (linkDir === "t" || linkDir === "b") {
              bounds[linkDir] = parseFloat(linkedElementBounds[1]);
            }
          }
        });
      }
  
      // Move the element on mousemove.
      document.addEventListener("mousemove", onMouseMove);
  
      // Move the targetPositioner to the mouse.
      // Let's use https://stackoverflow.com/questions/322378/javascript-check-if-mouse-button-down#answer-48970682 to make sure we track the mouse correctly even if a user is outside the box or window.
      function onMouseMove(event) {
        if (event.buttons !== 1) {
          resetMoveListeners(target);
          return;
        }
  
        const mousePos = percentPosition(event, sliderArea);
        const handleValues = moveAt(mousePos);
        setAreaAttributes(handleValues);
  
        // Links.
        const links = targetPositioner.getAttribute("link").split(" ");
        links.forEach(function (link) {
          const linkedElementId = parseInt(link.split("-")[1]);
          const linkIds = [
            handleIndex + "-" + linkedElementId,
            linkedElementId + "-" + handleIndex
          ];
  
          let selector = "";
          linkIds.forEach(function (linkId) {
            const idSelector = 'svg[slider-link="' + linkId + '"]';
            if (selector === "") {
              selector = idSelector;
            } else {
              selector = selector + ", " + idSelector;
            }
          });
  
          const linkElements = sliderContainer.querySelectorAll(selector);
          linkElements.forEach(function (linkSvg) {
            setSvgPoints(linkSvg, linkedElementId);
          });
        });
  
        // Run user defined move function.
        onMoveFn();
      }
  
      // Centers the element at (pageX, pageY) coordinates with offset.
      function moveAt(position, nonRelative = false) {
        const relativeHandleOffset = nonRelative ? { x: 0, y: 0 } : handleOffset;
        let x;
        if (!lockHorizontal) {
          x = fswep(
            Math.min(
              Math.max(position.x - relativeHandleOffset.x, bounds.l),
              bounds.r
            )
          );
        } else {
          x = fswep(parseFloat(handle.style.left.replace("%")));
        }
  
        let y;
        if (!lockVertical) {
          y = fswep(
            Math.min(
              Math.max(position.y - relativeHandleOffset.y, bounds.t),
              bounds.b
            )
          );
        } else {
          y = fswep(parseFloat(handle.style.top.replace("%")));
        }
  
        // Do the styles.
        horizontalSliderTop.style.left = "calc(" + x + "%)";
        horizontalSliderBottom.style.left = "calc(" + x + "%)";
        horizontalSliderTop.style.height = y + "%";
        horizontalSliderBottom.style.height = "calc(" + (100 - y) + "%)";
        horizontalSliderBottom.style.top = "calc(" + y + "%)";
        handle.style.left = x + "%";
  
        verticalSliderLeft.style.top = "calc(" + y + "%)";
        verticalSliderRight.style.top = "calc(" + y + "%)";
        verticalSliderLeft.style.width = x + "%";
        verticalSliderRight.style.width = "calc(" + (100 - x) + "%)";
        verticalSliderRight.style.left = "calc(" + x + "%)";
        handle.style.top = y + "%";
  
        const adjustedPosition = {
          x: x,
          y: y
        };
  
        return adjustedPosition;
      }
  
      // Drop the element, remove unneeded handlers
      target.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        target.onmouseup = null;
        resetMoveListeners(target);
      };
  
      function resetMoveListeners(element) {
        document.removeEventListener("mousemove", onMouseMove);
        element.onmouseup = null;
      }
  
      function pxToPercent(pxCoord) {
        return {
          x: floatStringWithExplicitPlaces(
            (pxCoord.x / sliderArea.getBoundingClientRect().width) * 100
          ),
          y: floatStringWithExplicitPlaces(
            (pxCoord.y / sliderArea.getBoundingClientRect().height) * 100
          )
        };
      }
  
      function setAreaAttributes(values, explicitIndex = null) {
        const index = explicitIndex === null ? handleIndex : explicitIndex;
  
        sliderArea.setAttribute(
          "horizontal-" + index,
          floatStringWithExplicitPlaces(values.x)
        );
        sliderArea.setAttribute(
          "vertical-" + index,
          floatStringWithExplicitPlaces(values.y)
        );
      }
  
      function getInitialPosition() {
        const initialPosition = targetPositioner.getAttribute("initial-position");
        if (initialPosition !== null) {
          const positions = initialPosition.split(",");
  
          return {
            x: parseFloat(positions[0]),
            y: parseFloat(positions[1])
          };
        } else {
          return {
            x: 0,
            y: 0
          };
        }
      }
  
      if (explicitPosition !== null) {
        setAreaAttributes(moveAt(explicitPosition, true));
      }
  
      if (init !== null) {
        const initValues = moveAt(getInitialPosition());
        setAreaAttributes(initValues, init);
      }
  
      onMoveFn();
    }
  
    function fswep(float, places = 3) {
      return floatStringWithExplicitPlaces(float, places);
    }
  
    function floatStringWithExplicitPlaces(float, places = 3) {
      const roundValToPlaces = rtp(float);
      const placesModifier = parseFloat("0." + "0".repeat(places) + "1");
      const valToPlaces = roundValToPlaces + placesModifier;
      const stringAtPlaces = valToPlaces
        .toString()
        .slice(0, places + Math.floor(float).toString().length + 1);
      return stringAtPlaces;
    }
  
    function getElementPosRelativeToElement(
      element0,
      element1,
      offset = { x: 0, y: 0 }
    ) {
      const rect0 = element0.getBoundingClientRect();
      const rect1 = element1.getBoundingClientRect();
      const x = rect0.left - rect1.left + offset.x; // X position within the element.
      const y = rect0.top - rect1.top + offset.y; // Y position within the element.
      return {
        x: x,
        y: y
      };
    }
  
    // Built from https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element/42111623#42111623
    // Event element should be something like, 'e.target' or ELEMENT.
    function getPosRelativeToElement(e, eventElement, offset = { x: 0, y: 0 }) {
      const rect = eventElement.getBoundingClientRect();
      const x = e.clientX - offset.x - rect.left; // X position within the element.
      const y = e.clientY - offset.y - rect.top; // Y position within the element.
      return {
        x: x,
        y: y
      };
    }
  
    function getRawValues(handleIndex) {
      const h = parseFloat(
        sliderContainer.getAttribute("horizontal-" + handleIndex)
      );
      const v = parseFloat(
        sliderContainer.getAttribute("vertical-" + handleIndex)
      );
  
      return {
        h: !isNaN(h) ? h : 0,
        v: !isNaN(v) ? v : 0
      };
    }
  
    function handlesSwitch(
      handleIdentifier,
      handlesToIgnore,
      sliderFunction,
      handleFunction = null
    ) {
      const filteredHandle = handleIdentifier.replace(handlesToIgnore, "");
      switch (handleIdentifier) {
        case "h":
          if (handleFunction === null) {
            sliderFunction(handle);
          } else {
            handleFunction(handle);
          }
          break;
        case "l":
          sliderFunction(verticalSliderLeft);
          break;
        case "r":
          sliderFunction(verticalSliderRight);
          break;
        case "t":
          sliderFunction(horizontalSliderTop);
          break;
        case "b":
          sliderFunction(horizontalSliderBottom);
          break;
      }
    }
  
    function initializeFromConfig(thisRef) {
      if (isConfigObject) {
        if (typeof S2Dpoint.setOnMoveFunction !== "undefined") {
          thisRef.setOnMoveFunction(S2Dpoint.setOnMoveFunction);
        }
        if (typeof S2Dpoint.setMaskHandles !== "undefined") {
          thisRef.setMaskHandles(S2Dpoint.setMaskHandles);
        }
        if (typeof S2Dpoint.setRanges !== "undefined") {
          thisRef.setRanges(S2Dpoint.setRanges);
        }
        if (typeof S2Dpoint.moveTo !== "undefined") {
          thisRef.moveTo(S2Dpoint.moveTo);
        }
        if (typeof S2Dpoint.setLinks !== "undefined") {
          thisRef.setLinks(S2Dpoint.setLinks);
        }
      }
    }
  
    function initializeHandleHTML() {
      const htmlString =
        '\
            <div class="grapple-point-slider grapple-point-horizontal-slider top"></div>\
            <div class="grapple-point-slider grapple-point-horizontal-slider bottom"></div>\
            <div class="grapple-point-slider grapple-point-vertical-slider left"></div>\
            <div class="grapple-point-slider grapple-point-vertical-slider right"></div>\
            <div class="grapple-handle"></div>\
          ';
  
      point.innerHTML = htmlString;
  
      horizontalSliderTop = point.querySelector(
        ".grapple-point-horizontal-slider.top"
      );
      horizontalSliderBottom = point.querySelector(
        ".grapple-point-horizontal-slider.bottom"
      );
      verticalSliderLeft = point.querySelector(
        ".grapple-point-vertical-slider.left"
      );
      verticalSliderRight = point.querySelector(
        ".grapple-point-vertical-slider.right"
      );
    }
  
    function initTransformstyles(explicitHandleBounds = null) {
      let handleBounds = {};
  
      if (explicitHandleBounds !== null) {
        handleBounds = explicitHandleBounds;
      } else {
        handleBounds = {
          x: handle.getBoundingClientRect().width,
          y: handle.getBoundingClientRect().height
        };
      }
  
      handle.style.transform =
        "translate(-" +
        handleBounds.x / 2 +
        "px, -" +
        +(handleBounds.y / 2) +
        "px)";
  
      const horizontalTopSliderWidth = horizontalSliderTop.getBoundingClientRect()
        .width;
      horizontalSliderTop.style.transform =
        "translateX(-" + horizontalTopSliderWidth / 2 + "px)";
  
      const horizontalBottomSliderWidth = horizontalSliderBottom.getBoundingClientRect()
        .width;
      horizontalSliderBottom.style.transform =
        "translateX(-" + horizontalBottomSliderWidth / 2 + "px)";
  
      const verticalLeftSliderHeight = verticalSliderLeft.getBoundingClientRect()
        .height;
      verticalSliderLeft.style.transform =
        "translateY(-" + verticalLeftSliderHeight / 2 + "px)";
  
      const verticalRightSliderHeight = verticalSliderRight.getBoundingClientRect()
        .height;
      verticalSliderRight.style.transform =
        "translateY(-" + verticalRightSliderHeight / 2 + "px)";
    }
  
    function maskHandles(handlesInput = null) {
      const handles =
        handlesInput !== null
          ? handlesInput.split("")
          : point.getAttribute("mask-handles") !== null
          ? point.getAttribute("mask-handles").split("")
          : [];
      let handlesNotMasked = "hlrtb";
  
      handles.forEach(function (element) {
        handlesNotMasked = handlesNotMasked.replace(element, "");
        displayHandlesSwitch(element, "none");
      });
  
      handlesNotMasked.split("").forEach(function (element) {
        handlesNotMasked = handlesNotMasked.replace(element, "");
        displayHandlesSwitch(element, "block");
      });
    }
  
    function percentPosition(e, sliderArea) {
      let pxOffset = getPosRelativeToElement(e, sliderArea);
      let percentOffset = {
        x: floatStringWithExplicitPlaces(
          (pxOffset.x / sliderArea.getBoundingClientRect().width) * 100
        ),
        y: floatStringWithExplicitPlaces(
          (pxOffset.y / sliderArea.getBoundingClientRect().height) * 100
        )
      };
      return percentOffset;
    }
  
    function roundToPlaces(float, places = 3) {
      const multiplier = Math.pow(10, places);
      const roundValToPlaces = Math.round(float * multiplier) / multiplier;
      return roundValToPlaces;
    }
  
    function rtp(float, places = 3) {
      return roundToPlaces(float, places);
    }
  
    function scaleMap(number, inMin, inMax, outMin, outMax) {
      return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
  
    function setLinks(linksInput = null) {
      if (linksInput !== null) {
        point.setAttribute("link", linksInput);
  
        linksInput.split(" ").forEach(function (link) {
          const otherHandleIndex = link.split("-")[1];
          const linkString = handleIndex + "-" + otherHandleIndex;
          const linkQuery =
            '\
              [slider-link="' +
            handleIndex +
            "-" +
            otherHandleIndex +
            '"],\
              [slider-link="' +
            otherHandleIndex +
            "-" +
            handleIndex +
            '"]';
          const svgExistsForLink =
            sliderContainer.querySelector(linkQuery) !== null;
  
          if (!svgExistsForLink) {
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/points
            const svgLink =
              '\
                    <svg\
                        slider-link="' +
              linkString +
              '"\
                        viewBox="0 0 100 100"\
                        xmlns="http://www.w3.org/2000/svg"\
                        preserveAspectRatio="none"\
                    >\
                        <polyline\
                            fill="none"\
                            stroke="#008eff"\
                            stroke-linecap="round"\
                            stroke-dasharray="4 2"\
                            points=""\
                            marker-end="url(#triangle)"\
                        ></polyline>\
                    </svg>\
                ';
  
            const svgDiv = document.createElement("div");
            svgDiv.classList.add("svg-container");
            svgDiv.innerHTML = svgLink;
            sliderContainer.prepend(svgDiv);
          }
  
          setSvgPoints(
            sliderContainer.querySelector(linkQuery),
            otherHandleIndex
          );
        });
      }
    }
  
    function setSvgPoints(svg, linkedElementId) {
      let sliderLinkString = svg.getAttribute("slider-link");
      const polyLine = svg.querySelector("polyline");
      const thisElementValues = getRawValues(handleIndex);
      const thisLinkedElementValues = getRawValues(linkedElementId);
  
      // Replacing with these hashes ensure that no integers are erroneously replaced.
      sliderLinkString = sliderLinkString.replace(
        handleIndex.toString(),
        "#hashIdentifier-ABCDEF#"
      );
      sliderLinkString = sliderLinkString.replace(
        linkedElementId.toString(),
        "#hashIdentifier-GHIJKL#"
      );
  
      sliderLinkString = sliderLinkString.replace(
        "#hashIdentifier-ABCDEF#",
        thisElementValues.h + "," + thisElementValues.v
      );
      sliderLinkString = sliderLinkString.replace(
        "#hashIdentifier-GHIJKL#",
        thisLinkedElementValues.h + "," + thisLinkedElementValues.v
      );
  
      sliderLinkString = sliderLinkString.replace("-", " ");
  
      polyLine.setAttribute("points", sliderLinkString);
    }
  
    //---POST INITIALIZATION EXECUTION---///
  
    // Initialize the grapple points.
    doMouseDown(null, handleIndex);
  
    // Initialize with config.
    initializeFromConfig(this);
  }