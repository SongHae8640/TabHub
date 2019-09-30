//컨텐츠 페이지의 #groupName 입력된 값이 변경 되었을 '때'
document.querySelector('#groupName').addEventListener('change', function () {
  //컨텐츠 페이지에 repositoryPlace값을 groupName로 바꿔줌 . 
  var groupName = document.querySelector('#groupName').value;
  document.querySelector('#repositoryPlace').innerText = groupName

  //현재 탭의 url 과 title을 가져옴 
  chrome.tabs.query({'currentWindow': true,'active': true}, function (tabs) {
      currentTabUrl = tabs[0].url;
      var currentTabTitle = tabs[0].title
      alert('url : ' + currentTabUrl + ', title :' + currentTabTitle)

  });

  
  
 
});

//When ini_group_btn is pressed, get url and storage url
var init_goup_btn = document.getElementById('init_goup_btn');
init_goup_btn.addEventListener('click', function(){
  //모든 탭을 가져옴 - tabs는 배열
  chrome.tabs.getAllInWindow(function(tabs){
    var all_url = '';

    for (var i = 0; i< tabs.length; i++) {
      all_url += tabs[i].url + '('+tabs[i].title +'),   '
    }
    alert('all_url : ' + all_url)
   

  })

  //
  chrome.storage.sync.set({
    
  })
	    

})




var store_in_storage = document.getElementById('store_in_storage');
store_in_storage.addEventListener('click', function(){
  //var group_Name = document.querySelector('#group_Name').value;
  


  /*
  chrome.tabs.getAllInWindow(function(tabs){
    tab_group = tabs

  })
  
  chrome.storage.sync.set({tab_group_name: tab_group[0].url}
    ,function(){
    alert(tab_group_name + ': ' +tab_group[0].url)
  })

  chrome.storage.sync.get([tab_group_name], function(result){
    console.log(result.tab_group_name)
    alert(result.tab_group_name)
  })
  

  document.querySelector('#chrome_stoage').innerText = groupName
*/
})


