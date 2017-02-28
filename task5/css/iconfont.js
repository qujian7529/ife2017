;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-caidantubiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M716.69859 277.765211 561.389362 277.765211c-1.167592 5.188162-2.990101 10.025331-5.276167 14.542204l58.257845 0c7.075139 0 12.791327 6.53995 12.791327 14.594393 0 8.026814-5.716188 14.56574-12.791327 14.56574L409.715941 321.467549c-7.05672 0-12.791327-6.53995-12.791327-14.56574 0-8.054443 5.738701-14.594393 12.791327-14.594393l58.275241 0c-2.306532-4.516874-4.123924-9.354042-5.296633-14.542204L307.377134 277.765211c-21.145599 0-38.369889 19.618826-38.369889 43.702338l0 424.566672c0 24.119327 17.22429 43.738154 38.369889 43.738154l409.322479 0c21.154809 0 38.373982-19.618826 38.373982-43.738154L755.073596 321.467549C755.072573 297.384038 737.853399 277.765211 716.69859 277.765211zM409.571654 336.038406l204.66124 0c7.075139 0 12.791327 6.491855 12.791327 14.569834 0 8.030907-5.716188 14.546298-12.791327 14.546298l-204.66124 0c-7.051603 0-12.787234-6.515391-12.787234-14.546298C396.78442 342.53026 402.521075 336.038406 409.571654 336.038406zM650.480446 691.119517l-277.156344 0.088004c-7.043417 0-12.791327-6.54609-12.791327-14.582113 0-8.05035 5.747911-14.5903 12.791327-14.5903l277.156344-0.056282c7.052626 0 12.791327 6.54609 12.791327 14.573927C663.271774 684.612313 657.532049 691.119517 650.480446 691.119517zM650.480446 582.224388l-277.156344 0.048095c-7.043417 0-12.791327-6.506181-12.791327-14.564717s5.747911-14.542204 12.791327-14.542204l277.156344-0.083911c7.052626 0 12.791327 6.514367 12.791327 14.56881C663.271774 575.684438 657.532049 582.224388 650.480446 582.224388zM650.480446 473.313909l-277.156344 0.048095c-7.043417 0-12.791327-6.515391-12.791327-14.566764 0-8.058536 5.747911-14.546298 12.791327-14.546298l277.156344-0.083911c7.052626 0 12.791327 6.519484 12.791327 14.573927C663.271774 466.774983 657.532049 473.313909 650.480446 473.313909z"  ></path>' +
    '' +
    '<path d="M512.042467 0.261966c-282.57782 0-511.653099 229.079372-511.653099 511.658216s229.076302 511.647983 511.653099 511.647983c282.576797 0 511.653099-229.071186 511.653099-511.647983C1023.695566 229.341339 794.618241 0.261966 512.042467 0.261966zM780.655228 746.034221c0 40.172955-28.708855 72.879867-63.956637 72.879867l-409.322479 0c-35.240619 0-63.948451-32.706913-63.948451-72.879867L243.42766 321.467549c0-40.164768 28.708855-72.838935 63.948451-72.838935l155.318438 0c5.720282-25.071002 25.582655-43.706431 49.347918-43.706431 23.76424 0 43.626613 18.635429 49.346895 43.706431l155.310252 0c35.246759 0 63.956637 32.674167 63.956637 72.838935L780.655228 746.034221 780.655228 746.034221z"  ></path>' +
    '' +
    '<path d="M512.042467 292.307416c14.092973 0 25.586748-13.05534 25.586748-29.112038 0-16.081257-11.491729-29.136597-25.586748-29.136597-14.098089 0-25.582655 13.05534-25.582655 29.136597C486.459812 279.252075 497.944378 292.307416 512.042467 292.307416z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)