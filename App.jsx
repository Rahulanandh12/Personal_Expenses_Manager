import { useEffect, useState } from "react"; import ExpenseForm from "./components/ExpenseForm"; import ExpenseList from "./components/ExpenseList";import Login from "./components/Login";import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [user, setUser] = useState(null);

  const fetchExpenses = async () => {
    if (!user) return;
    try {
      const res = await fetch("http://localhost:8090/personal_expense");
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <div className="container">
      {/* Wrapped in a header div for better styling */}
      <div className="app-header">
        <h1>💰 Personal Expense Manager</h1>
        <button onClick={() => setUser(null)} className="delete">Logout</button>
      </div>

      <ExpenseForm 
        refresh={fetchExpenses} 
        editingExpense={editingExpense} 
        onCancelEdit={handleCancelEdit}
      />
      
      <ExpenseList 
        expenses={expenses} 
        refresh={fetchExpenses} 
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;