$(document).ready(function(){
	console.log("document ready test")
	
})
	
function loadReadRepliesData(bno){
	let repliesListRE = $("#repliesListRE");
	
	/*$.getJSON("/replies/" + bno + "/all", function(result){
		console.log(result);
		let str = "";
		for(reply in result){
			console.log(reply);
			str += 
		}
		repliesListRE.html(str);
	})*/
}

function loadReadData(bno){
	let boardListRE = $("#boardListRE_read");
	
	$.getJSON("/sample/list/" + bno, function(readInfo){
		/* readInfo 는 boardController에서 read 메서드에 있는 responseEntity로 보내주는 것들임. */
		console.log(readInfo);
		let str = "";
		
		str += '<h3>글 상세 페이지입니다.</h3>'
		str += '  <div class="boardListRE_bno">';
		str += '    <label>번호</label><input type="text" name="bno" value=' + readInfo[0].bno + ' readonly></div>';
		str += '  <div class="boardListRE_title">';
		str += '    <label>제목</label><input type="text" name="title" value=' + readInfo[0].title + ' readonly></div>';
		str += '  <div class="boardListRE_content">'
		str += '    <label>내용</label><textarea rows="5" name="content" readonly>' + readInfo[0].content + '</textarea></div>';
		str += '  <div><label>사진</label><input type="text" name="image"></div>';
		str += '  <div>댓글</div>'
		str += '  <div><button type="submit" onclick="loadModifyData(' + readInfo[0].bno + ')">수정하기</button></div>';
		str += '  <button type="button" class="read_remove" onclick="loadRemoveData(' + readInfo[0].bno + ')">삭제하기</button></div>';
		str += '  <div name="reply">';
		str += '    <div name="reply">';
		str += '      <div name="replyRegister">';
		str += '         <b>' + readInfo[2].nickname + '님 리뷰를 남겨</b><br>'
		str += '         <textarea rows="3" cols="20" name="text" placeholder="리뷰를 작성하세요"></textarea>';
		str += '         <button type="button" name="replyRegisterBtn">등록하기</button>';
		str += '      </div><br>';
		str += '    <div name="repltList">';
		str += '    </div><br>';
		str += '  </div>';
		
		boardListRE.html(str);
		console.log("완");
	})
	
	loadReadRepliesData(bno);
}

function loadModifyData(bno){
	let boardListRE = $("#boardListRE_modify");
	$.getJSON("/sample/list/" + bno, function(readInfo){
		console.log(readInfo);
		let str = "";
		
		str += '<h3>글 수정 페이지입니다.</h3>'
		str += '  <div class="boardListRE_bno">';
		str += '    <label>번호</label><input type="text" id="modiBno" name="bno" value=' + readInfo[0].bno + ' readonly></div>';
		str += '  <div class="boardListRE_title">';
		str += '    <label>제목</label><input type="text" id="modiName" name="title" value=' + readInfo[0].title + '></div>';
		str += '  <div class="boardListRE_content">'
		str += '    <label>내용</label><textarea id="updateContent" rows="5" name="content">' + readInfo[0].content + '</textarea></div>';
		str += '    <input type="hidden" id="modiMno" name="mno" value="' + readInfo[2].mno + '" readonly>';
		str += '    <input type="hidden" id="modinickname" name="nickname" value="' + readInfo[2].id + '" readonly>';
		str += '  <div><label>사진</label><input type="text" name="image"></div>';
		str += '  <div><button type="button" id="boardModify">저장하기</button>&nbsp;&nbsp;<button type="reset">되돌리기</button></div>'
		
		boardListRE.html(str);
		console.log("리드 모디파이 완");
	})
}

function loadRefreshData(){
	let boardListRE = $(".refresh_list");
	$.getJSON("/sample/list/refresh", function(result){
		let str = "";
		console.log(result[0].dtoList);
		
		$.each(result[0].dtoList, function(index, board){
			console.log(board);
		
			str += '<tr>';
			str += '	<td scope=row>' + board.bno + '</td>';
			str += '	<td><a onclick="loadReadData(' + board.bno + ')">' + board.title + '</a></td>';
			str += '	<td>' + board.nickname + '</td>';
			str += '	<td>' + board.regDate + '</td>';
			str += '	<td>' + board.count + '</td>';
			str += '</tr>';
		
		})
		
		boardListRE.html(str);
		console.log("리프레시 완");
	})
}

function loadRemoveData(bno){
	
	console.log("온클릭 성공");
	
	$.ajax({
		url: '/sample/list/remove/' + bno,
		method: "delete",
		data: JSON.stringify(bno),
		contentType: 'application/json; charset=utf-8',
		success: function(result){
			console.log("result : " + result);
			if(result === 'success') {
				alert("게시글이 삭제되었습니다.");
			}
		}
	})
}

/*$(document).on("click", ".read_remove", function(){
	
	loadRemoveData();
	
})*/

$(document).on("click", "#boardModify", function(){
		console.log("화악");
		var bno = $("#modiBno").val();
		var board = {
				bno: bno,
				title: $('#modiName').val(),
				content: $('#updateContent').val(),
				mno: $('#modiMno').val(),
		}
		
		console.log(board);
		
		$.ajax({
			url: '/sample/update/' + bno,
			method: 'put',
			data: JSON.stringify(board),
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				console.log("result : " + result);
				if(result === 'success') {
					alert("게시글이 수정되었습니다.");
					loadReadData(bno);
					loadRefreshData();
				}
			}
	
		});
})

