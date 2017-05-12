$(document).ready
(function() 
   {
      $("#kosong").hide();

      $("#btn-search").on
      ("click", function(e)
         {
            $("#result").html(""); 
            $("#result").fadeIn(1000);
            if ($("#input").val() === "") 
            {
               $("#btn-search").fadeIn(500);
            } 
            else 
            {
               $(this).attr("disabled", true);

               $.getJSON
               ("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=" + $("#input").val() + "&callback=?", function(result) 
                  {
                     $("#search").attr("disabled", false);
                     if (result.hasOwnProperty("query")) 
                     {
                        $.each
                        (result.query.pages, function(key, page)
                           {
                              var extract = page.extract.length > 464 ? page.extract.substring(0,464) + "..." : page.extract;
                              $("#result").append('<li><h2><a target="_blank" href="http://en.wikipedia.org/?curid=' + page.pageid + '">' + page.title + '</a></h2>' + '<p>' + extract + '</p>' + '</li>');
                           }
                        );
                     }
                  }
               );
            }
            e.preventDefault();
         }
      );
   }
);