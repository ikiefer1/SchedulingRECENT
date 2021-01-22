/*JSON formatting rules:
-If startTime's hour is a single digit it must be inputted with a leading zero
ex. 0130 not 130

-Duration is in minutes

-Month uses the following key value pair:
0 = January, 1 = February, ...... 11 = December

-Weekdays is an array of applicable weekdays with the following key value pair:
    1 = Monday, 2 = Tuesday, ..... 0 =  Sunday

-Interval and Resources are both arrays where each index of an interval corresponds to 
the index in the resources.*/

/*
Right now the code is only set up for images with extension png, jpg, gif, and jpeg.
If it is not any of those, it treats the media as a video. This can be changed in the display function
*/
var current = []
var mediaTimeout;
function base2(data){
    var rules = getActiveRules(data);
    current = merge(current,rules);
    if(current.length==0)
    {
        document.pic.style.display = 'none'
        var vid = document.getElementById("autoplay")
        vid.style.display = 'none'
        vid.pause();
        vid.currentTime=0;
        setTimeout(base2,60000,data)
    }
    else
    {
        display(current[0],data)
        var tmp = current.splice(0,1)
        current.push(tmp[0])
        console.log("NEW CURRENT "+current)
    }
}

function getActiveRules(data){
    var d = new Date()
    var rules = [];
        
    for(var i = 0; i<data.length; i++)
    {       
        var startHour;
        var startMin = data[i].startTime.substring(2);
        startMin = parseInt(startMin);
        if(data[i].startTime.substring(0,1)=="0")
        {
            startHour = data[i].startTime.substring(1,2);
            startHour = parseInt(startHour)
        }
        else
        {
            startHour = data[i].startTime.substring(0,2);
            startHour = parseInt(startHour)
        }
        var r = new Date(d.getFullYear(),d.getMonth(),d.getDate(),startHour,startMin)
        var ruse=(r.getTime()+(data[i].duration*60000))
        console.log("d"+d.getTime())
        if(ruse>d.getTime()&&
           data[i].weekdays!=null&&
           d.getHours()>=startHour)
           {
                if((d.getHours()==startHour&&d.getMinutes()>=startMin)||d.getHours()!=startHour)
                {
                    for(var j = 0; j<data[i].weekdays.length; j++)
                    {
                        if (data[i].weekdays[j]==d.getDay())
                        {
                            console.log(d.getDay())
                            console.log(data[i].weekdays[j])
                            for(var k =0; k<data[i].interval.length;k++)
                            {
                                if(d.getTime()+(data[i].interval[k]*1000)>ruse)
                                {
                                    var time = (d.getTime()+(data[i].interval[k]*1000)) - ruse;
                                    time =data[i].interval[k]-(time/1000)
                                    rules.push([time,data[i].resources[k]])
                                }
                                else
                                {
                                    rules.push([data[i].interval[k],data[i].resources[k]])
                                }
                            }
                            break;
                        }
                    }
                }
            }
    
        if(ruse>d.getTime()&&
           data[i].month==d.getMonth()&&
           data[i].day==d.getDate()&&
           d.getHours()>=startHour)
           {
                if((d.getHours()==startHour&&d.getMinutes()>=startMin)||d.getHours()!=startHour)
                {
                for(var k =0; k<data[i].interval.length;k++)
                {
                    if(d.getTime()+(data[i].interval[k]*1000)>ruse)
                    {
                    var time = (d.getTime()+(data[i].interval[k]*1000)) - ruse;
                    time =data[i].interval[k]-(time/1000)
                    rules.push([time,data[i].resources[k]])
                    }
                    else
                    {
                    rules.push([data[i].interval[k],data[i].resources[k]])
                    }
                }
                }
            }
    }
    console.log("Rules"+rules)
    return rules;
}
function merge(current,rules){
    var count=0;
    //var tmpRules =JSON.parse(JSON.stringify(rules))
    //var tmpCurrent = JSON.parse(JSON.stringify(current))
    var tmp=[];
    console.log("length "+current.length)
    for(var i = 0; i<current.length;i++)
    {
        for(var j = 0; j<rules.length;j++)
        {
            console.log("tmp "+rules[j][1])
            console.log("current "+current[i][1])
            console.log(rules.length)
            if(rules[j][1]==current[i][1])
            {
               //tmpCurrent[i][0]=rules[j][0]
                //tmpLong.push(rules[j])
                //rules.splice(j,1)
                tmp.push(rules[j])
                console.log("IN LOOP")
                break;
            }
            //else if(tmpRules[j][1]!=tmpCurrent[i][1])
            //{
              //  count++
            //}
        }
        //if(count==tmpRules.length)
        //{
          //  console.log("SHOuld NOT DELETE")
           // current.splice(i,1)
        //}
        //count=0;
    }
    var end=[];
    for(var k =0; k<rules.length;k++)
    {
        for(var l =0; l<tmp.length;l++)
        {
            if(tmp[l][1]!=rules[k][1])
            {
                count++
            }
        }
        if(count==tmp.length)
        {
            end.push(rules[k])
        }
        count=0;
    }
    current= tmp.concat(end)
    console.log("current"+current)
    return current;
}

function display(front,data){
    var url= front[1]
    var ext = url.substring(url.length-3)
    
    if(ext=='jpg'||ext=='png'||ext=='gif'||ext=='peg')
    {
        document.pic.src = front[1]
        document.pic.style.display ='block'
        var vid =document.getElementById("autoplay")
        vid.style.display ='none'
        vid.pause();
        vid.currentTime=0;
        
    }
    else{
        var vid =document.getElementById("autoplay");
        vid.src = front[1]
        document.pic.style.display = 'none'
        vid.style.display = 'block'
        vid.play();
        
    }
    
     mediaTimeout =setTimeout(base2,front[0]*1000,data)
    
}
//base2();

fetch("./schedule.json")
.then(response => {
   return response.json();
})
.then(data => base2(data));
