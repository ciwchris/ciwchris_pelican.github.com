//This is the title for your window tab, and your Radar
//document.title = "Technology Radar";


//This is the concentic circles that want on your radar
var radar_arcs = [
                   {'r':100,'name':'Adopt'}
                  ,{'r':200,'name':'Trial'}
                  ,{'r':300,'name':'Assess'}
                  ,{'r':400,'name':'Hold'}
                 // ,{'r':500,'name':'Possible Extra if you want it'}
                 ];

//This is your raw data
//
// Key
//
// movement:
//   t = moved
//   c = stayed put
//
// blipSize: 
//  intValue; This is optional, if you omit this property, then your blip will be size 70.
//            This give you the ability to be able to indicate information by blip size too
//
// url:
// StringValue : This is optional, If you add it then your blips will be clickable to some URL
//
// pc: polar coordinates
//   r = distance away from origin ("radial coordinate")
//     - Each level is 100 points away from origin
//     t = angle of the point from origin ("angular coordinate")
//     - 0 degrees is due east
//
// Coarse-grained quadrants
// - Techniques: elements of a software development process, such as experience design; and ways of structuring software, such micro-services.
// - Tools: components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistance.
// - Platforms: things that we build software on top of: mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds
// - Programming Languages and Frameworks
//
// Rings:
// - Adopt: blips you should be using now; proven and mature for use
// - Trial: blips ready for use, but not as completely proven as those in the adopt ring; use on a trial basis, to decide whether they should be part of your toolkit
// - Assess: things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you
// - Hold: things that are getting attention in the industry, but not ready for use; sometimes they are not mature enough yet, sometimes they are irredeemably flawed
//      Note: there's no "avoid" ring, but throw things in the hold ring that people shouldn't use.

var h = 1160;
var w = 1200;

var radar_data = [
    { "quadrant": "Techniques",
        "left" : 45,
        "top" : 18,
        "color" : "#8FA227",
        "items" : [ 
            {"name":"Continuous deployment", "pc":{"r":350,"t":100},"movement":"c"},   
            {"name":"Acceptance driven development", "pc":{"r":150,"t":140},"movement":"t", blipSize:"150"},   
            {"name":"Database migrations", "pc":{"r":120,"t":110},"movement":"t", blipSize:"150"},   
            {"name":"Vertical slice testing", "pc":{"r":270,"t":170},"movement":"c"},   
            {"name":"Done", "pc":{"r":170,"t":160},"movement":"t"},   
        ]
    },
    { "quadrant": "Tools",
        "left": w-200+30,
        "top" : 18,
        "color" : "#587486",
        "items" : [ 
            {"name":"ASP.NET MVC", "pc":{"r":80,"t":10},"movement":"c"},
            {"name":"ASP.NET WebAPI", "pc":{"r":80,"t":40},"movement":"c"},
            {"name":"Dapper", "pc":{"r":75,"t":65},"movement":"c"},
            {"name":"AutoFac", "pc":{"r":55,"t":65},"movement":"c"},
            {"name":"Twitter Bootstrap", "pc":{"r":60,"t":45},"movement":"c"},
            {"name":"AngularJS", "pc":{"r":50,"t":85},"movement":"c"},
            {"name":"Yeoman", "pc":{"r":280,"t":80},"movement":"t"},
            {"name":"Git", "pc":{"r":50,"t":20},"movement":"c"},
            {"name":"RavenDB", "pc":{"r":330,"t":55},"movement":"c"},
            {"name":"Tmux", "pc":{"r":130,"t":85},"movement":"c"},
            {"name":"vim-fugitive", "pc":{"r":230,"t":30},"movement":"c"},
            {"name":"Pedestal", "pc":{"r":250,"t":70},"movement":"t"}
        ]
    },
    { "quadrant": "Platforms",
        "left" :45,
         "top" : (h/2 + 18),
        "color" : "#DC6F1D",
        "items" : [
            {"name":".Net", "pc":{"r":40,"t":205},"movement":"c"},
            {"name":"Google App Engine", "pc":{"r":340,"t":255},"movement":"c"},
            {"name":"OAuth", "pc":{"r":160,"t":260},"movement":"c"},
            {"name":"Android", "pc":{"r":130,"t":190},"movement":"t"},
        ]
    },
    { "quadrant": "Languages",
        "color" : "#B70062",
        "left"  : (w-200+30),
        "top" :   (h/2 + 18),
        "items" : [ 
            {"name":"C#4", "pc":{"r":30,"t":350},"movement":"c"},
            {"name":"HTML 5", "pc":{"r":30,"t":275},"movement":"c"},
            {"name":"CSS3", "pc":{"r":70,"t":275},"movement":"c"},
            {"name":"LESS", "pc":{"r":70,"t":290},"movement":"c"},
            {"name":"Sass", "pc":{"r":240,"t":320},"movement":"c"},
            {"name":"JavaScript", "pc":{"r":60,"t":315},"movement":"c"},
            {"name":"T-SQL", "pc":{"r":90,"t":335},"movement":"c"},
            {"name":"PowerShell", "pc":{"r":90,"t":290},"movement":"t"},
            {"name":"zsh/bash", "pc":{"r":210,"t":355},"movement":"c"},
            {"name":"Java", "pc":{"r":160,"t":300},"movement":"c"},
            {"name":"Vimscript", "pc":{"r":240,"t":285},"movement":"c"},
            {"name":"Clojure", "pc":{"r":180,"t":310},"movement":"c"},
            {"name":"ClojureScript", "pc":{"r":210,"t":335},"movement":"t"},
        ]
    }
];
