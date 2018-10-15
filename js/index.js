/**
 * Created by zhaosi on 2018/6/23.
 */

$(window).ready(function () {

    var oldScrolltoPart=$(window).scrollTop();           //旧的Top
    var scrollCha;
    var scrolltoPart;                                       //当前值
    var shade=$("#shade");
    var shadeBase=$("#shadeBase");
    $(document).on("scroll",function () {
        scrolltoPart=$(window).scrollTop();                 //获取当前scrollTop距离
        if ($(window).scrollTop()>=5730)                    //页尾
        {
            //优化Scroll操作
            if ($("#milinLog").css("display")!=$("#sidebar").css("display")!=$("#loginbuttonBox").css("display")!="none")
            {
                animateHide();          //元素隐藏
            }
            if(shade.css("background-color")!="rgb(0, 0, 0)")           //如果不是黑色背景，则改变
            {
                animateColor("#000000");
            }
        } else
        if ($(window).scrollTop()>=4518)        //纸雕
        {
            if ($("#loginbuttonBox").display!="block")
            {
                animateShow();
            }
            if (shadeBase.css("display")!="none")
            {
                animateimgUrlIn(null);
            }
            if ($("#sidebarNavUl li a").css("color")!="rgb(0, 0, 0)")
            {
                animateWhite();                                             //白色背景，元素变黑
            }
            if(shade.css("background-color")!="rgb(255, 255, 255)")        //如果不是白色背景，则改变
            {
                animateColor("#ffffff");
            }
            scrollCha=scrolltoPart-oldScrolltoPart;
            scrollTopBotm($("#zhiidao"),scrollCha,62);
            oldScrolltoPart=scrolltoPart;                   //更新
        } else
        if ($(window).scrollTop()>=3506)    //植物
        {
            if ($("#sidebarNavUl li a").css("color")!="rgb(255, 255, 255)")
            {
                animateBlack();                                          //深色背景，元素变白
            }
            if (shadeBase.css("display")!="block")
            {
                animateimgUrlIn("img/植物印染.png");
            }
        } else
        if ($(window).scrollTop()>=2494)    //画
        {

            if (shadeBase.css("display")!="none")                           //没有第一个参数就是渐出
            {
                animateimgUrlIn(null,function () {
                    $("#jianTou").show();
                });
            }
            if(shade.css("background-color")!="rgb(228, 224, 219)")             //如果不是灰色背景，则改变
            {
                animateColor("#e4e0db");
            }
        } else
        if ($(window).scrollTop()>=1482)    //花
        {
            if (shadeBase.css("display")!="none")                           //没有第一个参数就是渐出
            {
                animateimgUrlIn(null,function () {                          //背景渐出
                    $("#jianTou").hide();
                });
            }
            if(shade.css("background-color")!="rgb(208, 90, 110)")           //如果不是粉色色背景，则改变
            {
                animateColor("#d05a6e");
            }
            scrollCha=scrolltoPart-oldScrolltoPart;
            scrollTopBotm($("#meigui"),scrollCha,100);
            oldScrolltoPart=scrolltoPart;                   //更新

        } else
        if (scrolltoPart>=470)                //茶园
        {
            if (shadeBase.css("display")!="block")
            {
                animateimgUrlIn("img/茶园.png");
            }
            if(shade.css("background-color")!="rgb(39, 56, 70)");      //优化Scroll    //如果不是岱宗色背景，则改变
            {
                animateColor("#273846");
            }
            scrollCha=scrolltoPart-oldScrolltoPart;         //当前Top
            scrollTopBotm($("#zitengluo"),scrollCha,50);    //紫罗兰上下距离值为50px
            oldScrolltoPart=scrolltoPart;                   //更新Top

        } else {                            //顶部
            if (shadeBase.css("display")!="none")
            {
                animateimgUrlIn(null);              //背景图渐出
            }
            animateimgUrlIn(null);
            scrollCha=scrolltoPart-oldScrolltoPart;
            scrollTopBotm($("#zitengluo"),scrollCha,50);
            oldScrolltoPart=scrolltoPart;                   //更新旧值

        }
        // console.log(scrolltoPart);

    });

    var eleScrollTop;
    var scrollTimer=null;
    function scrollTopBotm (ele,cha,marTop) {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer=setTimeout(function () {
            if (cha<0)  //上滑
            {
                if (parseInt(ele.css("marginTop").replace("px",""))>=115)
                {
                    eleScrollTop=115;
                }else {
                    eleScrollTop=parseInt(ele.css("marginTop").replace("px",""))+60;
                }
            }else {
                if (parseInt(ele.css("marginTop").replace("px",""))<=0)
                {
                    eleScrollTop=parseInt(ele.css("marginTop").replace("px",""))-60;
                    ele.animate({"marginTop":eleScrollTop},900,function () {
                        ele.animate({"marginTop":marTop},900);
                    });
                    return;
                }else {
                    eleScrollTop=parseInt(ele.css("marginTop").replace("px",""))-60;
                }
            }
            // eleScrollTop=ele.position().top+part*30;
            ele.animate({"marginTop":eleScrollTop},900);
        },50);
    }

    $("#loginbutton li").on({
        "mouseenter": function () {
            menterLi($(this));
        },
        "mouseleave": function () {
            mseleaveLi($(this));
        }
    });


    $(".buttonDiv").on({
        "mouseenter" : function () {
            buttnBack(this);
        },
        "mouseleave" : function () {
            buttonBackLeave(this);
        }
    })


    var sidebarButtonColor;
    $("#sidebarNavUl li a").on({
        "mouseenter" : function () {
            sidebarButtonColor=$(this).css("color");
            $(this).css("color","white");
            $(this).parent().siblings("li").children("a").css("background-color","transparent");
            $(this).animate({"background-color":"#2ea9df"});
        },
        "mouseleave" : function () {
            $(this).css("color",sidebarButtonColor);
            $(this).css("background-color","transparent");
        }
    });


    var upTimer = null;
    var target = 0; //目标位置
    $("#jianTou").on
    ("click",function()
        {
            clearInterval(upTimer);
            upTimer = setInterval(function () {
                var step = (target-scrolltoPart)/10;
                step = step>0?Math.ceil(step):Math.floor(step);    //取整
                scrolltoPart=scrolltoPart+step;
                window.scrollTo(0,scrolltoPart);
                if(scrolltoPart==0){
                    clearInterval(upTimer);
                    setTimeout(function () {
                        $("#jianTou").hide();                      //隐藏箭头
                    },5);
                }
            },25)
        }
    );


    var colorTimer=null;
    function animateColor(str)
    {
        if (colorTimer) {
            clearTimeout(colorTimer);
        }
        colorTimer=setTimeout(function () {
            $("#shade").animate({"background-color":str});
        },50);
    }

    var imgTimer=null;
    function animateimgUrlIn(str,fn)
    {
        if (imgTimer)
        {
            clearTimeout(imgTimer);
        }
        imgTimer=setTimeout(function () {
            if (str)
            {
                shadeBase.css("background-image","url("+str+")")        //设置背景
                shadeBase.fadeIn("normal");                         //背景图渐入
            }else {
                shadeBase.fadeOut("normal");                        //背景图渐出
            }
            if (fn)
            {
                fn();
            }
        },50);
    }

    var hideTimer=null;
    function animateHide()
    {
        if (hideTimer)
        {
            clearTimeout(hideTimer);
        }
        hideTimer=setTimeout(function () {
            $("#milinLog").hide();
            $("#loginbuttonBox").hide();
            $("#sidebar").hide();
        },30);
    }

    var showTimer=null;
    function animateShow ()
    {
        if (showTimer)
        {
            clearTimeout(showTimer);
        }
        showTimer=setTimeout(function () {
            $("#milinLog").show();
            $("#loginbuttonBox").show();
            $("#sidebar").show();
        },30)
    }

    var whiteTimer=null;
    function animateWhite ()
    {
        if (whiteTimer)
        {
            clearTimeout(whiteTimer);
        }
        whiteTimer=setTimeout(function () {
            $("#jianTou").css("background-color","black").children("img").attr("src","img/向上箭头-白色.png");
            $("#sidebarNavUl li a").css("color","black");                     //改变li颜色
            $("#order").css("background-color","black").children("a").css("color","white");
            $("#milinLog").children("img").attr("src","img/密林Log黑色.png");
            $("#loginbutton").css("background-color","black").children("span").css("background-color","white");
            $("#loginbutonUl li:first-child").children("a").css("color","black").parent().next().children("a").css("color","white");
        },30);
    }

    var blackTimer=null;
    function animateBlack ()
    {
        if (blackTimer)
        {
            clearTimeout(blackTimer);
        }
        blackTimer=setTimeout(function () {
            $("#jianTou").css("background-color","white").children("img").attr("src","img/箭头-向上.png");
            $("#sidebarNavUl li a").css("color","white");                     //改变li颜色
            $("#order").css("background-color","white").children("a").css("color","black");
            $("#milinLog").children("img").attr("src","img/密林Log.png");
            $("#loginbutton").css("background-color","white").children("span").css("background-color","black");
            $("#loginbutonUl li:first-child").children("a").css("color","white").parent().next().children("a").css("color","black");
        },30)
    }

    var mouseenterTimer=null;
    function menterLi (ele)
    {
        if (mouseenterTimer)
        {
            clearTimeout(mouseenterTimer);
        }
        mouseenterTimer=setTimeout(function () {
            $("#loginbutton span").animate({"top": (ele.index() * 60) + 5});
            if (ele.parent().prev("span").css("background-color")=="rgb(255, 255, 255)")  //白色
            {
                ele.children("a").css("color", "black").parent().siblings("li").children("a").css("color", "white");
            }else
            {
                ele.children("a").css("color", "white").parent().siblings("li").children("a").css("color", "black");
            }
        },300);
    }

    var mouseleaveTimer=null;
    function mseleaveLi(ele) {
        if (mouseenterTimer)
        {
            clearTimeout(mouseleaveTimer);
        }
        mouseleaveTimer=setTimeout(function () {
            $("#loginbutton span").animate({"top": 5});
            if (ele.parent().prev("span").css("background-color")=="rgb(255, 255, 255)")  //白色
            {
                if (ele.index()==0)
                {
                    ele.children("a").css("color", "black").parent().siblings("li").children("a").css("color", "white");
                }else {
                    ele.children("a").css("color", "white").parent().siblings("li").children("a").css("color", "black");
                }
            }else
            {
                if (ele.index()==0)
                {
                    ele.children("a").css("color", "white").parent().siblings("li").children("a").css("color", "black");
                }else {
                    ele.children("a").css("color", "black").parent().siblings("li").children("a").css("color", "white");
                }
            }
        },300);
    }

    var buttonBackTimer=null;
    var backgroundOld;
    var colorTextOld;
    function buttnBack (ele)
    {
        if (buttonBackTimer)
        {
            clearTimeout(buttonBackTimer);
        }
        buttonBackTimer=setTimeout(function () {
            backgroundOld=$(ele).css("background-color");
            colorTextOld=$(ele).find("a").css("color");
            $(ele).animate({"background-color":"#2ea9df"});
            $(ele).find("a").css("color","white");
        },200);
    }

    var buttonBackleaveTimer=null;
    function buttonBackLeave (ele)
    {
        if (buttonBackleaveTimer)
        {
            clearTimeout(buttonBackleaveTimer);
        }
        buttonBackleaveTimer=setTimeout(function () {
            $(ele).animate({"background-color":backgroundOld});
            $(ele).find("a").css("color",colorTextOld);
        },200);
    }

});