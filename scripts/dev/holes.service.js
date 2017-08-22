function holesService() {

  return {
    incrementUp: function(val) {
      if (val === '') {
        val = 0;
      }
      val++;
      return val;
    },
    incrementDown: function(val) {
      if (val == '' || val == 0) {
        return 0;
      }
      val--;
      return val;
    },
    totalStrokes: function(puttsVal, strokesVal, elTotal, elBtnNext) {
      var puttsInt = null;
      var strokesInt = null;
      puttsInt = (+puttsVal) ? +puttsVal : 0;
      strokesInt = (+strokesVal) ? +strokesVal : 0;
      elTotal.value = puttsInt+strokesInt;
      if (elTotal.value > 0) { // Validation on next btn, req totals value
        elBtnNext.removeAttribute('disabled');
      } else {
        elBtnNext.setAttribute('disabled', true);
      }
    },
    radioValues: function(elName) {
      var elVal = null;
      for(var i = 0; i < elName.length; i++) {
        if (elName[i].checked) {
          elVal = (elName[i].value === 'true') ? true : false;
          return elVal;
        }
      }
    },
    resetRadios: function(elName) {
      for (var i = 0; i < elName.length; i++) {
        elName[i].checked = undefined;
      }
    },
    nextEnableDisable: function(length, btnNext) {
      var decLength = length;
      decLength--;
      if (length > decLength) {
        btnNext.removeAttribute('disabled');
      } else {
        btnNext.setAttribute('disabled', true);
      }
    },
    prevEnableDisable: function(idx, btnPrev) {
      if (idx > 1) {
        btnPrev.removeAttribute('disabled');
      } else {
        btnPrev.setAttribute('disabled', true);
      }
    },
    getTotalScore: function(obj) {
      var total = 0;
      var strokesInt = null;
      for (var i = 0; i < obj.course.holes.length; i++) {
        strokesInt = obj.course.holes[i].totalStrokes;
        total = (+strokesInt + +total);
      }
      return total;
    },
    getTotalFairway: function(obj) {
      var total = 0;
      var hit = null;

      for (var i = 0; i < obj.course.holes.length; i++) {
        hit = obj.course.holes[i].hitFairway;
        if (hit) {
          total++;
        }
      }
      return total;
    },
    getTotalGreen: function(obj) {
      var total = 0;
      var hit = null;
      for (var i = 0; i < obj.course.holes.length; i++) {
        hit = obj.course.holes[i].hitGreen;
        if (hit) {
          total++;
        }
      }
      return total;
    }
  };
}
