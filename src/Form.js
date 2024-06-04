export function Form({ children, when, where, howMuch, onWhere, onWhen, onHowMuch, onSubmit }) {
    return (
        <div className='form'>
            <h1>Expense Tracer ... </h1>
            <form className='form_valid' onSubmit={onSubmit}>
                {children}
                <button className='btn btn_submit' type='submit'>Save</button>
            </form>
        </div>
    );
}
