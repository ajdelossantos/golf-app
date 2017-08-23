function holesComponent() {

  var wrapHoles = document.getElementById('wrapHoles');
  var elCourseName = document.getElementById('displayCourseName');
  var elHoleNumber = document.getElementById('holeNumber');

  var wrapComplete = document.getElementById('wrapComplete');

  var elHitFairwayRadio = document.getElementsByName('fairwayRadio');
  var elHitGreenRadio = document.getElementsByName('greenRadio');
  var elFairwayYes = document.getElementById('fairwayYes');
  var elFairwayNo = document.getElementById('fairwayNo');
  var elGreenYes = document.getElementById('greenYes');
  var elGreenNo = document.getElementById('greenNo');

  var btnStrokesUp = document.getElementById('strokesIncUp');
  var btnStrokesDown = document.getElementById('strokesIncDown');
  var elStrokesVal = document.getElementById('strokesVal');

  var btnPuttsUp = document.getElementById('puttsIncUp');
  var btnPuttsDown = document.getElementById('puttsIncDown');
  var elPuttsVal = document.getElementById('puttsVal');

  var elTotalStrokes = document.getElementById('totalStrokes');

  var btnNextHole = document.getElementById('btnNextHole');
  var btnPrevHole = document.getElementById('btnPrevHole');
  var btnReset = document.getElementById('btnReset');

  var elFairwayTotal = document.getElementById('fairwayTotal');
  var elGreenTotal = document.getElementById('greenTotal');
  var elScoreVal = document.getElementById('scoreVal');

  var lastHoleBool = false;
  
  var holeObj = {};

  // Object on start
  var ls = window.localStorage;
  var golfObj = ls.getItem('golf_app');
  golfObj = JSON.parse(golfObj);

  if (golfObj.complete) { // is round complete..
    completeComponentInit();
    return;
  }

  // TEMP Obj for testing, login as 'scott' for pre populated fields
    if (golfObj.user === 'scott') {
      golfObj = {
      course: {
          name: "Torrey Pines",
          holes: [
            {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: false, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: null, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: false, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: false, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: null, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: false, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: false, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: null, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"},
            {hitFairway: true, hitGreen: null, strokes: "2", putts: "1", totalStrokes: "3"}
            // {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"}
            // {hitFairway: true, hitGreen: true, strokes: "2", putts: "1", totalStrokes: "3"}
          ] 
        },
        fairwayTotal:12,
        greenTotal:11,
        scoreTotal:48,
        user:"scott"
      };
      ls.setItem('golf_app', JSON.stringify(golfObj));
    } // END TEMP Obj
  
  if (!golfObj.course.holes) {
      golfObj.course.holes = [];
      var initPrevIdx =golfObj.course.holes.length;
      holesService().prevEnableDisable(initPrevIdx, btnPrevHole);
  } else {
    elFairwayTotal.value = golfObj.fairwayTotal;
    elGreenTotal.value = golfObj.greenTotal;
    elScoreVal.value = holesService().getTotalScore(golfObj);
    if (golfObj.course.holes.length === 17) {
      btnNextHole.innerHTML = 'Finish Round';
      lastHoleBool = true;
    }
  }

  elCourseName.innerHTML = golfObj.course.name;
  elHoleNumber.innerHTML = golfObj.course.holes.length+1
  wrapHoles.classList.remove('d-none');


  // Increment events
  btnStrokesUp.addEventListener('click', function() {
      elStrokesVal.value = holesService().incrementUp(elStrokesVal.value);
      holesService().totalStrokes(elPuttsVal.value, elStrokesVal.value, elTotalStrokes, btnNextHole);
  });
  btnStrokesDown.addEventListener('click', function() {
      elStrokesVal.value = holesService().incrementDown(elStrokesVal.value);
      holesService().totalStrokes(elPuttsVal.value, elStrokesVal.value, elTotalStrokes, btnNextHole);
  });
  btnPuttsUp.addEventListener('click', function() {
      elPuttsVal.value = holesService().incrementUp(elPuttsVal.value);
      holesService().totalStrokes(elPuttsVal.value, elStrokesVal.value, elTotalStrokes, btnNextHole);
  });
  btnPuttsDown.addEventListener('click', function() {
      elPuttsVal.value = holesService().incrementDown(elPuttsVal.value);
      holesService().totalStrokes(elPuttsVal.value, elStrokesVal.value, elTotalStrokes, btnNextHole);
  }); // End increment events

  

  // Next / paging
  btnNextHole.addEventListener('click', function() {
    var decHolesLength = elHoleNumber.innerHTML;
    var idx = decHolesLength;
    var lastHoleInt = 18;

    if (+decHolesLength === 17) {
      btnNextHole.innerHTML = 'Finish Round';
      lastHoleBool = true;
    }

    +decHolesLength--;
    if (decHolesLength < golfObj.course.holes.length) {
      decHolesLength++
      if (!boolComparison(decHolesLength)) {
        replaceObj(decHolesLength);
      }
      holesService().nextEnableDisable(golfObj.course.holes.length, btnNextHole);
      idx++;
      reBuildHole(idx);
      return;
    }
    var holesLen = null;
    setCurrentTotals();
    golfObj.course.holes.push(buildObj());
    ls.setItem('golf_app', JSON.stringify(golfObj));
    
    if (lastHoleInt === golfObj.course.holes.length && lastHoleBool) {
      replaceObj(lastHoleInt);
      completeComponentInit();
    }
    holesLen = golfObj.course.holes.length;
    holesLen++;
    resetHole(holesLen);
  });


  // Previous / paging
  btnPrevHole.addEventListener('click', function() {
    var idx = elHoleNumber.innerHTML;
    var holeNum = +idx;

    if (+idx === 18) {
      btnNextHole.innerHTML = 'Next';
      lastHoleBool = false;
    }

    holeNum--;
    if (holeNum !== golfObj.course.holes.length) {
      if (!boolComparison(idx)) {
        replaceObj(idx);
      }  
    }
    idx--;
    reBuildHole(idx);
    holeNum--;
  });

  function boolComparison(idx) {
    idx--;
    holeObj.hitFairway = (holesService().radioValues(elHitFairwayRadio) === undefined) ?  null : holesService().radioValues(elHitFairwayRadio); // handle undefined
    holeObj.hitGreen = (holesService().radioValues(elHitGreenRadio) === undefined) ?  null : holesService().radioValues(elHitGreenRadio); // handle undefined
    if (golfObj.course.holes[idx].totalStrokes !== elTotalStrokes.value || holeObj.hitFairway !== golfObj.course.holes[idx].hitFairway || holeObj.hitGreen !== golfObj.course.holes[idx].hitGreen) {
      return false;
    }
    return true;
  }

  // Replace / rebuild
  function replaceObj(idx) {
    +idx--;
    golfObj.course.holes[idx] = buildObj();
    ls.setItem('golf_app', JSON.stringify(golfObj));
    idx++
    reBuildHole(idx);
  }

  // Paging / rebuilding
  function reBuildHole(idx) {
    golfObj = ls.getItem('golf_app');
    golfObj = JSON.parse(golfObj);
    +idx;
    holesService().nextEnableDisable(golfObj.course.holes.length, btnNextHole);
    holesService().prevEnableDisable(idx, btnPrevHole);
    var holeInt = idx;
    elHoleNumber.innerHTML = holeInt++;
    idx--;
    if (golfObj.course.holes.length === idx) {
      idx++;
      resetHole(idx);
      return;
    }
    elFairwayYes.checked = (golfObj.course.holes[idx].hitFairway);
    elGreenYes.checked = (golfObj.course.holes[idx].hitGreen);
    elFairwayNo.checked = (golfObj.course.holes[idx].hitFairway === false) ? true : false;
    elGreenNo.checked = (golfObj.course.holes[idx].hitGreen === false) ? true : false;
    elStrokesVal.value = golfObj.course.holes[idx].strokes;
    elPuttsVal.value = golfObj.course.holes[idx].putts;
    elTotalStrokes.value = golfObj.course.holes[idx].totalStrokes;
    elGreenTotal.value = holesService().getTotalGreen(golfObj);
    elFairwayTotal.value = holesService().getTotalFairway(golfObj);
    elScoreVal.value = holesService().getTotalScore(golfObj);
  }

  function setCurrentTotals() {
    // Score
    if (!elScoreVal.value) {
      elScoreVal.value = 0;
    }
    elScoreVal.value = +elTotalStrokes.value + +elScoreVal.value;
    // Fairway
    if (holesService().radioValues(elHitFairwayRadio)) {
      if (elFairwayTotal.value === undefined) {
        elFairwayTotal.value = 0;
      } else {
        elFairwayTotal.value++
      }
    }
    // Green
    if (holesService().radioValues(elHitGreenRadio)) {
      if (elGreenTotal.value === undefined) {
        elGreenTotal.value = 0;
      } else {
        elGreenTotal.value++
      }
    }
  }

  function buildObj() {
    holeObj.hitFairway = (holesService().radioValues(elHitFairwayRadio) === undefined) ?  null : holesService().radioValues(elHitFairwayRadio); // handle undefined
    holeObj.hitGreen = (holesService().radioValues(elHitGreenRadio) === undefined) ?  null : holesService().radioValues(elHitGreenRadio); // handle undefined
    holeObj.strokes = elStrokesVal.value;
    holeObj.putts = elPuttsVal.value;
    holeObj.totalStrokes = elTotalStrokes.value;
    golfObj.fairwayTotal = holesService().getTotalFairway(golfObj);
    golfObj.greenTotal = holesService().getTotalGreen(golfObj);
    golfObj.scoreTotal = +holesService().getTotalScore(golfObj);
    return holeObj;
  }

  function resetHole(idx) {
    elHoleNumber.innerHTML = idx;
    +idx
    holeObj = {};
    elStrokesVal.value = '';
    elPuttsVal.value = '';
    elTotalStrokes.value = '';
    btnNextHole.setAttribute('disabled', true);
    holesService().resetRadios(elHitFairwayRadio);
    holesService().resetRadios(elHitGreenRadio);
    holesService().prevEnableDisable(idx, btnPrevHole);
  }

  // Reset App
  btnReset.addEventListener('click', function() {
    wrapHoles.className += ' d-none';
    ls.removeItem('golf_app');
    wrapInit.classList.remove('d-none');
    window.location.reload();
  });

  function completeComponentInit() {
    wrapHoles.className += ' d-none';
    wrapComplete.classList.remove('d-none');
    completeComponent();
  }

  console.log('holesComponent', golfObj);
}
