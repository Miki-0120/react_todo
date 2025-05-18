import { useState } from 'react';

const App = () => {
  const [taskText, setTasks] = useState([]);
  const [taskValue, setTaskValue] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskValue.trim()) {
      setTasks([...taskText, { text: taskValue, isCompleted: false }]);
      setTaskValue('');
    }
  };

  const handleToggle = (index) => {
    const updated = [...taskText];
    updated[index].isCompleted = !updated[index].isCompleted;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    if (confirm("本当に削除してもよろしいですか？")) {
      const updated = taskText.filter((_, i) => i !== index);
      setTasks(updated);
    }
  };

  const handleEdit = (index, newText) => {
    const updated = [...taskText];
    updated[index].text = newText;
    setTasks(updated);
  };

  const total = taskText.length;
  const isCompleted = taskText.filter(task => task.isCompleted).length;
  const incomplete = total - isCompleted;

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
        {taskText.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.isocmpleted}
              onChange={() => handleToggle(index)}
            />
            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
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
        <p>完了: <span id="completedTasks">{isCompleted}</span></p>
      </div>
    </div>
  );
};

export default App;
