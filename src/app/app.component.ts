import { Component,OnInit } from '@angular/core';
import{ Chart} from 'chart.js';
import { resolve } from 'url';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sort-Visualizer';
  chart;
  data=[]
  color=[]
  col="blue"
  ord="decreasing"
  status = false  //increasing order
  toggle(){
    this.status = !this.status
    if(this.status){
      this.col="pink"
      this.ord="increasing"
    }
    else{
      this.col="blue"
      this.ord="decreasing"
    }
  }
  ngOnInit(){

    for(var i=0;i<40;i++){
      this.data.push(Math.round(Math.random()*40));   //function that'll generate an array with random vals from 1-40   
      this.color.push("#FF9AA2")
    }
    this.chart = new Chart("ctx", {
      type: 'bar',
      data: {
          labels:this.data,
          datasets: [{
              label:"changing",
              data: this.data,
              backgroundColor: this.color,
              borderColor:this.color,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        }
      }
  });
  Chart.defaults.global.legend.display = false;
  }
  shuffle(){
  this.data=[]
  for(var i=0;i<40;i++){
    this.data.push(Math.round(Math.random()*40));   //function that'll generate an array with random vals from 1-40   
  }
  this.chart.data.datasets[0].data=this.data
  this.chart.data.labels=this.data
  // console.log(this.chart.data)
  this.chart.update()
}
sleep(s:number){
  return new Promise(resolve=>setTimeout(resolve,s)) //s is the count down value for timeout; timeout returns 1,2,3,4,5... to promise which is returned to await. as soon as the value of promise becomes 20 ,await contiues
}
async bubblesort(n){
  for (let i = 0; i < this.data.length; i++) {

    for (let j = 0; j < this.data.length-i-1; j++) {
      this.chart.data.datasets[0].backgroundColor[j]= "#8FC1A9"
      this.chart.data.datasets[0].backgroundColor[j+1]= "#8FC1A9"
      this.chart.update()
      if(this.data[j]<this.data[j+1] && n==true){
        var temp=this.data[j]
        this.data[j]=this.data[j+1]
        this.data[j+1]=temp
        this.chart.data.datasets[0].data=this.data
        this.chart.data.labels=this.data
        // console.log(this.chart.data)
        this.chart.update()
       }
       if(this.data[j]>this.data[j+1] && n==false){
        var temp=this.data[j]
        this.data[j]=this.data[j+1]
        this.data[j+1]=temp
        this.chart.data.datasets[0].data=this.data
        this.chart.data.labels=this.data
        // console.log(this.chart.data)
        this.chart.update()
       }
    await this.sleep(175)  //stays till this line until the fuction doesn't return anyth
    this.chart.data.datasets[0].backgroundColor[j]= "#FF9AA2"
    this.chart.data.datasets[0].backgroundColor[j+1]= "#FF9AA2"
    this.chart.update() 
    }
  }
}

async quicksort(arr,lowindex,highindex){
  if(lowindex<highindex){
    var p = await this.partition(arr,lowindex,highindex)
    await this.quicksort(arr,lowindex,p-1)
    await this.quicksort(arr,p+1,highindex)
  }
}
async partition(arr,lowindex,highindex){
  var pivot=arr[highindex]
  this.chart.data.datasets[0].backgroundColor[highindex]="#8FC1A9"
  this.chart.update()
  var i=lowindex-1
  //this.chart.data.datasets[0].backgroundColor[i]="rgba(0,255,0,1)"
  for (let j = lowindex; j < highindex; j++) {
    this.chart.data.datasets[0].backgroundColor[j]="#9DBAD5"
    this.chart.update()
    if(arr[j]<pivot && this.status==false){
      i++
      var temp=arr[i]
      arr[i]=arr[j]
      arr[j]=temp
      this.chart.data.datasets[0].data=arr
      this.chart.data.labels=arr
      this.chart.update()
      await this.sleep(100)
    }
    if(arr[j]>pivot && this.status==true){
      i++
      var temp=arr[i]
      arr[i]=arr[j]
      arr[j]=temp
      this.chart.data.datasets[0].data=arr
      this.chart.data.labels=arr
      this.chart.update()
      await this.sleep(100)
    }
    this.chart.data.datasets[0].backgroundColor[j]="#FF9AA2"
    //this.chart.data.datasets[0].backgroundColor[i]="#FF9AA2"
    this.chart.update()
    
 }
 this.chart.data.datasets[0].backgroundColor[i+1]="#9DBAD5"

 var temp=arr[i+1]
 arr[i+1]=arr[highindex]
 arr[highindex]=temp
 this.chart.data.datasets[0].backgroundColor[i+1]="#8FC1A9"
 this.chart.data.datasets[0].backgroundColor[highindex]="#FF99A2"

 this.chart.data.datasets[0].data=arr
 this.chart.data.labels=arr
 this.chart.update()
 await this.sleep(20)
 return i+1
}
qsort(){      //boiler function-> intermediate fn to call the main recursive fn; needed because the data being passed in the quicksort fn is being converted to local data and this this will edit the main data
  this.quicksort(this.data,0,39) //since 
}
async selectsort(){
  for (let i = 0; i < this.data.length; i++) {
    var min=i
    for (let j = i+1; j < this.data.length ; j++) {
     if(this.data[min]>this.data[j] && this.status==false){
       min=j
     }
     if(this.data[min]<this.data[j] && this.status==true){
      min=j
    }
    }
    var temp=this.data[i]
    this.data[i]=this.data[min]
    this.data[min]=temp
    this.chart.data.datasets[0].data=this.data
    this.chart.data.labels=this.data
    this.chart.update()
    await this.sleep(50)
  }
}
async insertsort(){
  for (let i = 1; i < this.data.length; i++){
      var key=this.data[i]
      var j=i-1
      while(j>=0 && key<this.data[j] && this.status==false){
        this.data[j+1]=this.data[j]
        j--
      }
      while(j>=0 && key>this.data[j] && this.status==true){
        this.data[j+1]=this.data[j]
        j--
      }
      this.data[j+1]=key
      this.chart.data.datasets[0].data=this.data
      this.chart.data.labels=this.data
      this.chart.update()
      await this.sleep(50)
      }
}
async oddevensort(){
  var flag=0
  while(flag==0){
    flag=1
    for (let i = 1; i < this.data.length-1; i=i+2) {
      if(this.data[i]>this.data[i+1] && this.status==false){
        var temp = this.data[i]
        this.data[i]=this.data[i+1]
        this.data[i+1]=temp
        flag=0
      }
      if(this.data[i]<this.data[i+1] && this.status==true){
        var temp = this.data[i]
        this.data[i]=this.data[i+1]
        this.data[i+1]=temp
        flag=0
      }
      this.chart.data.datasets[0].data=this.data
      this.chart.data.labels=this.data
      this.chart.update()
      await this.sleep(25)
    }
    for (let i = 0; i < this.data.length-1; i=i+2) {
      if(this.data[i]>this.data[i+1] && this.status==false){
        var temp = this.data[i]
        this.data[i]=this.data[i+1]
        this.data[i+1]=temp
        flag=0
      }
      if(this.data[i]<this.data[i+1] && this.status==true){
        var temp = this.data[i]
        this.data[i]=this.data[i+1]
        this.data[i+1]=temp
        flag=0
     }
      this.chart.data.datasets[0].data=this.data
      this.chart.data.labels=this.data
      this.chart.update()
      await this.sleep(25)
    }
  }
}
}
