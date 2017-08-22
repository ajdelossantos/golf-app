function initApp(holesService) {

  var ls = window.localStorage;
  var wrapInit = document.getElementById('wrapInit');
  var userName = document.getElementById('userName');
  var courseName = document.getElementById('courseName');
  var initApp = document.getElementById('initApp');
  var golfAppObj = {};

  var hasGolfApp = ls.getItem('golf_app');
  if (hasGolfApp) {
    wrapInit.className += ' d-none';
    holesComponent();
  }

  userName.addEventListener('blur', function() {
    enableInit();
  });

  courseName.addEventListener('blur', function() {
    enableInit();
  });

  // Validation
  function enableInit() {
    if (userName.value && courseName.value) {
      initApp.removeAttribute('disabled');
    } else {
      initApp.setAttribute('disabled', true);        
    }
  }

  initApp.addEventListener('click', function() {
    golfAppObj.user = userName.value;
    golfAppObj.course = {};
    golfAppObj.course.name = courseName.value;
    ls.setItem('golf_app', JSON.stringify(golfAppObj));
    wrapInit.className += ' d-none';
    holesComponent();
  });
}

initApp(holesService);

