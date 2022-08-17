const toVW = (px) => {
    const percent = $(document).width() > 1000 ? false : true;
    return percent ? $(document).width() / 100 * (px / 10) : px;
}
$(document).ready(() => {
    scrollCallback();
    const start = 500;
    anime({
        targets: '.info > .imgLayer > .goorm-left',
        translateX: toVW(200),
        duration: 3000,
        delay: 500 + start
    });
    anime({
        targets: '.info > .imgLayer > .goorm-right',
        translateX: toVW(-200),
        duration: 3000,
        delay: 500 + start
    });
    anime({
        targets: '.info > .text',
        translateY: ["20%", 0],
        translateZ: 0,
        opacity: [0, 1],
        duration: 3000,
        delay: 1250 + start
    });
    anime({
        targets: '.arrow',
        translateY: ["20%", 0],
        translateZ: 0,
        opacity: [0, 1],
        duration: 3000,
        delay: 1250 + start
    });
    anime({
        targets: '.betaReview > .list',        
        opacity: 0,
        duration: 1
    });
    anime({
        targets: '.arrow',
        translateY: -15,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutCirc'
      });
});

const listScroll = anime({
    targets: '.recommend > .list',
    translateX: 270,
    elasticity: 200,
    easing: 'easeInOutSine',
    autoplay: false
});

const getScrollPercent = () => {
    var currY = $(this).scrollTop();
    var postHeight = $(this).height();
	var scrollHeight = $(document).height();
    // Current percentual position
	return (currY / (scrollHeight - postHeight)) * 100;
};
const getHeightPercent = (e) => {
    return {
        "top": (document.querySelector(e).offsetHeight ) / $(document).height() * 100,
        "bottom": (document.querySelector('.betaReview').offsetHeight + $(e).height() ) / $(document).height() * 100
    };
};
const ifInWindow = (e) => {
    const scroll = {
        "top": $(this).scrollTop(),
        "bottom": $(this).scrollTop() + $(window).height()
    };
    const element = {
        "top": document.querySelector(e).offsetTop,
        "bottom": document.querySelector(e).offsetTop + $(e).height()
    };

    if(scroll.bottom >= element.top && scroll.top <= element.bottom) return {
        "stat": true,
        "percent": 1 - (element.bottom - scroll.top) / element.bottom
    };
    return {
        "stat": false
    };
};
const scroll = (e, add = 0) => {
    $(this).scrollTop(document.querySelector(e).offsetTop + add);
}

let show = new Object();
const scrollCallback = () => {
    if(ifInWindow('.recommend > div:nth-child(4)').stat){
        const percent = ifInWindow('.recommend > div:nth-child(4)').percent;
        $('.recommend > div:nth-child(4)').css('left', `${60 - (percent * 100)}%`);
    }
    if(ifInWindow('.betaReview > .list').percent > 0.45 && !show['.betaReview > .list']){
        show['.betaReview > .list'] = true;
        anime({
            targets: '.betaReview > .list',        
            opacity: [0, 1],
            duration: 1000
        });
    }
    if(ifInWindow('.footer').stat){
        $('html').css('background', 'rgb(var(--footer-black))');
    }
    else{
        $('html').css('background', 'rgb(var(--white))');
    }

    if(!ifInWindow('#else > .title').stat && ifInWindow('.info').stat){
        $('.arrow').css('display', 'flex');
        show['header'] = false;
        $('.header').css('display', 'none');
        anime({
            targets: '.header',        
            translateY: "-100%",
            duration: 100
        });
    }
    else if(!show['header']){
        show['header'] = true;
        $('.arrow').css('display', 'none');
        $('.header').css('display', 'flex');
        anime({
            targets: '.header',        
            translateY: 0,
            duration: 100
        });
    }
};
$(document).on('scroll', () => {
    scrollCallback();
});

$(document).on('click', '.miri_application', () => {
    Swal.fire({
        title: '<div class="alertTitle">사전 신청을 위하여<br>이메일/전화번호를 입력 해 주세요!</div>',
        html: '<div class="alert">"확인" 버튼을 누르면 <a class="alert" href="https://policy.chicken-moo.com/" target="_blank">개인정보처리방침</a>와<br><a href="https://policy.chicken-moo.com/marketing" target="_blank" class="alert">마케팅정보수신</a>에 동의한 것으로 간주됩니다!</div>',
        icon: 'info',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
    }).then(res => {
        if(res.isConfirmed && res.value){
            participate(res.value);
        } 
    });
})

const participate = (data) => {
    $.ajax({
        url: '//api.zero-young.com/test/participate',
        type: 'POST',
        data: {
            data: data.replace(/ /g,"")
        },
        success: res => {
            if(res.success){
                Swal.fire({
                    icon: 'success',
                    title: '지구 방위대 등록 완료!',
                    text: '앱 출시 시 연락 드릴게요!'
                });
                getParticipate();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '흐음...?',
                    text: res.message
                });
            }
        }
    });
};


$(document).on('click', '.arrow > .img', () => {
    scroll('#else', -60);
})