// TODO: Comment functions.
/**
 * <h3>Slider 2D</h3>
 * 
 * @name S2D
 * @class S2D
 * @classdesc
 * The Slider 2D class allows you to initialize a 
 * handle inside a "slider-2D-<i>X</i>" Element. 
 * This will then be able to be queried for its 
 * values within the two-dimensional space of the 
 * slider.
 * 
 * @param {Element} S2Dpoint A handle Element inside a "slider-2D-<i>X</i>" element.
 */
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
  
    /**
     * The handle identifier can be 't', 'b', 'l', or 
     * 'r', and will clear the inner HTML of the top, 
     * bottom, left, or right handles respectively.
     * 
     * @method clearHandleHTML
     * @memberof S2D#
     * @param {String} handleIdentifier 't', 'b', 'l', or 'r'
     * 
     * @returns {String}
     */
    this.clearHandleHTML = function (handleIdentifier) {
      this.setHandleInnerHTML(handleIdentifier, "");
    };
  
    /**
     * <h5>(Float to string with explicit places)</h5>
     * 
     * This function takes in a <i>float</i>&nbsp; and 
     * rounds it to <i>places</i>, but explicitly 
     * returns a string that will always have exactly 
     * the number of <i>places</i>&nbsp; digits after the 
     * decimal point.
     * <br>
     * Ex: 1.1 => '1.100'
     * 
     * 
     * @method fswep
     * @memberof S2D#
     * @param {Float} float 
     * @param {number} places Defaults to 3. Must be an integer.
     * 
     * @returns {String}
     */
    this.fswep = function (float, places = 3) {
      return fswep(float, places);
    };
  
    /**
     * This function gets the defined ranges for the S2D 
     * instance, with <i>h</i>&nbsp; and <i>v</i>&nbsp; 
     * representing the horizontal and vertical ranges 
     * respectively. If no ranges have been defined, 
     * <i>h</i>&nbsp; and <i>v</i>&nbsp; will be null.
     * 
     * 
     * @name Get ranges
     * @method getRanges
     * @memberof S2D#
     * @returns {Object}
     */
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

    /**
     * This function will return the <i>h</i>&nbsp; (Horizontal) 
     * and <i>v</i>&nbsp; (Vertical) values of the handle respective 
     * to its "slider-2D-<i>X</i>" container. If no ranges 
     * have previously been defined with {@link setRanges}, 
     * or if <i>percent</i>&nbsp; is <i>true</i>, then this will 
     * return the percentage value of its positions instead.
     * 
     * 
     * @name Get values
     * @method getValues
     * @memberof S2D#
     * @param {Boolean} percent Set to <i>true</i>&nbsp; if you want 
     * the values returned as percentages.
     * @returns {Object}
     */
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
  
    /**
     * This function takes in an Object with <i>x</i> and <i>y</i>
     * &nbsp; values in percentages.
     * 
     * 
     * @name Move to
     * @method moveTo
     * @memberof S2D#
     * @param {Object} position An object with an <i>x</i>&nbsp; 
     * and <i>y</i>&nbsp; position.
     */
    this.moveTo = function (position) {
      doMouseDown(null, null, position);
    };
  
    /**
     * <h5>(Round to places)</h5>
     * 
     * This function takes in a <i>float</i> and rounds it to <places>.
     * 
     * 
     * @alias Round to places
     * @method rtp
     * @memberof S2D#
     * @param {Number} float Needs to be a float.
     * @param {Number} places Needs to be an integer, defaults to 3.
     */
    this.rtp = function (float, places = 3) {
      rtp(float, places);
    };
  
    /**
     * Sets the inner HTML of a handle. This is useful to create 
     * custom handle elements that can be styled independently.
     * 
     * 
     * @method setHandleInnerHTML
     * @memberof S2D#
     * @param {String} handleIdentifier 't', 'b', 'l', or 'r'.
     * @param {String} newHTML HTML to be placed inside a handle.
     */
    this.setHandleInnerHTML = function (handleIdentifier, newHTML) {
      handlesSwitch(handleIdentifier, "", function (element) {
        element.innerHTML = newHTML;
      });
      initTransformstyles();
    };
  
    /**
     * This function sets the horizontal range 
     * of the slider. The handle will then map its percent 
     * position to the horizontal range provided to give the proper 
     * horizontal return values when {@link getValues} is called.
     * 
     * 
     * @method setHorizontalRange
     * @memberof S2D#
     * @param {Number} low The low of the range.
     * @param {Number} high The high of the range.
     * @param {String} suffix The suffix of the ranges value.
     */
    this.setHorizontalRange = function (low, high, suffix) {
      this.horizontalRange = {
        low: low,
        high: high,
        suffix: suffix
      };
    };
  
    /**
     * This function sets a link to another handle, represented 
     * as "{direction}-{handleindex}". This binds the direction's 
     * bounds to the relevant directional bound of the linked 
     * handle. For example, if you input "r-1", then this 
     * handle will be linked on the right side to handle 1, 
     * and cannot move past the horizontal position of 
     * handle 1.
     * 
     * 
     * @method setLinks
     * @memberof S2D#
     * @param {String} linksInput 
     */
    this.setLinks = function (linksInput) {
      setLinks(linksInput);
    };
  
    /**
     * This function masks the defined handles, making them uninteractable.
     * 
     * 
     * @method maskHandles
     * @memberof S2D#
     * @param {String} handlesInput Can be 't', 'b', 'l', or 'r'. Defaults to null.
     */
    this.setMaskHandles = function (handlesInput = null) {
      maskHandles(handlesInput);
    };
  
    /**
     * This function sets a function to be called whenever the handle is moved.
     * 
     * 
     * @method setOnMoveFunction
     * @memberof S2D#
     * @param {Object} newMoveFunction A function to run when the handle is moved.
     * @param {Boolean} runOnce Should the function run once when it is set? Defaults to false.
     */
    this.setOnMoveFunction = function (newMoveFunction, runOnce = true) {
      onMoveFn = newMoveFunction;
  
      runOnce ? onMoveFn() : "";
    };
  
    /**
     * This function sets the vertical range 
     * of the slider. The handle will then map its percent 
     * position to the vertical range provided to give the proper 
     * vertical return values when {@link getValues} is called.
     * 
     * 
     * @method setVerticalRange
     * @memberof S2D#
     * @param {Number} low The low of the range.
     * @param {Number} high The high of the range.
     * @param {String} suffix The suffix of the ranges value.
     */
    this.setVerticalRange = function (low, high, suffix) {
      this.verticalRange = {
        low: low,
        high: high,
        suffix: suffix
      };
    };
  
    /**
     * This function sets the horizontal and vertical ranges 
     * of the slider. The handle will then map its percent 
     * position to the ranges provided to give the proper 
     * return values when {@link getValues} is called.
     * <br>
     * It can take One, Two, or Six arguments.
     * <br><br>
     * The Suffixes passed in for any of the following options 
     * can be any string. It will be returned with the values 
     * of the handle when {@link getValues} is called.
     * 
     * 
     * @method setRanges
     * @memberof S2D#
     * 
     * @example
     * <caption>
     * One argument: <br>
     *    &emsp; This must be an entire object that defines 
     *           the high, low, and suffixes for both the horizontal
     *           and the vertical ranges.
     * </caption>
     *
     *    Ex:
     *      Arg_1:
     *        {
     *          h: {
     *            low: {Number},
     *            high: {Number},
     *            suffix: {String}
     *          },
     *          v: {
     *            low: {Number},
     *            high: {Number},
     *            suffix: {String}
     *          },
     *        }
     *
     *      // Example call:
     *      S2DInstance.seRanges(Arg_1);
     *
     * @example
     * <caption>
     * Two arguments: <br>
     *    &emsp; This must be two objects that define the 
     *           horizontal and vertical ranges with suffixes.
     * </caption>
     *
     *    Ex:
     *      Arg_1: // The Horizontal range.
     *        {
     *          low: {Number},
     *          high: {Number},
     *          suffix: {String}
     *        }
     *      Arg_2: // The Vertical range.
     *        {
     *          low: {Number},
     *          high: {Number},
     *          suffix: {String}
     *        }
     *
     *      // Example call:
     *      S2DInstance.seRanges(Arg_1, Arg_2);
     *
     * @example
     * <caption>
     * Six arguments: <br>
     *    &emsp; This must be the low and high values of 
     *           the horizontal and vertical ranges respectively.
     * </caption>
     *    Ex:
     *      Arg_1:   // The Horizontal low.
     *        {Number}
     *      Arg_2:   // The Horizontal high.
     *        {Number}
     *      Arg_3: // The Horizontal suffix.
     *        {String}
     *      Arg_4:  // The Vertical low.
     *        {Number}
     *      Arg_5:  // The Vertical high.
     *        {Number}
     *      Arg_6:   // The Vertical suffix.
     *        {String}
     *
     *      // Example call:
     *      S2DInstance.seRanges(Arg_1, Arg_2, Arg_3, Arg_4, Arg_5, Arg_6);
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
            const linkedElement = sliderContainer.querySelector(
              "#grapple-point-" + linkedHandleIndex
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
        const linkAttr = targetPositioner.getAttribute("link");
        if (linkAttr !== null) {
          const links = linkAttr.split(" ");
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
        }
  
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