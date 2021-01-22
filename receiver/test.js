//const { get } = require('http');

var current = []
var data =[ 
    { weekdays: [1,3],
      startTime: "1153",
      endTime:"1600",
      duration: 300,
      interval: [5,10,13],
      resources: ["./kangaroo.jpg","./tiger.jpeg","./sample.mp4"]
    },
  
    { month: 0,
      day: 23,
      startTime: "1519", //should print
      duration: 100,
      interval: [5,20],
      resources: ["pancake","waffle"]
    },
  
    { month: 0,
      day: 23,
      startTime: "1517",
      duration:2,
      interval: [5],
      resources: ["shouldnot"]
    },
    { month: 0,             //should print
        day: 23,
        startTime: "1330",
        duration:300,
        interval: [5],
        resources: ["eggs"]
      },
      { weekdays: [1,4,6],  //should print
        startTime: "1500",
        duration:200,
        interval: [5],
        resources: ["bacon"]
      },
      { weekdays: [1,4,6],
        startTime: "1230",
        duration:2,
        interval: [5],
        resources: ["french toast"]
      },
      { month: 10,
        day: 15,
        startTime: "1230",
        duration:2,
        interval: [5],
        resources: ["pickles"]
      },
      { month: 10,
        day: 15,
        startTime: "1230",
        duration:2,
        interval: [5],
        resources: ["./kangaroo.jpg"]
      },
      { month: 10,
        day: 15,
        startTime: "1230",
        duration:2,
        interval: [5],
        resources: ["./kangaroo.jpg"]
      },
      { month: 10,
        day: 15,
        startTime: "1230",
        duration:2,
        interval: [5],
        resources: ["./kangaroo.jpg"]
      }
  ]/*
function base2(){
    var rules = getActiveRules();
    current = merge(current,rules);
    if(current.length==0)
    {
        document.pic.style.display = 'none'
        var vid = document.getElementById("autoplay")
        vid.style.display = 'none'
        setTimeout(base2,60000)
    }
    else{
        display(current[0])
        var tmp = current.splice(0,1)
        current.push(tmp[0])
        console.log("NEW CURRENT "+current)
}
}*/

