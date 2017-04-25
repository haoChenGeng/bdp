var articleListUrl = "market/articleList";

/**
 * 市场雷达-情报
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
(function(url) {
	var articleListData = getArticle(url, 1, 1, 10);
	var articleList = articleListData.articleList;
	var itemul = document.getElementById("genlist");
	// console.log(articleListData);

	for(var i = 0; i < articleList.length; i++) {
		var item = articleList[i];

console.log(articleList[i]);
		var title = document.createElement("div");
		title.innerHTML = '【'+ item.marketArticle.channel +'】 ' + item.marketArticle.title;
		title.className = "gen-title  textOver";
		title.dataset.content = item.marketArticle.content;
		title.dataset.title = item.marketArticle.title;
		title.dataset.date = item.vcreateDate;
		title.dataset.userName = item.marketArticle.userName;

		var itemli = document.createElement("li");
		itemli.className = "mui-table-view-cell";
		itemli.appendChild(title);

		itemul.appendChild(itemli);
	}

	itemul.addEventListener('click', function(e) {
		var target = e.target || e.srcElement;
console.dir(target);
		if (target.nodeName == 'DIV') {
			articleInfo(target.dataset.content, target.dataset.title, target.dataset.date, target.dataset.userName);
		}
	});

})(articleListUrl);

/*function articleInfo(content, title, vcreateDate, username) {
	content = escape(content);
	title = escape(title);
	vcreateDate = escape(vcreateDate);
	username = escape(username);
	var myurl = 'news-report.html?content=' + content + '&title=' + title+'&vcreateDate='+vcreateDate+'&username='+username;
	window.location.href = myurl;
}*/