var domainOrgin = document.location.origin;
if (!window.location.origin)
  domainOrgin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
else
  domainOrgin = document.location.origin;

function emailForm() {
  var daReferrer = document.referrer;
  var email = "";
  var errorMsg = "";
  var subject = "Portal - www.moi.gov.sa";
  var body_message = "I would like to refer this Portal Page to you. You can visit the page in the following link: " + daReferrer;

  var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;

  win = window.open(mailto_link, 'emailWindow');
  setTimeout(function () {
    if (win && win.open && !win.closed) {
      win.close();
    }
  }, 20);
}


function displayElement(id) {
  var d = document.getElementById(id).style.display;
  if (d == "none" || d == "") {
    document.getElementById(id).style.display = "block";
  } else {
    document.getElementById(id).style.display = "none";
  }
}

(function (jq_bt) {
  $(document).ready(function (e) {

    if (jq_bt('#mobile_number').length != 0) {
      var $input = document.querySelector('#mobile_number');
      jq_bt('#mobile_number').bind('keyup', function (e) {
        var max = parseInt(jq_bt('#mobile_number').attr('maxlength'));
        if (jq_bt(this).val().length > max) {
          jq_bt(this).val(jq_bt(this).val().substr(0, max));
        }
      });
    }

    if (jq_bt('#otp').length != 0) {
      var $input = document.querySelector('#otp');
      jq_bt('#otp').bind('keyup', function (e) {
        var max = parseInt(jq_bt('#otp').attr('maxlength'));
        if (jq_bt(this).val().length > max) {
          jq_bt(this).val(jq_bt(this).val().substr(0, max));
        }
      });
    }


    if (jq_bt('.customTooltipContainer').length != 0) {
      if (jq_bt('#d_sim:checked').length != 0) {
        jq_bt('.customTooltipContainer').css('display', 'inline-block');
      }
    }

    if (jq_bt('html').attr('lang') == 'en') {
      jq_bt('.customTooltipContainer .tooltip-header').find('span').text('If you do not know the SIM Card Number(MSISDN), please contact your service provider.');
    } else {
      jq_bt('.customTooltipContainer .tooltip-header').find('span').text('Ø¥Ø°Ø§ ÙÙ ØªØ¹Ø±Ù Ø±ÙÙ ÙØ§ØªÙ Ø§ÙØ´Ø±ÙØ­Ø©Ø(MSISDN) ÙØ¶ÙØ§ Ø§ÙØªÙØ§ØµÙ ÙØ¹ ÙØ²ÙØ¯ Ø§ÙØ®Ø¯ÙØ© ÙÙØ­ØµÙÙ Ø¹ÙÙ Ø§ÙØ±ÙÙ');
    }

    jq_bt('input[type="radio"]').bind('click', function () {
      if (jq_bt('input[name="simSelection"]:checked').val() == "D") {
        jq_bt('.customTooltipContainer').css('display', 'inline-block');
        jq_bt('.custom-tooltip').show();
        jq_bt('#mobile_number').attr('placeholder', '831XXXXXXXXX');
      } else {
        jq_bt('.customTooltipContainer').hide();
        jq_bt('#mobile_number').attr('placeholder', '05XXXXXXXX');
      }
    });

    jq_bt('.close-tooltip').bind('click', function () {
      jq_bt('.custom-tooltip').hide();
      return false;
    });

    jq_bt('.custom-tooltip-link').bind('click', function () {
      jq_bt('.custom-tooltip').toggle();
      return false;
    });
    jq_bt(".page_body").prepend('<div id="toolsList" class="sharePost_new noPrint">' +
      '<a href="javascript:shareLink(\'Delicious\');" class="delicious">Delicious</a>' +
      '<a href="javascript:shareLink(\'Digg\');" class="digg">Digg</a>' +
      '<a href="javascript:shareLink(\'Facebook\');" class="facebook">Facebook</a>' +
      '<a href="javascript:shareLink(\'Google\');" class="google">Google</a></div>');
  });


  jq_bt("#myID\\.entry\\[1\\]").css("border", "3px solid red");

  function shareLink(url) {
    var portalLink = parent.window.location.href;
    var otherLink = "";
    if (url == "Delicious") {
      otherLink = "http://del.icio.us/post?url=" + portalLink + ";title=title";
      window.open(otherLink);
    }
    if (url == "Digg") {
      otherLink = "http://digg.com/submit?phase=2&amp;url=" + portalLink + "";
      window.open(otherLink);
    }
    if (url == "Facebook") {
      otherLink = "http://www.facebook.com/sharer.php?u=" + portalLink + "&amp;t=title";
      window.open(otherLink);
    }
    if (url == "Google") {
      otherLink = "http://www.google.com/bookmarks/mark?op=edit&amp;bkmk=" + portalLink + "&amp;title=title";
      window.open(otherLink);
    }
  }

  /*!
  * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1
  */
  (function (e) { e.fn.hoverIntent = function (t, n, r) { var i = { interval: 100, sensitivity: 2, timeout: 0 }; if (typeof t === "object") { i = e.extend(i, t) } else if (e.isFunction(n)) { i = e.extend(i, { over: t, out: n, selector: r }) } else { i = e.extend(i, { over: t, out: t, selector: n }) } var s, o, u, a; var f = function (e) { s = e.pageX; o = e.pageY }; var l = function (t, n) { n.hoverIntent_t = clearTimeout(n.hoverIntent_t); if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) { e(n).off("mousemove.hoverIntent", f); n.hoverIntent_s = 1; return i.over.apply(n, [t]) } else { u = s; a = o; n.hoverIntent_t = setTimeout(function () { l(t, n) }, i.interval) } }; var c = function (e, t) { t.hoverIntent_t = clearTimeout(t.hoverIntent_t); t.hoverIntent_s = 0; return i.out.apply(t, [e]) }; var h = function (t) { var n = jQuery.extend({}, t); var r = this; if (r.hoverIntent_t) { r.hoverIntent_t = clearTimeout(r.hoverIntent_t) } if (t.type == "mouseenter") { u = n.pageX; a = n.pageY; e(r).on("mousemove.hoverIntent", f); if (r.hoverIntent_s != 1) { r.hoverIntent_t = setTimeout(function () { l(n, r) }, i.interval) } } else { e(r).off("mousemove.hoverIntent", f); if (r.hoverIntent_s == 1) { r.hoverIntent_t = setTimeout(function () { c(n, r) }, i.timeout) } } }; return this.on({ "mouseenter.hoverIntent": h, "mouseleave.hoverIntent": h }, i.selector) } }(jq_bt));
  jq_bt(document).ready(function () {
    /* topnav show & hide */
    var $currentnav, $topnavcontainer, $cur_brn, $brn_add, $branchsummary, $cur_brn_ind, $selbranch = 0;
    jq_bt(".topnav > ul > li").hover(function (e) {
      try { clearTimeout(timeout); }
      catch (e) { }
      $currentnav = jq_bt(this);
      $topnavcontainer = $currentnav.children('div');
      $topnavcontainer.slideDown();
      $currentnav.addClass("active");
    }, function () {
      timeout = setTimeout(function () {
        $topnavcontainer.slideUp();
        $currentnav.removeClass("active");
      }, 800);
    });
    /* Tabs */
    jq_bt('ul.nav-tabs').each(function () {
      // For each set of tabs, we want to keep track of
      // which tab is active and it's associated content
      var $active, $content, $links = jq_bt(this).find('a');
      // If the location.hash matches one of the links, use that as the active tab.
      // If no match is found, use the first link as the initial active tab.
      $active = jq_bt($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
      $active.parent().addClass('active');
      $content = jq_bt($active.attr('href'));
      $content.addClass("active");
      // Hide the remaining content
      $links.not($active).each(function () {
        jq_bt(jq_bt(this).attr('href')).hide().parent().removeClass('active');
      });
      // Bind the click event handler
      jq_bt(this).on('click', 'a', function (e) {
        // Make the old tab inactive.
        $active.parent().removeClass('active');
        $content.hide().removeClass('active');
        // Update the variables with the new link and content
        $active = jq_bt(this);
        $content = jq_bt(jq_bt(this).attr('href'));
        // Make the tab active.
        $active.parent().addClass('active');
        $content.show().addClass('active');
        // Prevent the anchor's default click action
        e.preventDefault();
      });
    })
    /* Toggling schedule */
    jq_bt(".week-day").on('click', 'li', function () {
      var $this = jq_bt(this), $em = $this.find('a > span > em'), $span = $this.find('a > span');
      $this.toggleClass("selected");
      if ($em.length > 0) { $em.remove() } else { $span.append("<em>selected</em>"); }
    });
    /* Branchlist hover */
    $branchsummary = jq_bt(".branch-address");
    $branchsummary.eq(0).show();
    jq_bt(".branch-list").on('mouseenter', 'li', function () {
      $cur_brn = jq_bt(this), $cur_brn_ind = parseInt($cur_brn.index()) + 1;
      $cur_brn.addClass("hover");
      $branchsummary.hide();
      $branchsummary.eq($cur_brn_ind).show();
      $selbranch = jq_bt("input[name=service_branch]:checked").val();
    }).on('mouseleave', 'li', function () {
      $branch_opted = jq_bt("input[name=service_branch]:checked").val();
      $selbranch = ($branch_opted != '' && typeof ($branch_opted) != "undefined") ? $branch_opted : 0;
      $cur_brn.removeClass("hover");
      $branchsummary.hide();
      $branchsummary.eq($selbranch).show();
    });
    /* Select Branch on click */
    jq_bt(".branch-list").on('click', 'input[name=service_branch]', function () {
      var $this = jq_bt(this), $branchlist = jq_bt(".branch-list ul li");
      $branchlist.removeClass("selected");
      $this.closest('li').addClass("selected");
    });
    jq_bt('.collapse-head').click(function () {
      if (jq_bt(this).next().is(':hidden') == true) {
        jq_bt(this).addClass('on');
        jq_bt(this).next().slideDown('normal');
      }
      else {
        jq_bt(this).next().slideUp('normal');
        jq_bt(this).removeClass('on');
      }
    });
    jq_bt('.collapse-head').mouseover(function () {
      jq_bt(this).addClass('over');
    }).mouseout(function () {
      jq_bt(this).removeClass('over');
    });
    /* home tab slider */
    //$("div#mySliderTabs").sliderTabs({});

    /*
    jq_bt(".nav-holder > ul > li").hoverIntent({
    sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
    interval: 50,   // number = milliseconds of polling interval
    over: function () {
    jq_bt('.megamenu', this).slideDown(220);
    jq_bt(this).addClass("hovered");
    },  // function = onMouseOver callback (required)
    timeout: 50,   // number = milliseconds delay before onMouseOut function call
    out: function () {
    jq_bt('.megamenu', this).hide();
    jq_bt(this).removeClass("hovered");
    }    // function = onMouseOut callback (required)
    });
    */


    /* home service toggle */
    jq_bt(".service-toogle").on('click', function (e) {
      e.stopImmediatePropagation();
      var $this = jq_bt(this), $container = jq_bt(".service-container");
      if (jq_bt(this).parent().find('a').hasClass("highlight")) {
        jq_bt(this).parent().parent().parent().removeClass("toggle-container");
        jq_bt(this).parent().find('a').removeClass("highlight");
      }
      else {
        jq_bt(this).parent().parent().parent().addClass("toggle-container");
        jq_bt(this).parent().find('a').addClass("highlight");
      }
    })
    jq_bt(".all-services").click(function () {
      if (jq_bt(this).find('a').hasClass("highlight")) {
        jq_bt(this).parent().parent().removeClass("toggle-container");
        jq_bt(this).find('a').removeClass("highlight");
      } else {
        jq_bt(this).parent().parent().addClass("toggle-container");
        jq_bt(this).find('a').addClass("highlight");
      }
    });
  });
  function showServices(sectorid) {
    if (sectorid != "") {
      jq_bt("#sector").show();
    }
    else {
      jq_bt("#sector").hide();
    }
  }
  jq_bt(document).ready(function () {
    jq_bt("input[type='password']").onpaste = function (e) {
      e.preventDefault();
    }
    /*jq_bt('input:[type="password"]').bind("drag drop cut copy paste",function(e) {    
        e.preventDefault();
    });*/

    jq_bt(".dropdown  dt  a").click(function () {
      var $this = jq_bt(this);
      $this.parent().parent().parent().find("ul").not($this.parent().parent().find("ul")).hide();
      $this.parent().parent().find("ul").toggle();
    });
    jq_bt('.ui-slider-tabs-list li').click(function () {
      jq_bt(this).parent().parent().parent().parent().parent().parent().addClass('toggle-container').find('a').addClass('highlight');
      jq_bt(this).find('div:first').find('a').addClass('highlight');
    })
    jq_bt(".dropdown dd ul li a").click(function () {
      var $this = jq_bt(this), text = $this.html();
      $this.parent().parent().parent().prev().find("a span").html(text);
      $this.closest("dd > ul").hide();
    });
    jq_bt(document).bind('click', function (e) {
      var $clicked = jq_bt(e.target);
      if (!$clicked.parents().hasClass("dropdown"))
        jq_bt(".dropdown dd ul").hide();
    });
    /* Add and remove class */
    jq_bt('.steps li a').hover(function () {
      jq_bt(this).parent().toggleClass('hover');
    });
    jq_bt('.tab-content .collapse-box ,.news-list li, .all-services, .search-box .search-btn, .video-block, .wide-blocks .service-block, .eservices-block .service-block').hover(function () {
      jq_bt(this).toggleClass('hover');
    });
    jq_bt('.nav-items,.nav-more ,.navbar-toggle ,.search-toggle ,.login-link ,.collapse-block .collapse-toggle ').click(function () {
      jq_bt(this).parent().toggleClass('selected');
    });
    jq_bt('.service-group h4 a ,.all-service h4 a ').click(function () {
      jq_bt(this).parent().parent().toggleClass('selected');
    });
  });

  jq_bt(window).load(function () {
    jq_bt(document).ready(function () {
      function add() {
        if (jq_bt(this).val() === '') {
          jq_bt(this).val(jq_bt(this).attr('placeholder')).addClass('placeholder');
        }
      }

      function remove() {
        if (jq_bt(this).val() === jq_bt(this).attr('placeholder')) {
          jq_bt(this).val('').removeClass('placeholder');
        }
      }

      // Create a dummy element for feature detection
      if (!('placeholder' in jq_bt('<input>')[0])) {

        // Select the elements that have a placeholder attribute
        jq_bt('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);

        // Remove the placeholder text before the form is submitted
        jq_bt('form').submit(function () {
          jq_bt(this).find('input[placeholder], textarea[placeholder]').each(remove);
        });
      }
    });
  });//]]> 


  jq_bt(window).load(function () {
    function findImageNames(data, str) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].name == str) {
          return data[i].code;
        }
      }
    };

    var imageNames;
    var jqxhr = jq_bt.getJSON(domainOrgin + "/portal/individuals/local/js/vc-logos.json").done(function (data) {
      imageNames = data;

      jq_bt("img.vehicle-logo").each(function (index) {
        var imageName = findImageNames(imageNames, jq_bt(this).attr('alt'));
        if (imageName != undefined) {
          jq_bt(this).attr('src', '/wps/PA_VehicleServices/../../portal/individuals/local/images/AppAssets/vehiclesLogos/' + imageName + '.imageset/' + imageName + '.png').css('visibility', 'visible');
        } else {
          jq_bt(this).attr('src', '/wps/PA_VehicleServices/../../portal/individuals/local/images/AppAssets/vehiclesLogos/defaultVehicle.png').css('visibility', 'visible');
        }

      });

    });

  });
  function callLogout() { Object.keys(localStorage).forEach(function (key) { if (/^DataTables_Absher_*/.test(key)) { localStorage.removeItem(key); } }); document.getElementById('logoutFormId').submit(); }



  /* --------------------------------------
   HyperPay - Widget Global Options START
  ----------------------------------------*/
  //hyper pay custom labels
  var hyperpayLabels = {
    en: {
      supportedCards: "Supported Cards",
      cardHolder: "Cardholder Name",
    },
    ar: {
      supportedCards: "البطاقات المدعومة ",
      cardHolder: " اسم صاحب البطاقة",
    },
  };

  //get the current locale
  var local = document.getElementsByTagName("html")[0].getAttribute("lang");

  var wpwlOptionsGlobal = {
    locale: local === "en" ? "en" : "ar",
    style: "plain",
    showCVVHint: true,
    brandDetection: true,
    onReady: function () {
      //change the label
      $(".wpwl-label-brand").html(hyperpayLabels[local].supportedCards);
      $(".wpwl-label-cardHolder").html(hyperpayLabels[local].cardHolder);

      //change input field order
      $(".wpwl-group-submit").before($(".wpwl-group-cardHolder"));

      //update placeholder
      $(".wpwl-control-cardNumber").attr("placeholder", "1234 1234 1234 1234");
      $(".wpwl-control-cvv").attr("placeholder", "123");

      //get brand options
      const brands = $(".wpwl-control-brand").find("option").map((index, item) => item.value);

      //create custom brand toolbar
      var brandItem = $(".wpwl-brand:first").clone().removeAttr("class").attr("class", "wpwl-brand-card wpwl-brand-custom");

      brands.map((item) => {
        var brandClass = "wpwl-brand-" + brands[item];
        var brand = $(brandItem).clone().removeClass("wpwl-brand-VISA").addClass(brandClass);
        $(".wpwl-brand:first").after($(brand)).after($(brandItem));
      });

      //remove the duplication of brands
      $(".wpwl-brand-card:first").remove();
      $(".wpwl-brand-custom:first").remove();

      //append brands wrapper
      $(".wpwl-wrapper-brand").after('<div class="wpwl-wrapper-brand-custom"></div>');

      //add the updated brands icons in payment UI
      $(".wpwl-wrapper-brand-custom").append($(".wpwl-brand-card"));

      var imageUrl = "https://eu-test.oppwa.com/v1/static/" + wpwl.cacheVersion + "/img/brand.png";

      $(".wpwl-brand-custom").css("background-image", "url(" + imageUrl + ")");
    },
    onChangeBrand: function (e) {
      $(".wpwl-brand-custom").css("opacity", "0.3");
      $(".wpwl-brand-" + e).css("opacity", "1");
    },
    iframeStyles: {},
  };

  /* --------------------------------------
   HyperPay - Widget Global Options END
  ----------------------------------------*/

})(jq_bt);