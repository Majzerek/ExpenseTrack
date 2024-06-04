export function Inputs({ children, value, onSet, type }) {
    return (
        <>
            <label>{children}</label>
            <input type={type} value={value} required onChange={(e) => onSet(e.target.value)} />
        </>);
}
