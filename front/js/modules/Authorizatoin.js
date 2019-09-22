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
           //показываем модалку для входа
            $("#Login-form").submit(function (e) {
                e.preventDefault();
                let dataClient ={
                    login:$('#InputEmail').val(),
                    password:$('#InputPassword').val()
                };
                $.ajax({
                    type:"POST",
                    url: `authorization/`,
                    data:dataClient,
                }).done(function (res) {
                    if (res!=="error"){
                        document.cookie = `authorization=${ encodeURIComponent(res)}; max-age=3598`;
                        window.location.reload();
                    }else {
                        $.ajax({
                            type:'GET',
                            url:`authorization/createalerform`,
                        }).done(res=> {
                            $("#login").after(res);

                            $('#repeat-login').click(function () {
                                window.location.reload();
                            });

                            $('#login').modal('hide');
                            $("#error-singup").modal();
                        })

                    }
                });
            });
           $('#login').modal();

           //событие на клик создать аккаунт
           $("#createAccount").click(function () {
               //загружаем модулку для регестрации
               $.ajax({
                   type:'GET',
                   url:`authorization/registrationform`,
               }).done(res=>{

                   $("#login").after(res);
                   $('#singup-form').submit(function (e) {
                       e.preventDefault();
                       let dataClient ={
                           login:$('#InputEmailSingUp').val(),
                           password:$('#InputPasswordSingUp').val()
                       };
                       $.ajax({
                           type:"POST",
                           url: `authorization/registration`,
                           data:dataClient,
                       }).done(function (res) {
                           document.cookie = `authorization=${ encodeURIComponent(res)}; max-age=3599`;
                           window.location.reload();
                       });
                   });
                   $('#login').modal('hide');
                   $('#singup').modal();
               });

           });

       }
   }
}