import { useState, useCallback } from 'react'
import { Plus, Trash2, Circle, CheckCircle2 } from 'lucide-react'
import { cn } from './lib/utils'

export default function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const addTodo = useCallback((e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
    ])
    setInputValue('')
  }, [inputValue])

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-500">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            할 일 관리
          </h1>
          <p className="text-gray-600">오늘 해야 할 일을 관리하세요</p>
        </div>

        {/* Progress Section */}
        {totalCount > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-in fade-in slide-in-from-top duration-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">진행률</span>
              <span className="text-sm font-bold text-indigo-600">
                {completedCount} / {totalCount}
              </span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {progress === 100 ? '🎉 모든 할 일을 완료했습니다!' : `${Math.round(progress)}% 완료`}
            </p>
          </div>
        )}

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="mb-6 animate-in fade-in slide-in-from-top duration-1000">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="새로운 할 일을 입력하세요..."
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">추가</span>
            </button>
          </div>
        </form>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <Circle className="w-10 h-10 text-indigo-400" />
              </div>
              <p className="text-gray-500">아직 할 일이 없습니다</p>
              <p className="text-sm text-gray-400 mt-1">위에서 새로운 할 일을 추가해보세요</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 p-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={cn(
                      "flex-shrink-0 transition-all duration-300 hover:scale-110 active:scale-95",
                      todo.completed ? "text-green-500" : "text-gray-300 hover:text-indigo-400"
                    )}
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  
                  <span
                    className={cn(
                      "flex-1 transition-all duration-300",
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-800"
                    )}
                  >
                    {todo.text}
                  </span>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 active:scale-95"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {totalCount > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500 animate-in fade-in duration-1000">
            <p>
              전체 {totalCount}개 · 완료 {completedCount}개 · 남은 할 일 {totalCount - completedCount}개
            </p>
          </div>
        )}
      </div>
    </div>
  )
}