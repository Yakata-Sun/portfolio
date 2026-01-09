import React, { useState } from 'react';

export default function ReactHooksGuide() {
  const [selectedHook, setSelectedHook] = useState(null);

  const hooks = [
    {
      name: 'useState',
      category: 'Базовые',
      description: 'Добавляет состояние в функциональный компонент. Возвращает значение и функцию для его обновления.',
      simpleExplanation: 'Представь, что это коробка с памятью для твоего компонента. Ты кладёшь туда значение (например, число 0), и React помнит его между перерисовками. Когда хочешь изменить значение - вызываешь специальную функцию, и React автоматически перерисовывает компонент с новым значением.',
      howItWorks: 'При первом рендере useState создаёт ячейку памяти и сохраняет там начальное значение. Возвращает текущее значение и функцию-обновлятор. Когда вызываешь функцию-обновлятор, React запоминает новое значение и планирует перерисовку компонента. При следующем рендере useState возвращает уже обновлённое значение.',
      syntax: 'const [state, setState] = useState(initialValue)',
      example: `const [count, setCount] = useState(0);

return (
  <div>
    <p>Count: {count}</p>
    <button onClick={() => setCount(count + 1)}>
      Increment
    </button>
  </div>
);`,
      useCase: 'Управление локальным состоянием компонента: счетчики, флаги, формы'
    },
    {
      name: 'useEffect',
      category: 'Базовые',
      description: 'Выполняет побочные эффекты в функциональных компонентах. Заменяет componentDidMount, componentDidUpdate и componentWillUnmount.',
      simpleExplanation: 'Это как напоминание для React: "Эй, после того как ты нарисуешь компонент на экране, сделай ещё вот это". Например, загрузи данные с сервера, подпишись на события или измени заголовок страницы. А ещё можешь сказать: "Когда будешь убирать компонент, пожалуйста, подчисти за собой".',
      howItWorks: 'React выполняет функцию внутри useEffect после того, как компонент отрисовался на экране. Если указаны зависимости (второй параметр), эффект перезапускается только когда они меняются. Пустой массив [] означает "запусти только один раз". Если вернуть функцию, она выполнится перед следующим эффектом или при удалении компонента (cleanup).',
      syntax: 'useEffect(() => { /* effect */ return () => { /* cleanup */ } }, [dependencies])',
      example: `useEffect(() => {
  // Выполняется после рендера
  document.title = \`Clicks: \${count}\`;
  
  // Cleanup функция (опционально)
  return () => {
    document.title = 'React App';
  };
}, [count]); // Зависимости`,
      useCase: 'Запросы к API, подписки, манипуляции с DOM, таймеры'
    },
    {
      name: 'useContext',
      category: 'Базовые',
      description: 'Позволяет получить доступ к значению контекста без использования Consumer.',
      simpleExplanation: 'Это как общий склад данных для всех компонентов. Вместо того чтобы передавать данные через props от родителя к ребёнку, потом к внуку и так далее (prop drilling), ты просто кладёшь данные на "общий склад", и любой компонент может оттуда взять что нужно.',
      howItWorks: 'Сначала создаёшь "контекст" с помощью React.createContext(). Оборачиваешь дерево компонентов в Provider и передаёшь туда значение. Любой дочерний компонент может вызвать useContext() и получить это значение напрямую, без передачи через props.',
      syntax: 'const value = useContext(MyContext)',
      example: `const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ 
      background: theme === 'dark' ? '#333' : '#fff' 
    }}>
      Themed Button
    </button>
  );
}`,
      useCase: 'Доступ к глобальным данным: темы, язык, авторизация'
    },
    {
      name: 'useReducer',
      category: 'Дополнительные',
      description: 'Альтернатива useState для сложной логики состояния. Работает как Redux reducer.',
      simpleExplanation: 'Это как более организованный способ управлять состоянием. Вместо множества setState с разной логикой, ты описываешь все возможные действия (increment, decrement, reset) в одном месте - reducer функции. Потом просто отправляешь "команды" (actions), а reducer решает как изменить состояние.',
      howItWorks: 'Создаёшь функцию-редьюсер, которая принимает текущее состояние и действие (action), и возвращает новое состояние. useReducer даёт тебе текущее состояние и функцию dispatch. Когда вызываешь dispatch с каким-то action, React передаёт текущее состояние и этот action в редьюсер, получает новое состояние и перерисовывает компонент.',
      syntax: 'const [state, dispatch] = useReducer(reducer, initialState)',
      example: `const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });

<button onClick={() => dispatch({ type: 'increment' })}>
  +
</button>`,
      useCase: 'Сложная логика состояния с множеством действий'
    },
    {
      name: 'useCallback',
      category: 'Оптимизация',
      description: 'Возвращает мемоизированную версию callback-функции. Предотвращает ненужные перерендеры дочерних компонентов.',
      simpleExplanation: 'Это как "сохранить функцию в памяти". Обычно при каждом рендере компонента создаются новые версии функций, даже если код тот же. useCallback говорит React: "Эту функцию не пересоздавай, используй старую, пока зависимости не изменились". Это важно, когда передаёшь функции в дочерние компоненты - они не будут перерисовываться без причины.',
      howItWorks: 'React сохраняет функцию при первом рендере. При следующих рендерах проверяет зависимости: если они не изменились - возвращает ту же самую функцию из памяти, если изменились - создаёт новую. Дочерние компоненты, получающие эту функцию через props, видят что это "та же самая" функция и не перерисовываются.',
      syntax: 'const memoizedCallback = useCallback(() => { /* function */ }, [dependencies])',
      example: `const handleClick = useCallback(() => {
  console.log('Button clicked', count);
}, [count]);

// Передаем в дочерний компонент
<ChildComponent onClick={handleClick} />

// ChildComponent не перерендерится, 
// пока count не изменится`,
      useCase: 'Оптимизация производительности при передаче функций в дочерние компоненты'
    },
    {
      name: 'useMemo',
      category: 'Оптимизация',
      description: 'Мемоизирует результат вычислений. Предотвращает дорогие вычисления при каждом рендере.',
      simpleExplanation: 'Это как калькулятор с памятью. Представь, что у тебя сложные вычисления (например, сумма 1000 товаров). Без useMemo React будет считать это заново при каждой перерисовке. useMemo говорит: "Посчитай один раз, запомни результат, и пересчитывай только когда исходные данные изменились". Экономит время и ресурсы.',
      howItWorks: 'При первом рендере выполняет функцию-вычисление и сохраняет результат. При следующих рендерах проверяет зависимости: если они не изменились - возвращает сохранённый результат, если изменились - перевычисляет и сохраняет новый результат.',
      syntax: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])',
      example: `const expensiveValue = useMemo(() => {
  // Тяжелые вычисления
  return items.reduce((sum, item) => 
    sum + item.price * item.quantity, 0
  );
}, [items]);

return <div>Total: {expensiveValue}</div>`,
      useCase: 'Кеширование результатов дорогих вычислений'
    },
    {
      name: 'useRef',
      category: 'Дополнительные',
      description: 'Создает изменяемый объект, который сохраняется между рендерами. Не вызывает перерендер при изменении.',
      simpleExplanation: 'Это как "невидимая коробка", которая живёт весь жизненный цикл компонента. В неё можно что-то положить, достать, изменить - и компонент не перерисуется. Часто используется чтобы "дотянуться" до настоящего DOM-элемента (например, чтобы поставить фокус на input). Или чтобы хранить значения, которые нужно помнить, но не нужно показывать.',
      howItWorks: 'React создаёт объект { current: initialValue } при первом рендере и сохраняет его. Этот объект живёт всё время жизни компонента. Можешь читать и изменять .current когда угодно, и это не вызовет перерисовку. При указании ref={myRef} на DOM-элементе, React автоматически положит ссылку на этот элемент в myRef.current.',
      syntax: 'const refContainer = useRef(initialValue)',
      example: `const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current.focus();
};

return (
  <div>
    <input ref={inputRef} type="text" />
    <button onClick={focusInput}>
      Focus Input
    </button>
  </div>
);`,
      useCase: 'Доступ к DOM-элементам, хранение изменяемых значений без перерендера'
    },
    {
      name: 'useLayoutEffect',
      category: 'Дополнительные',
      description: 'Идентичен useEffect, но выполняется синхронно после всех изменений DOM и до отрисовки браузером.',
      simpleExplanation: 'Это как useEffect, но более быстрый и срочный. useEffect говорит "сделай это после того как пользователь увидит экран", а useLayoutEffect говорит "сделай это ДО того как пользователь что-то увидит". Используется когда нужно что-то измерить или изменить в DOM до отрисовки, чтобы не было "мерцания" на экране.',
      howItWorks: 'React применяет все изменения в DOM, потом СРАЗУ (синхронно) запускает useLayoutEffect, ждёт пока он завершится, и только потом браузер рисует на экране. Это блокирует отрисовку, поэтому используй только когда действительно нужно. Для обычных задач лучше useEffect.',
      syntax: 'useLayoutEffect(() => { /* effect */ }, [dependencies])',
      example: `useLayoutEffect(() => {
  // Измеряем элемент до отрисовки
  const height = divRef.current.offsetHeight;
  setDivHeight(height);
}, []);

// Используется для измерений DOM,
// когда важно избежать мерцания`,
      useCase: 'Измерения DOM, синхронные обновления перед отрисовкой'
    },
    {
      name: 'useImperativeHandle',
      category: 'Дополнительные',
      description: 'Кастомизирует значение, которое передается родителю через ref. Используется с forwardRef.',
      syntax: 'useImperativeHandle(ref, () => ({ /* methods */ }), [dependencies])',
      example: `const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => inputRef.current.value = ''
  }));
  
  return <input ref={inputRef} />;
});`,
      useCase: 'Ограничение доступа к методам дочернего компонента'
    },
    {
      name: 'useDebugValue',
      category: 'Дополнительные',
      description: 'Отображает метку для пользовательских хуков в React DevTools.',
      syntax: 'useDebugValue(value, formatFn?)',
      example: `function useCustomHook(value) {
  const [state, setState] = useState(value);
  
  // Показывает в DevTools
  useDebugValue(state, val => 
    \`Custom: \${val}\`
  );
  
  return [state, setState];
}`,
      useCase: 'Отладка пользовательских хуков в DevTools'
    },
    {
      name: 'useId',
      category: 'React 18+',
      description: 'Генерирует уникальный ID, стабильный между клиентом и сервером (для SSR).',
      syntax: 'const id = useId()',
      example: `function Form() {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}`,
      useCase: 'Генерация уникальных ID для accessibility атрибутов'
    },
    {
      name: 'useTransition',
      category: 'React 18+',
      description: 'Позволяет пометить обновления состояния как "переходные" (неприоритетные), чтобы не блокировать UI.',
      syntax: 'const [isPending, startTransition] = useTransition()',
      example: `const [isPending, startTransition] = useTransition();
const [input, setInput] = useState('');

const handleChange = (e) => {
  setInput(e.target.value);
  
  startTransition(() => {
    // Тяжелое обновление
    setSearchResults(filterItems(e.target.value));
  });
};

{isPending && <Spinner />}`,
      useCase: 'Оптимизация UI при тяжелых обновлениях состояния'
    },
    {
      name: 'useDeferredValue',
      category: 'React 18+',
      description: 'Откладывает обновление части UI, позволяя более важным обновлениям выполниться первыми.',
      syntax: 'const deferredValue = useDeferredValue(value)',
      example: `const [input, setInput] = useState('');
const deferredInput = useDeferredValue(input);

// input обновляется сразу
// deferredInput обновляется с задержкой

return (
  <>
    <input value={input} onChange={e => setInput(e.target.value)} />
    <SlowList text={deferredInput} />
  </>
);`,
      useCase: 'Оптимизация производительности при отображении больших списков'
    },
    {
      name: 'useSyncExternalStore',
      category: 'React 18+',
      description: 'Подписывается на внешние хранилища данных (Redux, Zustand и др.).',
      syntax: 'const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)',
      example: `function useOnlineStatus() {
  return useSyncExternalStore(
    // subscribe
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // getSnapshot
    () => navigator.onLine
  );
}`,
      useCase: 'Интеграция с внешними state-менеджерами и browser API'
    },
    {
      name: 'useInsertionEffect',
      category: 'React 18+',
      description: 'Выполняется до изменений DOM. Предназначен для CSS-in-JS библиотек.',
      syntax: 'useInsertionEffect(() => { /* effect */ }, [dependencies])',
      example: `useInsertionEffect(() => {
  // Вставка стилей в DOM
  // до того как браузер прочитает layout
  const style = document.createElement('style');
  style.textContent = '.my-class { color: red; }';
  document.head.appendChild(style);
  
  return () => document.head.removeChild(style);
}, []);`,
      useCase: 'Динамическая вставка CSS в библиотеках стилизации'
    }
  ];

  const categories = [...new Set(hooks.map(h => h.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            React Hooks Справочник
          </h1>
          <p className="text-xl text-gray-600">
            Полное руководство по всем основным хукам React с примерами
          </p>
        </div>

        <div className="grid gap-6">
          {categories.map(category => (
            <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">{category}</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {hooks.filter(h => h.category === category).map((hook, idx) => (
                  <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-indigo-600 mb-2">
                          {hook.name}
                        </h3>
                        <p className="text-gray-700 mb-3">{hook.description}</p>
                        <div className="inline-block bg-blue-50 px-3 py-1 rounded-md">
                          <span className="text-sm text-blue-700 font-semibold">
                            💡 {hook.useCase}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedHook(selectedHook === idx ? null : idx)}
                        className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                      >
                        {selectedHook === idx ? 'Скрыть' : 'Код'}
                      </button>
                    </div>

                    {selectedHook === idx && (
                      <div className="mt-4 space-y-4 animate-fadeIn">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-600 mb-2">
                            Синтаксис:
                          </h4>
                          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <code className="text-sm font-mono">{hook.syntax}</code>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-gray-600 mb-2">
                            Пример использования:
                          </h4>
                          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <pre className="text-sm font-mono whitespace-pre-wrap">
                              {hook.example}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Правила использования хуков
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">1.</span>
              <span>Вызывайте хуки только на верхнем уровне функции (не в циклах, условиях или вложенных функциях)</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">2.</span>
              <span>Вызывайте хуки только из функциональных компонентов React или пользовательских хуков</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">3.</span>
              <span>Используйте ESLint плагин eslint-plugin-react-hooks для автоматической проверки правил</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 font-bold mr-3">4.</span>
              <span>Называйте пользовательские хуки с префикса "use" (например: useCustomHook)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}