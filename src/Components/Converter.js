import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'antd';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import './converter.css'

function Converter() {

const [data,setdata]=useState([]);
const [firstSelect,setfirstSelect]=useState('Bitcoin');
const [secondselect,setsecondselect]=useState('Litecoin')
const [input,setinput]=useState('0');
let url="https://api.coingecko.com/api/v3/exchange_rates";

const [result,setresult]=useState('0');

  useEffect(()=>{
    fetchdata();
  },[]);


useEffect(()=>{
  
  if(data.length==0) return;
 
const obj1=data.find((element)=>{
  return element.value==firstSelect;
}).rates

const obj2=data.find((element)=>{
  return element.value==secondselect;
}).rates

const newResult=(input*obj2)/obj1;
setresult(newResult);



console.log(obj1,obj2);

},[input,firstSelect,secondselect])

  async function fetchdata()
  {
    const respone=await fetch(url);
    const jsondata=await respone.json();
   const rates=jsondata.rates;

   const temparr=Object.entries(rates).map((element)=>{
    return {
      value:element[1].name,
      name:element[1].name,
      rates:element[1].value
    }
   })
   setdata(temparr);

  }

 const options=[{
  value:'jack',
  label:'jack'
 },
{
  value:'jack',
  label:'jack'
}]
  return (
  <>
<div className="container">
<Card title='Converter' className='card'>
<Form>
    <Input onChange={(event)=>{setinput(event.target.value)}}/>
</Form>
<div className="flex-box">
<Select options={data}  defaultValue={'Bitcoin'}  onChange={(value)=>setfirstSelect(value)} style={{width:'170px'}}></Select>
<Select options={data} defaultValue={'Litecoin'} onChange={(value)=>{setsecondselect(value)}}   style={{width:'170px'}}></Select>
</div>
<br />
<p>{input} {firstSelect}== {result} {secondselect}</p>
</Card>
</div>
  </>
  )
}

export default Converter