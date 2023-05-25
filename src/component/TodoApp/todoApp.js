import React, { Component } from 'react'
import './todoApp.css'

export default class todoApp extends Component {

  state = {input:'', items : []}
handleChange =(event)=>{
this.setState({
  input: event.target.value
});
  }
storeItems = (event) =>{
  event.preventDefault()
  const { input , items} = this.state;
  const exist = items.filter((data)=> data === input)
  if(input === ''|| exist[0]){
     document.getElementById('error').innerHTML = exist[0]? 'Task Already exists !!':'Please enter something..!'
     setTimeout(()=>document.getElementById('error').innerHTML = '',1000)
     return
  }
  this.setState({
    items : [...items, input] ,
    input : ''
  })
}
deleteItem = index =>{
  this.setState({
    items :  this.state.items.filter((data,key)=> key !== index)
  })
}
rename = index =>{
   document.getElementById(index+'in').disabled = false
   document.getElementById(index+'in').value = this.state.items[index]
   document.getElementById(index+'div').innerHTML = '<i className="fa-solid fa-check" onClick={()=>this.save(index)} >Done</i>'

}
save = index =>{
  document.getElementById(index+'in').disabled = true
}
  render() {
    const {input , items} = this.state
    return (
      <div className='todo-container'>  
        <h1>Todo App</h1>

        <form onSubmit={this.storeItems}>
          <div className='input-section'>
          <input type='text'
           value={input}
           onChange={this.handleChange}
           placeholder='Enter Items...' />
          <button id='delete'>Add</button>
          </div>
          <span id='error'></span> 
        </form>
        <ul>
          {items.map((x,index) => <li key={index}>
            <input id={index+'in'}  
            disabled
            placeholder={x}
            />
             
            <div id={index+'div'} className='options'>
            <i className="fa-solid fa-pen-to-square" onClick={()=>this.rename(index)}></i>
            <i className="fa-solid fa-trash-can" onClick={()=>this.deleteItem(index)}></i>
            </div>
          </li>)} 
        </ul>
      </div>
    ) 
  }
}
