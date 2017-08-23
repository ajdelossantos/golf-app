function completeComponent() {

  var wrapComplete = document.getElementById('wrapComplete');
  var wrapInit = document.getElementById('wrapInit');

  var elCourseName = document.getElementById('completeCourseName');
  var elHoleList = document.getElementById('holeList');
  var elHoleScore = document.getElementById('holeScore');
  var elHitFairway = document.getElementById('hitFairway');
  var elHitGreen = document.getElementById('hitGreen');
  var elStrokes = document.getElementById('strokes');
  var elPutts = document.getElementById('putts');
  var elTotal = document.getElementById('totalScore');

  var btnReset = document.getElementById('btnCompleteReset');



  var ls = window.localStorage;
  var golfObj = ls.getItem('golf_app');
  golfObj = JSON.parse(golfObj);

  golfObj.complete = true;
  ls.setItem('golf_app', JSON.stringify(golfObj));
  console.log('complete component', golfObj)

  elCourseName.innerHTML = golfObj.course.name;

  // Build Score card, broke it up
  // Hole number and hole score
  for (var i = 0; i < golfObj.course.holes.length; i++) {
    var tdHoleNum = document.createElement('td');
    var tdScore = document.createElement('td');
    
    tdHoleNum.innerHTML = '<td>' + '<strong>' + (i+1) + '</strong>' + '</td>';
    tdScore.innerHTML = '<td>' + golfObj.course.holes[i].totalStrokes + '</td>';
    elHoleList.appendChild(tdHoleNum);
    elHoleScore.appendChild(tdScore);
    
  }

  // Hit fairway and hit greens
  for (var i = 0; i < golfObj.course.holes.length; i++) {
    var tdHitFairway = document.createElement('td');
    var tdHitGreen = document.createElement('td');
    var isFalse = null;

    if (golfObj.course.holes[i].hitFairway) {
      tdHitFairway.innerHTML = '<td>' + '&bull;' + '</td>';
      tdHitFairway.className = 'text-success';
      elHitFairway.appendChild(tdHitFairway);
    }
    if (!golfObj.course.holes[i].hitFairway) {
      isFalse = (golfObj.course.holes[i].hitFairway === false) ? 'text-danger' : 'text-dull';
      tdHitFairway.innerHTML = '<td>' + '&bull;' + '</td>';
      tdHitFairway.className = isFalse;
      elHitFairway.appendChild(tdHitFairway);
    }
    if (golfObj.course.holes[i].hitGreen) {
      tdHitGreen.innerHTML = '<td>' + '&bull;' + '</td>';
      tdHitGreen.className = 'text-success';
      elHitGreen.appendChild(tdHitGreen);
    }
    if (!golfObj.course.holes[i].hitGreen) {
      isFalse = (golfObj.course.holes[i].hitGreen === false) ? 'text-danger' : 'text-dull';
      tdHitGreen.innerHTML = '<td>' + '&bull;' + '</td>';
      tdHitGreen.className = isFalse;
      elHitGreen.appendChild(tdHitGreen);
    }
  }

  // Strokes and putts
  for (var i = 0; i < golfObj.course.holes.length; i++) {
    var tdStrokes = document.createElement('td');
    var tdPutts = document.createElement('td');
    tdStrokes.className = 'text-dull';
    tdStrokes.innerHTML = '<td>' + golfObj.course.holes[i].strokes + '</td>';
    tdPutts.className = 'text-dull';
    tdPutts.innerHTML = '<td>' + golfObj.course.holes[i].putts + '</td>';
    elStrokes.appendChild(tdStrokes);
    elPutts.appendChild(tdPutts);
  }

  // Score total
  totalScore.innerHTML = golfObj.scoreTotal;

  // Reset App
  btnReset.addEventListener('click', function() {
    wrapComplete.className += ' d-none';
    ls.removeItem('golf_app');
    wrapInit.classList.remove('d-none');
    window.location.reload();
  });

  console.log('completeComponent', golfObj);
}
