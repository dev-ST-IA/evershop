module.exports.mgconstants = {
    "collections" :{
        "order_by_options":[
            {
                value:0,
                text:"Latest Product Created Date",
                order_by:"product.created_at ASC"
            },
            {
                value:1,
                text:"Oldest Product Created Date",
                order_by:"product.created_at DESC"
            },
            {
                value:2,
                text:"Latest Product Modified Date",
                order_by:"product.updated_at ASC"
            },
            {
                value:3,
                text:"Oldest Product Modified Date",
                order_by:"product.updated_at DESC"
            },
            {
                value:4,
                text:"Product Price Low To High",
                order_by:"product.price ASC"
            },
            {
                value:5,
                text:"Product Price High To Low",
                order_by:"product.price DESC"
            }
            ,
            {
                value:6,
                text:"Product Sales Low To High",
                order_by:"qty ASC"
            },
            {
                value:7,
                text:"Product Sales High To Low",
                order_by:"qty DESC"
            }
        ]
    }
}