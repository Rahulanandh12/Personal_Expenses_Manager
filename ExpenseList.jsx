function ExpenseList({ expenses, refresh, onEdit }) {

  const deleteExpense = async (id) => {
    await fetch(`http://localhost:8090/personal_expense/${id}`, {
      method: "DELETE"
    });
    refresh();
  };

  const handleEdit = (expense) => {
    if (onEdit) {
      onEdit(expense);
    }
  };

  return (
    <div className="card">
      <h2>Expense History</h2>

      <table>
        <thead>
          <tr className="tr">
            <th>Date</th>
            <th>Purpose</th>
            <th>Amount</th>
            <th>Merchant</th>
            <th>Location</th>
            <th>Payment</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.purpose}</td>
              <td>₹{e.spent_amount}</td>
              <td>{e.merchant_name}</td>
              <td>{e.location}</td>
              <td>{e.payment_method}</td>
              <td>{e.description}</td>
              <td><button className="edit" onClick={() => handleEdit(e)}>Edit</button>
                  <button className="delete" onClick={() => deleteExpense(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
