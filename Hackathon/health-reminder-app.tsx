import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Bell, 
  PlusCircle, 
  X, 
  CheckCircle 
} from 'lucide-react';

// Lista de exercícios de alongamento e respiração
const EXERCISE_SUGGESTIONS = [
  {
    name: "Alongamento de Pescoço",
    type: "Alongamento",
    duration: "2-3 minutos",
    description: "Gire lentamente a cabeça em círculos, incline para os lados e para frente suavemente."
  },
  {
    name: "Respiração Profunda",
    type: "Respiração",
    duration: "5 minutos", 
    description: "Respiração diafragmática: inspire pelo nariz contando até 4, segure por 2, expire pela boca contando até 6."
  },
  {
    name: "Alongamento de Ombros",
    type: "Alongamento",
    duration: "3 minutos",
    description: "Eleve os ombros em direção às orelhas, gire para frente e para trás, solte lentamente."
  },
  {
    name: "Meditação Guiada Curta",
    type: "Mindfulness",
    duration: "5 minutos",
    description: "Sente-se confortavelmente, feche os olhos e foque na sua respiração, observando cada inspiração e expiração."
  }
];

const HealthReminderApp = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    time: '',
    exercise: null,
    days: []
  });
  const [isAddingReminder, setIsAddingReminder] = useState(false);

  const daysOfWeek = [
    'Segunda', 'Terça', 'Quarta', 
    'Quinta', 'Sexta', 'Sábado', 'Domingo'
  ];

  const addReminder = () => {
    if (newReminder.time && newReminder.exercise && newReminder.days.length) {
      setReminders([...reminders, { ...newReminder, id: Date.now() }]);
      setNewReminder({ time: '', exercise: null, days: [] });
      setIsAddingReminder(false);
    }
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleDay = (day) => {
    setNewReminder(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Bell className="mr-2 text-blue-500" /> 
        Lembretes de Saúde
      </h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Seus Lembretes</h2>
        {reminders.length === 0 ? (
          <p className="text-gray-500">Nenhum lembrete cadastrado</p>
        ) : (
          <ul>
            {reminders.map(reminder => (
              <li 
                key={reminder.id} 
                className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
              >
                <div>
                  <p className="font-medium">{reminder.exercise.name}</p>
                  <p className="text-sm text-gray-600">
                    {reminder.time} - {reminder.days.join(', ')}
                  </p>
                </div>
                <button 
                  onClick={() => removeReminder(reminder.id)}
                  className="text-red-500 hover:bg-red-100 p-1 rounded"
                >
                  <X size={20} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isAddingReminder ? (
        <button 
          onClick={() => setIsAddingReminder(true)}
          className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center"
        >
          <PlusCircle className="mr-2" /> Adicionar Lembrete
        </button>
      ) : (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-3">Novo Lembrete</h3>
          
          <div className="mb-3">
            <label className="block mb-2">Horário</label>
            <input 
              type="time" 
              value={newReminder.time}
              onChange={(e) => setNewReminder(prev => ({...prev, time: e.target.value}))}
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Exercício</label>
            <select 
              value={newReminder.exercise?.name || ''}
              onChange={(e) => {
                const selected = EXERCISE_SUGGESTIONS.find(ex => ex.name === e.target.value);
                setNewReminder(prev => ({...prev, exercise: selected}));
              }}
              className="w-full p-2 rounded border"
            >
              <option value="">Selecione um exercício</option>
              {EXERCISE_SUGGESTIONS.map(exercise => (
                <option key={exercise.name} value={exercise.name}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="block mb-2">Dias da Semana</label>
            <div className="grid grid-cols-4 gap-2">
              {daysOfWeek.map(day => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`p-2 rounded ${
                    newReminder.days.includes(day) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {day.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={addReminder}
              disabled={!newReminder.time || !newReminder.exercise || newReminder.days.length === 0}
              className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center disabled:opacity-50"
            >
              <CheckCircle className="mr-2" /> Salvar Lembrete
            </button>
            <button 
              onClick={() => setIsAddingReminder(false)}
              className="w-full bg-red-500 text-white p-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-3 rounded">
        <h3 className="font-semibold mb-2">Detalhes do Exercício Selecionado</h3>
        {newReminder.exercise && (
          <div>
            <p><strong>Nome:</strong> {newReminder.exercise.name}</p>
            <p><strong>Tipo:</strong> {newReminder.exercise.type}</p>
            <p><strong>Duração:</strong> {newReminder.exercise.duration}</p>
            <p><strong>Descrição:</strong> {newReminder.exercise.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthReminderApp;
