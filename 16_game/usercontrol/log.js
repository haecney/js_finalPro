
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerLink = document.getElementById('registerLink');

    registerLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href="rigist.html"
    });

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        var agent_pd=0;
        var user_name=document.getElementById('username').value
        var pass_word=document.getElementById('password').value
        reqBody={
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username:user_name,
                password:pass_word
            })
        }

        fetch('http://localhost:3000/login',reqBody).then(response=>{
            return response.json()
        }).then(data=>{
            alert(data)
           if (data>0) window.location.href='game.html'; 
        }).catch(error=>{
            console.log("error")
            return;
        });
        
       fetch('http://localhost:3000/adminLogin',reqBody).then(response=>{
            return response.json()
        }).then(data=>{
            alert(data)
           if (data>0) window.location.href='manager.html'; else alert("账号密码错误")
        }).catch(error=>{
            console.log("error")
            return;
        });
        
        
    });
  });
