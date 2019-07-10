$(document).ready(
    function()
    {
     
        $('#registerform').submit(
            function(event){
                event.preventDefault();

                const registerData = {
                    userFname : $('#userFname').val(),
                    userLname : $('#userLname').val(),
                    username : $('#username').val(),
                    password : $('#password').val()

                }
                // console.log(registerData);

        $.ajax({

            //giving the route for register api
                url:'http://localhost:3001/v1/register',
                method:'POST',
                contentType:'application/json',
                data: JSON.stringify(registerData),
            
                success : function(result, status){
                    // console.log(result);
                    // console.log(status);
                    $('#message').html(result.message);
                    
        
                },
        
                error : function(jqXHR, status){
                    // console.log(jqXHR.responseJSON.message);

                }
        
            })
        })
    }
    );

$(document).ready(

    function()
    {
    
        $('#addlocationform').submit(
            function(event){
                event.preventDefault();

                const registerData = {
                    latitude : $('#latitude').val(),
                    longitude : $('#longitude').val(),
                    userId : $('#userId').val()

                }
                 console.log(registerData);

        $.ajax({

            //giving the route for register api
                url:'http://localhost:3001/v1/additem',
                method:'POST',
                contentType:'application/json',
                data: JSON.stringify(registerData),
            
                success : function(result, status){
                    // console.log(result);
                    $('#message').html(result.message);
                    
        
                },
        
                error : function(jqXHR, status){
                //  console.log(jqXHR.responseJSON.message);
                }
        
            })
        })
    }
);

$(document).ready(
    function()
    {
     
        $('#loginform').submit(
            function(event){
                event.preventDefault();

                const registerData = {
                    username : $('#username').val(),
                    password : $('#password').val()

                }
                console.log(registerData);

        $.ajax({

            //giving the route for register api
                url:'http://localhost:3001/v1/login',
                method:'POST',
                contentType:'application/json',
                headers:{'authorization' :'Bearer '+window.localStorage.getItem('token')},
                data: JSON.stringify(registerData),
            
                success : function(result, status){
                    console.log(result);
                    // console.log(status);
                    window.localStorage.setItem('id',result.id);
                    window.localStorage.setItem('token',result.token);
                    window.localStorage.setItem('firstname',result.result.userFname);
                    window.localStorage.setItem('lastname',result.result.userLname);
                    window.localStorage.setItem('username',result.result.username);


                    $('#message').html(result.message);
                    
        
                },
        
                error : function(jqXHR, status){
                    // console.log(jqXHR.responseJSON.message);

                }
        
            })
        })
    }
    );
