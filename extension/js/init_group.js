var repos;
var groups;
var tabGroupName;
var tempGroup;
var temp
var storedTabGroups
var cookieTabGroups





$(document).ready(function(){

  init();
  initEventListener();
  clickTabGroupTitle();
  clickTabTitle();

  

})

//------------------------------function area-------------------------
function init(){
  repos = $('#repositoryPlace');

  chrome.storage.sync.get(['key'], function(result) {
    storedTabGroups = result.key;
    console.log(storedTabGroups);    
    renewRepository(storedTabGroups);
  });



}

function initEventListener(){
  //add tab group
  var addTabGroupBtn = $('#addTabGroupBtn');
  addTabGroupBtn.on('click', function(){
    addTabGroup();
  })

  //clear tab group
  var clearTabGroupsBtn = $('#clearTabGroupsBtn');
  clearTabGroupsBtn.on('click', function(){
    clearTabGroups();
    clearRepository();
  })

  //
  var showTabGroupsBtn = $('#showTabGroupsBtn');
  showTabGroupsBtn.on('click', function(){
    showTabGroups();
  })

  var testBtn = $("#testBtn");
  testBtn.on("click", function(){
    testTest();
  })
}

function clickTabGroupTitle(){
  //var clickedTabGroupTittleBtn = $('#repositoryPlace > li') //이렇게 하면 모든 버튼을 클릭할때 사용됨

  //동적으로 생성된 엘리먼트에 접글할때는 이렇게 해야함 
  $(document).on("click",'#repositoryPlace > li > .tabGroupTitleBtn', function(){
    openTabGroup(this.innerText);
  })

  $(document).on('click',"#repositoryPlace > li > input[type='checkbox']",function(){
    $(this.nextSibling).toggle()
    
  });

  $(document).on("click",'#repositoryPlace > li > .deletTabGroupBtn', function(){
    deletTabGroup(this.nextSibling.innerText);
  })

}

function clickTabTitle(){
  //동적으로 생성된 엘리먼트에 접글할때는 이렇게 해야함 
  $(document).on("click",'#repositoryPlace > li > p > a', function(){
    console.log('click a', this.href)
    chrome.tabs.create({ url: this.href });
  });
}

//------------------------------clickTabGroupTitle function area-------------------------
function openTabGroup(tabGroupTitle){
  
  var clickedTabGroup = storedTabGroups.filter(function(tempGroup){
      return tempGroup.tabGrouptitle == tabGroupTitle
    })


  var clickedTabGroupUrls = clickedTabGroup[0].groupUrls
  for (var i = 0; i <clickedTabGroupUrls.length ; i++) {
    //이렇게 하면 현 탭에서 열림 ->새로운 탭에서 열리게 해야함 
    chrome.tabs.create({ url: clickedTabGroupUrls[i][1] });
  }

}

function deletTabGroup(tabGroupTitle){
  var notClickedTabGroup = storedTabGroups.filter(function(tempGroup){
      return tempGroup.tabGrouptitle != tabGroupTitle
    })
  storedTabGroups = notClickedTabGroup
  console.log(notClickedTabGroup)
  chromeStorageSet(notClickedTabGroup,'s')
  renewRepository(notClickedTabGroup)
}






//------------------------------initEventListener function area-------------------------


function testTest(){

}


function addTabGroup(){
  //그룹 이름을 가져옴
  this.tabGroupName = $('#groupName');
  var url_matrix =[] ;
  var group
  //url과 title 가져옴 
  chrome.tabs.getAllInWindow(function(tabs){
    for (var i = 0; i< tabs.length; i++) {
      url_matrix.push([tabs[i].title,tabs[i].url]);
    }
    //탭 그룹을 만든다.
    group = makeTabGroup(tabGroupName.val(), url_matrix);
    storedTabGroups.push(group)
    chromeStorageSet(storedTabGroups,'s')
    renewRepository(storedTabGroups)
    tabGroupName.val('');//초기화 
  })

  
}

function clearRepository(){
  //repos를 초기화
  //나중에는 > li가 아아니라  > . 로 지정된 class를 제거 해주자 
  $("#repositoryPlace > li").remove();

}




function renewRepository(groups){
  //지우고 
  clearRepository();

  storedTabGroups


  var detailCheckBox = "<input type='checkbox'>"
  var detailContents = "<p style='display:none;'>ON</p>"

  //추가 
  for (var i = storedTabGroups.length - 1; i >= 0; i--) {

    this.repos.append(
      $('<li/>',{
        class : 'tabGroupLi'
      })
    )
    var iGroup = this.repos.children().last()[0]

    $(iGroup).append(
      $('<button/>',{
        text : '삭제',
        class : 'deletTabGroupBtn'
      })
    ).append(
      $('<button/>',{
        class : 'tabGroupTitleBtn',
        title : 'li 내부 button',
        text : storedTabGroups[i].tabGrouptitle
      })
    ).append(
      $('<input/>',{
        type : 'checkbox',
        class : 'tabGroupOpenCloseCB'
      })
    ).append(
      $('<p/>',{
        style :'display:none',
        text : '',
      })
    ).append(
      $('<br/>')
    )
    var iGroupP = $(iGroup).children()[3] //iGroup[2]가 p태그 임 

    console.log(storedTabGroups[i],storedTabGroups )
    //세부 내용 추가
    for (var j = 0 ; j < storedTabGroups[i].groupUrls.length; j++) {

      $(iGroupP).append(
        $('<a/>',{
          href : storedTabGroups[i].groupUrls[j][1],
          title : storedTabGroups[i].groupUrls[j][0],
          text : storedTabGroups[i].groupUrls[j][0],
          class : 'oneTabTitle'
        }).append(
          $('<br/>') 
        )
        //.append(
        //  $('<cite/>',{
        //    class : 'oneTabUrl',
        //    text : storedTabGroups[i].groupUrls[j][1],
        //  })
        //).append(
        //  $('<br/>')
        //)
      )
      //console.log(groups[i].groupUrls[j][0])
    }




    //$(iGroup).append(
    //  $('<input/>',{
    //    type = 'checkbox'
    //  })
    //)
  } 
}


function makeTabGroup(title, url_matrix){
  var group = {};
  group.actived = true;
  group.tabGrouptitle = title;
  group.groupUrls = url_matrix;

  return group;
}

function chromeStorageSet(groups, case_char){
  //case_char에서 c = cureent, 
  //크롬저장소에 set
    chrome.storage.sync.set({key: groups}, function() {
      switch (case_char){
        case 'c' : 
          console.log("groups is clear");

          break;
        case 's' : 
          console.log("groups is synced");
          break;
        default  : 
          console.log("default");
      }
    });
}

function clearTabGroups(){
  chromeStorageSet(storedTabGroups = [],'c'); // c = clear
   
}

function showTabGroups(){
  console.log(storedTabGroups);
}