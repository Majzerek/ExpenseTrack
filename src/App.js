import { useEffect, useState } from 'react';
import { Table, Tbody } from './Table';
import { Form } from './Form';
import { Inputs } from './Inputs';


export default function App({currency = '$'}) {

  const [where, setWhere] = useState('');
  const [when, setWhen] = useState('');
  const [howMuch, setHowMuch] = useState('');
  const [all, setAll] = useState(() => {
    const localValue = localStorage.getItem("ITEMS",)
    if (!localValue) return [];

    return JSON.parse(localValue)
  });
  
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(all))
  }, [all])


  function handleSubmit(e) {
    e.preventDefault();

    if (!where || !when || !howMuch) return;

    //seting new values
    setWhere(e.target.value);
    setWhen(e.target.value);
    setHowMuch(e.target.value);

    //add all value to a array obj
    setAll(current => { return [...current, { id: crypto.randomUUID(), Where: where, When: when, Expense: Number(howMuch) }] })
    //cleaning value 
    setWhere('')
    setWhen('')
    setHowMuch('')
  }

  return (

    <div className='app'>
      <Form when={when} where={where} howMuch={howMuch} onHowMuch={setHowMuch} onWhen={setWhen} onWhere={setWhere} onSubmit={handleSubmit}>
        <Inputs type={'date'} value={when} onSet={setWhen}>
           What was the date?
        </Inputs>
        <Inputs type={'text'} value={where} onSet={setWhere}>
          Where it was? 
        </Inputs>
        <Inputs type={'number'} value={howMuch} onSet={setHowMuch}>
          How much did you spend?
        </Inputs>
      </Form>

      < Table onSetAll={setAll} all={all} currency={currency}>
        <Tbody all={all} />
      </Table>

    </div>
  );
}
