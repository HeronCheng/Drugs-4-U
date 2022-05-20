module.exports = {
    mode : "jit",
    content : [ 
        "./src/**/*.{html,js,jsx}" ,
        "./public/index.html",
    ],
    theme : {
        extend : {
            lineHeight : {
                "11" : "4rem",
            },
            colors : {

            }, 
            backgroundImage : {
                "home" : "url('./img/background14.jpg')",
                "main" : "url('./img/background10.jpg')",
                "dropdown" : "url('./img/dropdown.png')",
                "dropup" : "url('./img/dropup.png')",
            },
            animation : {
                "shake-vertical" : "shake-vertical 5s linear infinite both",
            },
            keyframes : {
                "shake-vertical" : {
                    "0%, 100%" : { transform : "translateY(0)" },
                    "10%, 30%, 50%, 70%" : { transform : "translateY(-8px)" },
                    "20%, 40%, 60%" : { transform : "translateY(8px)" },
                    "80%" : { transform : "translateY(6.4px)" },
                    "90%" : { transform : "translateY(-6.4px)" }
                }
            },
            fontFamily : {
                "ubuntu" : [ "Ubuntu", "sans-serif" ],
                "inter" : [ "Inter", "sans-serif" ],
            },
            fontSize : {
                "4.5xl" : "2.5rem",
            }
        },
    },
    plugins : []   
};
