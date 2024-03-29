!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "object" == typeof module && module.exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (l) {
  "use strict";
  var n,
    s = window.JdSlider || {},
    r = {
      isUse: !0,
      wrap: null,
      slide: ".slide-area",
      prev: ".prev",
      next: ".next",
      indicate: ".indicate-area",
      auto: ".auto",
      playClass: "play",
      pauseClass: "pause",
      noSliderClass: "slider--none",
      willFocusClass: "will-focus",
      unusedClass: "hidden",
      slideShow: 1,
      slideToScroll: 1,
      slideStart: 1,
      margin: null,
      speed: 1000,
      timingFunction: "cubic-bezier(.02,.01,.47,1)",
      easing: "swing",
      interval: 4e3,
      touchDistance: 20,
      resistanceRatio: 0.5,
      isOverflow: !1,
      isIndicate: !0,
      isAuto: !1,
      isLoop: !1,
      isSliding: !0,
      isCursor: !0,
      isTouch: !0,
      isDrag: !0,
      isResistance: !0,
      isCustomAuto: !1,
      autoState: "auto",
      indicateList: function (i) {
        return '<a href="#">' + i + "</a>";
      },
      progress: function () {},
      callback: function () {},
      onPrev: function () {},
      onNext: function () {},
      onIndicate: function () {},
      onAuto: function () {},
      responsive: [],
    },
    d = window.navigator.userAgent.match(
      "LG|SAMSUNG|Samsung|iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson"
    ),
    p = window.navigator.userAgent.match("iPhone|iPod|iPad"),
    e = window.navigator.userAgent.toLocaleLowerCase().match("firefox"),
    o =
      ("Netscape" === window.navigator.appName &&
        -1 !== window.navigator.userAgent.toLowerCase().indexOf("trident")) ||
      -1 !== window.navigator.userAgent.toLowerCase().indexOf("msie"),
    c = (function () {
      var i = !0;
      "Microsoft Internet Explorer" === window.navigator.appName &&
        null !==
          new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(
            window.navigator.userAgent
          ) &&
        (i = parseFloat(RegExp.$1)) <= 9 &&
        (i = !1);
      return i;
    })(),
    u = l(window),
    a = function (i) {
      i.preventDefault ? i.preventDefault() : (i.returnValues = !1);
    },
    t = function (i) {
      i.stopPropagation ? i.stopPropagation() : (i.cancelBubble = !0);
    };
  (n = 0),
    ((s = function (i, t) {
      var e = this;
      (e.obj = l(i)),
        (e.options = t),
        (e.opt = l.extend({}, r, t)),
        (e.idx = n),
        n++,
        (e.winW =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth),
        (e.wrap = null),
        (e.slide = null),
        (e.prev = null),
        (e.next = null),
        (e.auto = null),
        (e.indicate = null),
        (e.marginRight = null),
        (e.duration = null),
        e.init().selectorSet(),
        (e.transition = function (i, t) {
          i.css({
            webkitTransition:
              t + " " + e.duration + "ms " + e.opt.timingFunction,
            transition: t + " " + e.duration + "ms " + e.opt.timingFunction,
          });
        }),
        (e.transitionNone = function (i) {
          i.css({ webkitTransition: "", transition: "" });
        }),
        (e.swipes = {
          touch: null,
          touchStep: null,
          touchX1: null,
          touchX2: null,
          touchY1: null,
          touchY2: null,
          touchMoveX: null,
          touchMoveY: null,
          startPosition: null,
          position: { prev: null, current: null },
          scrolling: null,
        }),
        (e.setTimer = null),
        (e.setInter = null),
        (e.setLoop = null),
        (e.isMotion = !1),
        (e.responsiveLen = null),
        e.init().func(!0),
        e.visibilityChange().event(),
        e.resize().event(),
        e.trigger().event();
    }).prototype.init = function () {
      var o = this,
        n = null,
        t = function () {
          (o.wrap = null === o.opt.wrap ? o.obj : o.obj.find(o.opt.wrap).eq(0)),
            (o.slide = o.obj.find(o.opt.slide).eq(0)),
            (o.prev = o.obj.find(o.opt.prev)),
            (o.next = o.obj.find(o.opt.next)),
            (o.auto = o.obj.find(o.opt.auto)),
            (o.indicate = o.obj.find(o.opt.indicate)),
            (o.marginRight = o.opt.margin),
            (o.duration = o.opt.speed);
        },
        e = function () {
          o.transitionNone(o.slide), o.transitionNone(o.slide.find(">*"));
        },
        s = function () {
          o.slide.find(">.clone")[0] && o.slide.find(">.clone").remove();
        },
        d = function () {
          o.setting().reset(),
            o.update().func(),
            o.currentTab().func(!1),
            o.rendering3D().func(),
            o.imgDrag().func(),
            o.indicate.hide().find(".on").removeClass("on"),
            o.obj.addClass(o.opt.noSliderClass),
            "false" === o.auto.attr("data-state") && o.control().auto();
        },
        a = {
          all: function () {
            "none" !== o.slide.find(">*").css("float") &&
              o.slide.find(">*").css("display", "block"),
              o.setting().reset(),
              o.setting().init(),
              o.swipe().init(),
              o.control().extreme(),
              o.update().func(),
              o.currentTab().func(!0),
              o.rendering3D().func(),
              o.imgDrag().func();
          },
          sliding: function () {
            var i = o.slide.find(">*").not(".clone").length,
              t = 0;
            if (
              (o.obj.removeClass(o.opt.noSliderClass),
              o.transition(o.slide, "transform"),
              o.opt.isLoop && o.opt.isSliding)
            ) {
              for (
                var e = o.opt.isOverflow
                    ? i
                    : o.opt.slideShow + o.opt.slideToScroll - 1,
                  n = [],
                  s = [];
                t < e;
                t++
              )
                (n[e - 1 - t] = o.slide
                  .find(">*")
                  .not(".clone")
                  .eq(i - 1 - (t % i))
                  .clone()
                  .addClass("clone")[0].outerHTML),
                  (s[t] = o.slide
                    .find(">*")
                    .not(".clone")
                    .eq(t % i)
                    .clone()
                    .addClass("clone")[0].outerHTML);
              o.slide[0].innerHTML =
                n.join("") + o.slide[0].innerHTML + s.join("");
            }
          },
          fade: function () {
            o.transition(o.slide.find(">*"), "opacity");
          },
        };
      return {
        transitionOff: e,
        cloneRemove: s,
        selectorSet: t,
        func: function (i) {
          (n = i),
            o.obj.hasClass(o.opt.noSliderClass) && (n = !0),
            n && p && u.on("touchmove", function () {}),
            e(),
            s(),
            (function () {
              var i,
                t = o.opt.responsive.length,
                e = 0;
              if (t) {
                if (null === o.responsiveLen) {
                  if (
                    (o.winW <= o.opt.responsive[0].viewSize &&
                      (o.responsiveLen = 0),
                    1 < t)
                  )
                    for (; e < t - 1; e++)
                      o.winW > o.opt.responsive[e].viewSize &&
                        o.winW <= o.opt.responsive[e + 1].viewSize &&
                        (o.responsiveLen = e + 1);
                  o.winW > o.opt.responsive[t - 1].viewSize &&
                    (o.responsiveLen = -1);
                }
                for (; e < t; e++)
                  (o.opt.responsive[e].settings.slideToScroll ||
                    (o.opt.responsive[e].settings.slideShow &&
                      (!o.opt.isLoop ||
                        void 0 !== o.opt.responsive[e].settings.isLoop))) &&
                    (n = !0);
                -1 === o.responsiveLen
                  ? (o.opt = l.extend({}, r, o.options))
                  : ((i = l.extend({}, r, o.options)),
                    (o.opt = l.extend(
                      {},
                      i,
                      i.responsive[o.responsiveLen].settings
                    )));
              }
            })(),
            t(),
            !o.opt.isUse ||
            o.slide.find(">*").not(".clone").length <= o.opt.slideShow
              ? d()
              : (o.opt.isSliding ? a.sliding() : a.fade(),
                n
                  ? (o.slide
                      .attr("data-index", o.opt.slideStart - 1)
                      .find(">*")
                      .removeClass("on")
                      .not(".clone")
                      .eq(o.opt.slideStart - 1)
                      .addClass("on"),
                    o.opt.isSliding ||
                      (o.slide
                        .find(">.on")
                        .css("opacity", 1)
                        .siblings()
                        .css("opacity", ""),
                      setTimeout(function () {
                        o.transition(o.slide.find(">*"), "opacity");
                      })))
                  : o.slide.find(">.clone.on").removeClass("on"),
                (function () {
                  var i = o.slide.find(">*").not(".clone").length,
                    t = 0;
                  if (o.opt.isIndicate)
                    if (
                      o.opt.isLoop &&
                      (i - o.opt.slideShow) % o.opt.slideToScroll != 0
                    )
                      o.indicate.hide();
                    else {
                      if (
                        Math.ceil(
                          (i - o.opt.slideShow) / o.opt.slideToScroll
                        ) !==
                        o.indicate.find(">*").length - 1
                      ) {
                        var e = [];
                        if (o.opt.isLoop) {
                          if (1 === o.opt.slideToScroll)
                            for (; t <= i - 1; t++)
                              e[t] = o.opt.indicateList(t + 1);
                        } else
                          for (
                            ;
                            t <=
                            Math.ceil(
                              (i - o.opt.slideShow) / o.opt.slideToScroll
                            );
                            t++
                          )
                            e[t] = o.opt.indicateList(t + 1);
                        o.indicate.empty().append(e);
                      }
                      (!n && o.indicate.find(".on")[0]) ||
                        (o.slide.attr("data-index", o.opt.slideStart - 1),
                        o.indicate
                          .find("a,button")
                          .eq(o.opt.slideStart - 1)
                          .addClass("on")
                          .siblings()
                          .removeClass("on")),
                        o.indicate.show();
                    }
                })(),
                a.all(),
                n ||
                  o.indicate
                    .find("a,button")
                    .removeClass("on")
                    .eq(Number(o.slide.attr("data-index")))
                    .addClass("on"),
                n
                  ? (o.auto.attr("data-state", o.opt.isAuto),
                    o.control().auto())
                  : "_.auto" !== o.opt.autoState &&
                    o.auto.attr("data-state", o.opt.isAuto));
        },
      };
    }),
    (s.prototype.currentTab = function () {
      var s = this,
        t = function () {
          s.slide
            .find(">*")
            .removeAttr("tabindex aria-hidden")
            .find("a,button")
            .removeAttr("tabindex aria-hidden");
        };
      return {
        reset: t,
        func: function (i) {
          s.opt.isUse &&
          s.slide.find(">*").not(".clone").length > s.opt.slideShow
            ? (function (i) {
                if (i) {
                  var t = l(document.activeElement),
                    e = s.slide.find(">.on").index(),
                    n = 0;
                  for (
                    s.slide.find(">.show").removeClass("show");
                    n < s.opt.slideShow;
                    n++
                  )
                    s.slide
                      .find(">*")
                      .eq(e + n)
                      .addClass("show");
                  s.slide
                    .find(">*")
                    .attr("tabindex", "-1")
                    .not(".show")
                    .attr("aria-hidden", "true")
                    .find("a,button")
                    .attr({ tabindex: "-1", "aria-hidden": "true" }),
                    s.slide
                      .find(">.show")
                      .attr("aria-hidden", "false")
                      .find("a,button")
                      .removeAttr("tabindex")
                      .attr("aria-hidden", "false"),
                    t.closest(s.opt.slide)[0] && t.blur();
                } else
                  s.slide
                    .find(">*")
                    .attr({ tabindex: "-1", "aria-hidden": "true" })
                    .find("a,button")
                    .attr({ tabindex: "-1", "aria-hidden": "true" });
              })(i)
            : t();
        },
      };
    }),
    (s.prototype.rendering3D = function () {
      var i = this,
        t = function () {
          i.slide.css({
            webkitPerspective: "",
            perspective: "",
            webkitBackfaceVisibility: "",
            backfaceVisibility: "",
          });
        };
      return {
        reset: t,
        func: function () {
          o ||
            (i.opt.isSliding &&
            i.opt.isUse &&
            i.slide.find(">*").not(".clone").length > i.opt.slideShow
              ? i.slide.css({
                  webkitPerspective: "1000px",
                  perspective: "1000px",
                  webkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                })
              : t());
        },
      };
    }),
    (s.prototype.imgDrag = function () {
      var i = this,
        t = function () {
          e
            ? i.slide.find("a,img").off("dragstart", function () {
                return !1;
              })
            : i.slide.find("a,img").css("-webkit-user-drag", "");
        };
      return {
        reset: t,
        func: function () {
          i.opt.isDrag &&
          i.opt.isUse &&
          i.slide.find(">*").not(".clone").length > i.opt.slideShow
            ? e
              ? i.slide.find("a,img").on("dragstart", function () {
                  return !1;
                })
              : i.slide.find("a,img").css("-webkit-user-drag", "none")
            : t();
        },
      };
    }),
    (s.prototype.update = function () {
      var i = this,
        t = null,
        e = null,
        n = null,
        s = null,
        o = null,
        d = null,
        a = null,
        l = function () {
          i.wrap.css("width", ""),
            c
              ? i.slide.css({ width: "", webkitTransform: "", transform: "" })
              : i.slide.css({ width: "", marginLeft: "" }),
            i.slide.find(">*").css({ display: "", width: "", marginRight: "" });
        };
      return {
        reset: l,
        func: function () {
          i.slide.attr("data-hover", "true"),
            (e = i.slide.find(">*").not(".clone").length),
            !i.opt.isSliding || !i.opt.isUse || e <= i.opt.slideShow
              ? l()
              : (i.wrap.css("width", ""),
                (d = window.getComputedStyle
                  ? window
                      .getComputedStyle(i.wrap[0], null)
                      .width.split("px")[0]
                  : i.wrap.width()),
                null !== i.opt.margin
                  ? ((i.marginRight =
                      -1 !== i.opt.margin.toString().indexOf("%")
                        ? (parseFloat(i.opt.margin) * d) / 100
                        : parseFloat(i.opt.margin)),
                    i.slide.find(">*").css("marginRight", i.marginRight + "px"))
                  : (i.marginRight = parseFloat(
                      i.slide.find(">*").css("marginRight")
                    )),
                (t = i.slide.find(">*").length),
                (e = i.slide.find(">*").not(".clone").length),
                window.getComputedStyle &&
                  -1 !==
                    window
                      .getComputedStyle(i.wrap[0], null)
                      .width.split("px")[0]
                      .indexOf(".") &&
                  i.wrap.css("width", d),
                i.slide
                  .find(">*")
                  .css(
                    "width",
                    Math.ceil(
                      (d - (i.opt.slideShow - 1) * i.marginRight) /
                        i.opt.slideShow
                    ) + "px"
                  ),
                (n = i.slide.find(">*").not(".clone").eq(0).index()),
                (s = i.slide.find(">.on").index() - n),
                (o =
                  parseFloat(i.slide.find(">*")[0].style.width) +
                  i.marginRight),
                (a =
                  !i.opt.isLoop &&
                  i.slide.attr("data-index") >=
                    Math.ceil((e - i.opt.slideShow) / i.opt.slideToScroll)
                    ? -o * (n + e - i.opt.slideShow)
                    : -o * (n + s)),
                c
                  ? (i.transitionNone(i.slide),
                    i.slide.css({
                      width: t * o + "px",
                      webkitTransform: "translate3d(" + a + "px,0,0)",
                      transform: "translate3d(" + a + "px,0,0)",
                    }),
                    setTimeout(function () {
                      i.transition(i.slide, "transform");
                    }))
                  : i.slide.css({ width: t * o + "px", marginLeft: a + "px" })),
            i.slide.attr("data-hover", "false");
        },
      };
    }),
    (s.prototype.setting = function () {
      var s = this,
        o = {
          isTrue: function () {
            s.slide.attr("data-hover", "true");
          },
          isFalse: function () {
            s.slide.attr("data-hover", "false");
          },
        };
      return {
        init: function () {
          var i = s.slide.find(">*").not(".clone").length,
            t = s.slide.find(">.on").index(),
            e = s.slide.find(">*").not(".clone").eq(0).index(),
            n =
              !s.opt.isLoop && t - e >= i - s.opt.slideShow
                ? Math.ceil((i - s.opt.slideShow) / s.opt.slideToScroll)
                : Math.floor((t - e) / s.opt.slideToScroll);
          s.slide
            .attr({ "data-hover": "false", "data-index": n })
            .on("click", l.proxy(s.swipe(), "clickFn")),
            s.obj
              .on("click", s.opt.prev, function () {
                return (
                  this.focus(),
                  s.control().prev.func(),
                  "false" === s.auto.attr("data-state") && s.setting().auto(),
                  s.opt.onPrev(),
                  !1
                );
              })
              .on("click", s.opt.next, function () {
                return (
                  this.focus(),
                  s.control().next.func(),
                  "false" === s.auto.attr("data-state") && s.setting().auto(),
                  s.opt.onNext(),
                  !1
                );
              })
              .on(
                "click",
                s.opt.indicate + " a," + s.opt.indicate + " button",
                function () {
                  var i = l(this);
                  return (
                    this.focus(),
                    s.control().indicate.func(i),
                    "false" === s.auto.attr("data-state") && s.setting().auto(),
                    s.opt.onIndicate(),
                    !1
                  );
                }
              )
              .on("click", s.opt.auto, function () {
                return s.control().auto(), s.opt.onAuto(), !1;
              })
              .on("keydown", s.opt.prev, function (i) {
                13 === i.keyCode &&
                  (s.opt.isLoop ||
                    1 !== Number(s.slide.attr("data-index")) ||
                    s.next.addClass(s.opt.willFocusClass));
              })
              .on("keydown", s.opt.next, function (i) {
                13 === i.keyCode &&
                  (s.opt.isLoop ||
                    Number(s.slide.attr("data-index")) !==
                      Math.ceil(
                        (s.slide.find(">*").length - s.opt.slideShow) /
                          s.opt.slideToScroll -
                          1
                      ) ||
                    s.prev.addClass(s.opt.willFocusClass));
              }),
            !d &&
              s.opt.isCursor &&
              (s.slide.on("mouseover", o.isTrue).on("mouseout", o.isFalse),
              s.prev.on("mouseover", o.isTrue).on("mouseout", o.isFalse),
              s.next.on("mouseover", o.isTrue).on("mouseout", o.isFalse),
              s.indicate
                .find("a,button")
                .on("mouseover", o.isTrue)
                .on("mouseout", o.isFalse),
              s.auto.on("mouseover", o.isTrue).on("mouseout", o.isFalse)),
            s.opt.isTouch &&
              s.slide
                .on("touchstart", l.proxy(s.swipe(), "touchStartFn"))
                .on("touchmove", l.proxy(s.swipe(), "touchMoveFn"))
                .on("touchend", l.proxy(s.swipe(), "touchEndFn")),
            s.opt.isDrag &&
              s.slide
                .on("mousedown", l.proxy(s.swipe(), "dragStartFn"))
                .on("mousemove", l.proxy(s.swipe(), "dragMoveFn"))
                .on("mouseup mouseleave", l.proxy(s.swipe(), "dragEndFn"));
        },
        hover: o,
        auto: function () {
          s.opt.isCustomAuto ||
            (s.setTimer && clearTimeout(s.setTimer),
            s.setInter && clearInterval(s.setInter),
            (s.setTimer = setTimeout(function () {
              s.control().interval(),
                (s.setInter = setInterval(
                  s.control().interval,
                  s.opt.interval + s.duration
                ));
            }, s.opt.interval)));
        },
        reset: function () {
          s.slide.removeAttr("data-hover"),
            s.obj.off("click", s.opt.prev),
            s.obj.off("click", s.opt.next),
            s.obj.off(
              "click",
              s.opt.indicate + " a," + s.opt.indicate + " button"
            ),
            s.obj.off("click", s.opt.auto),
            d ||
              (s.slide.off("mouseover", o.isTrue).off("mouseout", o.isFalse),
              s.prev.off("mouseover", o.isTrue).off("mouseout", o.isFalse),
              s.next.off("mouseover", o.isTrue).off("mouseout", o.isFalse),
              s.indicate
                .find("a,button")
                .off("mouseover", o.isTrue)
                .off("mouseout", o.isFalse),
              s.auto.off("mouseover", o.isTrue).off("mouseout", o.isFalse)),
            s.slide
              .off("touchstart", l.proxy(s.swipe(), "touchStartFn"))
              .off("touchmove", l.proxy(s.swipe(), "touchMoveFn"))
              .off("touchend", l.proxy(s.swipe(), "touchEndFn"))
              .off("mousedown", l.proxy(s.swipe(), "dragStartFn"))
              .off("mousemove", l.proxy(s.swipe(), "dragMoveFn"))
              .off("mouseup mouseleave", l.proxy(s.swipe(), "dragEndFn"));
        },
      };
    }),
    (s.prototype.control = function () {
      var e = this,
        i = {
          slideLen: null,
          slideIdx: null,
          firstIdx: null,
          indicateIdx: null,
          slideWid: null,
          x: null,
          unmove: function () {
            e.opt.isSliding
              ? c
                ? (e.slide.css({
                    webkitTransform: "translate3d(0,0,0)",
                    transform: "translate3d(0,0,0)",
                  }),
                  setTimeout(function () {
                    e.isMotion = !1;
                  }, e.duration))
                : e.slide.animate(
                    { marginLeft: 0 },
                    e.duration,
                    e.opt.easing,
                    function () {
                      e.isMotion = !1;
                    }
                  )
              : (e.isMotion = !1);
          },
          uneven: function () {
            var i =
              this.slideLen -
              e.opt.slideShow -
              ((this.slideLen - e.opt.slideShow) % e.opt.slideToScroll);
            e.transition(e.slide, "transform"),
              e.slide.find(">.on").removeClass("on"),
              e.slide.find(">*").eq(i).addClass("on"),
              e.slide.attr(
                "data-index",
                parseInt(e.slide.attr("data-index")) - 1
              ),
              e.opt.isIndicate &&
                (e.indicate.find(".on").removeClass("on"),
                e.indicate
                  .find("a,button")
                  .eq(this.indicateIdx - 1)
                  .addClass("on")),
              s(),
              e.opt.progress(),
              e.currentTab().func(!1),
              e.opt.isSliding
                ? c
                  ? (e.slide.css({
                      webkitTransform:
                        "translate3d(" + -this.slideWid * i + "px,0,0)",
                      transform:
                        "translate3d(" + -this.slideWid * i + "px,0,0)",
                    }),
                    setTimeout(function () {
                      e.opt.callback(),
                        (e.isMotion = !1),
                        e.currentTab().func(!0);
                    }, e.duration))
                  : e.slide.animate(
                      { marginLeft: -this.slideWid * i + "px" },
                      e.duration,
                      e.opt.easing,
                      function () {
                        e.opt.callback(),
                          (e.isMotion = !1),
                          e.currentTab().func(!0);
                      }
                    )
                : setTimeout(function () {
                    e.opt.callback(),
                      (e.isMotion = !1),
                      e.currentTab().func(!0);
                  }, e.duration);
          },
          base: function () {
            e.transition(e.slide, "transform"),
              e.opt.isSliding
                ? (e.slide.find(">.on").removeClass("on"),
                  e.slide
                    .find(">*")
                    .eq(this.slideIdx - e.opt.slideToScroll)
                    .addClass("on"))
                : (c
                    ? e.slide.find(">.on").removeClass("on")
                    : e.slide
                        .find(">.on")
                        .removeClass("on")
                        .stop()
                        .animate({ opacity: 0 }, e.duration, e.opt.easing),
                  this.slideIdx === this.firstIdx
                    ? e.slide
                        .find(">*")
                        .eq(this.slideLen - e.opt.slideShow)
                        .addClass("on")
                    : e.slide
                        .find(">*")
                        .eq(this.slideIdx - e.opt.slideToScroll)
                        .addClass("on")),
              0 === parseInt(e.slide.attr("data-index"))
                ? e.opt.isLoop
                  ? e.slide.attr("data-index", this.slideLen - 1)
                  : e.slide.attr(
                      "data-index",
                      Math.ceil(
                        (this.slideLen - e.opt.slideShow) / e.opt.slideToScroll
                      )
                    )
                : e.slide.attr(
                    "data-index",
                    parseInt(e.slide.attr("data-index")) - 1
                  ),
              e.opt.isIndicate &&
                (e.indicate.find(".on").removeClass("on"),
                0 !== this.indicateIdx
                  ? e.indicate
                      .find("a,button")
                      .eq(this.indicateIdx - 1)
                      .addClass("on")
                  : e.indicate.find("a,button").eq(-1).addClass("on")),
              s(),
              e.opt.progress(),
              e.currentTab().func(!1),
              e.opt.isSliding
                ? ((this.x =
                    -this.slideWid * (this.slideIdx - e.opt.slideToScroll)),
                  c
                    ? (e.slide.css({
                        webkitTransform: "translate3d(" + this.x + "px,0,0)",
                        transform: "translate3d(" + this.x + "px,0,0)",
                      }),
                      setTimeout(function () {
                        e.slide.find(">.on").hasClass("clone") &&
                          (e.transitionNone(e.slide),
                          e.slide.css({
                            webkitTransform:
                              "translate3d(" +
                              (i.x - i.slideWid * i.slideLen) +
                              "px,0,0)",
                            transform:
                              "translate3d(" +
                              (i.x - i.slideWid * i.slideLen) +
                              "px,0,0)",
                          }),
                          e.slide.find(">.on").removeClass("on"),
                          e.slide
                            .find(">*")
                            .eq(i.slideIdx - e.opt.slideToScroll + i.slideLen)
                            .addClass("on")),
                          e.opt.callback(),
                          (e.isMotion = !1),
                          e.currentTab().func(!0);
                      }, e.duration))
                    : e.slide.animate(
                        { marginLeft: this.x + "px" },
                        e.duration,
                        e.opt.easing,
                        function () {
                          e.slide.find(">.on").hasClass("clone") &&
                            (e.slide.css(
                              "marginLeft",
                              i.x - i.slideWid * i.slideLen + "px"
                            ),
                            e.slide.find(">.on").removeClass("on"),
                            e.slide
                              .find(">*")
                              .eq(i.slideIdx - e.opt.slideToScroll + i.slideLen)
                              .addClass("on")),
                            e.opt.callback(),
                            (e.isMotion = !1),
                            e.currentTab().func(!0);
                        }
                      ))
                : c
                ? (e.slide
                    .find(">.on")
                    .css("opacity", 1)
                    .siblings()
                    .css("opacity", 0),
                  setTimeout(function () {
                    e.opt.callback(),
                      (e.isMotion = !1),
                      e.currentTab().func(!0);
                  }, e.duration))
                : e.slide
                    .find(">.on")
                    .stop()
                    .animate(
                      { opacity: 1 },
                      e.duration,
                      e.opt.easing,
                      function () {
                        e.opt.callback(),
                          (e.isMotion = !1),
                          e.currentTab().func(!0);
                      }
                    );
          },
          func: function () {
            if (
              ((this.slideLen = e.slide.find(">*").not(".clone").length),
              (this.slideIdx = e.slide.find(">.on").index()),
              (this.firstIdx = e.slide.find(">*").not(".clone").eq(0).index()),
              (this.indicateIdx = parseInt(e.slide.attr("data-index"))),
              e.isMotion)
            )
              return !1;
            (e.isMotion = !0),
              (this.slideWid =
                parseFloat(e.slide.find(">*")[0].style.width) + e.marginRight),
              e.opt.isLoop || 0 !== this.slideIdx
                ? e.opt.isLoop ||
                  this.slideIdx !== this.slideLen - e.opt.slideShow ||
                  (this.slideLen - e.opt.slideShow) % e.opt.slideToScroll == 0
                  ? this.base()
                  : this.uneven()
                : this.unmove();
          },
        },
        t = {
          slideLen: null,
          slideIdx: null,
          firstIdx: null,
          indicateIdx: null,
          slideWid: null,
          x: null,
          unmove: function () {
            e.opt.isSliding
              ? ((this.x = -this.slideWid * (this.slideLen - e.opt.slideShow)),
                c
                  ? (e.slide.css({
                      webkitTransform: "translate3d(" + this.x + "px,0,0)",
                      transform: "translate3d(" + this.x + "px,0,0)",
                    }),
                    setTimeout(function () {
                      e.isMotion = !1;
                    }, e.duration))
                  : e.slide.animate(
                      { marginLeft: this.x + "px" },
                      e.duration,
                      e.opt.easing,
                      function () {
                        e.isMotion = !1;
                      }
                    ))
              : (e.isMotion = !1);
          },
          uneven: function () {
            e.transition(e.slide, "transform"),
              e.slide.find(">.on").removeClass("on"),
              e.slide
                .find(">*")
                .eq(this.slideLen - e.opt.slideShow)
                .addClass("on"),
              e.slide.attr(
                "data-index",
                parseInt(e.slide.attr("data-index")) + 1
              ),
              e.opt.isIndicate &&
                (e.indicate.find(".on").removeClass("on"),
                e.indicate
                  .find("a,button")
                  .eq(this.indicateIdx + 1)
                  .addClass("on")),
              s(),
              e.opt.progress(),
              e.currentTab().func(!1),
              e.opt.isSliding
                ? ((this.x =
                    -this.slideWid * (this.slideLen - e.opt.slideShow)),
                  c
                    ? (e.slide.css({
                        webkitTransform: "translate3d(" + this.x + "px,0,0)",
                        transform: "translate3d(" + this.x + "px,0,0)",
                      }),
                      setTimeout(function () {
                        e.opt.callback(),
                          (e.isMotion = !1),
                          e.currentTab().func(!0);
                      }, e.duration))
                    : e.slide.animate(
                        { marginLeft: this.x + "px" },
                        e.duration,
                        e.opt.easing,
                        function () {
                          e.opt.callback(),
                            (e.isMotion = !1),
                            e.currentTab().func(!0);
                        }
                      ))
                : setTimeout(function () {
                    e.opt.callback(),
                      (e.isMotion = !1),
                      e.currentTab().func(!0);
                  }, e.duration);
          },
          base: function () {
            e.transition(e.slide, "transform"),
              e.opt.isSliding
                ? (e.slide.find(">.on").removeClass("on"),
                  e.slide
                    .find(">*")
                    .eq(this.slideIdx + e.opt.slideToScroll)
                    .addClass("on"))
                : (c
                    ? e.slide.find(">.on").removeClass("on")
                    : e.slide
                        .find(">.on")
                        .removeClass("on")
                        .stop()
                        .animate({ opacity: 0 }, e.duration, e.opt.easing),
                  this.slideIdx === this.slideLen - e.opt.slideToScroll
                    ? e.slide.find(">*").eq(this.firstIdx).addClass("on")
                    : e.slide
                        .find(">*")
                        .eq(this.slideIdx + e.opt.slideToScroll)
                        .addClass("on")),
              e.opt.isLoop ||
              parseInt(e.slide.attr("data-index")) !==
                Math.ceil(
                  (this.slideLen - e.opt.slideShow) / e.opt.slideToScroll
                )
                ? e.opt.isLoop &&
                  parseInt(e.slide.attr("data-index")) === this.slideLen - 1
                  ? e.slide.attr("data-index", 0)
                  : e.slide.attr(
                      "data-index",
                      parseInt(e.slide.attr("data-index")) + 1
                    )
                : e.slide.attr("data-index", 0),
              e.opt.isIndicate &&
                (e.indicate.find(".on").removeClass("on"),
                this.indicateIdx !== e.indicate.find(">*").length - 1
                  ? e.indicate
                      .find("a,button")
                      .eq(this.indicateIdx + 1)
                      .addClass("on")
                  : e.indicate.find("a,button").eq(0).addClass("on")),
              s(),
              e.opt.progress(),
              e.currentTab().func(!1),
              e.opt.isSliding
                ? ((this.x =
                    -this.slideWid * (this.slideIdx + e.opt.slideToScroll)),
                  c
                    ? (e.slide.css({
                        webkitTransform: "translate3d(" + this.x + "px,0,0)",
                        transform: "translate3d(" + this.x + "px,0,0)",
                      }),
                      setTimeout(function () {
                        e.slide.find(">.on").hasClass("clone") &&
                          (e.transitionNone(e.slide),
                          e.slide.css({
                            webkitTransform:
                              "translate3d(" +
                              (t.x + t.slideWid * t.slideLen) +
                              "px,0,0)",
                            transform:
                              "translate3d(" +
                              (t.x + t.slideWid * t.slideLen) +
                              "px,0,0)",
                          }),
                          e.slide.find(">.on").removeClass("on"),
                          e.slide
                            .find(">*")
                            .eq(t.slideIdx - t.slideLen + e.opt.slideToScroll)
                            .addClass("on")),
                          e.opt.callback(),
                          (e.isMotion = !1),
                          e.currentTab().func(!0);
                      }, e.duration))
                    : e.slide.animate(
                        { marginLeft: this.x + "px" },
                        e.duration,
                        e.opt.easing,
                        function () {
                          e.slide.find(">.on").hasClass("clone") &&
                            (e.slide.css(
                              "marginLeft",
                              t.x + t.slideWid * t.slideLen + "px"
                            ),
                            e.slide.find(">.on").removeClass("on"),
                            e.slide
                              .find(">*")
                              .eq(t.slideIdx - t.slideLen + e.opt.slideToScroll)
                              .addClass("on")),
                            e.opt.callback(),
                            (e.isMotion = !1),
                            e.currentTab().func(!0);
                        }
                      ))
                : c
                ? (e.slide
                    .find(">.on")
                    .css("opacity", 1)
                    .siblings()
                    .css("opacity", 0),
                  setTimeout(function () {
                    e.opt.callback(),
                      (e.isMotion = !1),
                      e.currentTab().func(!0);
                  }, e.duration))
                : e.slide
                    .find(">.on")
                    .stop()
                    .animate(
                      { opacity: 1 },
                      e.duration,
                      e.opt.easing,
                      function () {
                        e.opt.callback(),
                          (e.isMotion = !1),
                          e.currentTab().func(!0);
                      }
                    );
          },
          func: function () {
            if (
              ((this.slideLen = e.slide.find(">*").not(".clone").length),
              (this.slideIdx = e.slide.find(">.on").index()),
              (this.firstIdx = e.slide.find(">*").not(".clone").eq(0).index()),
              (this.indicateIdx = parseInt(e.slide.attr("data-index"))),
              e.isMotion)
            )
              return !1;
            (e.isMotion = !0),
              (this.slideWid =
                parseFloat(e.slide.find(">*")[0].style.width) + e.marginRight),
              e.opt.isLoop || this.slideIdx !== this.slideLen - e.opt.slideShow
                ? e.opt.isLoop ||
                  this.slideIdx !==
                    this.slideLen -
                      e.opt.slideShow -
                      ((this.slideLen - e.opt.slideShow) %
                        e.opt.slideToScroll) ||
                  (this.slideLen - e.opt.slideShow) % e.opt.slideToScroll == 0
                  ? this.base()
                  : this.uneven()
                : this.unmove();
          },
        },
        n = {
          slideLen: null,
          slideIdx: null,
          firstIdx: null,
          prevIdx: null,
          currentIdx: null,
          slideWid: null,
          x: null,
          uneven: function () {
            e.slide.find(">.on").removeClass("on"),
              this.currentIdx === e.indicate.find(">*").length - 1
                ? e.slide
                    .find(">*")
                    .eq(this.slideLen - e.opt.slideShow)
                    .addClass("on")
                : e.slide
                    .find(">*")
                    .eq(this.firstIdx + this.currentIdx * e.opt.slideToScroll)
                    .addClass("on");
          },
          base: function () {
            e.slide.find(">.on").removeClass("on"),
              e.slide
                .find(">*")
                .eq(this.firstIdx + this.currentIdx * e.opt.slideToScroll)
                .addClass("on");
          },
          func: function (i, t) {
            return (
              (this.slideLen = e.slide.find(">*").not(".clone").length),
              (this.firstIdx = e.slide.find(">*").not(".clone").eq(0).index()),
              !e.isMotion &&
                ((e.isMotion = !0),
                (this.prevIdx = i.parent("li")[0]
                  ? e.indicate.find(".on").parent().index()
                  : e.indicate.find(".on").index()),
                (this.currentIdx = i.parent("li")[0]
                  ? i.parent().index()
                  : i.index()),
                this.prevIdx === this.currentIdx
                  ? (e.isMotion = !1)
                  : ((this.slideWid =
                      parseFloat(e.slide.find(">*")[0].style.width) +
                      e.marginRight),
                    e.transition(e.slide, "transform"),
                    e.opt.isLoop ||
                    (this.slideLen - e.opt.slideShow) % e.opt.slideToScroll == 0
                      ? this.base()
                      : this.uneven(),
                    e.slide.attr("data-index", this.currentIdx),
                    e.indicate.find(".on").removeClass("on"),
                    e.indicate
                      .find("a,button")
                      .eq(this.currentIdx)
                      .addClass("on"),
                    s(),
                    t || e.opt.progress(),
                    e.currentTab().func(!1),
                    void (e.opt.isSliding
                      ? ((this.x = e.opt.isLoop
                          ? -this.slideWid *
                            (this.firstIdx +
                              this.currentIdx * e.opt.slideToScroll)
                          : this.currentIdx === e.indicate.find(">*").length - 1
                          ? -this.slideWid *
                            (this.firstIdx + this.slideLen - e.opt.slideShow)
                          : -this.slideWid *
                            (this.firstIdx +
                              this.currentIdx * e.opt.slideToScroll)),
                        c
                          ? (e.slide.css({
                              webkitTransform:
                                "translate3d(" + this.x + "px,0,0)",
                              transform: "translate3d(" + this.x + "px,0,0)",
                            }),
                            setTimeout(function () {
                              t || e.opt.callback(),
                                (e.isMotion = !1),
                                e.currentTab().func(!0);
                            }, e.duration))
                          : e.slide.animate(
                              { marginLeft: this.x + "px" },
                              e.duration,
                              e.opt.easing,
                              function () {
                                t || e.opt.callback(),
                                  (e.isMotion = !1),
                                  e.currentTab().func(!0);
                              }
                            ))
                      : (c
                          ? e.slide
                              .find(">.on")
                              .css("opacity", 1)
                              .siblings()
                              .css("opacity", 0)
                          : e.slide
                              .find(">.on")
                              .stop()
                              .animate({ opacity: 1 }, e.duration, e.opt.easing)
                              .siblings()
                              .animate(
                                { opacity: 0 },
                                e.duration,
                                e.opt.easing
                              ),
                        setTimeout(function () {
                          e.opt.callback(),
                            (e.isMotion = !1),
                            e.currentTab().func(!0);
                        }, e.duration)))))
            );
          },
        },
        s = function () {
          e.opt.isLoop || 0 !== Number(e.slide.attr("data-index"))
            ? e.prev.hasClass(e.opt.unusedClass) &&
              e.prev
                .removeClass(e.opt.unusedClass)
                .removeAttr("tabindex aria-hidden")
            : (e.prev
                .addClass(e.opt.unusedClass)
                .attr({ tabindex: "-1", "aria-hidden": "true" }),
              e.next.hasClass(e.opt.willFocusClass) &&
                e.next.removeClass(e.opt.willFocusClass).focus()),
            e.opt.isLoop ||
            Number(e.slide.attr("data-index")) !==
              Math.ceil(
                (e.slide.find(">*").length - e.opt.slideShow) /
                  e.opt.slideToScroll
              )
              ? e.next.hasClass(e.opt.unusedClass) &&
                e.next
                  .removeClass(e.opt.unusedClass)
                  .removeAttr("tabindex aria-hidden")
              : (e.next
                  .addClass(e.opt.unusedClass)
                  .attr({ tabindex: "-1", "aria-hidden": "true" }),
                e.prev.hasClass(e.opt.willFocusClass) &&
                  e.prev.removeClass(e.opt.willFocusClass).focus());
        };
      return {
        prev: i,
        next: t,
        indicate: n,
        extreme: s,
        auto: function () {
          "true" === e.auto.attr("data-state")
            ? (e.setting().auto(),
              e.auto
                .addClass(e.opt.pauseClass)
                .removeClass(e.opt.playClass)
                .attr({ "data-state": "false", title: "정지" }))
            : ((!e.setTimer && !e.setInter) ||
                e.opt.isCustomAuto ||
                (clearTimeout(e.setTimer), clearInterval(e.setInter)),
              e.auto
                .addClass(e.opt.playClass)
                .removeClass(e.opt.pauseClass)
                .attr({ "data-state": "true", title: "재생" }));
        },
        interval: function () {
          if ("false" === e.slide.attr("data-hover"))
            if (e.opt.isLoop) t.func();
            else {
              var i = e.indicate.find(".on").index();
              i !== e.indicate.find(">*").length - 1
                ? n.func(e.indicate.find("a,button").eq(i + 1))
                : n.func(e.indicate.find("a,button").eq(0)),
                s();
            }
        },
      };
    }),
    (s.prototype.swipe = function () {
      var n = this;
      return {
        init: function () {
          n.swipes = {
            touch: null,
            touchStep: 0,
            touchX1: null,
            touchX2: null,
            touchY1: null,
            touchY2: null,
            touchMoveX: null,
            touchMoveY: null,
            startPosition:
              n.slide.css("transform") || n.slide.css("webkitTransform"),
            resistanceRatio: 1,
            position: { prev: null, current: null },
            scrolling: null,
          };
        },
        touchStartFn: function (i) {
          n.isMotion ||
            0 !== n.swipes.touchStep ||
            ((n.isMotion = !0),
            (n.swipes.scrolling = !1),
            (n.swipes.touch =
              i.originalEvent.touches[0] || i.originalEvent.changedTouches[0]),
            (n.swipes.touchX1 = n.swipes.touch.pageX),
            (n.swipes.touchY1 = n.swipes.touch.pageY),
            n.opt.isSliding &&
              (n.swipes.startPosition = parseFloat(
                l.trim(n.slide.css("transform").split(",")[4]) ||
                  l.trim(n.slide.css("webkitTransform").split(",")[4])
              )),
            n.transitionNone(n.slide),
            (n.swipes.touchStep = 1)),
            i.stopPropagation();
        },
        touchMoveFn: function (i) {
          if (
            n.isMotion &&
            1 === n.swipes.touchStep &&
            ((n.swipes.touch =
              i.originalEvent.touches[0] || i.originalEvent.changedTouches[0]),
            (n.swipes.touchMoveX = n.swipes.touch.pageX - n.swipes.touchX1),
            (n.swipes.touchMoveY = n.swipes.touch.pageY - n.swipes.touchY1),
            Math.abs(n.swipes.touchMoveX) < Math.abs(n.swipes.touchMoveY) &&
              (n.swipes.scrolling = !0),
            !n.swipes.scrolling)
          ) {
            if (n.opt.isSliding) {
              var t;
              if (
                ((n.swipes.position.current =
                  n.swipes.startPosition +
                  n.swipes.touchMoveX /
                    (n.opt.slideShow / n.opt.slideToScroll)),
                !n.opt.isLoop && n.opt.isResistance)
              ) {
                var e = -(
                  n.slide.width() -
                  n.opt.slideShow * n.slide.find(">.on").outerWidth(!0)
                );
                t =
                  0 < n.swipes.position.current
                    ? n.swipes.position.current * n.opt.resistanceRatio
                    : n.swipes.position.current < e
                    ? e +
                      (n.swipes.position.current - e) * n.opt.resistanceRatio
                    : n.swipes.position.current;
              } else t = n.swipes.position.current;
              n.slide.css({
                webkitTransform: "translate3d(" + t + "px,0,0)",
                transform: "translate3d(" + t + "px,0,0)",
              });
            }
            i.preventDefault();
          }
        },
        touchEndFn: function (i) {
          n.isMotion &&
            1 === n.swipes.touchStep &&
            ((n.swipes.touchStep = 2),
            (n.swipes.touch =
              i.originalEvent.touches[0] || i.originalEvent.changedTouches[0]),
            (n.swipes.touchMoveX = n.swipes.touch.pageX - n.swipes.touchX1),
            (n.swipes.touchMoveY = n.swipes.touch.pageY - n.swipes.touchY1),
            n.transition(n.slide, "transform"),
            Math.abs(n.swipes.touchMoveX) < n.opt.touchDistance &&
              n.slide.find("a").off("click touchstart"),
            n.swipes.scrolling
              ? (n.opt.isSliding &&
                  ((n.swipes.position.prev =
                    -(
                      parseFloat(n.slide.find(">.on")[0].style.width) +
                      n.marginRight
                    ) * n.slide.find(">.on").index()),
                  n.slide.css({
                    webkitTransform:
                      "translate3d(" + n.swipes.position.prev + "px,0,0)",
                    transform:
                      "translate3d(" + n.swipes.position.prev + "px,0,0)",
                  })),
                n.swipe().init(),
                (n.swipes.scrolling = !0),
                (n.isMotion = !1))
              : (n.swipes.touchMoveX > n.opt.touchDistance
                  ? ((n.isMotion = !1), n.control().prev.func())
                  : n.swipes.touchMoveX < -n.opt.touchDistance
                  ? ((n.isMotion = !1), n.control().next.func())
                  : n.opt.isSliding &&
                    ((n.swipes.position.prev =
                      -(
                        parseFloat(n.slide.find(">.on")[0].style.width) +
                        n.marginRight
                      ) * n.slide.find(">.on").index()),
                    n.slide.css({
                      webkitTransform:
                        "translate3d(" + n.swipes.position.prev + "px,0,0)",
                      transform:
                        "translate3d(" + n.swipes.position.prev + "px,0,0)",
                    })),
                "false" === n.auto.attr("data-state") && n.setting().auto(),
                setTimeout(function () {
                  n.swipe().init(),
                    (n.swipes.scrolling = !0),
                    (n.isMotion = !1);
                }, n.duration),
                i.stopPropagation()));
        },
        dragStartFn: function (i) {
          n.isMotion ||
            0 !== n.swipes.touchStep ||
            ((n.isMotion = !0),
            (n.swipes.touchX1 = i.pageX),
            (n.swipes.touchY1 = i.pageY),
            n.opt.isSliding &&
              (n.swipes.startPosition = o
                ? c
                  ? parseFloat(l.trim(n.slide.css("transform").split(",")[12]))
                  : parseFloat(n.slide.css("marginLeft").split("px")[0])
                : parseFloat(
                    l.trim(n.slide.css("transform").split(",")[4]) ||
                      l.trim(n.slide.css("webkitTransform").split(",")[4])
                  )),
            n.transitionNone(n.slide),
            (n.swipes.touchStep = 1)),
            t(i);
        },
        dragMoveFn: function (i) {
          if (
            n.isMotion &&
            1 === n.swipes.touchStep &&
            ((n.swipes.touchMoveX = i.pageX - n.swipes.touchX1),
            (n.swipes.touchMoveY = i.pageY - n.swipes.touchY1),
            n.opt.isSliding)
          ) {
            var t;
            if (
              ((n.swipes.position.current =
                n.swipes.startPosition +
                n.swipes.touchMoveX / (n.opt.slideShow / n.opt.slideToScroll)),
              !n.opt.isLoop && n.opt.isResistance)
            ) {
              var e = -(
                n.slide.width() -
                n.opt.slideShow * n.slide.find(">.on").outerWidth(!0)
              );
              t =
                0 < n.swipes.position.current
                  ? n.swipes.position.current * n.opt.resistanceRatio
                  : n.swipes.position.current < e
                  ? e + (n.swipes.position.current - e) * n.opt.resistanceRatio
                  : n.swipes.position.current;
            } else t = n.swipes.position.current;
            c
              ? n.slide.css({
                  webkitTransform: "translate3d(" + t + "px,0,0)",
                  transform: "translate3d(" + t + "px,0,0)",
                })
              : n.slide.css("marginLeft", t + "px"),
              a(i);
          }
        },
        dragEndFn: function (i) {
          n.isMotion &&
            1 === n.swipes.touchStep &&
            ((n.swipes.touchStep = 2),
            (n.swipes.touchMoveX = i.pageX - n.swipes.touchX1),
            (n.swipes.touchMoveY = i.pageY - n.swipes.touchY1),
            n.transition(n.slide, "transform"),
            Math.abs(n.swipes.touchMoveX) < n.opt.touchDistance &&
              n.slide.find("a").off("click touchstart"),
            n.swipes.touchMoveX > n.opt.touchDistance
              ? ((n.isMotion = !1), n.control().prev.func(), t(i))
              : n.swipes.touchMoveX < -n.opt.touchDistance
              ? ((n.isMotion = !1), n.control().next.func(), t(i))
              : n.opt.isSliding &&
                ((n.swipes.position.prev =
                  -(
                    parseFloat(n.slide.find(">*")[0].style.width) +
                    n.marginRight
                  ) * n.slide.find(">.on").index()),
                c
                  ? n.slide.css({
                      webkitTransform:
                        "translate3d(" + n.swipes.position.prev + "px,0,0)",
                      transform:
                        "translate3d(" + n.swipes.position.prev + "px,0,0)",
                    })
                  : n.slide.animate(
                      { marginLeft: n.swipes.position.prev + "px" },
                      n.duration,
                      n.opt.easing
                    )),
            "false" === n.auto.attr("data-state") && n.setting().auto(),
            setTimeout(function () {
              (n.swipes.touchStep = 0), (n.isMotion = !1);
            }, n.duration));
        },
        clickFn: function (i) {
          n.isMotion &&
            Math.abs(n.swipes.touchMoveX) >= n.opt.touchDistance &&
            (a(i), t(i));
        },
      };
    }),
    (s.prototype.remove = function () {
      var i = this;
      return {
        func: function () {
          i.init().transitionOff(),
            i.init().cloneRemove(),
            i.currentTab().reset(),
            i.rendering3D().reset(),
            i.imgDrag().reset(),
            i.update().reset(),
            i.setting().reset(),
            i.visibilityChange().reset(),
            i.resize().reset(),
            i.trigger().reset(),
            i.slide.removeAttr("data-index"),
            i.slide.find(">*").removeClass("on show"),
            i.prev[0] &&
              i.prev.removeAttr("tabindex aria-hidden").removeClass("hidden"),
            i.next[0] &&
              i.next.removeAttr("tabindex aria-hidden").removeClass("hidden"),
            i.auto[0] &&
              i.auto.removeAttr("data-state").removeClass("play pause"),
            i.indicate[0] && (i.indicate[0].innerHTML = "");
        },
      };
    }),
    (s.prototype.visibilityChange = function () {
      var i = this,
        t = null,
        e = null,
        n = function () {
          document[t] ? i.slide.attr("data-hover", "true") : i.update().func();
        };
      return {
        func: n,
        event: function () {
          (t && e) ||
            (void 0 !== document.hidden
              ? ((t = "hidden"), (e = "visibilitychange"))
              : void 0 !== document.msHidden
              ? ((t = "msHidden"), (e = "msvisibilitychange"))
              : void 0 !== document.webkitHidden &&
                ((t = "webkitHidden"), (e = "webkitvisibilitychange"))),
            document.addEventListener && document.addEventListener(e, n);
        },
        reset: function () {
          document.removeEventListener && document.removeEventListener(e, n);
        },
      };
    }),
    (s.prototype.resize = function () {
      var e = this;
      return {
        func: function () {
          var i =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
          if (e.winW === i) return !1;
          if (((e.winW = i), e.opt.responsive.length)) {
            if (e.winW <= e.opt.responsive[0].viewSize && 0 !== e.responsiveLen)
              return (e.responsiveLen = 0), e.init().func(!1), !1;
            if (1 < e.opt.responsive.length) {
              for (var t = 0; t < e.opt.responsive.length - 1; t++)
                e.winW > e.opt.responsive[t].viewSize &&
                  e.winW <= e.opt.responsive[t + 1].viewSize &&
                  e.responsiveLen !== t + 1 &&
                  ((e.responsiveLen = t + 1), (t = 99), e.init().func(!1));
              if (99 === t) return !1;
            }
            if (
              e.winW > e.opt.responsive[e.opt.responsive.length - 1].viewSize &&
              -1 !== e.responsiveLen
            )
              return (e.responsiveLen = -1), e.init().func(!1), !1;
          }
          e.update().func();
        },
        handler: function () {
          clearTimeout(e.setLoop),
            e.resize().func(),
            (e.setLoop = setTimeout(e.resize().func, 100));
        },
        event: function () {
          u.on("resize.jd-" + e.idx, e.resize().handler);
        },
        reset: function () {
          u.off("resize.jd-" + e.idx, e.resize().handler);
        },
      };
    }),
    (s.prototype.trigger = function () {
      var i = this;
      return {
        event: function () {
          i.obj
            .on("init slideInit", l.proxy(i.init(), "func"))
            .on("update", l.proxy(i.update(), "func"))
            .on("resizeFn", l.proxy(i.resize(), "func"))
            .on("removeFn", l.proxy(i.remove(), "func")),
            i.indicate.find("a,button").on("moveTo", function () {
              i.control().indicate.func(l(this), !0);
            });
        },
        reset: function () {
          i.obj
            .off("init slideInit", l.proxy(i.init(), "func"))
            .off("update", l.proxy(i.update(), "func"))
            .off("resizeFn", l.proxy(i.resize(), "func"))
            .off("removeFn", l.proxy(i.remove(), "func")),
            i.indicate.find("a,button").off("moveTo", function () {
              i.control().indicate.func(l(this), !0);
            });
        },
      };
    }),
    (l.fn.jdSlider = function (i) {
      for (var t = this.length, e = 0; e < t; e++)
        ("object" != typeof i && void 0 !== i) ||
          (this[e].jdSlider = new s(this[e], i));
      return this;
    });
});
