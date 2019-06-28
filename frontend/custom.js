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
                    console.log(result);
                    console.log(status);
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
    
        $('#additemform').submit(
            function(event){
                event.preventDefault();

                const registerData = {
                    itemname : $('#itemname').val(),
                    itemprice : $('#itemprice').val(),
                    itemimagename : $('#itemimagename').val(),
                    itemdescription : $('#itemdescription').val()

                }
                 console.log(registerData);

        $.ajax({

            //giving the route for register api
                url:'http://localhost:3001/v1/additem',
                method:'POST',
                contentType:'application/json',
                data: JSON.stringify(registerData),
            
                success : function(result, status){
                    console.log(result);
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
                data: JSON.stringify(registerData),
            
                success : function(result, status){
                    console.log(result);
                    console.log(status);
                    $('#message').html(result.message);
                    
        
                },
        
                error : function(jqXHR, status){
                    // console.log(jqXHR.responseJSON.message);

                }
        
            })
        })
    }
    );
