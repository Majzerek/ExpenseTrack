import { useEffect, useState } from 'react';
export default function App() {

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

  function clearing() {
    setAll([])
  }

  function sum(all) {
    if (!all.length) return 0;
    return all.reduce((a, b) => a + b.Expense, 0)
  }


  return (

    <div className='app'>
      <Form when={when} where={where} howMuch={howMuch} onHowMuch={setHowMuch} onWhen={setWhen} onWhere={setWhere} onSubmit={handleSubmit} />
      <table className='table'>
        <caption>Your Expense in {new Date().getFullYear().toString()} <button className='btn' onClick={clearing}>Clear All</button></caption>
        
        <thead >
          <tr>
            <th>Where</th>
            <th>Date</th>
            <th>Expense in $</th>
          </tr>
        </thead>
        <tbody>
          {all.map((el) =>
            <tr key={el.id}>
              <th scope='row'>{el.Where}</th>
              <td>{el.When}</td>
              <td>{el.Expense}</td>
            </tr>)}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={2}>All expense cost:</th>

            <td>{sum(all)}</td>
          </tr>
        </tfoot>

      </table > 
      <footer>&copy; Majzerek {new Date().getFullYear()} </footer>
    </div>
  );
}


function Form({ when, where, howMuch, onWhere, onWhen, onHowMuch, onSubmit }) {
  return (
    <div className='form'>
      <h1>Expense Tracer ... </h1>
      <form className='form_valid'onSubmit={onSubmit}>



        <label>When you do purches?</label>
            <input type="date" value={when} required onChange={(e) => onWhen(e.target.value)} />


            <label>Where it was?</label>
            <input type='text' required placeholder='Writte a place' value={where} onChange={(e) => onWhere(e.target.value)} />


            <label>How much did you spend?</label>
            <input type='number' required value={howMuch} placeholder='How much in $' onChange={(e) => onHowMuch(e.target.value)} />


        <button className='btn btn_submit' type='submit'>Save</button>
      </form>
    </div>
  )
}