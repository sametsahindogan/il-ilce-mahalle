/**

Kullanılan kütüphaneler

-jQuery
-Select2
-SweetAlert

**/

$(document).ready(function() 
{
    /// Veritabanından ilçeleri çekiyoruz. Select2 Kütüphanemiz sayesinde oluşturduğumuz nesnemize aktarıyoruz. //
    $.ajax({

        type: "GET",
        url: "Ajax isteği atacağınız URL..",
        success:function (data) {

            var data = JSON.parse(data);

            for(var i=0 ; i<data.districts.length; i++)
            {
                var option = new Option(data.districts[i].district, data.districts[i].district, false, false);
                
                $("#m_select2_ilce").append(option).trigger('change');
            }

        },error:function () {
            swal(
                'HATA',
                'Bilinmeyen bir hata oluştu, ilçeler gösterilemiyor.',
                'error'
            )
        }
    });

    /// Tekrar adresleri çekip, içerisinden seçilen ilçeye göre mahalleleri listeliyoruz. //

    $('#m_select2_ilce').on('select2:select', function (e) {

        var secilen_ilce = $('#m_select2_ilce').val();

        $.ajax({
            type: "GET",
        	url: "Ajax isteği atacağınız URL..",
            success:function (data) {

                $('#m_select2_mahalle').empty();

                var data = JSON.parse(data);

                for(var i=0 ; i<data.districts.length; i++)
                {
                    if(data.districts[i].district === secilen_ilce)
                    {
                        for(var j=0; j<data.districts[i].neighborhoods.length; j++)
                        {
                            var option = new Option(data.districts[i].neighborhoods[j], data.districts[i].neighborhoods[j], false, false);
                            
                            $("#m_select2_mahalle").append(option).trigger('change');
                        }
                    }
                }

            },error:function () {

                swal(
                    
                    'HATA',
                    'Bilinmeyen bir hata oluştu, mahalleler gösterilemiyor.',
                    'error'
                )

            }
        });

    });
});
