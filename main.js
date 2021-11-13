$(function(){

    let productoBase = $(".plantilla .producto");
    let libros;

    function buscar_productos() {
        console.log("BUSCANDO PRODUCTOS");

        $.ajax({
            //url: 'http://localhost:3000/users',
            url: 'https://my-json-server.typicode.com/ivanperazzo/glei-api-server/books',
            type: 'GET',
            dataType: 'json',

            success: function(data){ // Funcion de callback
                console.log("RESPUESTA OK");
                console.log(data);
                libros = data;
                console.log(libros);
                for (producto of data) {
                    let nuevoProducto = productoBase.clone();

                    nuevoProducto.find(".nombre").text(producto.title);
                    nuevoProducto.find(".edad").text(producto.subtitle);
                    nuevoProducto.find(".id").text(producto.publisher);

                    $("#ProductosContenedor").append(nuevoProducto);
                }
            },

            error: function(request, error) {
                console.log("Ocurrio un error: " + error);
            }
        });
    }

    buscar_productos();

    function MostrarPorCategoria(categoria){
        $(".products").empty();
        // Loop on JSON.Products
        for (item of libros) {
            // Compare to item instead of this
            if(categoria == item.categoria) {
                console.log(item)
                $('<div/>', {'class':'productname'}).text(item.title).append(
                    $('<div/>', {'class':'productdetails', text:'Album: '+item.subtitle}),
                    //$('<div/>', {'class':'productdetails'}).append($('<img>').attr({src:item.Source,title:item.Name,alt:item.Name,class:'productimage'})),
                    $('<div/>', {'class':'productdetails', text:'Genre: '+item.categoria}),
                    $('<div/>').append(
                        $('<button />', {'class':'productbutton'})
                        .text('Add To Cart.')
                        .click(function(){
                            //$.fn.SaveToCart(i,item.Name, item.Album, item.Price);
                        })
                    )
                ).appendTo(".products"); // .products instead of #products cause you're using a class
            }
        };
    }
    $('.getProductsByCat').click(function(data) {
        var categoria = $(this).attr('value');
        console.log(categoria);
        MostrarPorCategoria(categoria);
    });    
})