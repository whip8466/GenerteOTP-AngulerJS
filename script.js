angular.module('myApp', [])
    .controller('myController', function($scope, $interval){
        $scope.remaining_time;
        $scope.generated_otp;
        $scope.interval;

        $scope.generate_otp 	=	function(){
            $scope.remaining_time 	=	60;
            $scope.input_disabled_status 	=	false;
            $scope.generated_otp 	=	Math.round(Math.random() * 10000);

            if((''+$scope.generated_otp).length != 4){
                $scope.generate_otp();
            }

            $scope.generate_container 	=	false;
            $scope.verify_container 	=	true;

            if($scope.interval)
                $interval.cancel($scope.interval);

            $scope.interval 	=	$interval(function(){
                $scope.remaining_time--;

                if($scope.remaining_time == 0){
                    $interval.cancel($scope.interval);
                    $scope.remaining_time 	=	60;
                    $scope.input_disabled_status 	=	true;

                    alert('Please, regenerate OTP !');

                    $scope.verify_container 		=	false;
                    $scope.generate_container		= true;
                    $scope.entered_otp 		=	'';
                }
            },1000);
        }
        $scope.conf_otp 	=	function(){
            if($scope.generated_otp === $scope.entered_otp){
                alert('Success !');
                $scope.generate_container 	=	true;
                $scope.verify_container 	=	false;
                $interval.cancel($scope.interval);
                $scope.remaining_time 	=	60;
                $scope.entered_otp 		=	'';
            } else {
                alert('You have entered wrong OTP !');
            }
        }
        $scope.regenerate_otp 	=	function(){
            $scope.generate_container 	=	true;
            $scope.verify_container 	=	false;
            $interval.cancel($scope.interval);
            $scope.remaining_time 	=	60;
            $scope.entered_otp 		=	'';
        }
    });