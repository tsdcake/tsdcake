$(function () {
    /**
     * 添加文章卡片hover效果.
     */
    let articleCardHover = function () {
        let animateClass = 'animated pulse';
        $('article .article').hover(function () {
            $(this).addClass(animateClass);
        }, function () {
            $(this).removeClass(animateClass);
        });
    };
    articleCardHover();

    /*菜单切换*/
    $('.sidenav').sidenav();

    /* 修复文章卡片 div 的宽度. */
    let fixPostCardWidth = function (srcId, targetId) {
        let srcDiv = $('#' + srcId);
        if (srcDiv.length === 0) {
            return;
        }

        let w = srcDiv.width();
        if (w >= 450) {
            w = w + 21;
        } else if (w >= 350 && w < 450) {
            w = w + 18;
        } else if (w >= 300 && w < 350) {
            w = w + 16;
        } else {
            w = w + 14;
        }
        $('#' + targetId).width(w);
    };

    /**
     * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
     */
    let fixFooterPosition = function () {
        $('.content').css('min-height', window.innerHeight - 165);
    };

    /**
     * 修复样式.
     */
    let fixStyles = function () {
        fixPostCardWidth('navContainer', 'articles');
        fixPostCardWidth('artDetail', 'prenext-posts');
        fixFooterPosition();
    };
    fixStyles();

    /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/
    $(window).resize(function () {
        fixStyles();
    });

    /*初始化瀑布流布局*/
    $('#articles').masonry({
        itemSelector: '.article'
    });

    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 700,
        delay: 100
    });

    /*文章内容详情的一些初始化特性*/
    let articleInit = function () {
        $('#articleContent a').attr('target', '_blank');

        $('#articleContent img').each(function () {
            let imgPath = $(this).attr('src');
            $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>');
            // 图片添加阴影
            $(this).addClass("img-shadow img-margin");
            // 图片添加字幕
            let alt = $(this).attr('alt');
            let title = $(this).attr('title');
            let captionText = "";
            // 如果alt为空，title来替
            if (alt === undefined || alt === "") {
                if (title !== undefined && title !== "") {
                    captionText = title;
                }
            } else {
                captionText = alt;
            }
            // 字幕不空，添加之
            if (captionText !== "") {
                let captionDiv = document.createElement('div');
                captionDiv.className = 'caption';
                let captionEle = document.createElement('b');
                captionEle.className = 'center-caption';
                captionEle.innerText = captionText;
                captionDiv.appendChild(captionEle);
                this.insertAdjacentElement('afterend', captionDiv)
            }
        });
        $('#articleContent, #myGallery').lightGallery({
            selector: '.img-item',
            // 启用字幕
            subHtmlSelectorRelative: true
        });

        // progress bar init
        const progressElement = window.document.querySelector('.progress-bar');
        if (progressElement) {
            new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }
    };
    articleInit();

    $('.modal').modal();

    /*回到顶部*/
    $('#backTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 400);
        return false;
    });

    /*监听滚动条位置*/
    let $nav = $('#headNav');
    let $backTop = $('.top-scroll');
    $(window).scroll(function () {
        /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
        let scroll = $(window).scrollTop();
        if (scroll < 100) {
            $nav.addClass('nav-transparent');
            $backTop.slideUp(300);
        } else {
            $nav.removeClass('nav-transparent');
            $backTop.slideDown(300);
        }
    });
});


