
$(function () {
    function hideAllSubmenus() {
        $(".content_show .grid-submenu").hide();
        $(".content_show .grid-submenu .grid-submenu-services").hide();
        $(".content_show .grid-submenu .grid-submenu-enquiries").hide();
    }

    function openSubmenu(menuClass, type) {
        // إخفاء جميع القوائم الفرعية الحالية
        hideAllSubmenus();

        var $menu = $(".content_show ." + menuClass);
        if ($menu.length === 0) {
            console.log("openSubmenu: menu not found", menuClass);
            return;
        }

        // إخفاء صف البطاقات وإظهار صندوق الخدمات الأبيض
        $(".grid-wrapper").hide();
        $(".content_show").css({
            display: "block",
            opacity: 1
        });

        // إظهار القائمة الفرعية المطلوبة
        $menu.show();

        var $nav = $menu.find(".nav-pills");

        if (type === "services") {
            $menu.find(".grid-submenu-services").show();
            $menu.find(".grid-submenu-enquiries").hide();

            if ($nav.length) {
                $nav.find("li").removeClass("active");
                $nav.find("a.services-sub").parent().addClass("active");
            }
        } else if (type === "enquiries") {
            $menu.find(".grid-submenu-enquiries").show();
            $menu.find(".grid-submenu-services").hide();

            if ($nav.length) {
                $nav.find("li").removeClass("active");
                $nav.find("a.enquiries-sub").parent().addClass("active");
            }
        }

        console.log("openSubmenu:", menuClass, type);
    }

    // في البداية أخفِ جميع القوائم داخل الصندوق الأبيض
    hideAllSubmenus();
    console.log("dashboard submenu script ready");

    // عند الضغط على عنوان القسم (كل الهيدر) في أعلى الصندوق الأبيض نرجع إلى صف البطاقات
    $(".grid-submenu .multi-level-submenu-header h4").on("click", function (e) {
        e.preventDefault();
        // إخفاء جميع الصناديق الفرعية وإرجاع الشبكة الرئيسية
        hideAllSubmenus();
        $(".content_show").css({ display: "none", opacity: 0 });
        $(".grid-wrapper").show();
    });

    // التحكم في التبويبات داخل كل صندوق (خدمات / إستعلامات)
    $(".grid-submenu .nav-pills a.services-sub").on("click", function (e) {
        e.preventDefault();
        var $nav = $(this).closest(".nav-pills");
        var $wrapper = $(this).closest(".grid-submenu");
        $nav.find("li").removeClass("active");
        $(this).parent().addClass("active");
        $wrapper.find(".grid-submenu-services").show();
        $wrapper.find(".grid-submenu-enquiries").hide();
    });

    $(".grid-submenu .nav-pills a.enquiries-sub").on("click", function (e) {
        e.preventDefault();
        var $nav = $(this).closest(".nav-pills");
        var $wrapper = $(this).closest(".grid-submenu");
        $nav.find("li").removeClass("active");
        $(this).parent().addClass("active");
        $wrapper.find(".grid-submenu-enquiries").show();
        $wrapper.find(".grid-submenu-services").hide();
    });

    // روابط خدماتي
    $(".grid_item_1 .services-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("grid-services", "services");
    });

    $(".grid_item_1 .enquiries-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("grid-services", "enquiries");
    });

    // روابط المركبات
    $(".grid_item_2 .services-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("vehicles-services", "services");
    });

    $(".grid_item_2 .enquiries-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("vehicles-services", "enquiries");
    });

    // روابط أفراد الأسرة
    $(".grid_item_3 .services-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("dependents-services", "services");
    });

    $(".grid_item_3 .enquiries-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("dependents-services", "enquiries");
    });

    // روابط العمالة
    $(".grid_item_4 .services-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("sponserees-services", "services");
    });

    $(".grid_item_4 .enquiries-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("sponserees-services", "enquiries");
    });

    // روابط المواعيد
    $(".grid_item_5 .services-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("appointments-services", "services");
    });

    // روابط مدير النظام
    $(".grid_item_6 .services-sub").on("click", function (e) {
        e.preventDefault();
        openSubmenu("admin-services", "services");
    });

    // جعل الضغط على العنوان أو الصورة يفتح القسم "خدمات" افتراضياً
    $(".grid_item_1 .options-titles, .grid_item_1 .options-images").on("click", function (e) {
        e.preventDefault();
        openSubmenu("grid-services", "services");
    });

    $(".grid_item_2 .options-titles, .grid_item_2 .options-images").on("click", function (e) {
        e.preventDefault();
        openSubmenu("vehicles-services", "services");
    });

    $(".grid_item_3 .options-titles, .grid_item_3 .options-images").on("click", function (e) {
        e.preventDefault();
        openSubmenu("dependents-services", "services");
    });

    $(".grid_item_4 .options-titles, .grid_item_4 .options-images").on("click", function (e) {
        e.preventDefault();
        openSubmenu("sponserees-services", "services");
    });

    $(".grid_item_5 .options-titles, .grid_item_5 .options-images").on("click", function (e) {
        e.preventDefault();
        openSubmenu("appointments-services", "services");
    });

    $(".grid_item_6 .options-titles, .grid_item_6 .options-images").on("click", function (e) {
        e.preventDefault();
        openSubmenu("admin-services", "services");
    });
});

