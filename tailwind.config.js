module.exports = {
    mode : "jit",
    content : [ 
        "./src/**/*.{html,js,jsx}" ,
        "./public/index.html",
    ],
    theme : {
        screens : {
            "xss" : "400px",
            "xs" : "480px",
            "tablet" : "560px",
            "footer" : "600px",
            "sm" : "640px",
            "result" : "680px",
            "md" : "768px",
            "search" : "880px",	
        	"lg" : "1024px",
            "dup" :	"1062px",
        	"xl" : "1280px",
            "2xl" : "1536px",	        	
        },
        extend : {
            lineHeight : {
                "11" : "4rem",
            },
            colors : {
                "darkblue" : "#071D49",
            }, 
            backgroundImage : {
                "home" : "url('./img/background14.jpg')",
                "home2" : "url('./img/background13.jpg')",
                "main" : "url('./img/background10.jpg')",
                "dropdown" : "url('./img/dropdown.png')",
                "dropup" : "url('./img/dropup.png')",
                "bg3" : "url('./img/bg7.jpg')",
                "paper5sm" : "url(./img/paper5sm.jpg)",
                "paper5" : "url(./img/paper5.jpg)",
                "paper5xl" : "url(./img/paper5xl.jpg)",
                "paper4" : "url(./img/paper4.png)",
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
                "JasonHandwriting1-Regular" : [ "JasonHandwriting1-Regular", "sans-serif" ]
            },
            fontSize : {
                "4.5xl" : "2.5rem",
            }
        },
    },
    plugins : []   
};