function getActiveRules(day,month,hour,minute){
    var org = new Date()
    var d = new Date(org.getFullYear(),month,day,hour,minute)
    var rules = [];
        
    for(var i = 0; i<data.length; i++)
    {       
        var startHour;
        //var endHour;
        var startMin = data[i].startTime.substring(2);
        startMin = parseInt(startMin);
        //var endMin = data[i].endTime.substring(2);
        //endMin = parseInt(endMin);
        if(data[i].startTime.substring(0,1)=="0")
        {
            startHour = data[i].startTime.substring(1,2);
            startHour = parseInt(startHour)
            
        
        }
        else{
            startHour = data[i].startTime.substring(0,2);
            startHour = parseInt(startHour)
            
            }
        //if(data[i].endTime.substring(0,1)=="0")
          //  {
           // endHour = data[i].endTime.substring(1,2);
            //endHour = parseInt(endHour)
            
            //}
       // else{
          //  endHour = data[i].endTime.substring(0,2);
           // endHour = parseInt(endHour)
            
           // }
            
           //console.log("startHour"+startHour)
           var r = new Date(d.getFullYear(),d.getMonth(),d.getDate(),startHour,startMin)
           var ruse=(r.getTime()+(data[i].duration*60000))
           //console.log("R "+why)
           //console.log("d"+d.getTime())
           if((r.getTime()+(data[i].duration*60000))>d.getTime()&&
            data[i].weekdays!=null&&
            d.getHours()>=startHour){
                if((d.getHours()==startHour&&d.getMinutes()>=startMin)||d.getHours()!=startHour)
                {
                    //console.log(d.getHours())
                    //console.log(d.getMinutes())
                    //console.log(endHour)
                    //console.log(startMin)
                    //console.log(endMin)
                    
                    for(var j = 0; j<data[i].weekdays.length; j++)
                    {
                        if (data[i].weekdays[j]==d.getDay())
                        {
                            //console.log(d.getDay())
                            //console.log(data[i].weekdays[j])
                            for(var k =0; k<data[i].interval.length;k++){
                                if(d.getTime()+(data[i].interval[k]*1000)>ruse)
                                {
                                    var time = d.getTime()+(data[i].interval[k]*1000) - ruse;
                                    time =data[i].interval[k]-(time/1000)
                                    rules.push([data[i].interval[k],data[i].resources[k]])
                                }
                                else{
                                    rules.push([data[i].interval[k],data[i].resources[k]])
                                    }
                                /*var tmp = new Date(d.getFullYear(),d.getMonth(),d.getDate(),endHour,endMin)
                                if((d.getTime()+(data[i].interval[k]*1000))>tmp.getTime())
                                {
                                    console.log("IN FIRST")
                                    var time=d.getTime()+(data[i].interval[k]*1000) -tmp.getTime();
                                    time=data[i].interval[k]-(time/1000)
                                    rules.push([time,data[i].resources[k]])
                                }
                                else{
                                    rules.push([data[i].interval[k],data[i].resources[k]])
                                    console.log("IN")
                                }*/
                            }
                        }
                        
                    }
                }
            }
            
            //console.log("MERGE Probelm")
            //console.log(d)
             //console.log(data[i].month)
             //console.log(data[i].day)
             //console.log(d.getHours())
             //console.log(startHour)
            // console.log(endHour)//}
             if(data[i].weekdays==null){
           // console.log("NEXT 4 LINES")
            //console.log(ruse)
            //console.log(d.getTime())
            if(ruse>d.getTime())
            {
                //console.log("TURE")
            }
            //console.log(data[i].month)
            //console.log(data[i].day)
            //console.log(d.getHours())
            //console.log(startHour)
           // console.log(startMin)
        }

                 if((r.getTime()+(data[i].duration*60000))>d.getTime()&&
            data[i].month==d.getMonth()&&
            data[i].day==d.getDate()&&
            d.getHours()>=startHour){
                //console.log("IN PRIOR DATE")
                if((d.getHours()==startHour&&d.getMinutes()>=startMin)||d.getHours()!=startHour)
                {
                    //console.log("IN DATE")
                for(var k =0; k<data[i].interval.length;k++){
                if(d.getTime()+(data[i].interval[k]*1000)>ruse)
                {
                    var time = d.getTime()+(data[i].interval[k]*1000) - ruse;
                    time =data[i].interval[k]-(time/1000)
                    rules.push([data[i].interval[k],data[i].resources[k]])
                }
                else{
                    rules.push([data[i].interval[k],data[i].resources[k]])
                }
                //var tmp = new Date(d.getFullYear(),d.getMonth(),d.getDate(),endHour,endMin)
                /*if(d.getTime()+(data[i].interval[k]*1000)>tmp.getTime())
                    {
                        var time=d.getTime()+(data[i].interval[k]*1000) -tmp.getTime();
                        time=data[i].interval[k]-(time/1000)
                        rules.push([time,data[i].resources[k]])
                    }
                else{
                        rules.push([data[i].interval[k],data[i].resources[k]])
                    }*/
                }
            }
        }
    }
    console.log("Rules"+rules)
    return rules;
}
function merge(current,rules){
    var count=0;
    var tmpRules =JSON.parse(JSON.stringify(rules))
    var tmpCurrent = JSON.parse(JSON.stringify(current))
    var tmp=[];
    //console.log("length "+current.length)
    //if(current.length>rules.length)
      for(var i = 0; i<tmpCurrent.length;i++){
            for(var j = 0; j<tmpRules.length;j++)
            {
                //console.log("tmp "+tmpRules[j][1])
                //console.log("current "+tmpCurrent[i][1])
                //console.log(tmpRules.length)
                if(tmpRules[j][1]==tmpCurrent[i][1])
                {
                    tmpCurrent[i][0]=rules[j][0]
                    //tmpLong.push(rules[j])
                    //rules.splice(j,1)
                    tmp.push(tmpRules[j])
                    console.log("IN LOOP")
                    
                    break;
                }
                else if(tmpRules[j][1]!=tmpCurrent[i][1])
                {
                    count++
                }
            }
            if(count==tmpRules.length)
            {
                //console.log("SHOuld NOT DELETE")
                current.splice(i,1)
            }
            count=0;
    }
    var end=[];
    for(var k =0; k<tmpRules.length;k++)
    {
        for(var l =0; l<tmp.length;l++)
        {
            if(tmp[l][1]!=tmpRules[k][1])
            {
                count++
            }
        }
        if(count==tmp.length){
            end.push(tmpRules[k])
        }
        count=0;
    }
    current= tmp.concat(end)
    console.log("current "+current)
return current;
}

function display(front){
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
    
    var mediaTimeout =setTimeout(base2,front[0]*1000)
    
}
var rules=getActiveRules(23,0,15,19)
merge([[12,"pancake"],[25,"giraffe"],[20,"waffle"],[5,"bacon"]],rules)
/*var month = prompt("Enter month of 2021: ")
var day = window.prompt("Enter day of 2021: ")
var hour = window.prompt("Enter hour of day: ")
var minute = window.prompt("Enter minute of hour: ")
var testing=getActiveRules(day,month,hour,minute)
console.log("These are the rules: "+testing)
var cList = window.prompt("Enter list of current media: ")
var fin =merge(cList,testing)
console.log("This is the updated list: "+fin)*/
//base2();
/*fetch("./schedule.json")
.then(response => {
   return response.json();
})
.then(data => base2(data));*/
/*const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  var month;
  var day;
  var hour;
  var minute;
  var rul;
  
  readline.question(`Enter month: `, (mon) => {
    month = mon
    
  })
  readline.question(`Enter day: `, (da) => {
    day = da
    trial()
  })
  function trial(){
  readline.question(`Enter hour: `, (hou) => {
   hour = hou
    readline.close()
  })}
  readline.question(`Enter minute: `, (min) => {
    minute = min
    rul =getActiveRules(day,month,hour,minute)
    console.log("This is the set of rules for this day: "+rul)
    readline.close()
  })*/
  
