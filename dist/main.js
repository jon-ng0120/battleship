(()=>{"use strict";const t=new class{constructor(t,i){this.name=t,this.length=i,this.sunk=!1,this.sectionsHit=Array(i).fill("")}hit=t=>this.sectionsHit[t-1]="x";isSunk=()=>{this.sectionsHit.every((t=>"x"==t))&&(this.sunk=!0)}}("Cruiser",4),i=new class{constructor(){this.grid=this.createGrid()}createGrid=()=>{const t=[];for(let i=0;i<10;i++){t.push([]);for(let s=0;s<10;s++)t[i].push([])}return t};placeShip=(t,i,s,e)=>{for(let e=0;e<t.length;e++)this.grid[s][i+e]={ship:t,position:e+1}};checkSpace=(t,i,s)=>{const e=this.grid[i].slice(t-1,t+s-1);console.log(e.every((t=>""==t)))};receiveAttack=(t,i)=>{if(""!==this.grid[i][t]){const s=this.grid[i][t].ship,e=this.grid[i][t].position;s.hit(e)}else console.log("nope")}};i.placeShip(t,1,2,4),i.checkSpace(3,2,5),i.receiveAttack(3,2),i.receiveAttack(4,2),console.log(i)})();