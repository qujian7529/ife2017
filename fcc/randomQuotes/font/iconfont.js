;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-qq" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M685.466 414.126 360.722 414.126 574.562 450.778 344.884 637.972 693.384 637.972 487.462 593.402Z"  ></path>' +
    '' +
    '<path d="M516.026 46C257.784 46 48.412 255.372 48.412 513.614c0 258.24 209.372 467.588 467.614 467.588 258.24 0 467.562-209.348 467.562-467.588C983.588 255.372 774.266 46 516.026 46zM820.026 429.864l-118.82 100.726 39.492 253.578c-7.918 7.894-8.112 7.894-16.078 7.894l-206.31-126.79L311.56 792.062c-15.836 0-17.464 0-17.464-7.894l28.442-253.578-125.332-110.926L154.36 389.252l-12.096 0 0-1.312 12.096 1.312 111.292 0 134.658 0 31.698-56.472 79.206-167.376c7.894 0 7.894 0 15.862 0l87.1 167.376 31.698 56.472 134.612 0 79.23 0c7.918 0 7.918-4.638 7.918 3.304L820.026 429.864z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-renren" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M522.316 341.166c-40.58 46.337-65.365 106.801-65.365 173.221 0 66.363 24.693 126.911 65.365 173.221 40.585-46.337 65.365-106.865 65.365-173.221 0-66.406-24.693-126.911-65.365-173.221zM521.678 28.512c-267.808 0-484.979 217.090-484.979 484.979s217.090 484.979 484.979 484.979 484.979-217.090 484.979-484.979-217.090-484.979-484.979-484.979zM128.707 690.308c-42.009-46.675-67.779-108.22-67.779-175.892 0-131.923 97.137-240.914 223.71-260.085v201.143c-0.001 0 4.398 122.912-155.952 234.876zM324.274 777.751c-43.762 0-84.923-10.78-121.187-29.708 31.84-23.182 95.666-78.083 118.704-160.421 0 0 42.625 96.358 127.879 157.845-37.275 20.381-79.835 32.293-125.321 32.293zM524.498 689.78c-0.706-0.707-1.437-1.376-2.116-2.116-0.513 0.582-1.109 1.109-1.634 1.635-43.319-27.684-137.55-97.979-155.826-236.797v-198.011c62.423 9.695 117.635 41.161 157.469 86.694 39.845-45.47 94.948-76.892 157.39-86.663v200.918c0-0.001 4.353 122.524-155.233 234.326zM720.382 777.751c-43.966 0-85.157-11.125-121.563-30.173 32.034-23.423 95.039-78.083 118.020-159.92 0 0 42.901 97.040 128.768 158.53-37.249 20.211-79.847 31.634-125.226 31.634zM759.951 452.509v-198.174c126.669 19.075 223.847 128.079 223.847 260.085 0 65.678-24.188 125.593-63.984 171.709-37.209-19.93-147.523-90.64-159.837-233.63z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-qietu10" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M453.973333 477.866667c-91.022222 9.102222-160.426667 64.853333-153.6 124.017778 5.688889 60.302222 84.195556 101.262222 175.217778 92.16 91.022222-9.102222 160.426667-64.853333 153.6-124.017778C623.502222 509.724444 544.995556 468.764444 453.973333 477.866667zM533.617778 618.951111c-18.204444 42.097778-71.68 64.853333-117.191111 50.062222-43.235556-13.653333-62.577778-56.888889-43.235556-96.711111 19.342222-38.684444 68.266667-60.302222 111.502222-48.924444C529.066667 534.755556 551.822222 576.853333 533.617778 618.951111z"  ></path>' +
    '' +
    '<path d="M441.457778 585.955556c-13.653333-5.688889-31.857778 0-40.96 13.653333C391.395556 614.4 395.946667 630.328889 409.6 637.155556c13.653333 6.826667 32.995556 0 42.097778-13.653333C459.662222 608.711111 455.111111 592.782222 441.457778 585.955556z"  ></path>' +
    '' +
    '<path d="M475.591111 572.302222c-5.688889-2.275556-12.515556 0-14.791111 5.688889-3.413333 5.688889-1.137778 11.377778 4.551111 13.653333 5.688889 2.275556 12.515556 0 15.928889-5.688889C483.555556 580.266667 481.28 574.577778 475.591111 572.302222z"  ></path>' +
    '' +
    '<path d="M512 0C228.693333 0 0 228.693333 0 512c0 283.306667 228.693333 512 512 512s512-228.693333 512-512C1024 228.693333 795.306667 0 512 0zM474.453333 727.04c-113.777778 0-230.968889-55.751111-230.968889-146.773333 0-47.786667 29.582222-102.4 81.92-154.737778 69.404444-69.404444 150.186667-101.262222 180.906667-70.542222 13.653333 13.653333 14.791111 36.408889 5.688889 63.715556-4.551111 13.653333 13.653333 5.688889 13.653333 5.688889 55.751111-23.893333 104.675556-25.031111 122.88 1.137778 9.102222 13.653333 9.102222 32.995556 0 54.613333-4.551111 10.24 1.137778 11.377778 9.102222 13.653333 31.857778 10.24 67.128889 32.995556 67.128889 75.093333C723.626667 639.431111 624.64 727.04 474.453333 727.04zM681.528889 436.906667c3.413333-11.377778 1.137778-23.893333-6.826667-34.133333-9.102222-9.102222-21.617778-13.653333-32.995556-10.24l0 0c-10.24 2.275556-19.342222-4.551111-21.617778-13.653333-2.275556-10.24 4.551111-19.342222 13.653333-21.617778 23.893333-4.551111 50.062222 2.275556 67.128889 21.617778 17.066667 19.342222 22.755556 45.511111 14.791111 69.404444-3.413333 9.102222-13.653333 14.791111-22.755556 11.377778C683.804444 457.386667 678.115556 447.146667 681.528889 436.906667L681.528889 436.906667zM787.342222 471.04 787.342222 471.04c-3.413333 11.377778-15.928889 17.066667-26.168889 13.653333-11.377778-3.413333-17.066667-15.928889-13.653333-26.168889l0 0c11.377778-34.133333 4.551111-72.817778-21.617778-101.262222-26.168889-28.444444-63.715556-39.822222-98.986667-31.857778-11.377778 2.275556-22.755556-4.551111-25.031111-15.928889-2.275556-11.377778 4.551111-22.755556 15.928889-25.031111l0 0c48.924444-10.24 102.4 4.551111 138.808889 44.373333C793.031111 368.64 802.133333 423.253333 787.342222 471.04z"  ></path>' +
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