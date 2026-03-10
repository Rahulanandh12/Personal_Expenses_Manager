import { useState, useEffect } from "react";
// Define initial state once outside the component
const INITIAL_EXPENSE = {
  purpose: "",
  spent_amount: "",
  merchant_name: "",
  date: "",
  payment_method: "",
  location: "",
  description: ""
};
//  This form receives 3 things from its parent:
function ExpenseForm({ refresh, editingExpense, onCancelEdit }) {
  const [expense, setExpense] = useState(INITIAL_EXPENSE);
  const [error, setError] = useState("");
// If user clicks Edit → Fill the form with old expense data.
  useEffect(() => {// If not editing → Keep it empty.
    setExpense(editingExpense || INITIAL_EXPENSE);
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;// Detect which field is going to changed => Destructuring
    setExpense((prev) => ({ ...prev, [name]: value }));// Update only that field & Keep all other fields the same
  };

  const submitExpense = async (e) => {
    e.preventDefault();
    setError("");
    const url = editingExpense      //Add Expense or Update expense
      ? `http://localhost:8090/personal_expense/${editingExpense.id}`  // If editing:→ Send to specific expense
      : "http://localhost:8090/personal_expense";    // If adding new:→ Send to general expense list
    const method = editingExpense ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method, //Instead of writing the method for individual we wrote both method in ternary function
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)// Send data to backend
      });
     
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`); // If something fails → go to error section.
      await refresh(); // If saving is successful-> Reload expense list,
      setExpense(INITIAL_EXPENSE); // Clear the form
      if (onCancelEdit) onCancelEdit();// If user press cancel Exit from editing mode if editing
      
    } catch (err) {
      setError("Failed to save expense. Please try again.");
    }
  };
// If important fields are empty=>Disable the submit button
  const isInvalid = !expense.purpose || !expense.merchant_name || !expense.date || expense.spent_amount === "";

  return (
    <form className="card" onSubmit={submitExpense}>
      <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
      <input name="purpose" placeholder="Purpose" value={expense.purpose} onChange={handleChange} />
      <input name="spent_amount" type="number" placeholder="Amount" value={expense.spent_amount} onChange={handleChange} />
      <input name="merchant_name" placeholder="Merchant Name" value={expense.merchant_name} onChange={handleChange} />
      <input name="date" type="date" value={expense.date} onChange={handleChange} />
      <input name="payment_method" placeholder="Payment Method" value={expense.payment_method} onChange={handleChange} />
      <input name="location" placeholder="Location" value={expense.location} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={expense.description} onChange={handleChange}></textarea>
      <div>{error}</div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button type="submit" disabled={isInvalid}>{editingExpense ? "Update Expense" : "Add Expense"}</button>
        {editingExpense && (
          <button type="button" onClick={onCancelEdit} style={{ backgroundColor: "#757575" }}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;