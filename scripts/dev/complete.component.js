function completeComponent() {

  var wrapComplete = document.getElementById('wrapComplete');
  var wrapInit = document.getElementById('wrapInit');

  var elCourseName = document.getElementById('completeCourseName');
  var elHoleList = document.getElementById('holeList');
  var elParList = document.getElementById('parList');
  var elHoleScore = document.getElementById('holeScore');
  var elHitFairway = document.getElementById('hitFairway');
  var elHitGreen = document.getElementById('hitGreen');
  var elStrokes = document.getElementById('strokes');
  var elPutts = document.getElementById('putts');
  var elTotal = document.getElementById('totalScore');
  var elTotalPutts = document.getElementById('totalPutts');
  var elTotalFairways = document.getElementById('totalFairways');
  var elTotalGreens = document.getElementById('totalGreens');

  var elTotalEagles = document.getElementById('totalEagles');
  var elTotalBirdies = document.getElementById('totalBirdies');
  var elTotalPars = document.getElementById('totalPars');
  var elTotalBogies = document.getElementById('totalBogies');
  var elTotalDoubleBogies = document.getElementById('totalDoubleBogies');

  var eagles = 0;
  var birdies = 0;
  var pars = 0;
  var bogies = 0;
  var doubleBogies = 0;

  var fairways = 0;
  var greens = 0;
  var putts = 0;

  var btnReset = document.getElementById('btnCompleteReset');

  var ls = window.localStorage;
  var golfObj = ls.getItem('golf_app');
  golfObj = JSON.parse(golfObj);

  golfObj.complete = true;
  ls.setItem('golf_app', JSON.stringify(golfObj));
  elCourseName.innerHTML = golfObj.course.name;

  // Build Score card, broke it up
  // Hole number and hole score and par logic
  for (var i = 0; i < golfObj.course.holes.length; i++) {
    var tdHoleNum = document.createElement('td');
    var tdPar = document.createElement('td');
    var tdScore = document.createElement('td');
    var under = golfObj.course.holes[i].par;
    var over = golfObj.course.holes[i].par;
    var strokes = golfObj.course.holes[i].totalStrokes;
    
    tdHoleNum.innerHTML = '<td>' + '<strong>' + (i+1) + '</strong>' + '</td>';
    tdPar.innerHTML = '<td>' + golfObj.course.holes[i].par + '</td>';
    if (+strokes === +golfObj.course.holes[i].par) {
      pars++;
    }
    if (+under > +strokes) {
      tdScore.className = 'par-eagle';
      eagles++;
    }
    under--
    if (under-- === +strokes) {
      tdScore.className = 'par-birdie';
      birdies++;
      eagles--;
    }
    if (over < +strokes) {
      tdScore.className = 'par-double-bogey';
      doubleBogies++;
    }
    over++
    if (over++ === +strokes) {
      tdScore.className = 'par-bogey';
      bogies++;
      doubleBogies--;
    }
    tdScore.innerHTML = '<td>' + golfObj.course.holes[i].totalStrokes + '</td>';
    elHoleList.appendChild(tdHoleNum);
    elParList.appendChild(tdPar);
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
      fairways++;
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
      greens++;
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
    var puttsVal = golfObj.course.holes[i].putts;
    tdStrokes.className = 'text-dull';
    tdStrokes.innerHTML = '<td>' + golfObj.course.holes[i].strokes + '</td>';
    tdPutts.className = 'text-dull';
    tdPutts.innerHTML = '<td>' + golfObj.course.holes[i].putts + '</td>';
    elStrokes.appendChild(tdStrokes);
    elPutts.appendChild(tdPutts);
    putts = putts + +puttsVal;
  }

  // Score total
  elTotal.value = golfObj.scoreTotal;
  elTotalFairways.value = fairways;
  elTotalGreens.value = greens;
  elTotalPutts.value = putts;
  elTotalEagles.value = eagles;
  elTotalBirdies.value = birdies;
  elTotalPars.value = pars;
  elTotalBogies.value = bogies;
  elTotalDoubleBogies.value = doubleBogies;

  // Reset App
  btnReset.addEventListener('click', function() {
    wrapComplete.className += ' d-none';
    ls.removeItem('golf_app');
    wrapInit.classList.remove('d-none');
    window.location.reload();
  });

  console.log('completeComponent', golfObj);
}
