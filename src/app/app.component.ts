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
          }
      }
  });
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
async sort(n:number){
  for (let i = 0; i < this.data.length; i++) {

    for (let j = 0; j < this.data.length-i-1; j++) {
      this.chart.data.datasets[0].backgroundColor[j]= "#0080FF"
      this.chart.data.datasets[0].backgroundColor[j+1]= "#0080FF"
      this.chart.update()
      if(this.data[j]<this.data[j+1] && n==1){
        var temp=this.data[j]
        this.data[j]=this.data[j+1]
        this.data[j+1]=temp
        this.chart.data.datasets[0].data=this.data
        this.chart.data.labels=this.data
        // console.log(this.chart.data)
        this.chart.update()
       }
       if(this.data[j]>this.data[j+1] && n==2){
        var temp=this.data[j]
        this.data[j]=this.data[j+1]
        this.data[j+1]=temp
        this.chart.data.datasets[0].data=this.data
        this.chart.data.labels=this.data
        // console.log(this.chart.data)
        this.chart.update()
       }
    await this.sleep(20)  //stays till this line until the fuction doesn't return anyth
    this.chart.data.datasets[0].backgroundColor[j]= "#FF9AA2"
    this.chart.data.datasets[0].backgroundColor[j+1]= "#FF9AA2"
    this.chart.update() 
    }
    
  }
}
}
