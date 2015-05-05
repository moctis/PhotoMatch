'use strict';

angular.module('starter.controllers', [])

.controller('canvasCtrl', function($scope) {
  var pos = [0, 0, 0, 0];
  var numPic = 9;
  $scope.scamble = [
    [],
    [],
    [],
    []
  ];

  $scope.picClick = function(no) {
    pos[no] += 1;
    pos[no] = pos[no] % numPic;
    console.log(pos[no]);
  };

  $scope.init = function() {
    var i, a, b, c, no;
    for (no = 0; no < 4; no += 1) {
      for (i = 0; i < numPic; i += 1) {
        $scope.scamble[no][i] = $scope.scamble[no][i] = i;
      }
      for (i = 0; i < numPic * 5; i += 1) {
        a = Math.floor(Math.random() * numPic);
        b = Math.floor(Math.random() * numPic);
        c = $scope.scamble[no][a];
        $scope.scamble[no][a] = $scope.scamble[no][b];
        $scope.scamble[no][b] = c;

      }
    }
  };

  $scope.update = function() {};

  $scope.picHide = function(no, idx) {
    return $scope.scamble[no][pos[no]] !== idx;
  };

  $scope.pic = function(idx) {
    return 'background-image: url("../img/set1/pic' + (idx < 10 ? '0' : '') + idx + '.jpg");"';
  };

  $scope.check = function() {
    var no;
    console.log(pos);
    console.log($scope.scamble);
    var t = $scope.scamble[0][pos[0]];
    for (no = 0; no < 4; no += 1) {
      console.log('c' + $scope.scamble[no][pos[no]]);
      if (t !== $scope.scamble[no][pos[no]])
        return false;
    }
    return true;
  };

  $scope.lock = function() {
    var no;
    if ($scope.check()) {
      console.log('true');
      for (no = 0; no < 4; no += 1) {
        $scope.scamble[no].splice(pos[no], 1);
        pos[no] = 0;
      }
      numPic -= 1;

      if (numPic > 1) {
        for (no = 0; no < 4; no += 1) {
          pos[no] = Math.floor(Math.random() * numPic) % numPic;
        }
        //if ($scope.scambleLeft[left] !== $scope.scambleRight[right]) break;
      }
    } else {
      console.log('false');
    }
  };

  $scope.init();
  $scope.update();
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});