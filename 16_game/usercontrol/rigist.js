const { response } = require("express");

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', function(event) {
        const username=document.getElementById('username').textContent
        event.preventDefault();
        fetch('http://localhost:3000/register',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'username':'',
                'password':''
            }),
        }).then(response=>{
            return response.json()
        }).then(data=>{
            console.log(data)
            window.location.href="index.html"
        }).catch(error=>{
            console.log("error")
        })
      });

})