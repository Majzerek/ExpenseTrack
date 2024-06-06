export function Table({ children, onSetAll, all, currency }) {
    function clearing() {
        onSetAll([]);
    }
    function sum(all) {
        if (!all.length) return 0;
        return all.reduce((a, b) => a + b.Expense, 0);
    }
    return <>
        <table className='table'>
            <caption>Your Expense in {new Date().getFullYear().toString()} <button className='btn ' onClick={clearing}>Clear All</button></caption>
            <thead>
                <tr>
                    <th>Where</th>
                    <th>Date</th>
                    <th>Expense in {currency}</th>
                </tr>
            </thead>
            {children}
            <tfoot>
                <tr>
                    <th scope="row" colSpan={2}>All expense cost:</th>
                    {!all.length ? <td>waiting...</td> :
                    <td>{sum(all)}{currency}</td>}
                </tr>
            </tfoot>

        </table>
        <footer>&copy; Majzerek {new Date().getFullYear()} </footer>
    </>;
}



export function Tbody({ all }) {
    return <tbody>
        {all.map((el) => <tr key={el.id}>
            <th scope='row'>{el.Where}</th>
            <td>{el.When}</td>
            <td>{el.Expense}</td>
        </tr>)}
    </tbody>;
}
