/**
 * Following will be called when a user clicks
 * on the "Add User" button.
 */
$("button#accept-license-btn").click(function(){
    //e.preventDefault();

        var enrollmentURL = "/mdm/controller/enroll";

        $.ajax({
            type: 'GET',
            url: enrollmentURL,
            success: function(data) {
                if (data) {
                    // then device is an iOS device
                    var iOSResponse = JSON.parse(data);
                    setInterval(function(){
                        var deviceCheckURL = iOSResponse.deviceCheckURL;
                        var inputs = iOSResponse.inputs;

                        $.ajax({
                            type:'POST',
                            url:deviceCheckURL,
                            contentType:'application/json',
                            data:JSON.stringify(inputs),
                            success:function(data){
                                var response = JSON.parse(data);
                                var deviceID = response.deviceID;
                                if(deviceID != null) {
                                    window.location.href = "wso2agent://" + deviceID;
                                }
                            },
                            error:function(){
                                alert("iOS enrollment error");
                            }
                        });
                    }, 5000);
                }
            },
            error: function() {
                alert("error in request to /mdm/controller/enroll");
            }
        });
});