// Copyright 2010 htmldrive.net Inc.
/**
 * @projectHomepage http://www.htmldrive.net/go/to/professional-images-title-button-slideshow
 * @projectDescription Professional Images & title & button slideshow with jquery plugin
 * @author htmldrive.net
 * More script and css style : htmldrive.net
 * @version 1.0
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
(function(a){
    a.fn.slideshow_buttontitle=function(p){
        var p=p||{};

        var m=p&&p.time_interval?p.time_interval:"500";
        var n=p&&p.window_background_color?p.window_background_color:"white";
        var o=p&&p.window_padding?p.window_padding:"5";
        var q=p&&p.window_width?p.window_width:"400";
        var r=p&&p.window_height?p.window_height:"400";
        var s=p&&p.border_size?p.border_size:"1";
        var t=p&&p.border_color?p.border_color:"black";
        var u=p&&p.title_text_color?p.title_text_color:"red";
        var v=p&&p.title_background_color?p.title_background_color:"black";
        var w=p&&p.button_color?p.button_color:"blue";
        var x=p&&p.button_current_color?p.button_current_color:"white";
        var y=p&&p.button_size?p.button_size:"8";
        o += "px";
        q += "px";
        r += "px";
        s += "px";
        y += "px";

        var z;
        var A=0;
        var B=a(this);
        var C=B.find("ul:first").children("li").length;
        if(B.find("ul").length==0||B.find("li").length==0){
            B.append("Require content");
            return null
            }
            B.find("ul:first").children("li").children("a").children("img").css("width",q).css("height",r);
        s_s_ul(B.find("ul:first"),o,q,r,s,t,n);
        s_s_n(B.find(".slideshow_simple1_nav"),w,y);
        s_s_t(B.find(".slideshow_simple1_title"),u,v,q,r,o,s);
        B.find("ul:first").children("li").hide();
        play();
        B.find(".slideshow_simple1_nav").children("li").hover(function(){
            stop($(this))
            });
        B.hover(
            function(){

            },
            function(){
                play();
            }
        );
        function play(){
            clearTimeout(z);
            B.find("ul:first").children("li").fadeOut();
            B.find("ul:first").children("li").eq(A).fadeIn();
            B.find(".slideshow_simple1_nav").children("li").css("background-color",w);
            B.find(".slideshow_simple1_nav").children("li").eq(A).css("background-color",x);
            B.find(".slideshow_simple1_title").text(B.find("ul:first").children("li").children("a").eq(A).attr("title"));
            if(B.find("ul:first").children("li").children("a").eq(A).attr("title")==""||B.find("ul:first").children("li").children("a").eq(A).attr("title")==undefined){
                B.find(".slideshow_simple1_title").hide()
                }else{
                B.find(".slideshow_simple1_title").show()
                }
                A++;
            if(A>=C){
                A=0
                }
                z=setTimeout(play,m)
            }
            function stop(a){
            clearTimeout(z);
            var b=a.parent().children().index(a);
            A=b;
            B.find("ul:first").children("li").fadeOut();
            B.find("ul:first").children("li").eq(b).fadeIn();
            B.find(".slideshow_simple1_nav").children("li").css("background-color",w);
            B.find(".slideshow_simple1_nav").children("li").eq(A).css("background-color",x);
            B.find(".slideshow_simple1_title").text(a.find("ul:first").children("li").children("a").eq(A).attr("title"));
            if(B.find("ul:first").children("li").children("a").eq(A).attr("title")==""||B.find("ul:first").children("li").children("a").eq(A).attr("title")==undefined){
                B.find(".slideshow_simple1_title").hide()
                }else{
                B.find(".slideshow_simple1_title").show()
                }
                A++;
            if(A>=C){
                A=0
                }
            }
        function s_s_ul(a,b,c,d,e,f,g){
        b=parseInt(b);
        c=parseInt(c);
        d=parseInt(d);
        e=parseInt(e);
        var h=c+e*2+b*2;
        var i=d+e*2+b*2;
        B.css("width",h);
        B.css("height",i);
        var j=d+"px";
        var k=c+"px";
        var l="border: "+f+" solid "+" "+e+"px; height:"+j+"; width:"+k+"; padding:"+b+"px; background-color:"+g;
        a.attr("style",l)
        }
        function s_s_n(a,b,c){
        var d=a.children("li");
        var e="width: "+c+"; height:"+c+"; background-color:"+b+";";
        d.attr("style",e)
        }
        function s_s_t(a,b,c,d,e,f,g){
        d=parseInt(d);
        f=parseInt(f);
        g=parseInt(g);
        a.css("width",d+f*2+g*2+"px");
        a.css("background-color",c);
        a.css("color",b)
        }
    }
})(jQuery);
