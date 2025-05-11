import { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskValue.trim()) {
      setTasks([...tasks, { text: taskValue, completed: false }]);
      setTaskValue('');
    }
  };

  const handleToggle = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    if (confirm("本当に削除してもよろしいですか？")) {
      const updated = tasks.filter((_, i) => i !== index);
      setTasks(updated);
    }
  };

  const handleEdit = (index, newText) => {
    const updated = [...tasks];
    updated[index].text = newText;
    setTasks(updated);
  };

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const incomplete = total - completed;

  return (
    <div>
      <h1>タスク管理アプリ</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          id="task_value"
          value={taskValue}
          onChange={e => setTaskValue(e.target.value)}
        />
        <button id="task_submit" type="submit">追加</button>
      </form>

      <ul id="task_list">
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(index)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => {
              const newText = prompt('新しい内容を入力してください', task.text);
              if (newText !== null) handleEdit(index, newText);
            }}>
              編集
            </button>
            <button onClick={() => handleDelete(index)}>削除</button>
          </li>
        ))}
      </ul>

      <div>
        <p>総タスク数: <span id="totalTasks">{total}</span></p>
        <p>未完了: <span id="incompleteTasks">{incomplete}</span></p>
        <p>完了: <span id="completedTasks">{completed}</span></p>
      </div>
    </div>
  );
};

export default App;
