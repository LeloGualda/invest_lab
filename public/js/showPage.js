
function HideD(MeuID) {
            $(MeuID).hide();
        }

        function FadD(MeuID) {
            $(MeuID).fadeIn();
        }

$(document).ready(function () {
            $('div').each(function () {
                var thisHeight = $(this).height();
                var pHeight = $(this).find("p").height();
                var finalMargin = (thisHeight - pHeight) / 2;
                $(this).find("p").css("margin-top", finalMargin);
            })
            var windowHeight = $(window).innerHeight();
            var Portabilidade_ConteudoHeight = $("div#Portabilidade_Conteudo").height();
            var heightBlankSpace = windowHeight - Portabilidade_ConteudoHeight;
            var windowWidth = $(window).innerWidth();
            var Portabilidade_ConteudoWidth = $("div#Portabilidade_Conteudo").width();
            var widthBlankSpace = windowWidth - Portabilidade_ConteudoWidth;
            $('div#Portabilidade_Conteudo').css('top', heightBlankSpace / 2);
            $('div#Portabilidade_Conteudo').css('left', widthBlankSpace / 2);
            $(window).resize(function () {
                var windowHeight = $(window).innerHeight();
                var Portabilidade_ConteudoHeight = $("div#Portabilidade_Conteudo").height();
                var heightBlankSpace = windowHeight - Portabilidade_ConteudoHeight;
                var windowWidth = $(window).innerWidth();
                var Portabilidade_ConteudoWidth = $("div#Portabilidade_Conteudo").width();
                var widthBlankSpace = windowWidth - Portabilidade_ConteudoWidth;
                $('div#Portabilidade_Conteudo').css('top', heightBlankSpace / 2);
                $('div#Portabilidade_Conteudo').css('left', widthBlankSpace / 2);
            });


            $("div.Portabilidade").click(function () {
                ClckPortabilidade();
            });



            $("div#Fout").click(function () {

                $("div#Portabilidade_Conteudo").animate({ opacity: '0' });
                $(this).animate({
                    opacity: '0'
                }, function () {
                    $(this).css('display', 'none');
                    $("div#Portabilidade_Conteudo").css('display', 'none');
                });
            })

            $("div#X").click(function () {
                ExtFout();
          
            })
        });

        function OpenFout() {
            $("div#Fout").css('display', 'block');
            $("div#Fout").animate({
                opacity: '0.7'
            }, function () {
                $("div#Portabilidade_Conteudo").css('display', 'block');
                $("div#Portabilidade_Conteudo").animate({ opacity: '1' });
            });
        }
        function ExtFout() {
            $("div#Portabilidade_Conteudo").css('display', 'none');
            $("div#Portabilidade_Conteudo").animate({ opacity: '0' });
            $("div#Fout").animate({ opacity: '0' });
        }
