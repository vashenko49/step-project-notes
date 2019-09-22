export class Authorizatoin {
   CheckCookie(name){
       let cookie = document.cookie;
       let pos = cookie.indexOf(`${name}=`);
       if (pos>=0){
           let start = pos+ name.length+1;
           let end = cookie.indexOf(';',start);
           if(end<0){
               end=cookie.length;
           }
           return decodeURIComponent(cookie.substring(start, end));
       }else {
            $("#registration").submit(function (e) {
                e.preventDefault();
                let dataClient ={
                    login:$('#InputEmail').val(),
                    password:$('#InputPassword').val()
                };
                $.ajax({
                    type:"POST",
                    url: `authorization/registration`,
                    data:dataClient,
                }).done(function (res) {
                    console.log(res);
                    document.cookie = `authorization=${ encodeURIComponent(res)}; max-age=3600`;
                    window.location.reload();
                });
            });
           $('#regist').modal();

       }
   }
}