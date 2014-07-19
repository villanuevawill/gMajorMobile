angular.module('gmajor.commentFactory', [])

.factory('CommentFactory', function($http, ChatsFactory, GridTargetFactory){


  var addNewComment = function(message){ 

    timestamp = new Date();
    author = 'Tyler';
    music = GridTargetFactory.soundBoard.exportGrids();

    dataToServer = {message: message, timestamp: timestamp, author: author, music: music};

    console.log(dataToServer);
    dataToServer = JSON.stringify(dataToServer);
    return dataToServer;

  }

  // var addAdditionalComment = function(data) {

  // }

  //     return $http({
  //     method: 'GET',
  //     url: url
  //   })
  //   .then(function (resp) {
  //     return resp.data;
  //   });

  var addSong = function (data) {
    return $http({
      method: 'POST',
      url: '/api/threads',
      data: data
    })
    .then(function (resp) {
      return resp.data;
    })
  };



  return {

    addSong: addSong,
    addNewComment: addNewComment

  }

  });