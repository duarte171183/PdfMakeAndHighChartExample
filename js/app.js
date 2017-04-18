var app = angular.module('angular-makepdf', []);

app.controller('CommentController', ['$scope', function($scope) {
    var imgBase64;
    $scope.user = {};

    // Convert image file into base64
    //
    $scope.toDataUrl = function(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
            var reader = new FileReader();

            reader.onloadend = function() {
                callback(reader.result);
            }

            reader.readAsDataURL(xhr.response);
        }

        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    // Pass image file and save callback result in local var imgBase64
    //
    $scope.toDataUrl('img/angularjs.png', function(base64Img) {
        imgBase64 = base64Img;
    });

    // Generate PDF file on submit information
    //
    $scope.sendComment = function() {
        var user = angular.copy($scope.user);

        var docDefinition = {
            pageSize: 'LETTER', // A4 | A5 | A6 ...
            pageOrientation: 'portrait', // portrait or landscape
            pageMargins: [80, 160, 80, 50], // [←, ↑, →, ↓] or [←→, ↑↓]
            header: {
                columns: [
                    {
                        image: imgBase64,
                        width: 100,
                        margin: [80, 60]
                    },
                    {
                        margin: [120, 60, 60, 0],
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.\nAliquam exercitationem delectus architecto ea, quis ex magnam excepturi ab unde.',
                        alignment: 'center',
                    }
                ]
            },
            footer: {
                stack: [
                    { text: 'This is the footer', margin: [80, 0] }
                ]
            },
            content: [
                {
                    text: 'Your information',
                    style: 'title'
                },
                {
                    text: 'Name: ' + user.name, style: 'data'
                },
                {
                    text: 'Email: ' + user.email, style: 'data'
                },
                {
                    text: 'Your comment',
                    style: 'title'
                },
                {
                    text: user.comment, style: 'data'
                }
            ],

            styles: {
                title: {
                    fontSize: 22,
                    bold: true,
                    margin: [0, 20]
                },
                data: {
                    margin: [0, 5]
                }
            }
        };

        pdfMake.createPdf(docDefinition).download('YourComment.pdf'); // Creates PDF file and download

        $scope.user = {};
    }
}]);
