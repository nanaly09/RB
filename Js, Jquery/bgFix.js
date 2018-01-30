var bgFixFunc = { // 화면 고정 함수
	default : {
		body : $('body'),
		winTop : 0 // top값 초기화
	},
	fix : function(){ // 위치 고정 함수
		bgFixFunc.default.winTop = $(window).scrollTop(); // 현재 위치 계산, winTop에 반영
		bgFixFunc.default.body.css({ // 위치 고정
			'position':'fixed'
			, 'top' : '-' + bgFixFunc.default.winTop + 'px'
			, 'width' : '100%'
		})
	},
	cancel : function(){ // 고정 해제 함수
		bgFixFunc.default.body.removeAttr('style'); // 고정 해제
		$(window).scrollTop(bgFixFunc.default.winTop); // 스크롤 원위치
	}
};