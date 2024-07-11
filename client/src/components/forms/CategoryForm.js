export default function CategoryForm({ 
    value, 
    setValue, 
    handleSubmit,
    buttonText = "Create",
    handleDelete
 }) {
    return (
        <div className="p-3 mt-4">
        <form onSubmit={handleSubmit}>
            <input 
                className="form-control p-3"
                placeholder="write category name" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className="d-flex justify-content-between">
            <button className="btn btn-info-create mt-3">{buttonText}</button>
            {handleDelete && (
                <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete</button>
            )}
            </div>
        </form>
    </div>
    )
}