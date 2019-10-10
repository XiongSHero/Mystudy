import React, {useState} from 'react';
// import Test from './test'
// import propTypes from 'prop-types'
import './App.css';
function App(){
  const [value,setValue] = useState('aaa');
  return (
      <div>
        <InputNumber value={value} onChange={e=>{setValue(e)}}/>
        <InputNumber defaultValue={value} onChange={e=>{setValue(e)}}/>
      </div>
  )
}
// 受控组件
/*function InputNumber(props) {
  const [value,setValue] = useState('');
  return (
        <input type="text" value={value}
               onChange={(e) => {
                 setValue(e.target.value);
                 props.onChange(value)
               }
             } />
  )
}*/
// 非受控组件
function InputNumber(props) {
  return (
      <input type="text" defaultValue={props.value}
             onChange={(e) => props.onChange(e.target.value)} />
  )
}
export default App;
