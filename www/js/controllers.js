angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, Chats) {
        $scope.chats = Chats.all();

        $scope.panggil = function () {
            $scope.numberSetting = jonskiNumberSetting;
        }
})

.controller('ChatsCtrl', function($scope, Chats, $cordovaSms) {

  $scope.chats = Chats.all();

        $scope.sms = function (text) {
            var number  = jonskiNumberSetting;
            var message = text;
            var intent = '';
            $cordovaSms.send(number, message, intent);
            alert('Send SMS to : ' + jonskiNumberSetting + ', Message : ' + text);
        };

        $scope.app = {
            sendSms: function() {
                var number  = document.getElementById('numberTxt').value;
                var message = document.getElementById('messageTxt').value;
                var intent = ''; // var intent = 'INTENT'; -> if want to send via android native sms

                // var success = function () { alert('Message sent successfully'); };
                // var error = function (e) { alert('Message Failed:' + e); };

                // $ionicPlatform.ready(function() {
                // $cordovaSms.send(number, message, options, success, error);
                $cordovaSms.send(number, message, intent);
                alert('sms telah di kirim');
                // });
            }
        };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends, $ionicPopup, $timeout) {
        $scope.numberSetting = jonskiNumberSetting;
  //$scope.friends = Friends.all();

// Triggered on a button click, or some other target
        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="tel" ng-model="data.wifi">',
                title: 'Enter Phone Number',
                subTitle: 'Please use normal format ex : +62',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
                jonskiNumberSetting = res;
                $scope.numberSetting = jonskiNumberSetting;
            });
            //$timeout(function() {
            //    myPopup.close(); //close the popup after 3 seconds for some reason
            //}, 3000);
        };
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
