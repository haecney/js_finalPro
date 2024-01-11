
document.addEventListener('DOMContentLoaded', function() {
   
    const add=document.getElementById('add_user')
    const cancel=document.getElementById('cancel')
    const table=document.getElementById('list')
    const admit=document.getElementById('admit_change')

    fetch('http://localhost:3000/allUsers').then(
        res=>{
            return res.json();
        }
    ).then(data=>{
       // console.log(data)
        

        for (i=0;i<data.length;i++)
        {
            listitem = document.createElement('tr');

            choose=document.createElement('td');
            a=document.createElement('a');
            a.appendChild(document.createTextNode('编辑'))
            a.className='change_user'
            b=document.createElement('a');
            b.appendChild(document.createTextNode('删除'))
            b.className='delete_user'

            choose.appendChild(a)
            choose.appendChild(document.createTextNode(' | '))
            choose.appendChild(b)
            

            user_id=document.createElement('td');
            user_id.appendChild(document.createTextNode(data[i].id))
            username_list=document.createElement('td');
            username_list.appendChild(document.createTextNode(data[i].username))
            username_list.className='username'
            userpwd_list=document.createElement('td');
            userpwd_list.appendChild(document.createTextNode(data[i].password))
            userpwd_list.className='password'

            listitem.appendChild(user_id)
            listitem.appendChild(username_list)
            listitem.appendChild(userpwd_list)
            console.log(choose)
            listitem.appendChild(choose)
            console.log(listitem)
            table.appendChild(listitem)
        }
        const change=document.getElementsByClassName('change_user')
        const user_name=document.getElementsByClassName('username')
        const user_pwd=document.getElementsByClassName('password')
        const del=document.getElementsByClassName('delete_user')
    
    
        for(var i=0;i<del.length;i++){
        del[i].addEventListener('click',function(event){
            del_ind=this.parentNode.parentNode.rowIndex
            k=this.parentNode.parentNode.rowIndex
            console.log(user_name[k-1].textContent)
            if (!confirm("确定删除吗")) return
            body_req={
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username:user_name[k-1].textContent
                })
            }
            fetch('http://localhost:3000/delete',body_req)
            location.reload()
        })}
    
        add.addEventListener('click',function(event){
            isadd=0
            console.log(1)
            document.getElementById("mForm").style.display='block'
            document.getElementById("overlay").style.display='block'        
        })
        cancel.addEventListener('click',function(event){
            document.getElementById("mForm").style.display='none'
            document.getElementById("overlay").style.display='none'   
            document.getElementById('username').value=''
            document.getElementById('password').value='' 
        })
    
        
    
        for(var i=0;i<change.length;i++){
            change[i].addEventListener('click',function(event){
                isadd=1
                k=this.parentNode.parentNode.rowIndex
                document.getElementById("mForm").style.display='block'
                document.getElementById("overlay").style.display='block'
                console.log(this.parentNode.parentNode.rowIndex)
                console.log(user_name[k-1])
                document.getElementById('username').value=user_name[k-1].textContent  
                document.getElementById('password').value=user_pwd[k-1].textContent        
            })
        }
    
    }).catch(error=>{
        console.log(error)
    })

    const user_name=document.getElementsByClassName('username')

    admit.addEventListener('click',function(event){
       // alert(user_name[k-1].textContent)
        if (isadd===1) pre=user_name[k-1].textContent; else pre=null
        body_req={
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username:document.getElementById("username").value,
                password:document.getElementById("password").value,
                pre_username:pre
            })
        }
        if (isadd===1)fetch('http://localhost:3000/change',body_req); else fetch('http://localhost:3000/register',body_req) 
        location.reload()
    })
   


})